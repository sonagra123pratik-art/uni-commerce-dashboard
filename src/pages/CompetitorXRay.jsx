import { useState } from 'react';
import { Target, Search, Plus, TrendingDown, TrendingUp, AlertCircle, ShoppingBag, Eye, RefreshCw, Box } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip, ReferenceLine } from 'recharts';

const priceHistoryData = [
    { day: 'Mon', yourPrice: 49.99, comp1: 54.99, comp2: 45.00 },
    { day: 'Tue', yourPrice: 49.99, comp1: 54.99, comp2: 45.00 },
    { day: 'Wed', yourPrice: 49.99, comp1: 49.99, comp2: 45.00 },
    { day: 'Thu', yourPrice: 49.99, comp1: 49.99, comp2: 48.50 },
    { day: 'Fri', yourPrice: 49.99, comp1: 45.99, comp2: 48.50 },
    { day: 'Sat', yourPrice: 49.99, comp1: 45.99, comp2: 42.00 },
    { day: 'Sun', yourPrice: 49.99, comp1: 42.99, comp2: 42.00 },
];

const TRACKED_PRODUCTS = [
    { id: 1, name: 'Wireless Noise-Canceling Headphones pro max', sku: 'HP-ANC-X1', myPrice: 249.99, avgMarket: 225.50, status: 'Overpriced', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80', alerts: 2 },
    { id: 2, name: 'Ergonomic Desk Chair', sku: 'CHR-ERG-01', myPrice: 199.99, avgMarket: 210.00, status: 'Competitive', image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=100&q=80', alerts: 0 },
    { id: 3, name: 'Mechanical Keyboard RGB', sku: 'KB-MECH-RGB', myPrice: 89.99, avgMarket: 95.00, status: 'Underpriced', image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=100&q=80', alerts: 1 }
];

export default function CompetitorXRay() {
    const [selectedProduct, setSelectedProduct] = useState(TRACKED_PRODUCTS[0]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [urlInput, setUrlInput] = useState('');

    const handleTrackNew = () => {
        alert(`Started aggressive price tracking for URL: ${urlInput}`);
        setUrlInput('');
        setShowAddModal(false);
    };

    return (
        <div className="animate-enter" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '2rem', paddingBottom: '4rem' }}>

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', background: 'var(--bg-elevated)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Target color="var(--danger)" /> Competitor X-Ray
                    </h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Automated pricing intelligence & 24/7 competitor stock tracking.</p>
                </div>
                <button onClick={() => setShowAddModal(true)} className="btn-primary hover-scale" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--danger)', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-md)' }}>
                    <Plus size={18} /> Track Competitor URL
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '1.5rem' }}>

                {/* Left Side: Product List */}
                <div className="glass-panel" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Search size={16} color="var(--text-secondary)" />
                        <input type="text" placeholder="Search your catalog..." style={{ background: 'transparent', border: 'none', color: 'white', outline: 'none', width: '100%', fontSize: '0.875rem' }} />
                    </div>

                    <div style={{ flex: 1, overflowY: 'auto' }}>
                        {TRACKED_PRODUCTS.map(product => (
                            <div
                                key={product.id}
                                onClick={() => setSelectedProduct(product)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem',
                                    borderBottom: '1px solid var(--border-color)', cursor: 'pointer',
                                    background: selectedProduct.id === product.id ? 'rgba(255,255,255,0.05)' : 'transparent',
                                    borderLeft: selectedProduct.id === product.id ? '3px solid var(--danger)' : '3px solid transparent'
                                }}
                                className="hover-bg-light transition-all"
                            >
                                <img src={product.image} alt={product.name} style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }} />
                                <div style={{ flex: 1, overflow: 'hidden' }}>
                                    <div style={{ fontWeight: 600, fontSize: '0.875rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                                        Your Price: <span style={{ color: 'white', fontWeight: 500 }}>${product.myPrice}</span>
                                    </div>
                                </div>
                                {product.alerts > 0 && (
                                    <div style={{ background: 'var(--danger)', color: 'white', fontSize: '0.7rem', fontWeight: 700, width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {product.alerts}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Detailed Analysis */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    {/* Top Info Cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                        <div className="glass-panel" style={{ padding: '1.25rem' }}>
                            <h3 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <ShoppingBag size={14} color="var(--info)" /> Your Listed Price
                            </h3>
                            <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>${selectedProduct.myPrice}</div>
                        </div>

                        <div className="glass-panel" style={{ padding: '1.25rem' }}>
                            <h3 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Eye size={14} color="var(--accent-purple)" /> Market Average (Tracked URLs)
                            </h3>
                            <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>${selectedProduct.avgMarket}</div>
                        </div>

                        <div className="glass-panel" style={{ padding: '1.25rem', borderTop: selectedProduct.status === 'Overpriced' ? '3px solid var(--danger)' : selectedProduct.status === 'Competitive' ? '3px solid var(--success)' : '3px solid var(--warning)' }}>
                            <h3 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <RefreshCw size={14} /> Recommended Action
                            </h3>
                            <div style={{ fontSize: '1.125rem', fontWeight: 700, color: selectedProduct.status === 'Overpriced' ? 'var(--danger)' : selectedProduct.status === 'Competitive' ? 'var(--success)' : 'var(--warning)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                {selectedProduct.status === 'Overpriced' ? <TrendingDown size={18} /> : selectedProduct.status === 'Competitive' ? <CheckCircle2 size={18} /> : <TrendingUp size={18} />}
                                {selectedProduct.status === 'Overpriced' ? 'Lower Price Immediately' : selectedProduct.status === 'Competitive' ? 'Hold Current Pricing' : 'You can raise prices'}
                            </div>
                        </div>
                    </div>

                    {/* Pricing Trajectory Chart */}
                    <div className="glass-panel" style={{ padding: '1.5rem', flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Last 7 Days Pricing Trajectory</h3>
                            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--success)' }}></div> You</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--danger)' }}></div> Competitor 1 (Amazon)</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--info)' }}></div> Competitor 2 (Shopify)</span>
                            </div>
                        </div>

                        <div style={{ height: '300px', width: '100%' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={priceHistoryData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <XAxis dataKey="day" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 10', 'dataMax + 10']} tickFormatter={(v) => `$${v}`} />
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                    <RechartsTooltip
                                        contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid var(--border-color)', borderRadius: '4px' }}
                                        itemStyle={{ color: 'white', fontWeight: 600 }}
                                    />
                                    <ReferenceLine y={selectedProduct.avgMarket} stroke="var(--text-secondary)" strokeDasharray="3 3" label={{ position: 'top', value: 'Avg Market', fill: 'var(--text-secondary)', fontSize: 10 }} />
                                    <Area type="monotone" dataKey="yourPrice" name="You" stroke="var(--success)" fill="transparent" strokeWidth={3} />
                                    <Area type="stepAfter" dataKey="comp1" name="Comp 1" stroke="var(--danger)" fill="transparent" strokeWidth={2} strokeDasharray="5 5" />
                                    <Area type="stepAfter" dataKey="comp2" name="Comp 2" stroke="var(--info)" fill="transparent" strokeWidth={2} strokeDasharray="5 5" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Active Alerts Table */}
                    <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
                        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-color)', background: 'rgba(255,61,113,0.05)' }}>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--danger)' }}>
                                <AlertCircle size={18} /> Active Competitor Intel Alerts
                            </h3>
                        </div>
                        <div style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                            <div style={{ padding: '0.75rem', background: 'rgba(255,61,113,0.1)', borderRadius: 'var(--radius-md)' }}><TrendingDown color="var(--danger)" size={20} /></div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 600, color: 'white' }}>Competitor 1 (Amazon) Dropped Price by $4.00</div>
                                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Detected 45 minutes ago. You are now $7.00 more expensive.</div>
                            </div>
                            <button className="btn-secondary" style={{ border: '1px solid var(--danger)', color: 'var(--danger)', padding: '0.5rem 1rem' }}>Match Price Everywhere</button>
                        </div>
                        <div style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ padding: '0.75rem', background: 'rgba(0,230,118,0.1)', borderRadius: 'var(--radius-md)' }}><Box color="var(--success)" size={20} /></div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 600, color: 'white' }}>Competitor 2 (Shopify) is OUT OF STOCK</div>
                                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Detected 3 hours ago. Great opportunity to increase ad spend.</div>
                            </div>
                            <button className="btn-primary" style={{ background: 'var(--success)', color: 'black', padding: '0.5rem 1rem' }}>Boost FB Ads Budget +$50</button>
                        </div>
                    </div>

                </div>
            </div>

            {/* Add URL Modal */}
            {showAddModal && (
                <>
                    <div onClick={() => setShowAddModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', zIndex: 200 }} className="animate-fade-in"></div>
                    <div className="glass-panel animate-scale-in" style={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '500px', zIndex: 201, padding: '0', overflow: 'hidden' }}>
                        <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Target color="var(--danger)" size={24} />
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Initiate Competitor Intel</h2>
                        </div>

                        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                Paste an Amazon ASIN, Shopify product URL, or Walmart link below. Our spiders will scan it every 15 minutes for price drops and stock changes.
                            </p>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Competitor Product URL / ASIN</label>
                                <div style={{ position: 'relative' }}>
                                    <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                                    <input
                                        type="text"
                                        value={urlInput}
                                        onChange={(e) => setUrlInput(e.target.value)}
                                        placeholder="https://amazon.com/dp/B08N5..."
                                        style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.8rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--danger)', borderRadius: '4px', color: 'white', outline: 'none', boxShadow: '0 0 0 1px rgba(255,61,113,0.3)' }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div style={{ padding: '1.5rem 2rem', background: 'var(--bg-card)', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                            <button className="btn-secondary" onClick={() => setShowAddModal(false)}>Cancel Track</button>
                            <button className="btn-primary" onClick={handleTrackNew} disabled={!urlInput} style={{ background: 'var(--danger)', color: 'white', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                                <Eye size={16} /> Deploy Tracker Spider
                            </button>
                        </div>
                    </div>
                </>
            )}

        </div>
    );
}
