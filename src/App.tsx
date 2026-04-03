import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './components/common/AppLayout'
import PagePlaceholder from './components/ui/PagePlaceholder'
import DashboardPage from './pages/DashboardPage'
import InvoiceCreationPage from './pages/InvoiceCreationPage'
import LoginPage from './pages/LoginPage'
import MasterPage from './pages/MasterPage'

function App() {
  return (
    <Routes>
      <Route element={<LoginPage />} path="/login" />
      <Route element={<AppLayout />} path="/">
        <Route element={<Navigate replace to="/dashboard" />} index />
        <Route element={<DashboardPage />} path="dashboard" />
        <Route element={<MasterPage />} path="master" />
        <Route element={<InvoiceCreationPage />} path="invoices" />
        <Route element={<PagePlaceholder title="Reports" />} path="reports" />
      </Route>
      <Route element={<Navigate replace to="/login" />} path="*" />
    </Routes>
  )
}

export default App
