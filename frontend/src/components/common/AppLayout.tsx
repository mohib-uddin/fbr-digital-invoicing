import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'

export default function AppLayout() {
  return (
    <div className="light bg-background text-on-surface">
      <Sidebar />
      <main className="ml-64 min-h-screen">
        <Header />
        <Outlet />
      </main>
    </div>
  )
}
