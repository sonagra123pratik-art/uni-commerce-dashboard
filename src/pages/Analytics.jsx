import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  LineChart, Line, Legend
} from 'recharts';
import {
  TrendingUp, Users, Activity, DollarSign, PieChart, Map, Zap,
  ArrowUpRight, ArrowDownRight, Package, ShoppingCart
} from 'lucide-react';

const revenueData = [
  { name: '1 Mar', Amazon: 12000, Shopify: 4000, Zepto: 8000 },
  { name: '5 Mar', Amazon: 18000, Shopify: 5500, Zepto: 11000 },
  { name: '10 Mar', Amazon: 15000, Shopify: 7000, Zepto: 9500 },
  { name: '15 Mar', Amazon: 22000, Shopify: 8500, Zepto: 14000 },
  { name: '20 Mar', Amazon: 28000, Shopify: 11000, Zepto: 18000 },
  { name: '25 Mar', Amazon: 25000, Shopify: 9500, Zepto: 16500 },
  { name: '30 Mar', Amazon: 34000, Shopify: 14000, Zepto: 22000 },
];

const skuVelocityData = [
  { id: '1', sku: 'PRO-WHEY-2KG-CHOC', category: 'Supplements', velocity: '142/day', inventory: 1240, daysLeft: 8, status: 'Critical' },
  { id: '2', sku: 'CREATINE-MONO-300G', category: 'Supplements', velocity: '89/day', inventory: 3400, daysLeft: 38, status: 'Healthy' },
  { id: '3', sku: 'PRE-WORKOUT-BERRY', category: 'Supplements', velocity: '115/day', inventory: 2100, daysLeft: 18, status: 'Warning' },
  { id: '4', sku: 'SHAKER-BOTTLE-PRO', category: 'Accessories', velocity: '45/day', inventory: 500, daysLeft: 11, status: 'Warning' },
  { id: '5', sku: 'VITAMIN-C-1000MG', category: 'Health', velocity: '210/day', inventory: 8500, daysLeft: 40, status: 'Healthy' },
];

const geoData = [
  { state: 'Maharashtra', volume: 85000, percentage: 85 },
  { state: 'Karnataka', volume: 62000, percentage: 62 },
  { state: 'Delhi NCR', volume: 58000, percentage: 58 },
  { state: 'Tamil Nadu', volume: 45000, percentage: 45 },
  { state: 'Telangana', volume: 38000, percentage: 38 },
];

