const SITE_URL = 'https://skillbridgetutors.com/'
const ORGANIZATION_ID = `${SITE_URL}#organization`
const WEBSITE_ID = `${SITE_URL}#website`

const WEBSITE_SCHEMA = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: SITE_URL,
  name: 'SkillBridge Tutors',
  publisher: { '@id': ORGANIZATION_ID },
  inLanguage: 'en-GB'
}

function createFaqSchema(id, faqs) {
  return {
    '@type': 'FAQPage',
    '@id': id,
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: a
      }
    }))
  }
}

function createBreadcrumbSchema(path, items) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${SITE_URL}${path}#breadcrumb`,
    itemListElement: items.map(({ name, url }, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name,
      item: url
    }))
  }
}

function createServicePageSchema({
  path,
  pageName,
  pageDescription,
  serviceName,
  serviceDescription,
  serviceType,
  breadcrumbName,
  faqs
}) {
  const pageUrl = `${SITE_URL}${path}/`
  const pageId = `${pageUrl}#webpage`
  const serviceId = `${pageUrl}#service`
  const breadcrumbId = `${pageUrl}#breadcrumb`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      WEBSITE_SCHEMA,
      {
        '@type': 'WebPage',
        '@id': pageId,
        url: pageUrl,
        name: pageName,
        description: pageDescription,
        isPartOf: { '@id': WEBSITE_ID },
        publisher: { '@id': ORGANIZATION_ID },
        about: { '@id': serviceId },
        mainEntity: { '@id': serviceId },
        breadcrumb: { '@id': breadcrumbId },
        inLanguage: 'en-GB'
      },
      {
        '@type': 'Service',
        '@id': serviceId,
        name: serviceName,
        description: serviceDescription,
        url: pageUrl,
        serviceType,
        provider: { '@id': ORGANIZATION_ID },
        areaServed: {
          '@type': 'Country',
          name: 'United Kingdom'
        },
        availableChannel: {
          '@type': 'ServiceChannel',
          serviceUrl: pageUrl,
          availableLanguage: 'English'
        }
      },
      createFaqSchema(`${pageUrl}#faq`, faqs),
      createBreadcrumbSchema(path, [
        { name: 'Home', url: SITE_URL },
        { name: breadcrumbName, url: pageUrl }
      ])
    ]
  }
}

export const GCSE_MATHS_FAQS = [
  {
    q: 'What Is an Online GCSE Maths Tutor and How Can They Help Students?',
    a: 'An online GCSE maths tutor provides one-to-one lessons over the internet, helping students understand difficult topics, improve problem-solving skills, and prepare effectively for GCSE examinations.'
  },
  {
    q: 'How Does GCSE Maths Tuition Online Help Students Prepare for GCSE Exams?',
    a: 'Our GCSE maths tuition focuses on syllabus coverage, regular revision, practice papers, exam strategies, and personalised support so students are fully prepared for their GCSE exams.'
  },
  {
    q: 'What Topics Are Covered in GCSE Maths Online Learning?',
    a: 'Our GCSE maths online learning covers number, algebra, geometry, measures, probability, statistics, graphs, equations, trigonometry, and exam preparation for both Foundation and Higher Tier GCSE Maths.'
  },
  {
    q: 'Is an Online GCSE Maths Tutor Suitable for Students of All Ability Levels?',
    a: 'Yes. A GCSE online maths tutor works with students of all abilities, providing lessons that match their current level while helping them achieve their academic goals.'
  },
  {
    q: "How Can GCSE Maths Tutoring Online Improve a Student's Confidence and Results?",
    a: 'Regular sessions with a maths tutor GCSE online improve understanding, reduce anxiety, strengthen exam techniques, and help students become more confident when solving mathematical problems.'
  },
  {
    q: 'What Should Parents Look for When Choosing a GCSE Maths Tutor Online?',
    a: "Parents should look for an experienced GCSE maths tutor online who offers personalised lesson plans, regular progress updates, flexible scheduling, curriculum knowledge, and a teaching style that matches the student's learning needs."
  }
]

export const GCSE_MATHS_SCHEMA = createServicePageSchema({
  path: 'gcse-maths-tutor',
  pageName: 'GCSE Maths Tutor Online | SkillBridge Tutors',
  pageDescription: 'Personalised online GCSE Maths tutoring with one-to-one lessons, revision support, practice questions and exam preparation.',
  serviceName: 'Online GCSE Maths Tutoring',
  serviceDescription: 'Personalised one-to-one online GCSE Maths tutoring designed to help students improve their understanding, strengthen problem-solving skills, revise key topics and prepare confidently for GCSE Maths exams.',
  serviceType: 'GCSE Maths Tutoring',
  breadcrumbName: 'GCSE Maths Tutor',
  faqs: GCSE_MATHS_FAQS
})

export const A_LEVEL_MATHS_FAQS = [
  {
    q: 'How Can an Online Maths A-Level Tutor Help Students Improve Their Understanding?',
    a: 'As a maths a level tutor online, we explain difficult concepts step by step, identify learning gaps, provide personalised guidance, and help students gain confidence through regular practice.'
  },
  {
    q: 'What Can Students Expect From A-Level Maths Tuition Online?',
    a: 'Our a level maths tuition includes one to one lessons, customised study plans, interactive teaching, homework support, regular assessments, and continuous feedback.'
  },
  {
    q: 'How Does Online A-Level Maths Tutoring Support Exam Preparation?',
    a: 'We prepare students with past paper practice, mock examinations, revision plans, exam strategies, and detailed feedback to improve overall performance.'
  },
  {
    q: 'Can Online A-Level Maths Tuition Help Students With Difficult Topics?',
    a: 'Yes. Our a level maths tuition breaks complex topics into manageable sections, making them easier to understand through guided explanations and additional practice.'
  },
  {
    q: 'When Should a Student Consider Getting an A-Level Maths Tutor Online?',
    a: 'Students should consider working with an a level maths tutor online if they are struggling with specific topics, preparing for exams, aiming for higher grades, or looking for personalised academic support.'
  },
  {
    q: 'How Can Students Get the Most Out of Online A-Level Maths Tutoring?',
    a: 'Students benefit the most by attending lessons regularly, completing assignments, asking questions, revising consistently, and practising past papers alongside our a level maths tuition program.'
  }
]

