import { useEffect, useState } from 'react'
import { apiRequest } from '../../lib/apiClient'

const EMPTY_CREATE = { fullName: '', email: '', subjects: '' }
const EMPTY_UPDATE = { id: '', fullName: '', email: '', subjects: '', isActive: true }

export default function AdminTeachers() {
  const [teachers, setTeachers] = useState([])
  const [createForm, setCreateForm] = useState(EMPTY_CREATE)
  const [updateForm, setUpdateForm] = useState(EMPTY_UPDATE)
  const [loading, setLoading] = useState(false)
  const [savingCreate, setSavingCreate] = useState(false)
  const [savingUpdate, setSavingUpdate] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [error, setError] = useState('')

  async function loadTeachers() {
    setLoading(true)
    setError('')
    try {
      const result = await apiRequest('/api/teachers')
      setTeachers(Array.isArray(result) ? result : [])
    } catch (err) {
      setError(err.message || 'Unable to fetch teachers.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTeachers()
  }, [])

  function onCreateChange(e) {
    const { name, value } = e.target
    setCreateForm((prev) => ({ ...prev, [name]: value }))
  }

  function onUpdateChange(e) {
    const { name, value, type, checked } = e.target
    setUpdateForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  async function createTeacher(e) {
    e.preventDefault()
    setSavingCreate(true)
    setError('')

    try {
      await apiRequest('/api/teachers', {
        method: 'POST',
        body: JSON.stringify(createForm),
      })
      setCreateForm(EMPTY_CREATE)
      await loadTeachers()
    } catch (err) {
      setError(err.message || 'Unable to create teacher.')
    } finally {
      setSavingCreate(false)
    }
  }

  async function updateTeacher(e) {
    e.preventDefault()
    setSavingUpdate(true)
    setError('')

    try {
      await apiRequest(`/api/teachers/${updateForm.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          fullName: updateForm.fullName,
          email: updateForm.email,
          subjects: updateForm.subjects,
          isActive: updateForm.isActive,
        }),
      })
      await loadTeachers()
    } catch (err) {
      setError(err.message || 'Unable to update teacher.')
    } finally {
      setSavingUpdate(false)
    }
  }

  async function deleteTeacher(id) {
    setDeletingId(id)
    setError('')

    try {
      await apiRequest(`/api/teachers/${id}`, { method: 'DELETE' })
      await loadTeachers()
    } catch (err) {
      setError(err.message || 'Unable to delete teacher.')
    } finally {
      setDeletingId(null)
    }
  }

  function fillUpdate(teacher) {
    setUpdateForm({
      id: teacher.id || '',
      fullName: teacher.fullName || '',
      email: teacher.email || '',
      subjects: teacher.subjects || '',
      isActive: teacher.isActive ?? true,
    })
  }

  return (
    <section>
      <h1 className="text-3xl font-black text-slate-900">Teachers</h1>
      <p className="mt-2 text-slate-600">Manage /api/teachers and /api/teachers/{'{id}'} resources.</p>

      {error && <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <form onSubmit={createTeacher} className="rounded-2xl border border-slate-200 p-4">
          <h2 className="text-lg font-bold text-slate-900">Create Teacher</h2>
          <div className="mt-3 space-y-3">
            <Input label="Full name" name="fullName" value={createForm.fullName} onChange={onCreateChange} />
            <Input label="Email" name="email" type="email" value={createForm.email} onChange={onCreateChange} />
            <Input label="Subjects" name="subjects" value={createForm.subjects} onChange={onCreateChange} />
          </div>
          <button type="submit" disabled={savingCreate} className="mt-4 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-70">
            {savingCreate ? 'Saving...' : 'Create'}
          </button>
        </form>

        <form onSubmit={updateTeacher} className="rounded-2xl border border-slate-200 p-4">
          <h2 className="text-lg font-bold text-slate-900">Update Teacher</h2>
          <div className="mt-3 space-y-3">
            <Input label="Teacher ID" name="id" value={updateForm.id} onChange={onUpdateChange} required />
            <Input label="Full name" name="fullName" value={updateForm.fullName} onChange={onUpdateChange} />
            <Input label="Email" name="email" type="email" value={updateForm.email} onChange={onUpdateChange} />
            <Input label="Subjects" name="subjects" value={updateForm.subjects} onChange={onUpdateChange} />
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <input type="checkbox" name="isActive" checked={updateForm.isActive} onChange={onUpdateChange} />
              Active
            </label>
          </div>
          <button type="submit" disabled={savingUpdate} className="mt-4 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-700 disabled:opacity-70">
            {savingUpdate ? 'Updating...' : 'Update'}
          </button>
        </form>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3">
          <h2 className="text-lg font-bold text-slate-900">Teacher List</h2>
          <button onClick={loadTeachers} className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-100">Refresh</button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-100 text-left text-slate-700">
              <tr>
                <th className="px-4 py-2.5">ID</th>
                <th className="px-4 py-2.5">Name</th>
                <th className="px-4 py-2.5">Email</th>
                <th className="px-4 py-2.5">Subjects</th>
                <th className="px-4 py-2.5">Active</th>
                <th className="px-4 py-2.5">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td className="px-4 py-3 text-slate-500" colSpan={6}>Loading teachers...</td>
                </tr>
              )}
              {!loading && teachers.length === 0 && (
                <tr>
                  <td className="px-4 py-3 text-slate-500" colSpan={6}>No teachers found.</td>
                </tr>
              )}
              {!loading && teachers.map((teacher) => (
                <tr key={teacher.id || teacher.email} className="border-t border-slate-200">
                  <td className="px-4 py-2.5 font-medium">{teacher.id ?? '-'}</td>
                  <td className="px-4 py-2.5">{teacher.fullName || '-'}</td>
                  <td className="px-4 py-2.5">{teacher.email || '-'}</td>
                  <td className="px-4 py-2.5">{teacher.subjects || '-'}</td>
                  <td className="px-4 py-2.5">{String(teacher.isActive ?? '-')}</td>
                  <td className="px-4 py-2.5">
                    <div className="flex gap-3">
                      <button type="button" onClick={() => fillUpdate(teacher)} className="font-semibold text-blue-700 underline">Edit</button>
                      {teacher.id ? (
                        <button
                          type="button"
                          onClick={() => deleteTeacher(teacher.id)}
                          disabled={deletingId === teacher.id}
                          className="font-semibold text-rose-700 underline disabled:opacity-60"
                        >
                          {deletingId === teacher.id ? 'Deleting...' : 'Delete'}
                        </button>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-semibold text-slate-700" htmlFor={props.name}>{label}</label>
      <input id={props.name} {...props} className="w-full rounded-xl border border-slate-300 px-3 py-2" />
    </div>
  )
}
