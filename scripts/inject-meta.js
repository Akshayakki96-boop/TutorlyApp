/**
 * Post-build script: generates a separate index.html for every route
 * with the correct <title>, <meta name="description">, and <link rel="canonical">
 * baked in. This makes Ctrl+U / view-source show the right data per page,
 * and improves social-media scraper compatibility.
 *
 * Run automatically via the `postbuild` npm script.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir   = join(__dirname, '..')
const distDir   = join(rootDir, 'dist')

// ── Route meta map ────────────────────────────────────────────────────────────
const BASE = 'https://skillbridgetutors.com'

const ROUTES = [
  // Static pages
  {
    route: '/',
    title: "Maths Tuition | UK's Trusted Online Tuition Platform",
    description: "Find the best tutor for Maths & English Online Tuition in UK. Achieve success with our Online Maths & English Tutoring Service in UK. Learn from Experts",
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
  // Blog posts
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
    description: 'GCSE English requires strong reading, writing, and analytical skills. Here\'s how students can prepare effectively for both Language and Literature papers.',
    canonical: `${BASE}/blogs/excel-in-gcse-english`,
  },
  {
    route: '/blogs/right-mindset-for-gcse-success',
    title: 'Building the Right Mindset for GCSE Success | SkillBridge Tutors',
    description: 'Success in GCSEs isn\'t just about hard work; it\'s also about the right mindset. Learn how confidence, planning, and resilience help students succeed.',
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

/** Escape text for safe insertion into an HTML attribute value */
function escHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function injectMeta(html, { title, description, canonical }) {
  let result = html

  // Replace <title>…</title>
  result = result.replace(/<title>[^<]*<\/title>/, `<title>${escHtml(title)}</title>`)

  // Replace existing <meta name="description" …>
  result = result.replace(
    /<meta\s+name="description"[^>]*>/,
    `<meta name="description" content="${escHtml(description)}">`
  )

  // Inject / replace canonical <link>
  if (canonical) {
    if (result.includes('rel="canonical"')) {
      result = result.replace(
        /<link\s+rel="canonical"[^>]*>/,
        `<link rel="canonical" href="${escHtml(canonical)}">`
      )
    } else {
      result = result.replace(
        '</head>',
        `    <link rel="canonical" href="${escHtml(canonical)}">\n</head>`
      )
    }
  }

  return result
}

// ── Generate files ────────────────────────────────────────────────────────────

const baseHtml = readFileSync(join(distDir, 'index.html'), 'utf-8')

let generated = 0

for (const page of ROUTES) {
  const segments = page.route.split('/').filter(Boolean)
  const outputDir = segments.length
    ? join(distDir, ...segments)
    : distDir

  mkdirSync(outputDir, { recursive: true })

  const html = injectMeta(baseHtml, page)
  writeFileSync(join(outputDir, 'index.html'), html, 'utf-8')
  console.log(`  ✓  ${page.route}`)
  generated++
}

console.log(`\n[inject-meta] ${generated} pages generated.\n`)
