/**
 * Post-build pre-rendering script.
 *
 * Uses @prerenderer/prerenderer + @prerenderer/renderer-puppeteer (already
 * installed as transitive deps of vite-plugin-prerender) to spin up a local
 * static server, visit every public route with a headless browser, capture the
 * fully-rendered React HTML, and write each page to dist/<route>/index.html.
 *
 * After writing the pre-rendered HTML, the script also patches in the correct
 * <title>, <meta name="description">, and <link rel="canonical"> for every
 * page (so view-source always shows the right SEO values even if the JS
 * useEffect hasn't run).
 *
 * Run via:  node scripts/prerender.cjs
 * Invoked automatically by the `postbuild` npm script.
 */

const path  = require('path')
const fs    = require('fs')
const Prerenderer      = require('@prerenderer/prerenderer')
const PuppeteerRenderer = require('@prerenderer/renderer-puppeteer')

// ── Config ────────────────────────────────────────────────────────────────────

const distDir = path.join(__dirname, '..', 'dist')
const BASE    = 'https://skillbridgetutors.com'

// Routes to pre-render + their canonical SEO meta values.
// title / description must match what the page's useEffect sets so the static
// snapshot and the live JS are always in sync.
const ROUTES = [
  {
    route: '/',
    title: "Maths Tuition | UK's Trusted Online Tuition Platform",
    description: "Boost your child's confidence with expert maths tuition from the UK's trusted online tuition platform. Personalised lessons, experienced tutors, and proven results.",
    canonical: `${BASE}/`,
  },
  {
    route: '/courses',
    title: 'Mathematics Online Classes | Learn & Study Maths Online Courses',
    description: "Join the UK's trusted Mathematics Online Classes and Online Math Courses to learn and study maths online with expert tutors and flexible lessons.",
    canonical: `${BASE}/courses`,
  },
  {
    route: '/blogs',
    title: 'Latest GCSE Blogs and Study Tips | SkillBridge Tutors',
    description: 'Practical advice, subject guides and exam strategies to help students prepare confidently for their GCSEs.',
    canonical: `${BASE}/blogs`,
  },
  {
    route: '/gcse-maths-tutor',
    title: 'GCSE Maths Course Online, Online GCSE Maths Tutor, Tuition & Learning',
    description: 'Join a GCSE Maths Course Online with GCSE Maths Online Learning, expert GCSE Online Maths Tutor support and personalised GCSE Maths Tuition to boost confidence.',
    canonical: `${BASE}/gcse-maths-tutor`,
  },
  {
    route: '/maths-a-level-tutor',
    title: 'A Level Maths Tutor Online, Maths A Level Tutor & Tuition Online',
    description: 'Get expert support from a Maths A Level Tutor Online at SkillBridge Tutors, with personalised A Level Maths Tuition to build confidence and prepare effectively for exams.',
    canonical: `${BASE}/maths-a-level-tutor`,
  },
  {
    route: '/maths-tutor',
    title: 'Online Mathematics Tutors | Maths Tutoring & Private Tuition',
    description: 'Find expert Online Mathematics Tutors for personalised Online Maths Tutoring, Maths Tuition, and support from a dedicated Private Maths Tutor for exam success.',
    canonical: `${BASE}/maths-tutor`,
  },
  {
    route: '/blogs/gcse-revision-tips',
    title: 'Top 10 GCSE Revision Tips for Students | SkillBridge Tutors',
    description: 'Preparing for GCSE exams can feel overwhelming. Here are 10 practical revision tips to help students manage time, stay organised, and boost performance.',
    canonical: `${BASE}/blogs/gcse-revision-tips`,
  },
  {
    route: '/blogs/best-maths-tutors-online',
    title: 'Best Maths Tutors Online | Maths Tutoring - SkillBridge Tutors',
    description: 'Choose the Best Maths Tutors Online at SkillBridge Tutors for personalised Maths Tutoring, expert support, and flexible lessons to build confidence and skills.',
    canonical: `${BASE}/blogs/best-maths-tutors-online`,
  },
  {
    route: '/blogs/mastering-gcse-maths',
    title: 'Mastering GCSE Maths: A Complete Guide | SkillBridge Tutors',
    description: 'Maths is one of the most important GCSE subjects. Learn key strategies, common exam pitfalls, and how to tackle problem-solving questions effectively.',
    canonical: `${BASE}/blogs/mastering-gcse-maths`,
  },
  {
    route: '/blogs/excel-in-gcse-english',
    title: 'How to Excel in GCSE English Exams | SkillBridge Tutors',
    description: "GCSE English requires strong reading, writing, and analytical skills. Here's how students can prepare effectively for both Language and Literature papers.",
    canonical: `${BASE}/blogs/excel-in-gcse-english`,
  },
  {
    route: '/blogs/right-mindset-for-gcse-success',
    title: 'Building the Right Mindset for GCSE Success | SkillBridge Tutors',
    description: "Success in GCSEs isn't just about hard work; it's also about the right mindset. Learn how confidence, planning, and resilience help students succeed.",
    canonical: `${BASE}/blogs/right-mindset-for-gcse-success`,
  },
  {
    route: '/blogs/gcse-maths-online-learning',
    title: 'GCSE Maths Online Learning: Improve Your Grades from Home',
    description: 'Improve your grades with GCSE Maths online learning from home. Explore effective study tips, expert guidance, practice strategies, and flexible online support.',
    canonical: `${BASE}/blogs/gcse-maths-online-learning`,
  },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

function escHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

/**
 * Patch title, meta description, and canonical into an HTML string.
 * Works on both the raw SPA shell and fully pre-rendered HTML.
 */
function patchMeta(html, { title, description, canonical }) {
  // Replace <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escHtml(title)}</title>`)

  // Replace or insert <meta name="description">
  if (/<meta\s+name="description"[^>]*>/.test(html)) {
    html = html.replace(
      /<meta\s+name="description"[^>]*>/,
      `<meta name="description" content="${escHtml(description)}">`
    )
  } else {
    html = html.replace('</head>', `  <meta name="description" content="${escHtml(description)}">\n</head>`)
  }

  // Replace or insert <link rel="canonical">
  if (/<link\s+rel="canonical"[^>]*>/.test(html)) {
    html = html.replace(
      /<link\s+rel="canonical"[^>]*>/,
      `<link rel="canonical" href="${escHtml(canonical)}">`
    )
  } else {
    html = html.replace('</head>', `  <link rel="canonical" href="${escHtml(canonical)}">\n</head>`)
  }

  return html
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function run() {
  console.log('\n[prerender] Starting pre-render of', ROUTES.length, 'routes…\n')

  const prerenderer = new Prerenderer({
    staticDir: distDir,
    renderer: new PuppeteerRenderer({
      headless: true,
      renderAfterTime: 3000, // wait for React lazy-loads + useEffect
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    }),
  })

  let rendered
  try {
    await prerenderer.initialize()
    rendered = await prerenderer.renderRoutes(ROUTES.map(r => r.route))
  } finally {
    prerenderer.destroy()
  }

  // Build a lookup map from route → meta config
  const metaMap = {}
  for (const page of ROUTES) metaMap[page.route] = page

  let count = 0
  for (const { route, html } of rendered) {
    const meta     = metaMap[route] || {}
    const patched  = meta.title ? patchMeta(html, meta) : html

    const segments  = route.split('/').filter(Boolean)
    const outputDir = segments.length ? path.join(distDir, ...segments) : distDir
    fs.mkdirSync(outputDir, { recursive: true })
    fs.writeFileSync(path.join(outputDir, 'index.html'), patched, 'utf-8')
    console.log(`  ✓  ${route}`)
    count++
  }

  console.log(`\n[prerender] Done — ${count} pages written.\n`)
}

run().catch(err => {
  console.error('\n[prerender] Fatal error:\n', err)
  process.exit(1)
})
