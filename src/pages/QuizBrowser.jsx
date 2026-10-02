import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { quizzes, getCategories } from '../data/quizzes'
import Footer from '../components/Footer'

export default function QuizBrowser() {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [filteredQuizzes, setFilteredQuizzes] = useState(quizzes)
  const categories = getCategories()

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredQuizzes(quizzes)
    } else {
      setFilteredQuizzes(quizzes.filter(q => q.category === selectedCategory))
    }
  }, [selectedCategory])

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'from-green-500 to-emerald-600'
      case 'Medium':
        return 'from-yellow-500 to-orange-600'
      case 'Hard':
        return 'from-red-500 to-pink-600'
      default:
        return 'from-blue-500 to-cyan-600'
    }
  }

  const getCategoryColor = (category) => {
    const colors = {
      'KS1': 'from-blue-500 to-blue-600',
      'KS2': 'from-purple-500 to-purple-600',
      'KS3': 'from-indigo-500 to-indigo-600',
      'Year 10': 'from-pink-500 to-pink-600',
      'GCSE': 'from-red-500 to-red-600'
    }
    return colors[category] || 'from-slate-500 to-slate-600'
  }

  return (
    <>
      <main className="pt-20 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950">
        
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-12 text-white">
          <div className="section-wrap">
            <div className="text-center">
              <p className="text-white/80 text-sm font-semibold uppercase tracking-wider">📝 Interactive Learning</p>
              <h1 className="font-heading text-4xl md:text-5xl font-black mt-3">Maths Quizzes</h1>
              <p className="mt-4 text-base text-white/90 max-w-2xl mx-auto">Challenge yourself with engaging quizzes across all levels from KS1 to GCSE. Track your progress and master mathematics!</p>
              <p className="mt-3 text-white/70 text-sm">📊 {quizzes.length} Quizzes • 🎯 Multiple Levels • 🏆 Track Your Progress</p>
            </div>
          </div>
        </div>

        <div className="section-wrap py-12">
          
          {/* Category Filter */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Filter by Level</h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-4 py-2 rounded-full font-semibold transition-all transform hover:scale-105 ${
                  selectedCategory === 'All'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                All Levels
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-semibold transition-all transform hover:scale-105 ${
                    selectedCategory === category
                      ? `bg-gradient-to-r ${getCategoryColor(category)} text-white shadow-lg`
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Quizzes Grid */}
          <div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Available Quizzes ({filteredQuizzes.length})
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredQuizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="group relative rounded-2xl overflow-hidden bg-white dark:bg-slate-800 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2"
                >
                  {/* Difficulty Badge Background */}
                  <div className={`h-2 bg-gradient-to-r ${getDifficultyColor(quiz.difficulty)}`} />
                  
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-4xl">{quiz.icon}</div>
                      <span className={`px-2.5 py-1 rounded-full bg-gradient-to-r ${getDifficultyColor(quiz.difficulty)} text-white text-xs font-bold`}>
                        {quiz.difficulty}
                      </span>
                    </div>

                    {/* Category Badge */}
                    <span className={`inline-block px-3 py-1 rounded-full text-white text-xs font-semibold mb-3 bg-gradient-to-r ${getCategoryColor(quiz.category)}`}>
                      {quiz.category} • Year {quiz.year}
                    </span>

                    {/* Title & Description */}
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                      {quiz.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      {quiz.description}
                    </p>

                    {/* Quiz Info */}
                    <div className="space-y-2 mb-4 pb-4 border-t border-slate-200 dark:border-slate-700 pt-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-400">📋 Questions:</span>
                        <span className="font-bold text-slate-900 dark:text-white">{quiz.totalQuestions}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-400">⏱️ Time Limit:</span>
                        <span className="font-bold text-slate-900 dark:text-white">{Math.ceil(quiz.timeLimit / 60)} min</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-400">📚 Topic:</span>
                        <span className="font-bold text-slate-900 dark:text-white">{quiz.topic}</span>
                      </div>
                    </div>

                    {/* Play Button */}
                    <button
                      onClick={() => navigate(`/quiz/${quiz.id}`)}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      ▶️ Start Quiz
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredQuizzes.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-slate-500 dark:text-slate-400">No quizzes found in this category.</p>
              </div>
            )}
          </div>

          {/* Stats Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 p-8 text-white text-center">
              <div className="text-4xl font-black mb-2">{quizzes.length}</div>
              <p className="text-white/90 font-semibold">Total Quizzes</p>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 p-8 text-white text-center">
              <div className="text-4xl font-black mb-2">{categories.length}</div>
              <p className="text-white/90 font-semibold">Levels</p>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 p-8 text-white text-center">
              <div className="text-4xl font-black mb-2">{quizzes.reduce((sum, q) => sum + q.totalQuestions, 0)}</div>
              <p className="text-white/90 font-semibold">Total Questions</p>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 p-8 text-white text-center">
              <div className="text-4xl font-black mb-2">∞</div>
              <p className="text-white/90 font-semibold">Learning</p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-10 text-white text-center">
            <h3 className="text-3xl font-black mb-3">Ready to Master Maths?</h3>
            <p className="text-lg text-white/90 mb-2">Select a quiz above and challenge yourself today!</p>
            <p className="text-white/70 text-sm">🏆 Earn badges • 📊 Track progress • 🚀 Improve skills</p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
