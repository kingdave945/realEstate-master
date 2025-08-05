import { Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'
import AgentNav from './Nav'
import { useEffect, useState } from 'react'

function AgentLayout() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <AdminSidebar />
      <main
        style={{
          flex: 1,
          marginLeft: isMobile ? 0 : 240, // 240px matches your sidebar width
          transition: 'margin-left 0.3s ease',
        }}
      >
        <AgentNav name="Kendis" />
        <Outlet />
      </main>
    </div>
  )
}

export default AgentLayout