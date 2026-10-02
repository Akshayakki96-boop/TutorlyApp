import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getQuizById } from '../data/quizzes'

export default function QuizPlayer() {
  const { quizId } = useParams()
  const navigate = useNavigate()
  const quiz = getQuizById(quizId)

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(quiz?.timeLimit || 0)
  const [isFinished, setIsFinished] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

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

  // Timer effect
  useEffect(() => {
    if (isFinished) return
    if (timeLeft <= 0) {
      setIsFinished(true)
      return
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, isFinished])

  const currentQuestion = quiz.questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / quiz.totalQuestions) * 100

  const handleSelectAnswer = (optionIndex) => {
    if (!isFinished) {
      setSelectedAnswers(prev => ({
        ...prev,
        [currentQuestionIndex]: optionIndex
      }))
      setShowExplanation(false)
    }
  }

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
      setShowExplanation(false)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
      setShowExplanation(false)
    }
  }

  const handleShowExplanation = () => {
    setShowExplanation(!showExplanation)
  }

  const handleSubmitQuiz = () => {
    setIsFinished(true)
  }

  const handleFinishQuiz = () => {
    const score = Object.keys(selectedAnswers).filter(
      index => selectedAnswers[index] === quiz.questions[index].correct
    ).length

    navigate(`/quiz/results/${quizId}`, {
      state: {
        score,
        totalQuestions: quiz.totalQuestions,
        selectedAnswers,
        timeSpent: quiz.timeLimit - timeLeft,
        quiz
      }
    })
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  const isTimeWarning = timeLeft < 60

  if (isFinished) {
    const score = Object.keys(selectedAnswers).filter(
      index => selectedAnswers[index] === quiz.questions[index].correct
    ).length

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950 pt-20 pb-10">
        <div className="section-wrap">
          <div className="max-w-2xl mx-auto">
            {/* Finished Card */}
            <div className="rounded-3xl bg-white dark:bg-slate-800 shadow-2xl overflow-hidden">
              
              {/* Celebration Section */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-center text-white">
                <div className="text-6xl animate-bounce mb-4">🎉</div>
                <h2 className="text-4xl font-black">Quiz Complete!</h2>
                <p className="mt-2 text-white/90">Great effort! Review your answers below.</p>
              </div>

              {/* Score Summary */}
              <div className="p-8">
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center p-6 rounded-2xl bg-blue-50 dark:bg-blue-900/30">
                    <div className="text-3xl font-black text-blue-600 dark:text-blue-400">{score}/{quiz.totalQuestions}</div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Score</p>
                  </div>
                  <div className="text-center p-6 rounded-2xl bg-purple-50 dark:bg-purple-900/30">
                    <div className="text-3xl font-black text-purple-600 dark:text-purple-400">{Math.round((score / quiz.totalQuestions) * 100)}%</div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Percentage</p>
                  </div>
                  <div className="text-center p-6 rounded-2xl bg-pink-50 dark:bg-pink-900/30">
                    <div className="text-3xl font-black text-pink-600 dark:text-pink-400">{quiz.totalQuestions - score}</div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Incorrect</p>
                  </div>
                </div>

                {/* Review Questions */}
                <div className="border-t border-slate-200 dark:border-slate-700 pt-8">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Review Your Answers</h3>
                  
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {quiz.questions.map((question, index) => {
                      const isCorrect = selectedAnswers[index] === question.correct
                      const selectedOption = selectedAnswers[index]

                      return (
                        <div
                          key={index}
                          onClick={() => setCurrentQuestionIndex(index)}
                          className={`p-4 rounded-xl cursor-pointer transition-all border-2 ${
                            isCorrect
                              ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-600'
                              : 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-600'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="font-semibold text-slate-900 dark:text-white">
                                Q{index + 1}: {question.question.substring(0, 50)}...
                              </p>
                              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                {isCorrect ? '✅ Correct' : '❌ Incorrect'}
                              </p>
                            </div>
                            <span className="text-2xl">
                              {isCorrect ? '✅' : '❌'}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex gap-3 flex-col sm:flex-row">
                  <button
                    onClick={handleFinishQuiz}
                    className="flex-1 py-4 px-6 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg text-lg"
                  >
                    📊 View Detailed Report
                  </button>
                  <button
                    onClick={() => navigate(`/quiz/${quizId}`)}
                    className="flex-1 py-4 px-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all"
                  >
                    🔄 Retake Quiz
                  </button>
                  <button
                    onClick={() => navigate('/quiz')}
                    className="flex-1 py-4 px-6 bg-gradient-to-r from-slate-500 to-slate-600 text-white font-bold rounded-xl hover:from-slate-600 hover:to-slate-700 transition-all"
                  >
                    📚 Back to Quizzes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950 pt-20 pb-10">
      <div className="section-wrap">
        <div className="max-w-3xl mx-auto">
          
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{quiz.title}</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Question {currentQuestionIndex + 1} of {quiz.totalQuestions}</p>
              </div>
              <div className={`text-center p-4 rounded-2xl font-bold text-lg ${
                isTimeWarning
                  ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                  : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
              }`}>
                ⏱️ {formatTime(timeLeft)}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-3 bg-slate-300 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="rounded-2xl bg-white dark:bg-slate-800 shadow-xl p-8 mb-6">
            
            {/* Question */}
            <div className="mb-8">
              <div className="flex items-start gap-4">
                <span className="text-3xl">{quiz.icon}</span>
                <div className="flex-1">
                  <p className="text-xl font-bold text-slate-900 dark:text-white">
                    {currentQuestion.question}
                  </p>
                </div>
              </div>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-8">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswers[currentQuestionIndex] === index
                const isCorrect = index === currentQuestion.correct

                return (
                  <button
                    key={index}
                    onClick={() => handleSelectAnswer(index)}
                    disabled={isFinished}
                    className={`w-full p-4 rounded-xl text-left font-semibold transition-all border-2 ${
                      isSelected
                        ? isCorrect
                          ? 'bg-green-100 dark:bg-green-900/30 border-green-500 dark:border-green-500 text-green-900 dark:text-green-200'
                          : 'bg-red-100 dark:bg-red-900/30 border-red-500 dark:border-red-500 text-red-900 dark:text-red-200'
                        : 'bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:border-blue-500 dark:hover:border-blue-400'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-sm">
                        {isSelected ? (isCorrect ? '✓' : '✗') : String.fromCharCode(65 + index)}
                      </span>
                      {option}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Explanation (Show After Selection) */}
            {selectedAnswers[currentQuestionIndex] !== undefined && (
              <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-l-4 border-blue-500">
                <button
                  onClick={handleShowExplanation}
                  className="flex items-center justify-between w-full text-left font-semibold text-blue-900 dark:text-blue-200 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <span>💡 {showExplanation ? 'Hide' : 'Show'} Explanation</span>
                  <span className={`transition-transform ${showExplanation ? 'rotate-180' : ''}`}>▼</span>
                </button>
                {showExplanation && (
                  <p className="mt-3 text-slate-700 dark:text-slate-300">{currentQuestion.explanation}</p>
                )}
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="flex-1 py-3 px-4 bg-slate-300 dark:bg-slate-700 text-slate-900 dark:text-white font-bold rounded-xl hover:bg-slate-400 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              ← Previous
            </button>
            
            {currentQuestionIndex < quiz.questions.length - 1 ? (
              <button
                onClick={handleNext}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={handleSubmitQuiz}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all"
              >
                ✓ Submit Quiz
              </button>
            )}
          </div>

          {/* Question Navigator */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-4">Quick Navigation</p>
            <div className="grid grid-cols-10 gap-2">
              {quiz.questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`aspect-square rounded-lg font-bold text-xs transition-all ${
                    index === currentQuestionIndex
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white scale-105'
                      : selectedAnswers[index] !== undefined
                      ? selectedAnswers[index] === quiz.questions[index].correct
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
