import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { clearAuth, getUser } from '../../lib/authStorage'

const navItems = [
  { label: 'Dashboard', to: '/admin' },
  { label: 'Leads', to: '/admin/leads' },
  { label: 'Teachers', to: '/admin/teachers' },
  { label: 'Demo Admin', to: '/admin/demo' },
  { label: 'Retell Webhook', to: '/admin/retell-webhook' },
]

function navClass({ isActive }) {
  return `block rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
    isActive
      ? 'bg-blue-600 text-white shadow-md'
      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
  }`
}

export default function AdminLayout() {
  const navigate = useNavigate()
  const user = getUser()

  function handleLogout() {
    clearAuth()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-slate-100 overflow-x-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.22),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(14,116,144,0.20),transparent_30%),linear-gradient(120deg,#f8fafc,#eef2ff)]" />
      <div className="mx-auto flex flex-col md:flex-row max-w-7xl gap-4 md:gap-6 px-4 py-4 sm:px-6 md:py-8 lg:px-8">
        <aside className="sticky top-4 md:top-6 h-fit w-full md:w-72 rounded-3xl border border-white/70 bg-white/90 p-4 sm:p-5 shadow-xl backdrop-blur order-2 md:order-1">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">SkillBridge</p>
            <h1 className="mt-1 text-xl sm:text-2xl font-black text-slate-900">Admin Console</h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              {user?.fullName || user?.email || 'Administrator'}
            </p>
          </div>

          <nav className="mt-4 sm:mt-6 space-y-2">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === '/admin'} className={navClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-6 sm:mt-8 w-full rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-rose-700 transition-colors hover:bg-rose-100"
          >
            Logout
          </button>
        </aside>

        <main className="min-w-0 flex-1 rounded-3xl border border-white/70 bg-white/95 p-4 sm:p-6 md:p-8 shadow-xl backdrop-blur order-1 md:order-2 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