export default function Analytics() {

  const StatCard = ({ title, value, icon: Icon, color, trend, trendValue, subtitle }) => (
    <div className="glass-panel hover-glow" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', borderLeft: `4px solid rgb(${color})` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 600 }}>{title}</p>
        <div style={{ background: `rgba(${color}, 0.1)`, padding: '0.5rem', borderRadius: 'var(--radius-md)' }}>
          <Icon size={18} color={`rgb(${color})`} />
        </div>
      </div>
      <h3 style={{ fontSize: '2rem', fontWeight: 700, margin: '0.25rem 0' }}>{value}</h3>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
        <span style={{
          display: 'flex', alignItems: 'center', gap: '0.2rem', fontWeight: 600,
          color: trend === 'up' ? 'var(--success)' : 'var(--danger)'
        }}>
          {trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          {trendValue}
        </span>
        <span style={{ color: 'var(--text-secondary)' }}>{subtitle}</span>
      </div>
    </div>
  );

  const exportReport = () => {
    const csvContent = "data:text/csv;charset=utf-8,"
      + "Master SKU,Category,Sales Velocity,Live Inventory,Run-Rate,Status\n"
      + skuVelocityData.map(e => `${e.sku},${e.category},${e.velocity},${e.inventory},${e.daysLeft} Days Left,${e.status}`).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "analytics_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="animate-enter" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingBottom: '2rem' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', background: 'var(--bg-elevated)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <PieChart color="var(--accent-purple)" /> The Command Matrix
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Master data visualization for GMV, Omnichannel Sales, and SKU Velocity.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <select style={{ padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white' }}>
            <option>Last 30 Days</option>
            <option>Last 7 Days</option>
            <option>This Quarter</option>
            <option>Year to Date</option>
          </select>
          <button className="btn-primary" onClick={exportReport} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ArrowUpRight size={18} /> Export Report
          </button>
        </div>
      </div>

      {/* Primary KPI Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
        <StatCard title="Gross Merchandise Value" value="₹1.48Cr" icon={DollarSign} color="0, 210, 255" trend="up" trendValue="+24.5%" subtitle="vs last 30 days" />
        <StatCard title="AI Net Margin Estimate" value="28.4%" icon={Activity} color="0, 230, 118" trend="up" trendValue="+2.1%" subtitle="After marketplace commissions + RTOs" />
        <StatCard title="Overall RTO / Returns" value="6.2%" icon={TrendingUp} color="255, 61, 113" trend="down" trendValue="-1.4%" subtitle="Reduced by Auto-IVR" />
        <StatCard title="Customer Blended CAC" value="₹342" icon={Users} color="145, 124, 255" trend="down" trendValue="-8.5%" subtitle="Ad Spend / Total Orders" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '1.5rem' }}>

        {/* Omnichannel Revenue Heatmap */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Activity size={18} color="var(--accent-purple)" /> Omnichannel Revenue Architecture
            </h3>
            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--accent-purple)' }}></div> Amazon India</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--accent-blue)' }}></div> D2C / Shopify</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FFA726' }}></div> Zepto (10-Min)</span>
            </div>
          </div>

          <div style={{ height: '350px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAmazon" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-purple)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--accent-purple)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorShopify" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-blue)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--accent-blue)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorZepto" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFA726" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#FFA726" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} />
                <YAxis stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value / 1000}k`} />
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <RechartsTooltip
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', backdropFilter: 'blur(10px)' }}
                  itemStyle={{ color: 'white', fontWeight: 600 }}
                />
                <Area type="monotone" dataKey="Amazon" stroke="var(--accent-purple)" strokeWidth={3} fillOpacity={1} fill="url(#colorAmazon)" />
                <Area type="monotone" dataKey="Zepto" stroke="#FFA726" strokeWidth={3} fillOpacity={1} fill="url(#colorZepto)" />
                <Area type="monotone" dataKey="Shopify" stroke="var(--accent-blue)" strokeWidth={3} fillOpacity={1} fill="url(#colorShopify)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Geographic Hotspots */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <Map size={18} color="var(--success)" /> Geographic Hotspots
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {geoData.map((geo, index) => (
              <div key={index}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{geo.state}</span>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>₹{(geo.volume / 1000).toFixed(1)}k</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${geo.percentage}%`,
                    height: '100%',
                    background: `linear-gradient(90deg, var(--accent-blue), ${index === 0 ? 'var(--accent-purple)' : 'var(--success)'})`,
                    borderRadius: '4px'
                  }}></div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Top 5 states account for <span style={{ color: 'white', fontWeight: 600 }}>72%</span> of total national GMV.</p>
          </div>
        </div>
      </div>

      {/* SKU Velocity Leaderboard */}
      <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Zap size={18} color="#FFA726" /> SKU Velocity & Run-Rate Leaderboard
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Top selling products combined across all integrated channels.</p>
          </div>
          <button className="btn-secondary" style={{ fontSize: '0.875rem' }}>View Full Catalog</button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'rgba(255, 255, 255, 0.02)', borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Master SKU</th>
              <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Category</th>
              <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Sales Velocity</th>
              <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Live Inventory</th>
              <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Run-Rate</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-secondary)', textAlign: 'right' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {skuVelocityData.map((sku, index) => (
              <tr key={sku.id} style={{ borderBottom: index < skuVelocityData.length - 1 ? '1px solid var(--border-color)' : 'none' }} className="hover-bg-light">
                <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'white', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '6px' }}><Package size={16} color="var(--accent-blue)" /></div>
                  {sku.sku}
                </td>
                <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{sku.category}</td>
                <td style={{ padding: '1rem', fontWeight: 600 }}>{sku.velocity}</td>
                <td style={{ padding: '1rem', color: 'white' }}>{sku.inventory.toLocaleString()} units</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{
                    fontWeight: 700,
                    color: sku.daysLeft <= 10 ? 'var(--danger)' : sku.daysLeft <= 20 ? 'var(--warning)' : 'var(--success)'
                  }}>
                    {sku.daysLeft} Days Left
                  </span>
                </td>
                <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                  <span style={{
                    padding: '0.35rem 0.75rem',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    background: sku.status === 'Healthy' ? 'rgba(0, 230, 118, 0.1)' : sku.status === 'Warning' ? 'rgba(255, 167, 38, 0.1)' : 'rgba(255, 61, 113, 0.1)',
                    color: sku.status === 'Healthy' ? 'var(--success)' : sku.status === 'Warning' ? 'var(--warning)' : 'var(--danger)',
                    border: `1px solid ${sku.status === 'Healthy' ? 'var(--success)' : sku.status === 'Warning' ? 'var(--warning)' : 'var(--danger)'}`
                  }}>
                    {sku.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
