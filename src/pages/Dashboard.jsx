import { TrendingUp, Package, ShoppingCart, AlertTriangle, ArrowUpRight, ArrowDownRight, Activity, Zap } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';

const data = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 5000 },
  { name: 'Thu', sales: 4500 },
  { name: 'Fri', sales: 6000 },
  { name: 'Sat', sales: 8000 },
  { name: 'Sun', sales: 7500 },
];

export default function Dashboard() {
  const StatCard = ({ title, value, icon: Icon, trend, isPositive }) => (
    <div className="glass-panel" style={{ padding: '1.5rem', background: 'rgba(26, 29, 39, 0.4)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>{title}</p>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 700 }}>{value}</h3>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
          <Icon size={24} color="var(--accent-purple)" />
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: isPositive ? 'var(--success)' : 'var(--danger)' }}>
        {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        <span>{trend} vs last week</span>
      </div>
    </div>
  );

  const HealthDot = ({ status }) => {
    let color = 'gray';
    if (status === 'online') color = 'var(--success)';
    if (status === 'syncing') color = 'var(--warning)';
    if (status === 'error') color = 'var(--danger)';
    return (
      <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: color, boxShadow: `0 0 8px ${color}` }}></span>
    );
  };

  return (
    <div style={{ position: 'relative', minHeight: '100%', paddingBottom: '2rem' }}>
      {/* Decorative Poster Background Elements */}
      <div className="bg-poster-1"></div>
      <div className="bg-poster-2"></div>

      <div className="animate-enter" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Activity color="var(--accent-blue)" /> Master Control Center
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>A to Z control of your multi-channel empire.</p>
          </div>
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Zap size={18} /> Global Sync
          </button>
        </div>

        {/* Cross-Platform Health Matrix */}
        <div className="glass-panel" style={{ padding: '1rem 1.5rem', display: 'flex', gap: '2rem', overflowX: 'auto', flexWrap: 'nowrap', alignItems: 'center', background: 'rgba(26, 29, 39, 0.4)' }}>
          <h4 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Platform Health</h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <HealthDot status="online" /> <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Amazon</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <HealthDot status="online" /> <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Flipkart</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <HealthDot status="syncing" /> <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--warning)' }}>Meesho (Syncing)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <HealthDot status="error" /> <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--danger)' }}>Shopify (Auth Error)</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          <StatCard title="Total Global Sales" value="₹2,84,500" icon={TrendingUp} trend="+18.5%" isPositive={true} />
          <StatCard title="Unified Orders" value="2,132" icon={ShoppingCart} trend="+12.2%" isPositive={true} />
          <StatCard title="Active Network SKUs" value="156" icon={Package} trend="-1.4%" isPositive={false} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <div className="glass-panel" style={{ padding: '1.5rem', gridColumn: '1 / -1', background: 'rgba(26, 29, 39, 0.4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Aggregated Revenue Engine</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.05)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>All Platforms Combined</span>
            </div>
            <div style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent-blue)" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="var(--accent-blue)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} opacity={0.3} />
                  <XAxis dataKey="name" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)' }} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)' }} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value / 1000}k`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}
                    itemStyle={{ color: 'white' }}
                  />
                  <Area type="monotone" dataKey="sales" stroke="var(--accent-blue)" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Multi-Channel AI Insight */}
        <div className="glass-panel" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, rgba(123,97,255,0.15), rgba(0,210,255,0.15))', border: '1px solid rgba(123,97,255,0.3)', backdropFilter: 'blur(20px)' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ background: 'rgba(123,97,255,0.2)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
              <AlertTriangle size={24} color="var(--accent-blue)" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h4 style={{ fontWeight: 600, color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  Multi-Channel AI Alert: Stock Imbalance
                </h4>
                <Link to="/ai" style={{ color: 'var(--accent-purple)', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="hover-glow">
                  View AI Growth Hub <ArrowUpRight size={16} />
                </Link>
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1rem', lineHeight: '1.5' }}>
                <p>Your <strong>"Wireless Earbuds Pro"</strong> stock on Amazon (2 units) is depleting 4x faster than Flipkart (45 units). </p>
                <p style={{ marginTop: '0.5rem' }}>Recommendation: Temporarily pause Amazon listing to prevent stock-out penalties, or reallocate 20 units from Flipkart inventory pool.</p>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', borderRadius: '4px' }}>Reallocate Stock (Auto)</button>
                <button className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', borderRadius: '4px' }}>Ignore</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