export const A_LEVEL_MATHS_SCHEMA = createServicePageSchema({
  path: 'maths-a-level-tutor',
  pageName: 'Maths A Level Tutor Online | SkillBridge Tutors',
  pageDescription: 'Personalised online A-Level Maths tutoring with one-to-one lessons, exam preparation, revision support and expert guidance for students across the UK.',
  serviceName: 'Online A-Level Maths Tutoring',
  serviceDescription: 'Personalised one-to-one online A-Level Maths tutoring designed to help students improve their understanding, strengthen problem-solving skills, revise key topics and prepare confidently for A-Level Maths examinations.',
  serviceType: 'A-Level Maths Tutoring',
  breadcrumbName: 'Maths A Level Tutor',
  faqs: A_LEVEL_MATHS_FAQS
})

export const MATHS_TUTOR_FAQS = [
  {
    q: 'What Does a Private Maths Tutor Teach and How Can They Support Students?',
    a: "A private maths tutor teaches topics based on the student's curriculum, explains difficult concepts, provides personalised practice, helps with homework, and prepares students for tests and examinations while building confidence."
  },
  {
    q: 'Why Choose Online Mathematics Tutors for One-to-One Learning?',
    a: 'Online mathematics tutors provide individual attention, flexible scheduling, customised lesson plans, and regular feedback. Students receive lessons tailored to their learning style, making progress faster than in many traditional classroom settings.'
  },
  {
    q: 'How Can Online Maths Tutoring Make Learning Maths Easier?',
    a: 'Online maths tutoring allows students to learn at their own pace, ask unlimited questions, receive immediate explanations, and practise concepts through interactive lessons from the comfort of home.'
  },
  {
    q: 'What Age Groups Can Benefit From Maths Tuition Online?',
    a: 'Maths tuition online is suitable for primary school students, secondary students, GCSE and IGCSE learners, A Level students, and anyone looking to strengthen their mathematical understanding.'
  },
  {
    q: 'Can Online Maths Tutoring Help Students Prepare for Important Exams?',
    a: 'Yes. Online maths tutoring includes structured revision, past paper practice, exam strategies, regular assessments, and personalised guidance to help students perform confidently in important examinations.'
  },
  {
    q: "How Do I Find the Best Maths Tutor for My Child's Learning Needs?",
    a: "Look for experienced tutors who offer personalised lesson plans, one-to-one teaching, flexible scheduling, progress tracking, and a teaching style that matches your child's learning needs. SkillBridge Tutors provides experienced tutors who focus on both academic improvement and student confidence."
  }
]

export const MATHS_TUTOR_SCHEMA = createServicePageSchema({
  path: 'maths-tutor',
  pageName: 'Private Maths Tutor | SkillBridge Tutors',
  pageDescription: 'Personalised online Maths tutoring with one-to-one lessons, exam preparation, revision support and expert guidance for students across the UK.',
  serviceName: 'Online Maths Tutoring',
  serviceDescription: 'Personalised one-to-one online Maths tutoring designed to help students improve their understanding, strengthen problem-solving skills, revise key topics and prepare confidently for Maths examinations.',
  serviceType: 'Maths Tutoring',
  breadcrumbName: 'Maths Tutor',
  faqs: MATHS_TUTOR_FAQS
})

export function createBlogSchema({ post, faqs = [] }) {
  const pageUrl = `${SITE_URL}blogs/${post.slug}/`
  const pageId = `${pageUrl}#webpage`
  const articleId = `${pageUrl}#article`
  const breadcrumbId = `${pageUrl}#breadcrumb`
  const description = post.metaDescription || post.excerpt
  const headline = post.title

  const graph = [
    WEBSITE_SCHEMA,
    {
      '@type': 'WebPage',
      '@id': pageId,
      url: pageUrl,
      name: headline,
      description,
      isPartOf: { '@id': WEBSITE_ID },
      publisher: { '@id': ORGANIZATION_ID },
      mainEntity: { '@id': articleId },
      breadcrumb: { '@id': breadcrumbId },
      inLanguage: 'en-GB'
    },
    {
      '@type': 'BlogPosting',
      '@id': articleId,
      headline,
      description,
      url: pageUrl,
      image: post.image,
      author: {
        '@type': 'Organization',
        name: 'SkillBridge Tutors',
        url: SITE_URL
      },
      publisher: { '@id': ORGANIZATION_ID },
      mainEntityOfPage: { '@id': pageId },
      articleSection: post.category,
      keywords: post.tags || [],
      inLanguage: 'en-GB'
    }
  ]

  if (faqs.length > 0) {
    graph.push(createFaqSchema(`${pageUrl}#faq`, faqs))
  }

  graph.push(createBreadcrumbSchema('blogs/' + post.slug, [
    { name: 'Home', url: SITE_URL },
    { name: 'Blogs', url: `${SITE_URL}blogs/` },
    { name: headline, url: pageUrl }
  ]))

  return {
    '@context': 'https://schema.org',
    '@graph': graph
  }
}
