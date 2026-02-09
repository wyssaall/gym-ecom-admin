import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/sidebar/Sidebar'

function MainLayout() {
  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Page Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>

    </div>
  )
}

export default MainLayout
