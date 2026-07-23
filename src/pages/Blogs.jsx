import Footer from '../components/Footer'
import Chatbot from '../components/Chatbot'

const POSTS = [
  {
    id: 1,
    title: 'Top 10 GCSE Revision Tips for Students',
    excerpt: 'Preparing for GCSE exams can feel overwhelming. Here are 10 practical revision tips to help students manage time, stay organised, and boost performance.',
    image: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 2,
    title: 'Mastering GCSE Maths: A Complete Guide',
    excerpt: 'Maths is one of the most important GCSE subjects. Learn key strategies, common exam pitfalls, and how to tackle problem-solving questions effectively.',
    image: 'https://images.pexels.com/photos/4145198/pexels-photo-4145198.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  },
  {
    id: 3,
    title: 'How to Excel in GCSE English Exams',
    excerpt: 'GCSE English requires strong reading, writing, and analytical skills. Here’s how students can prepare effectively for both Language and Literature papers.',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 4,
    title: 'Building the Right Mindset for GCSE Success',
    excerpt: 'Success in GCSEs isn’t just about hard work; it’s also about the right mindset. Learn how confidence, planning, and resilience help students succeed.',
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=800&q=60',
  },
]

export default function Blogs() {
  return (
    <>
      <main className="pt-20 min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="bg-hero-gradient py-16 text-white text-center">
          <div className="section-wrap">
            <span className="inline-block bg-white/15 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              📝 Blogs & Study Tips
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-extrabold mb-4">Latest GCSE Blogs and Study Tips</h1>
            <p className="text-white/80 text-lg max-w-xl mx-auto">Practical advice, subject guides and exam strategies to help students prepare confidently for their GCSEs.</p>
          </div>
        </div>

        <div className="section-wrap py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {POSTS.map(post => (
              <article key={post.id} className="card overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
                <div className="h-48 bg-slate-200 dark:bg-slate-800">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-heading font-bold text-slate-900 dark:text-white text-lg mb-2">{post.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <button className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline">Read More →</button>
                    <time className="text-xs text-slate-400">Jan 2025</time>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">Want more topics covered? Email us at <strong>info@skillbridgetutors.com</strong> with suggestions, and we’ll prioritise posts that help students most.</p>
          </div>
        </div>
      </main>
      <Footer />
      <Chatbot />
    </>
  )
}
