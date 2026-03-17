import { Outlet, Navigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard, ShoppingCart, Users, Package, FileText,
  Settings, LogOut, Sun, Moon, Bell, Search, Menu, X, LineChart,
  Store, HelpCircle, FileSpreadsheet, Zap, Gift, Target, Truck, Crown
} from 'lucide-react';
import { useState, useEffect } from 'react';
import OnboardingTour from '../components/OnboardingTour';

export default function AppLayout() {
  const { currentUser, role, logout } = useAuth();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Admin users are isolated to their own layout in this app version
  if (role === 'admin' && !location.pathname.startsWith('/admin')) {
    return <Navigate to="/admin" replace />;
  }

  const primaryNavItems = [
    { name: 'Home', path: '/', icon: LayoutDashboard }, // Changed from Home to LayoutDashboard based on new imports
    { name: 'Orders', path: '/orders', icon: ShoppingCart },
    { name: 'Products', path: '/products', icon: Package },
    { name: 'AI Growth', path: '/ai', icon: Zap, color: 'var(--accent-purple)' }, // Changed icon from Sparkles to Zap
  ];

  const secondaryNavItems = [
    { name: 'Marketplaces', path: '/marketplaces', icon: Store }, // Changed icon from ShoppingCart to Store
    { name: 'Purchase Orders', path: '/purchase-orders', icon: Truck },
    { name: 'Shipping', path: '/shipping', icon: Package },
    { name: 'Invoice & GST', path: '/invoice', icon: FileText },
    { name: 'Analytics', path: '/analytics', icon: LineChart }, // Changed icon from TrendingUp to LineChart
    { name: 'Notifications', path: '/notifications', icon: Bell },
    { name: 'Settings', path: '/settings', icon: Settings },
    { name: 'Help & Guides', path: '/help', icon: HelpCircle, color: 'var(--accent-blue)' },
    { name: 'Refer & Earn', path: '/referrals', icon: Gift, color: 'var(--warning)' },
  ];

  const marketIntelligenceNavItems = [
    { name: 'Competitor X-Ray', path: '/competitors', icon: Target },
  ];

  const NavLink = ({ item, isMobileItem = false, isSecondary = false }) => {
    const isActive = location.pathname === item.path;
    const baseStyle = {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: isMobileItem ? '0.5rem' : '0.875rem 1rem',
      borderRadius: isMobileItem ? '0' : 'var(--radius-md)',
      color: isActive ? 'white' : 'var(--text-secondary)',
      background: isActive && !isMobileItem ? 'rgba(255,255,255,0.05)' : 'transparent',
      flexDirection: isMobileItem ? 'column' : 'row',
      fontSize: isMobileItem ? '0.75rem' : '1rem',
      transition: 'all 0.2s',
      textDecoration: 'none'
    };

    const IconData = item.icon;

    return (
      <Link to={item.path} style={baseStyle} onClick={() => { if (showMobileMenu) setShowMobileMenu(false); }}>
        <IconData size={isMobileItem ? 24 : 20} color={isActive ? item.color || 'white' : 'var(--text-secondary)'} />
        {!isMobileItem && <span>{item.name}</span>}
        {isMobileItem && <span style={{ marginTop: '0.25rem' }}>{item.name}</span>}
      </Link>
    );
  };

  return (
    <div className="app-container">
      <OnboardingTour />
      {/* Desktop Sidebar */}
      {!isMobile && (
        <aside style={{ width: 'var(--sidebar-width)', background: 'var(--bg-secondary)', borderRight: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ padding: '1.5rem 1.5rem 2rem 1.5rem' }}>
            <h2 className="gradient-text" style={{ fontSize: '1.5rem', fontWeight: 700 }}>Flux-Ehub</h2>
          </div>
          <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '0 1rem', overflowY: 'auto' }}>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)', padding: '0 1rem', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>Daily</div>
              {primaryNavItems.map(item => <NavLink key={item.path} item={item} />)}
            </div>

            {/* New Market Intelligence Section */}
            <div style={{ marginTop: '1.5rem', marginBottom: '0.5rem', paddingLeft: '1rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Market Intelligence</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <NavLink item={{ name: 'Competitor X-Ray', path: '/competitors', icon: Target }} />
            </div>

            <div style={{ marginTop: '1.5rem', marginBottom: '0.5rem', paddingLeft: '1rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Customer Retention</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <NavLink item={{ name: 'VIP Black Book', path: '/vip-customers', icon: Crown, color: 'var(--accent-blue)' }} />
            </div>

            <div>
              <div style={{ marginTop: '1.5rem', marginBottom: '0.5rem', paddingLeft: '1rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Stores & Ops</div>
              {secondaryNavItems.map(item => <NavLink key={item.path} item={item} isSecondary />)}
            </div>
          </nav>
          <div style={{ padding: '1.5rem 1rem', borderTop: '1px solid var(--border-color)' }}>
            <button onClick={logout} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)', padding: '0.875rem 1rem', width: '100%', borderRadius: 'var(--radius-md)', textAlign: 'left' }} className="btn-secondary:hover">
              <LogOut size={20} />
              <span>Log out</span>
            </button>
          </div>
        </aside>
      )}

      {/* Main Content Area */}
      <main className="main-content">
        {/* Mobile Header */}
        {isMobile && (
          <header style={{ height: 'var(--header-height)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', position: 'sticky', top: 0, zIndex: 10 }}>
            <h2 className="gradient-text" style={{ fontSize: '1.25rem', fontWeight: 700 }}>Flux-Ehub</h2>
          </header>
        )}

        <div style={{ flex: 1, padding: isMobile ? '1rem' : '2rem', paddingBottom: isMobile ? 'calc(var(--bottom-nav-height) + 1rem)' : '2rem' }}>
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Navigation (The Daily 5) */}
      {isMobile && (
        <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: 'var(--bottom-nav-height)', background: 'rgba(26, 29, 39, 0.9)', backdropFilter: 'blur(10px)', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '0 0.5rem', zIndex: 20 }}>
          {primaryNavItems.map(item => <NavLink key={item.path} item={item} isMobileItem />)}
          <button
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0.5rem', color: showMobileMenu ? 'white' : 'var(--text-secondary)' }}
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <Menu size={24} />
            <span style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>Menu</span>
          </button>
        </nav>
      )}

      {/* Mobile Full Screen Menu Overlay */}
      {isMobile && showMobileMenu && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 'var(--bottom-nav-height)', background: 'var(--bg-primary)', zIndex: 15, padding: '2rem 1.5rem', overflowY: 'auto' }} className="animate-enter">
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>More Options</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {secondaryNavItems.map(item => (
              <NavLink key={item.path} item={item} />
            ))}
            <button onClick={logout} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--danger)', padding: '1rem', marginTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
              <LogOut size={20} />
              <span>Log out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
