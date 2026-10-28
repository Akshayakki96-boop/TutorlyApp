export function getChatbotResponse(message) {
  const question = message.toLowerCase()

  if (/fee|fees|price|pricing|cost|how much/.test(question)) {
    return {
      text: 'Standard maths tuition starts from £8 per hour when booking 12 sessions. GCSE Maths Intensive starts from £14 per hour, and a free trial class is available before enrolling.',
      link: { label: 'See course fees and offers', href: '/course-fees' }
    }
  }
  if (/demo|free class|trial|book demo|book trial/.test(question)) {
    return {
      text: 'You can book a free trial class with a tutor before enrolling, with no commitment required.',
      link: { label: 'Book a free trial', href: '/contact' }
    }
  }
  if (/enroll|enrol|admission|join/.test(question)) {
    return {
      text: 'Get in touch with our team to discuss your child’s year group and learning needs, and arrange the next steps.',
      link: { label: 'Contact us to get started', href: '/contact' }
    }
  }
  if (/subject|teach|courses|course/.test(question)) {
    return {
      text: 'We provide online Maths tuition for students from Year 1 to Year 10, including dedicated GCSE preparation.',
      link: { label: 'Browse our courses', href: '/courses' }
    }
  }
  if (/one.to.one|1.to.1|individual|group class/.test(question)) {
    return {
      text: 'Our tuition provides personalised support and one-to-one attention, with lessons tailored to each student.'
    }
  }
  if (/math/.test(question)) {
    return {
      text: 'Our Maths tutoring covers Year 1 to Year 10 and GCSE, with support in understanding concepts, problem-solving, and exam preparation.',
      link: { label: 'Explore our Maths courses', href: '/courses' }
    }
  }
  if (/english/.test(question)) {
    return {
      text: 'We specialise in Maths tuition. Contact us if you would like to discuss a specific learning requirement.',
      link: { label: 'Contact our team', href: '/contact' }
    }
  }
  if (/gcse|board|curriculum/.test(question)) {
    return {
      text: 'We provide GCSE Maths tuition aligned with UK exam requirements, including past papers, timed practice, and exam technique.',
      link: { label: 'See GCSE tuition and fees', href: '/course-fees' }
    }
  }
  if (/class size|how many students/.test(question)) {
    return {
      text: 'Lessons are tailored to each student, with one-to-one attention from their tutor.'
    }
  }
  if (/timing|schedule|time/.test(question)) {
    return {
      text: 'Sessions can be arranged around school, evenings, and weekends. Contact us to discuss a suitable time.',
      link: { label: 'Ask about availability', href: '/contact' }
    }
  }
  if (/experience|qualified|safe|tutor/.test(question)) {
    return {
      text: 'Our tutors provide personalised, supportive Maths tuition. Contact us and we can help find the right support for your student.',
      link: { label: 'Learn about our services', href: '/services' }
    }
  }
  if (/progress|feedback|report/.test(question)) {
    return {
      text: 'Personalised learning plans and progress updates help families follow a student’s development.'
    }
  }
  if (/online|mode/.test(question)) {
    return {
      text: 'All our tuition is online, making it easier to fit lessons around school and family schedules.',
      link: { label: 'Explore our services', href: '/services' }
    }
  }
  if (/contact|phone|call|email|whatsapp/.test(question)) {
    return {
      text: 'You can call or WhatsApp us on +44 7451 295266, or email info@skillbridgetutors.com.',
      link: { label: 'Contact us', href: '/contact' }
    }
  }
  if (/location|address/.test(question)) {
    return {
      text: 'We are based in Derby, United Kingdom, and provide online tuition across the UK.',
      link: { label: 'View contact details', href: '/contact' }
    }
  }

  return {
    text: 'I can help with Maths courses, GCSE tuition, fees, free trial classes, and scheduling. What would you like to know?'
  }
}
