import { useState, useEffect } from 'react'
import { getTodaysFact, getRandomFact, mathFacts, getAllCategories, getFactsByCategory } from '../data/mathFacts'
import Footer from '../components/Footer'

export default function DailyMathFacts() {
  const [todaysFact, setTodaysFact] = useState(null)
  const [randomFact, setRandomFact] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [filteredFacts, setFilteredFacts] = useState(mathFacts)
  const [expandedFactId, setExpandedFactId] = useState(null)
  const categories = getAllCategories()

  useEffect(() => {
    setTodaysFact(getTodaysFact())
    setRandomFact(getRandomFact())
  }, [])

  useEffect(() => {
    document.title = 'Amazing Daily Math Facts, Fun Maths & Learning Tips | SkillBridge Tutors'
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.setAttribute('name', 'description')
      document.head.appendChild(metaDescription)
    }
    metaDescription.setAttribute('content', 'Explore amazing daily math facts, fun maths concepts, interesting patterns and useful learning tips to make maths engaging for students from Year 1 to GCSE.')
    
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', 'https://skillbridgetutors.com/facts/')
    return () => { const c = document.querySelector('link[rel="canonical"]'); if (c) c.remove() }
  }, [])

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredFacts(mathFacts)
    } else {
      setFilteredFacts(getFactsByCategory(selectedCategory))
    }
  }, [selectedCategory])

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-500/20 text-green-600 border-green-400'
      case 'Medium':
        return 'bg-yellow-500/20 text-yellow-600 border-yellow-400'
      case 'Hard':
        return 'bg-red-500/20 text-red-600 border-red-400'
      default:
        return 'bg-slate-500/20 text-slate-600 border-slate-400'
    }
  }

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return '🟢'
      case 'Medium':
        return '🟡'
      case 'Hard':
        return '🔴'
      default:
        return '⚪'
    }
  }

  return (
    <>
      <main className="pt-20 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950">
        
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-12 text-white">
          <div className="section-wrap">
            <div className="text-center">
              <p className="text-white/80 text-sm font-semibold uppercase tracking-wider">Mathematical Insights</p>
              <h1 className="font-heading text-4xl md:text-5xl font-black mt-3">Daily Math Facts</h1>
              <p className="mt-4 text-base text-white/90 max-w-2xl mx-auto">Discover fascinating mathematical facts, patterns, and mind-bending truths. A new fact every day to inspire your mathematical curiosity.</p>
            </div>
          </div>
        </div>

        <div className="section-wrap py-12">
          
          {/* Today's Fact - Featured Card */}
          {todaysFact && (
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">⭐</span>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Today's Featured Fact</h2>
              </div>
              
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 p-1">
                <div className="bg-white dark:bg-slate-950 rounded-3xl p-8 md:p-10">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="text-6xl md:text-7xl flex-shrink-0 animate-bounce" style={{animationDelay: '0s'}}>
                      {todaysFact.icon}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">
                          {todaysFact.title}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getDifficultyColor(todaysFact.difficulty)}`}>
                          {getDifficultyIcon(todaysFact.difficulty)} {todaysFact.difficulty}
                        </span>
                      </div>
                      
                      <span className="inline-block px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold mb-4">
                        📚 {todaysFact.category}
                      </span>
                      
                      <p className="text-lg text-slate-700 dark:text-slate-200 leading-relaxed">
                        {todaysFact.fact}
                      </p>

                      <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          📅 Updated daily • 🔄 Check back tomorrow for a new fact
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Random Fact Suggestion */}
          {randomFact && randomFact.id !== todaysFact?.id && (
            <div className="mb-12">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span>🎲</span> Random Math Fact
              </h3>
              <div className="rounded-2xl border-2 border-dashed border-purple-400 dark:border-purple-600 bg-purple-50 dark:bg-purple-950/30 p-6">
                <div className="flex gap-4">
                  <div className="text-5xl flex-shrink-0">{randomFact.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-2">{randomFact.title}</h4>
                    <p className="text-slate-700 dark:text-slate-300 mb-3">{randomFact.fact}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs font-semibold px-2 py-1 bg-white dark:bg-slate-800 rounded-full text-slate-700 dark:text-slate-300">
                        {randomFact.category}
                      </span>
                      <span className={`text-xs font-bold px-2 py-1 rounded-full border ${getDifficultyColor(randomFact.difficulty)}`}>
                        {randomFact.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Category Filter */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Filter by Category</h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-4 py-2 rounded-full font-semibold transition-all transform hover:scale-105 ${
                  selectedCategory === 'All'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                All Categories
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-semibold transition-all transform hover:scale-105 ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Facts Grid */}
          <div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              All Math Facts ({filteredFacts.length})
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFacts.map((fact) => (
                <div
                  key={fact.id}
                  onClick={() => setExpandedFactId(expandedFactId === fact.id ? null : fact.id)}
                  className="group cursor-pointer"
                >
                  <div className="relative h-full rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2">
                    
                    {/* Card Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-5xl">{fact.icon}</div>
                      <span className={`px-2 py-1 rounded-full text-xs font-bold border ${getDifficultyColor(fact.difficulty)}`}>
                        {getDifficultyIcon(fact.difficulty)}
                      </span>
                    </div>

                    {/* Title & Category */}
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-2">
                      {fact.title}
                    </h3>
                    <span className="inline-block px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold mb-3">
                      {fact.category}
                    </span>

                    {/* Description */}
                    <p className={`text-sm text-slate-600 dark:text-slate-300 leading-relaxed transition-all ${
                      expandedFactId === fact.id ? 'line-clamp-none' : 'line-clamp-3'
                    }`}>
                      {fact.fact}
                    </p>

                    {/* Expand indicator */}
                    <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {expandedFactId === fact.id ? '📖 Read less' : '📖 Read more'}
                      </span>
                      <span className={`transition-transform ${expandedFactId === fact.id ? 'rotate-180' : ''}`}>
                        ▼
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredFacts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-slate-500 dark:text-slate-400">No facts found in this category.</p>
              </div>
            )}
          </div>

          {/* Stats Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 p-8 text-white text-center">
              <div className="text-4xl font-black mb-2">{mathFacts.length}</div>
              <p className="text-white/90 font-semibold">Total Facts</p>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 p-8 text-white text-center">
              <div className="text-4xl font-black mb-2">{categories.length}</div>
              <p className="text-white/90 font-semibold">Categories</p>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 p-8 text-white text-center">
              <div className="text-4xl font-black mb-2">∞</div>
              <p className="text-white/90 font-semibold">Daily Updates</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-10 text-white text-center">
            <h3 className="text-3xl font-black mb-3">Love Math Facts?</h3>
            <p className="text-lg text-white/90 mb-6">Check back daily for a new fascinating mathematical discovery!</p>
            <button className="inline-block px-8 py-3 bg-white text-purple-600 font-bold rounded-full hover:bg-slate-100 transition-colors transform hover:scale-105">
              📬 Subscribe to Daily Facts
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
