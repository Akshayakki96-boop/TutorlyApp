import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { getQuizById } from '../data/quizzes'
import Footer from '../components/Footer'

export default function QuizResults() {
  const { quizId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const quiz = getQuizById(quizId)

  const state = location.state || {}
  const { score = 0, totalQuestions = 0, selectedAnswers = {}, timeSpent = 0 } = state

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 dark:bg-red-950">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600">Quiz Not Found</h1>
          <button
            onClick={() => navigate('/quiz')}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Quizzes
          </button>
        </div>
      </div>
    )
  }

  const percentage = Math.round((score / totalQuestions) * 100)
  const timeMinutes = Math.floor(timeSpent / 60)
  const timeSeconds = timeSpent % 60

  const getPerformanceLevel = (percent) => {
    if (percent >= 90) return { level: 'Outstanding!', emoji: '🌟', color: 'from-yellow-500 to-orange-600', bg: 'bg-yellow-50 dark:bg-yellow-900/20' }
    if (percent >= 75) return { level: 'Excellent!', emoji: '⭐', color: 'from-green-500 to-emerald-600', bg: 'bg-green-50 dark:bg-green-900/20' }
    if (percent >= 60) return { level: 'Good Job!', emoji: '👍', color: 'from-blue-500 to-cyan-600', bg: 'bg-blue-50 dark:bg-blue-900/20' }
    if (percent >= 50) return { level: 'Keep Trying!', emoji: '💪', color: 'from-orange-500 to-red-600', bg: 'bg-orange-50 dark:bg-orange-900/20' }
    return { level: 'Try Again!', emoji: '🎯', color: 'from-red-500 to-pink-600', bg: 'bg-red-50 dark:bg-red-900/20' }
  }

  const performance = getPerformanceLevel(percentage)

  const getCategoryStats = () => {
    const stats = {}
    quiz.questions.forEach((question, index) => {
      const category = question.category || 'General'
      if (!stats[category]) {
        stats[category] = { correct: 0, total: 0, difficulty: question.difficulty }
      }
      stats[category].total++
      if (selectedAnswers[index] === question.correct) {
        stats[category].correct++
      }
    })
    return stats
  }

  const getDifficultyStats = () => {
    const stats = { Easy: 0, Medium: 0, Hard: 0 }
    const correct = { Easy: 0, Medium: 0, Hard: 0 }
    quiz.questions.forEach((question, index) => {
      const diff = question.difficulty || 'Medium'
      stats[diff]++
      if (selectedAnswers[index] === question.correct) {
        correct[diff]++
      }
    })
    return { stats, correct }
  }

  const getWeakAreas = () => {
    const categoryStats = getCategoryStats()
    return Object.entries(categoryStats)
      .map(([category, data]) => ({
        category,
        percentage: Math.round((data.correct / data.total) * 100),
        correct: data.correct,
        total: data.total
      }))
      .sort((a, b) => a.percentage - b.percentage)
  }

  const categoryStats = getCategoryStats()
  const difficultyStats = getDifficultyStats()
  const weakAreas = getWeakAreas()

  return (
    <>
      <main className="pt-20 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950 pb-10">
        <div className="section-wrap">
          <div className="max-w-4xl mx-auto">

            {/* Main Results Card */}
            <div className="rounded-3xl bg-white dark:bg-slate-800 shadow-2xl overflow-hidden mb-8">
              
              {/* Celebration Header */}
              <div className={`bg-gradient-to-r ${performance.color} p-12 text-center text-white`}>
                <div className="text-8xl mb-4 animate-bounce">{performance.emoji}</div>
                <h1 className="text-4xl md:text-5xl font-black mb-2">{performance.level}</h1>
                <p className="text-white/90 text-lg">You completed the {quiz.title} quiz</p>
              </div>

              {/* Score Breakdown */}
              <div className="p-8 md:p-12">
                
                {/* Main Score Card */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                  
                  {/* Score */}
                  <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                    <div className="text-5xl font-black mb-2">{score}</div>
                    <p className="text-blue-100 font-semibold">Your Score</p>
                    <p className="text-blue-200 text-sm mt-1">out of {totalQuestions}</p>
                  </div>

                  {/* Percentage */}
                  <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                    <div className="text-5xl font-black mb-2">{percentage}%</div>
                    <p className="text-purple-100 font-semibold">Percentage</p>
                    <div className="mt-3 h-2 bg-white/30 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white transition-all duration-1000"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Correct Answers */}
                  <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white">
                    <div className="text-5xl font-black mb-2">✅ {score}</div>
                    <p className="text-green-100 font-semibold">Correct</p>
                    <p className="text-green-200 text-sm mt-1">Well answered!</p>
                  </div>

                  {/* Incorrect Answers */}
                  <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-red-500 to-pink-600 text-white">
                    <div className="text-5xl font-black mb-2">❌ {totalQuestions - score}</div>
                    <p className="text-red-100 font-semibold">Incorrect</p>
                    <p className="text-red-200 text-sm mt-1">Room to improve</p>
                  </div>

                </div>

                {/* Analytics Section - MOVED UP FOR VISIBILITY */}
                <div className="mt-8 space-y-8">
                  
                  {/* Performance by Difficulty */}
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-6 rounded-2xl border-2 border-blue-200 dark:border-blue-800">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                      <span>📊 Performance by Difficulty Level</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {['Easy', 'Medium', 'Hard'].map(difficulty => {
                        const stats = difficultyStats.stats[difficulty] || 0
                        const correct = difficultyStats.correct[difficulty] || 0
                        const percent = stats > 0 ? Math.round((correct / stats) * 100) : 0
                        const colors = {
                          Easy: 'from-green-500 to-emerald-600',
                          Medium: 'from-yellow-500 to-orange-600',
                          Hard: 'from-red-500 to-pink-600'
                        }
                        
                        return (
                          <div key={difficulty} className="bg-white dark:bg-slate-700 p-5 rounded-xl border border-slate-200 dark:border-slate-600">
                            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-3">{difficulty} Questions</p>
                            <div className="text-center mb-3">
                              <div className={`text-4xl font-black bg-gradient-to-r ${colors[difficulty]} bg-clip-text text-transparent`}>
                                {percent}%
                              </div>
                              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 font-semibold">{correct} of {stats} correct</p>
                            </div>
                            <div className="w-full h-3 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                              <div
                                className={`h-full bg-gradient-to-r ${colors[difficulty]} transition-all duration-1000`}
                                style={{ width: `${percent}%` }}
                              />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Weak Areas Identification */}
                  {weakAreas.length > 0 && weakAreas.some(a => a.percentage < 75) && (
                    <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-6 rounded-2xl border-2 border-orange-300 dark:border-orange-700">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                        <span>🎯 Topics to Focus On</span>
                      </h3>
                      <div className="space-y-4">
                        {weakAreas.slice(0, 3).map((area, idx) => (
                          area.percentage < 75 && (
                            <div key={idx} className="bg-white dark:bg-slate-800 p-5 rounded-xl border-l-4 border-orange-500">
                              <div className="flex items-center justify-between mb-3">
                                <span className="font-bold text-slate-900 dark:text-white text-lg">{area.category}</span>
                                <span className={`text-lg font-bold px-3 py-1 rounded-full ${
                                  area.percentage < 60 ? 'bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-200' : 
                                  'bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                }`}>
                                  {area.percentage}%
                                </span>
                              </div>
                              <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-3">
                                <div
                                  className={`h-full transition-all duration-1000 ${
                                    area.percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                  }`}
                                  style={{ width: `${area.percentage}%` }}
                                />
                              </div>
                              <p className="text-sm text-slate-600 dark:text-slate-300">
                                Answered {area.correct} out of {area.total} correctly. Keep practicing this topic!
                              </p>
                            </div>
                          )
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Topic Breakdown Bar Chart */}
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-2xl border-2 border-blue-200 dark:border-blue-800">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                      <span>📈 Detailed Topic Performance</span>
                    </h3>
                    <div className="space-y-5">
                      {Object.entries(categoryStats)
                        .sort(([,a], [,b]) => (b.correct / b.total) - (a.correct / a.total))
                        .map(([category, data]) => {
                          const percentage = Math.round((data.correct / data.total) * 100)
                          return (
                            <div key={category} className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
                              <div className="flex items-center justify-between mb-3">
                                <span className="font-bold text-slate-900 dark:text-white">{category}</span>
                                <span className="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">{data.correct}/{data.total}</span>
                              </div>
                              <div className="w-full h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-1000"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <div className="text-right mt-2">
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{percentage}% Mastered</span>
                              </div>
                            </div>
                          )
                        })}
                    </div>
                  </div>

                  {/* Summary Statistics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-purple-100 dark:bg-purple-900/30 p-5 rounded-xl border border-purple-300 dark:border-purple-700 text-center">
                      <p className="text-3xl font-black text-purple-600 dark:text-purple-300">⚡</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 font-semibold">Avg per Question</p>
                      <p className="text-xl font-bold text-slate-900 dark:text-white">
                        {totalQuestions > 0 ? Math.round(timeSpent / totalQuestions) : 0}s
                      </p>
                    </div>
                    <div className="bg-indigo-100 dark:bg-indigo-900/30 p-5 rounded-xl border border-indigo-300 dark:border-indigo-700 text-center">
                      <p className="text-3xl font-black text-indigo-600 dark:text-indigo-300">🏆</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 font-semibold">Topics Mastered</p>
                      <p className="text-xl font-bold text-slate-900 dark:text-white">
                        {Object.values(categoryStats).filter(c => (c.correct / c.total) >= 0.75).length}/{Object.keys(categoryStats).length}
                      </p>
                    </div>
                    <div className="bg-pink-100 dark:bg-pink-900/30 p-5 rounded-xl border border-pink-300 dark:border-pink-700 text-center">
                      <p className="text-3xl font-black text-pink-600 dark:text-pink-300">🎯</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 font-semibold">Consistency</p>
                      <p className="text-xl font-bold text-slate-900 dark:text-white">
                        {percentage > 80 ? 'Excellent' : percentage > 60 ? 'Good' : 'Keep Trying'}
                      </p>
                    </div>
                    <div className="bg-teal-100 dark:bg-teal-900/30 p-5 rounded-xl border border-teal-300 dark:border-teal-700 text-center">
                      <p className="text-3xl font-black text-teal-600 dark:text-teal-300">📚</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 font-semibold">Total Reviewed</p>
                      <p className="text-xl font-bold text-slate-900 dark:text-white">{totalQuestions}</p>
                    </div>
                  </div>

                </div>

                {/* Quiz Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 mt-8 border-t-2 border-slate-200 dark:border-slate-700">
                  
                  <div className="text-center">
                    <p className="text-3xl font-black text-slate-900 dark:text-white">⏱️</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Time Spent</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                      {timeMinutes}m {timeSeconds}s
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="text-3xl font-black text-slate-900 dark:text-white">📊</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Accuracy</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                      {percentage}%
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="text-3xl font-black text-slate-900 dark:text-white">📚</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Total Questions</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                      {totalQuestions}
                    </p>
                  </div>

                </div>

                {/* Detailed Answer Review */}
                <div className="mt-10">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Answer Review</h3>
                  
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {quiz.questions.map((question, index) => {
                      const isCorrect = selectedAnswers[index] === question.correct
                      
                      return (
                        <div
                          key={index}
                          className={`p-4 rounded-xl border-l-4 transition-all ${
                            isCorrect
                              ? 'bg-green-50 dark:bg-green-900/20 border-green-500'
                              : 'bg-red-50 dark:bg-red-900/20 border-red-500'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="font-semibold text-slate-900 dark:text-white">
                                Q{index + 1}: {question.question}
                              </p>
                              <div className="mt-2 text-sm space-y-1">
                                <p className="text-slate-700 dark:text-slate-300">
                                  <span className="font-semibold">Your answer:</span> {question.options[selectedAnswers[index]] || 'Not answered'}
                                </p>
                                {!isCorrect && (
                                  <p className="text-green-700 dark:text-green-300">
                                    <span className="font-semibold">Correct answer:</span> {question.options[question.correct]}
                                  </p>
                                )}
                                <p className="text-slate-600 dark:text-slate-400 mt-2 italic">
                                  💡 {question.explanation}
                                </p>
                              </div>
                            </div>
                            <span className="text-3xl ml-4">
                              {isCorrect ? '✅' : '❌'}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Recommendations */}
                <div className={`mt-10 p-6 rounded-2xl ${performance.bg}`}>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-3 text-lg">📋 Personalized Recommendations</h3>
                  <div className="space-y-3 text-sm">
                    {percentage >= 90 && (
                      <>
                        <p className="text-slate-700 dark:text-slate-300">✅ <span className="font-semibold">Excellent performance!</span> You've mastered this quiz. Try the next difficulty level.</p>
                        <p className="text-slate-700 dark:text-slate-300">✅ <span className="font-semibold">Teach others:</span> Consider helping peers understand these concepts.</p>
                      </>
                    )}
                    {percentage >= 75 && percentage < 90 && (
                      <>
                        <p className="text-slate-700 dark:text-slate-300">✅ <span className="font-semibold">Great job!</span> Review the {totalQuestions - score} questions you got wrong.</p>
                        {weakAreas.length > 0 && (
                          <p className="text-slate-700 dark:text-slate-300">💡 <span className="font-semibold">Focus area:</span> Pay special attention to <strong>{weakAreas[0].category}</strong> ({weakAreas[0].percentage}%).</p>
                        )}
                      </>
                    )}
                    {percentage >= 60 && percentage < 75 && (
                      <>
                        <p className="text-slate-700 dark:text-slate-300">💡 <span className="font-semibold">Good progress!</span> Review all incorrect answers carefully.</p>
                        {weakAreas.length > 0 && (
                          <p className="text-slate-700 dark:text-slate-300">🎯 <span className="font-semibold">Priority:</span> Focus on <strong>{weakAreas[0].category}</strong> and <strong>{weakAreas[1]?.category || 'other topics'}</strong> to improve.</p>
                        )}
                        <p className="text-slate-700 dark:text-slate-300">📚 Study the core concepts and practice similar problems.</p>
                      </>
                    )}
                    {percentage < 60 && (
                      <>
                        <p className="text-slate-700 dark:text-slate-300">💪 <span className="font-semibold">Keep practicing!</span> This is a learning opportunity.</p>
                        {weakAreas.length > 0 && (
                          <p className="text-slate-700 dark:text-slate-300">🎯 <span className="font-semibold">Focus areas:</span> Review <strong>{weakAreas.slice(0, 2).map(w => w.category).join(', ')}</strong>.</p>
                        )}
                        <p className="text-slate-700 dark:text-slate-300">📖 Go back and study the fundamental concepts thoroughly.</p>
                        <p className="text-slate-700 dark:text-slate-300">🔄 Retake the quiz after reviewing to track improvement.</p>
                      </>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-10 flex gap-3 flex-col sm:flex-row">
                  <button
                    onClick={() => window.location.href = `/quiz/${quizId}`}
                    className="flex-1 py-4 px-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
                  >
                    🔄 Retake Quiz
                  </button>
                  <button
                    onClick={() => navigate('/quiz')}
                    className="flex-1 py-4 px-6 bg-gradient-to-r from-slate-500 to-slate-600 text-white font-bold rounded-xl hover:from-slate-600 hover:to-slate-700 transition-all transform hover:scale-105 shadow-lg"
                  >
                    📚 Back to Quizzes
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="flex-1 py-4 px-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
                  >
                    📄 Print Report
                  </button>
                </div>
              </div>

            </div>

            {/* Motivation Section */}
            <div className="rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8 text-center text-white shadow-lg">
              <h3 className="text-2xl font-black mb-2">Keep Learning & Growing! 🚀</h3>
              <p className="text-white/90">Every quiz brings you closer to mastering mathematics. Your consistent effort is the key to success!</p>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
