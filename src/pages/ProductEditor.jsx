import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Package, Sparkles, AlertCircle, Save, CheckCircle2,
    Store, Globe, RefreshCcw, DollarSign, Activity, Settings, Plus, Hexagon
} from 'lucide-react';

const MOCK_CATEGORIES = ['Electronics', 'Home & Garden', 'Fashion', 'Health & Beauty', 'Automotive'];

export default function ProductEditor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isNewProduct = !id || id === 'new';

    const [activeTab, setActiveTab] = useState('core');
    const [isSaving, setIsSaving] = useState(false);
    const [showAiModal, setShowAiModal] = useState(false);

    // Product State
    const [product, setProduct] = useState({
        title: '',
        sku: '',
        category: '',
        brand: 'Flux-Ehub',
        description: '',
        basePrice: '',
        costPrice: '',
        stock: 0,
        barcode: '',
        weight: ''
    });

    // Omni-Channel State
    const [channels, setChannels] = useState([
        { id: 'shopify', name: 'Shopify Store', status: 'active', platformFee: '2%', overidePrice: null, toggle: true },
        { id: 'amazon', name: 'Amazon India', status: 'error', platformFee: '15%', overidePrice: '2999', toggle: true, error: 'Category approval required' },
        { id: 'flipkart', name: 'Flipkart', status: 'inactive', platformFee: '12%', overidePrice: null, toggle: false },
        { id: 'woocommerce', name: 'B2B Wholesale Portal', status: 'active', platformFee: '0%', overidePrice: '1999', toggle: true }
    ]);

    // Load mock data if editing
    useEffect(() => {
        if (!isNewProduct) {
            setProduct({
                title: 'Wireless Noise-Cancelling Earbuds Pro',
                sku: id,
                category: 'Electronics',
                brand: 'AudioTech',
                description: 'Premium noise-cancelling earbuds with 24-hour battery life and an ergonomic, sweat-resistant design ideal for workouts.',
                basePrice: '2499',
                costPrice: '950',
                stock: 145,
                barcode: '8901234567890',
                weight: '120'
            });
        }
    }, [id]);

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            navigate('/products');
        }, 800);
    };

    const toggleChannel = (channelId) => {
        setChannels(channels.map(c => c.id === channelId ? { ...c, toggle: !c.toggle } : c));
    };

    const updateChannelPrice = (channelId, price) => {
        setChannels(channels.map(c => c.id === channelId ? { ...c, overidePrice: price } : c));
    };

    return (
        <div className="animate-enter" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '4rem' }}>

            {/* Sticky Top Header */}
            <div style={{ position: 'sticky', top: 0, zIndex: 40, background: 'var(--bg-primary)', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button onClick={() => navigate('/products')} className="btn-secondary" style={{ padding: '0.5rem' }}>
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 style={{ fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Hexagon color="var(--accent-purple)" size={20} />
                            {isNewProduct ? 'Create Master SKU' : `Editing: ${product.sku}`}
                        </h1>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
                            Status: {product.stock > 0 ? <span style={{ color: 'var(--success)' }}>In Stock</span> : <span style={{ color: 'var(--danger)' }}>Draft</span>}
                            • {channels.filter(c => c.toggle).length} Channels Targeted
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn-secondary" style={{ color: 'var(--accent-purple)', borderColor: 'rgba(123,97,255,0.3)' }} onClick={() => setShowAiModal(true)}>
                        <Sparkles size={16} /> AI Optimize Listing
                    </button>
                    <button className="btn-primary" onClick={handleSave} disabled={isSaving} style={{ width: '120px', display: 'flex', justifyContent: 'center' }}>
                        {isSaving ? <Activity size={18} className="animate-spin" /> : <><Save size={16} style={{ marginRight: '0.5rem' }} /> Save & Sync</>}
                    </button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>

                {/* LEFT COLUMN: Master PIM Editor */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* Editor Tabs Navigation */}
                    <div style={{ display: 'flex', gap: '2rem', borderBottom: '1px solid var(--border-color)' }}>
                        <button onClick={() => setActiveTab('core')} style={{ paddingBottom: '1rem', borderBottom: activeTab === 'core' ? '2px solid var(--accent-blue)' : '2px solid transparent', color: activeTab === 'core' ? 'white' : 'var(--text-secondary)', fontWeight: activeTab === 'core' ? 600 : 400, background: 'none', cursor: 'pointer', transition: 'all 0.2s' }}>Core Information</button>
                        <button onClick={() => setActiveTab('price')} style={{ paddingBottom: '1rem', borderBottom: activeTab === 'price' ? '2px solid var(--accent-blue)' : '2px solid transparent', color: activeTab === 'price' ? 'white' : 'var(--text-secondary)', fontWeight: activeTab === 'price' ? 600 : 400, background: 'none', cursor: 'pointer', transition: 'all 0.2s' }}>Pricing & Inventory</button>
                        <button onClick={() => setActiveTab('omni')} style={{ paddingBottom: '1rem', borderBottom: activeTab === 'omni' ? '2px solid var(--accent-purple)' : '2px solid transparent', color: activeTab === 'omni' ? 'var(--accent-purple)' : 'var(--text-secondary)', fontWeight: activeTab === 'omni' ? 600 : 400, background: 'none', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', gap: '0.4rem', alignItems: 'center' }}><Globe size={16} /> Omni-Channel Overrides</button>
                    </div>

                    {/* Core Information Tab */}
                    {activeTab === 'core' && (
                        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div className="glass-panel" style={{ padding: '2rem' }}>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem' }}>Master Identity</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Full Product Title (Optimized for Omni-Channel)</label>
                                        <input type="text" value={product.title} onChange={e => setProduct({ ...product, title: e.target.value })} style={{ width: '100%', padding: '0.875rem 1rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white', fontSize: '1rem' }} placeholder="e.g. Wireless Ergonomic Mouse 2.4GHz" />
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Master SKU</label>
                                            <input type="text" value={product.sku} onChange={e => setProduct({ ...product, sku: e.target.value })} style={{ width: '100%', padding: '0.875rem 1rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white', fontFamily: 'monospace' }} placeholder="WM-24G-01" />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Barcode (EAN/UPC)</label>
                                            <input type="text" value={product.barcode} onChange={e => setProduct({ ...product, barcode: e.target.value })} style={{ width: '100%', padding: '0.875rem 1rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white', fontFamily: 'monospace' }} />
                                        </div>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Category Classification</label>
                                            <select value={product.category} onChange={e => setProduct({ ...product, category: e.target.value })} style={{ width: '100%', padding: '0.875rem 1rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white' }}>
                                                <option value="">Select Primary Category...</option>
                                                {MOCK_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Brand</label>
                                            <input type="text" value={product.brand} onChange={e => setProduct({ ...product, brand: e.target.value })} style={{ width: '100%', padding: '0.875rem 1rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="glass-panel" style={{ padding: '2rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Master Description (HTML/Markdown)</h3>
                                    <button onClick={() => setShowAiModal(true)} className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', color: 'var(--accent-purple)' }}><Sparkles size={14} style={{ display: 'inline', marginRight: '4px' }} /> Rewrite with AI</button>
                                </div>
                                <textarea
                                    value={product.description}
                                    onChange={e => setProduct({ ...product, description: e.target.value })}
                                    placeholder="Provide a highly-detailed, SEO-rich product description. This base description will be pushed to Shopify and WooCommerce by default."
                                    style={{ width: '100%', height: '200px', padding: '1rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white', resize: 'none', lineHeight: '1.6' }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Pricing & Inventory Tab */}
                    {activeTab === 'price' && (
                        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div className="glass-panel" style={{ padding: '2rem' }}>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem' }}>Central Pricing Strategy</h3>

                                <div style={{ padding: '1rem', background: 'rgba(0,210,255,0.05)', border: '1px solid rgba(0,210,255,0.2)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <Activity color="var(--accent-blue)" style={{ flexShrink: 0, marginTop: '2px' }} />
                                    <div>
                                        <div style={{ fontWeight: 600, color: 'white', fontSize: '0.875rem' }}>The Master Base Price</div>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem', lineHeight: 1.5 }}>
                                            This is the baseline retail price for this SKU. When syncing to a new channel, it will default to this price. You can set platform-specific override prices in the "Omni-Channel" tab.
                                        </p>
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Master Base Price (₹)</label>
                                        <div style={{ position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}>₹</span>
                                            <input type="number" value={product.basePrice} onChange={e => setProduct({ ...product, basePrice: e.target.value })} style={{ width: '100%', padding: '1rem 1rem 1rem 2.5rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--accent-blue)', borderRadius: '4px', color: 'white', fontSize: '1.25rem', fontWeight: 600 }} />
                                        </div>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Unit Cost Price (₹ - Internal Only)</label>
                                        <div style={{ position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}>₹</span>
                                            <input type="number" value={product.costPrice} onChange={e => setProduct({ ...product, costPrice: e.target.value })} style={{ width: '100%', padding: '1rem 1rem 1rem 2.5rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white', fontSize: '1.25rem' }} />
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--success)', marginTop: '0.5rem', fontWeight: 600 }}>Est. Profit Margin: {product.basePrice && product.costPrice ? Math.round(((product.basePrice - product.costPrice) / product.basePrice) * 100) : 0}%</div>
                                    </div>
                                </div>
                            </div>

                            <div className="glass-panel" style={{ padding: '2rem' }}>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem' }}>Central Inventory Pool</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Total Sellable Units</label>
                                        <input type="number" value={product.stock} onChange={e => setProduct({ ...product, stock: e.target.value })} style={{ width: '100%', padding: '1rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--success)', borderRadius: '4px', color: 'white', fontSize: '1.25rem', fontWeight: 600 }} />
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>This pool acts as the source of truth. If Amazon sells 1 unit, Shopify's available stock will automatically drop by 1 to prevent overselling.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Omni-Channel Overrides Tab */}
                    {activeTab === 'omni' && (
                        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                            <div style={{ padding: '1.5rem', background: 'linear-gradient(135deg, rgba(123,97,255,0.1), rgba(0,210,255,0.05))', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(123,97,255,0.2)' }}>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white' }}>
                                    <Globe color="var(--accent-purple)" size={20} /> Channel-Specific Overrides
                                </h3>
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.5rem', maxWidth: '600px', lineHeight: 1.5 }}>
                                    By default, all targeted channels will use the Master Base Price (₹{product.basePrice || 0}). Use this section to set explicit pricing per channel to account for differing platform fees (e.g. Amazon FBA vs Shopify D2C).
                                </p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {channels.map(channel => (
                                    <div key={channel.id} className="glass-panel hover-scale" style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', borderLeft: channel.toggle ? '4px solid var(--accent-purple)' : '4px solid var(--border-color)', opacity: channel.toggle ? 1 : 0.6 }}>

                                        {/* Channel Info & Toggle */}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1 }}>
                                            <div
                                                onClick={() => toggleChannel(channel.id)}
                                                style={{ width: '44px', height: '24px', background: channel.toggle ? 'var(--accent-purple)' : 'rgba(255,255,255,0.1)', borderRadius: '12px', position: 'relative', cursor: 'pointer', transition: 'background 0.3s' }}
                                            >
                                                <div style={{ position: 'absolute', top: '2px', left: channel.toggle ? '22px' : '2px', width: '20px', height: '20px', background: 'white', borderRadius: '50%', transition: 'left 0.3s' }}></div>
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 600, fontSize: '1.125rem', color: 'white' }}>{channel.name}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Platform Est. Fee: {channel.platformFee}</div>
                                            </div>
                                        </div>

                                        {/* Override Setup */}
                                        {channel.toggle && (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', width: '350px' }}>
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Listing Price</div>
                                                    <div style={{ position: 'relative' }}>
                                                        <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}>₹</span>
                                                        <input
                                                            type="number"
                                                            value={channel.overidePrice || product.basePrice}
                                                            onChange={(e) => updateChannelPrice(channel.id, e.target.value)}
                                                            style={{
                                                                width: '100%', padding: '0.6rem 0.6rem 0.6rem 1.75rem',
                                                                background: channel.overidePrice ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.2)',
                                                                border: channel.overidePrice ? '1px solid var(--accent-purple)' : '1px dashed var(--border-color)',
                                                                borderRadius: '4px', color: channel.overidePrice ? 'var(--accent-purple)' : 'var(--text-secondary)',
                                                                fontWeight: 600, fontSize: '1rem'
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div style={{ width: '100px', textAlign: 'right' }}>
                                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Status</div>
                                                    {channel.status === 'active' && <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: 'var(--success)', fontSize: '0.75rem', fontWeight: 600, padding: '0.3rem 0.6rem', background: 'rgba(0,230,118,0.1)', borderRadius: '4px' }}><CheckCircle2 size={12} /> Synced</div>}
                                                    {channel.status === 'error' && <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: 'var(--danger)', fontSize: '0.75rem', fontWeight: 600, padding: '0.3rem 0.6rem', background: 'rgba(255,61,113,0.1)', borderRadius: '4px' }} title={channel.error}><AlertCircle size={12} /> Error</div>}
                                                    {channel.status === 'inactive' && <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: 'var(--text-secondary)', fontSize: '0.75rem', fontWeight: 600, padding: '0.3rem 0.6rem', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>Drafting</div>}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>

                {/* RIGHT COLUMN: Media & Review */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    <div className="glass-panel" style={{ padding: '1.5rem' }}>
                        <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                            Master Media
                            <span style={{ fontSize: '0.75rem', color: 'var(--accent-blue)', cursor: 'pointer' }}>Manage</span>
                        </h4>

                        <div style={{ width: '100%', aspectRatio: '1/1', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', marginBottom: '1rem' }}>
                            {!isNewProduct ? (
                                <img src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80" alt="Product" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                                    <Plus size={32} style={{ margin: '0 auto 0.5rem auto', opacity: 0.5 }} />
                                    <div style={{ fontSize: '0.875rem', fontWeight: 500 }}>Upload Image</div>
                                </div>
                            )}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                            <div style={{ aspectRatio: '1/1', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', border: '1px solid var(--border-color)' }}></div>
                            <div style={{ aspectRatio: '1/1', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', border: '1px solid var(--border-color)' }}></div>
                            <div style={{ aspectRatio: '1/1', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', border: '1px solid var(--border-color)' }}></div>
                            <div style={{ aspectRatio: '1/1', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', border: '1px dashed var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', cursor: 'pointer' }}><Plus size={16} /></div>
                        </div>
                    </div>

                    <div className="glass-panel" style={{ padding: '1.5rem' }}>
                        <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '1rem' }}>Global Attributes</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Shipping Weight</span>
                                <span style={{ fontWeight: 500 }}>{product.weight ? `${product.weight}g` : '--'}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>HSN Code</span>
                                <span style={{ fontWeight: 500 }}>85183000</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>GST Tier</span>
                                <span style={{ fontWeight: 500 }}>18%</span>
                            </div>
                        </div>
                        <button className="btn-secondary" style={{ width: '100%', marginTop: '1rem', fontSize: '0.75rem' }}>Edit Attributes</button>
                    </div>

                </div>

            </div>

            {/* AI Modal Reuse */}
            {showAiModal && (
                <>
                    <div onClick={() => setShowAiModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)', zIndex: 200 }}></div>
                    <div className="glass-panel animate-scale-in" style={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '600px', zIndex: 201, overflow: 'hidden', border: '1px solid rgba(123,97,255,0.4)', boxShadow: '0 0 50px rgba(123,97,255,0.2)' }}>
                        <div style={{ padding: '1.5rem', background: 'linear-gradient(to right, rgba(123,97,255,0.2), transparent)', borderBottom: '1px solid rgba(123,97,255,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white' }}>
                                    <Sparkles size={24} color="var(--accent-purple)" /> Rewrite Description
                                </h3>
                            </div>
                        </div>
                        <div style={{ padding: '1.5rem' }}>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1rem' }}>AI will analyze the current title and generate a high-converting SEO description.</p>
                            <button className="btn-primary" onClick={() => setShowAiModal(false)} style={{ width: '100%', background: 'linear-gradient(90deg, #7b61ff, #00d2ff)', border: 'none' }}>
                                Generate Now (5 Coins)
                            </button>
                        </div>
                    </div>
                </>
            )}

        </div>
    );
}
