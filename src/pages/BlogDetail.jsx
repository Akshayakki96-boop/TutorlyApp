import { Link, useParams, useNavigate } from 'react-router-dom'
import { BLOGS } from '../data/blogsData'
import Footer from '../components/Footer'
import Chatbot from '../components/Chatbot'

export default function BlogDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const post = BLOGS.find(item => item.slug === slug)

  if (!post) {
    return (
      <main className="pt-20 min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="section-wrap py-20 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-600 dark:text-blue-300 mb-4">Blog not found</p>
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">We couldn’t find this article.</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">Please pick another resource from our blogs library or return to the main blogs page.</p>
          <Link to="/blogs" className="btn-primary">Back to Blogs</Link>
        </div>
      </main>
    )
  }

  return (
    <>
      <main className="pt-20 min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="relative overflow-hidden bg-slate-900 text-white">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-slate-900 to-slate-800 opacity-90" />
          <div className="section-wrap relative py-20">
            <div className="max-w-3xl mx-auto">
              <p className="text-sm uppercase tracking-[0.3em] text-blue-300 mb-4">{post.category} · {post.readingTime}</p>
              <h1 className="font-heading text-4xl md:text-5xl font-extrabold leading-tight mb-6">{post.title}</h1>
              <p className="text-slate-200 text-lg mb-8">{post.excerpt}</p>
              <div className="flex flex-wrap gap-3 items-center text-slate-300 text-sm">
                <span>{post.author}</span>
                <span className="inline-flex items-center gap-2">•</span>
                <span>{post.date}</span>
                <button
                  onClick={() => navigate('/blogs')}
                  className="ml-auto rounded-full bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20 transition"
                >
                  Back to blogs
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="section-wrap py-12 grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
          <article className="space-y-8">
            {post.content.map((paragraph, index) => (
              <p key={index} className="text-slate-700 dark:text-slate-200 leading-relaxed text-base">{paragraph}</p>
            ))}

            <div className="rounded-3xl overflow-hidden shadow-lg">
              <img src={post.image} alt={post.title} className="w-full h-72 object-cover" />
            </div>

            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm">
              <h2 className="font-heading text-2xl font-bold mb-4 text-slate-900 dark:text-white">What to do next</h2>
              <ul className="space-y-3 text-slate-600 dark:text-slate-300">
                <li>• Apply these tips in your next revision session and track progress weekly.</li>
                <li>• Focus on the subjects that feel hardest first, then build confidence with easier topics.</li>
                <li>• Book a free demo to get a personalised study plan from our expert tutors.</li>
              </ul>
            </div>
          </article>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.28em] text-blue-600 dark:text-blue-300 mb-3">Need targeted support?</p>
              <h2 className="font-heading text-xl font-semibold text-slate-900 dark:text-white mb-4">Book a free guidance session</h2>
              <p className="text-slate-600 dark:text-slate-300 mb-6">Speak with a tutor who can help build your revision plan and identify the most productive study topics.</p>
              <button onClick={() => navigate('/#assessmentForm')} className="btn-primary w-full">Book Free Demo</button>
            </div>

            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400 mb-3">Quick tips</p>
              <ul className="space-y-3 text-slate-600 dark:text-slate-300">
                <li>✓ Review one subject per session.</li>
                <li>✓ Keep revision notes short and visual.</li>
                <li>✓ Practice exam-style questions weekly.</li>
              </ul>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
      <Chatbot />
    </>
  )
}
