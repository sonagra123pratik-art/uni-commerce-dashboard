import { Outlet, Navigate, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Users, LogOut, Database, LayoutDashboard, Building2, Settings, ShieldAlert, Shield, Radio, Activity, DollarSign, HardDrive } from 'lucide-react';

export default function AdminLayout() {
  const { currentUser, role, logout } = useAuth();

  if (!currentUser || role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  const navLinkStyle = ({ isActive }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.875rem 1rem',
    borderRadius: 'var(--radius-md)',
    color: isActive ? 'white' : 'gray',
    background: isActive ? 'rgba(255,255,255,0.05)' : 'transparent',
    marginBottom: '0.5rem',
    fontWeight: isActive ? 600 : 400,
    textDecoration: 'none',
    transition: 'all 0.2s ease',
  });

  return (
    <div className="app-container">
      <aside style={{ width: '260px', background: '#111', borderRight: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--danger)' }}>Admin Portal</h2>
          <p style={{ fontSize: '0.75rem', color: 'gray' }}>Flux-Ehub</p>
        </div>
        <nav style={{ flex: 1, padding: '1rem', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>

          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0.5rem 0 0.5rem 1rem' }}>Overview</div>
          <NavLink to="/admin" end style={navLinkStyle}>
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '1.5rem 0 0.5rem 1rem' }}>Control Center</div>
          <NavLink to="/admin/tenants" style={navLinkStyle}>
            <Building2 size={20} />
            Tenants & Brands
          </NavLink>
          <NavLink to="/admin/customers" style={navLinkStyle}>
            <Users size={20} />
            Customer Accounts
          </NavLink>
          <NavLink to="/admin/users" style={navLinkStyle}>
            <Shield size={20} />
            Internal Staff
          </NavLink>
          <NavLink to="/admin/broadcasts" style={navLinkStyle}>
            <Radio size={20} />
            Global Broadcasts
          </NavLink>

          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '1.5rem 0 0.5rem 1rem' }}>Operations & Finance</div>
          <NavLink to="/admin/revenue" style={navLinkStyle}>
            <DollarSign size={20} />
            Financial Control
          </NavLink>
          <NavLink to="/admin/health" style={navLinkStyle}>
            <Activity size={20} />
            System Health
          </NavLink>
          <NavLink to="/admin/backups" style={navLinkStyle}>
            <HardDrive size={20} />
            Vault & Backups
          </NavLink>

          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '1.5rem 0 0.5rem 1rem' }}>Platform Config</div>
          <NavLink to="/admin/settings" style={navLinkStyle}>
            <Settings size={20} />
            System Settings
          </NavLink>
          <NavLink to="/admin/logs" style={navLinkStyle}>
            <ShieldAlert size={20} />
            Audit Logs
          </NavLink>
        </nav>
        <div style={{ padding: '1.5rem 1rem', borderTop: '1px solid #333' }}>
          <button onClick={logout} className="hover-bg-light" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'gray', padding: '0.875rem 1rem', width: '100%', borderRadius: 'var(--radius-md)', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
            <LogOut size={20} />
            <span>Log out</span>
          </button>
        </div>
      </aside>
      <main style={{ flex: 1, overflowY: 'auto', background: '#0a0a0a' }}>
        <Outlet />
      </main>
    </div>
  );
}
