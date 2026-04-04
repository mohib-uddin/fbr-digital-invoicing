import { Outlet } from 'react-router-dom'
import Header from './Header'
import MobileBottomNav from './MobileBottomNav'
import MobileTopBar from './MobileTopBar'
import Sidebar from './Sidebar'

export default function AppLayout() {
  return (
    <div className="light bg-background text-on-surface">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <main className="min-h-screen pb-24 lg:ml-64 lg:pb-0">
        <MobileTopBar />
        <div className="hidden lg:block">
          <Header />
        </div>
        <Outlet />
      </main>

      <MobileBottomNav />
    </div>
  )
}
