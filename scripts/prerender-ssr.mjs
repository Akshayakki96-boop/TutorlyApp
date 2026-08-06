/**
 * Post-build SSR pre-rendering script.
 *
 * Flow:
 *  1. Vite builds src/entry-server.jsx into dist/server/ (SSR bundle)
 *  2. This script imports the SSR bundle and calls render(url) for each route
 *  3. The rendered HTML is injected into the dist/index.html shell
 *  4. Title, meta description, and canonical are patched per-page
 *  5. Each result is written to dist/<route>/index.html
 *  6. The temporary dist/server/ folder is cleaned up
 *
 * Run via:  node scripts/prerender-ssr.mjs
 * Invoked automatically by the `postbuild` npm script.
 */

import { build }                                    from 'vite'
import { readFileSync, writeFileSync, mkdirSync,
         rmSync, existsSync }                       from 'fs'
import { join, dirname }                            from 'path'
import { fileURLToPath, pathToFileURL }             from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir   = join(__dirname, '..')
const distDir   = join(rootDir, 'dist')
const serverDir = join(distDir, 'server')

// ── Route config ──────────────────────────────────────────────────────────────
const BASE = 'https://skillbridgetutors.com'

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

function patchMeta(html, { title, description, canonical }) {
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escHtml(title)}</title>`)

  if (/<meta\s+name="description"[^>]*>/.test(html)) {
    html = html.replace(
      /<meta\s+name="description"[^>]*>/,
      `<meta name="description" content="${escHtml(description)}">`
    )
  } else {
    html = html.replace('</head>', `  <meta name="description" content="${escHtml(description)}">\n</head>`)
  }

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

async function main() {
  // 1. Build the SSR bundle (configFile:false avoids manualChunks conflict)
  console.log('\n[prerender-ssr] Building SSR bundle…')
  await build({
    root:       rootDir,
    configFile: false,          // don't load vite.config.js — no manualChunks
    logLevel:   'warn',
    // No plugins: Vite handles JSX for .jsx files automatically
    esbuild: { jsx: 'automatic' },
    build: {
      ssr:    join(rootDir, 'src', 'entry-server.jsx'),
      outDir: serverDir,
      rollupOptions: {
        output: { format: 'esm' },
      },
    },
  })

  // 2. Import the compiled render function
  const serverEntry = join(serverDir, 'entry-server.js')
  const { render } = await import(pathToFileURL(serverEntry).href)

  // 3. Load the client HTML shell
  const template = readFileSync(join(distDir, 'index.html'), 'utf-8')

  // 4. Render every route and write its HTML file
  console.log('[prerender-ssr] Rendering routes…\n')
  let count = 0

  for (const page of ROUTES) {
    let appHtml = ''
    try {
      appHtml = render(page.route)
    } catch (err) {
      console.warn(`  ⚠  ${page.route} — render error: ${err.message}`)
    }

    // Inject rendered markup into the root div
    let html = template.replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`
    )

    // Patch SEO meta tags
    html = patchMeta(html, page)

    // Write to dist/<route>/index.html
    const segments  = page.route.split('/').filter(Boolean)
    const outputDir = segments.length ? join(distDir, ...segments) : distDir
    mkdirSync(outputDir, { recursive: true })
    writeFileSync(join(outputDir, 'index.html'), html, 'utf-8')
    console.log(`  ✓  ${page.route}`)
    count++
  }

  // 5. Remove the temporary server bundle
  rmSync(serverDir, { recursive: true, force: true })

  console.log(`\n[prerender-ssr] Done — ${count} pages pre-rendered.\n`)
}

main().catch(err => {
  console.error('\n[prerender-ssr] Fatal error:\n', err)
  process.exit(1)
})
