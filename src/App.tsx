import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './components/common/AppLayout'
import PagePlaceholder from './components/ui/PagePlaceholder'
import DashboardPage from './pages/DashboardPage'
import MasterPage from './pages/MasterPage'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />} path="/">
        <Route element={<Navigate replace to="/dashboard" />} index />
        <Route element={<DashboardPage />} path="dashboard" />
        <Route element={<MasterPage />} path="master" />
        <Route element={<PagePlaceholder title="Invoices" />} path="invoices" />
        <Route element={<PagePlaceholder title="Reports" />} path="reports" />
      </Route>
      <Route element={<Navigate replace to="/dashboard" />} path="*" />
    </Routes>
  )
}

export default App
