import { useState } from 'react'

export default function TeacherSuggestionList({ teachers = [], selectedTeacherId, onSelectTeacher, loading = false }) {
  const [expandedTeacherId, setExpandedTeacherId] = useState(selectedTeacherId)

  // Helper to get teacher name from various possible field names
  const getTeacherName = (teacher) => {
    return teacher?.name || teacher?.fullName || teacher?.firstName || teacher?.teacherName || 'Unknown Teacher'
  }

  // Helper to get first letter for avatar
  const getAvatarLetter = (teacher) => {
    const name = getTeacherName(teacher)
    return name.charAt(0).toUpperCase()
  }

  return (
    <div className="card p-6">
      <h3 className="font-heading font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
        <span className="text-lg">🎓</span> Available Teachers
      </h3>

      {!teachers || teachers.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            No teachers available for this time slot. Try a different day or time.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {teachers.map(teacher => (
            <div
              key={teacher.id}
              className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
            >
              <button
                type="button"
                onClick={() => {
                  console.log('Selecting teacher:', teacher.teacherId, teacher)
                  onSelectTeacher(teacher.teacherId)
                  setExpandedTeacherId(teacher.teacherId === expandedTeacherId ? null : teacher.teacherId)
                }}
                disabled={loading}
                className={`w-full px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-center gap-3 disabled:opacity-50 ${
                  selectedTeacherId === teacher.teacherId
                    ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-600'
                    : ''
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {getAvatarLetter(teacher)}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 dark:text-white truncate">{getTeacherName(teacher)}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {teacher.qualification || 'Maths Tutor'}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {selectedTeacherId === teacher.teacherId && (
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium">
                      Selected
                    </span>
                  )}

                  <svg
                    className={`w-5 h-5 text-slate-400 transition-transform ${
                      expandedTeacherId === teacher.teacherId ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </button>

              {expandedTeacherId === teacher.teacherId && (
                <div className="border-t border-slate-200 dark:border-slate-700 px-4 py-4 bg-slate-50 dark:bg-slate-800/30">
                  <div className="space-y-3">
                    {teacher.bio && (
                      <div>
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
                          Bio
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-300">{teacher.bio}</p>
                      </div>
                    )}

                    {teacher.qualification && (
                      <div>
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
                          Qualification
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-300">{teacher.qualification}</p>
                      </div>
                    )}

                    {teacher.experience && (
                      <div>
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
                          Experience
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-300">{teacher.experience}</p>
                      </div>
                    )}

                    {teacher.hourlyRate && (
                      <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-slate-900 dark:text-white">Hourly Rate</span>
                          <span className="text-lg font-bold text-green-600 dark:text-green-400">£{teacher.hourlyRate}/hr</span>
                        </div>
                      </div>
                    )}

                    {teacher.rating && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">Rating</span>
                        <span className="text-sm text-amber-500">{'⭐'.repeat(Math.round(teacher.rating))}</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">({teacher.rating}/5)</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
        <p className="text-xs text-blue-700 dark:text-blue-300">
          <span className="font-semibold">ℹ️ Tip: </span>
          Listed teachers are available at the selected time. Select a teacher to proceed with class assignment.
        </p>
      </div>
    </div>
  )
}
