import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import Chatbot from '../components/Chatbot'
import { BLOGS } from '../data/blogsData'

export default function Blogs() {
  useEffect(() => {
    document.title = 'Latest GCSE Blogs and Study Tips | SkillBridge Tutors'
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.setAttribute('name', 'description')
      document.head.appendChild(metaDescription)
    }
    metaDescription.setAttribute('content', 'Practical advice, subject guides and exam strategies to help students prepare confidently for their GCSEs.')
  }, [])

  const sortedPosts = [...BLOGS].sort((a, b) => new Date(b.date) - new Date(a.date))
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
            {sortedPosts.map(post => (
              <article key={post.id} className="card overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
                <div className="h-48 bg-slate-200 dark:bg-slate-800">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-heading font-bold text-slate-900 dark:text-white text-lg mb-2">{post.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <Link to={`/blogs/${post.slug}`} className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline">Read More →</Link>
                    <time className="text-xs text-slate-400">{post.date}</time>
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
