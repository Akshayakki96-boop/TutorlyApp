import { useNavigate } from 'react-router-dom'

export default function LearningResources() {
  const navigate = useNavigate()

  const resources = [
    {
      id: 1,
      icon: '📚',
      title: 'Daily Math Facts',
      description: 'Discover fun, engaging math facts that appear daily. Learn interesting patterns, tricks, and fascinating mathematical concepts.',
      benefits: ['New fact every day', 'Browse by category', 'Fun & educational'],
      cta: 'Explore Facts',
      action: () => navigate('/daily-math-facts'),
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      icon: '📝',
      title: 'Maths Quizzes',
      description: 'Take engaging quizzes from KS1 to GCSE. Test your knowledge, track your progress, and master maths with instant feedback.',
      benefits: ['15+ quizzes', 'All levels KS1-GCSE', 'Instant results'],
      cta: 'Start Quiz',
      action: () => navigate('/quiz'),
      color: 'from-purple-500 to-pink-500'
    }
  ]

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Enhance Your Learning
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Explore our interactive learning resources designed to make maths fun, engaging, and effective
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${resource.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

              {/* Border Gradient */}
              <div className={`absolute inset-0 border-2 border-transparent bg-gradient-to-br ${resource.color} bg-clip-border opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`} />

              {/* Content */}
              <div className="relative p-8 md:p-10">
                {/* Icon */}
                <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {resource.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
                  {resource.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 dark:text-slate-300 mb-6 text-base leading-relaxed">
                  {resource.description}
                </p>

                {/* Benefits List */}
                <ul className="space-y-2 mb-8">
                  {resource.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center text-slate-600 dark:text-slate-300">
                      <span className={`inline-block w-2 h-2 rounded-full mr-3 bg-gradient-to-r ${resource.color}`} />
                      {benefit}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={resource.action}
                  className={`w-full md:w-auto px-8 py-3 rounded-lg font-semibold text-white bg-gradient-to-r ${resource.color} hover:shadow-lg transform hover:scale-105 transition-all duration-300`}
                >
                  {resource.cta} →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-16 p-8 md:p-12 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Master Maths?
          </h3>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Try our quizzes to test your knowledge or explore daily math facts to learn something new every day!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/quiz')}
              className="px-8 py-3 rounded-lg font-semibold bg-white text-purple-600 hover:bg-slate-100 transition-colors duration-300"
            >
              📝 Take a Quiz
            </button>
            <button
              onClick={() => navigate('/daily-math-facts')}
              className="px-8 py-3 rounded-lg font-semibold bg-white/20 text-white border-2 border-white hover:bg-white/30 transition-colors duration-300"
            >
              📚 View Daily Facts
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
