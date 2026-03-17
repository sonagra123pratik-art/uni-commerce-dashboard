import {
  Package, Sparkles, Search, Filter, Plus, Box, ShieldAlert,
  ArrowRight, CheckSquare, Square, Edit2, UploadCloud, Link as LinkIcon, Download, Trash2, X,
  DollarSign, Activity, RefreshCw, Layers, TrendingUp, ShoppingCart
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const mockProducts = [
  { id: 'SKU-001', name: 'Wireless Noise-Cancelling Earbuds Pro', category: 'Electronics', price: '₹2,499', stock: 145, platforms: ['Amazon', 'Flipkart'], rating: '4.8', img: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=100&h=100&fit=crop' },
  { id: 'SKU-002', name: 'Smart Fitness Watch Series 5', category: 'Wearables', price: '₹3,299', stock: 8, platforms: ['Amazon'], rating: '4.2', img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=100&h=100&fit=crop' },
  { id: 'SKU-003', name: 'Ergonomic Mesh Office Chair', category: 'Furniture', price: '₹8,990', stock: 42, platforms: ['Flipkart', 'Shopify'], rating: '4.9', img: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=100&h=100&fit=crop' },
  { id: 'SKU-004', name: 'Minimalist Ceramic Coffee Mug', category: 'Home', price: '₹499', stock: 0, platforms: ['Amazon', 'Meesho', 'Shopify'], rating: '4.5', img: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=100&h=100&fit=crop' },
  { id: 'SKU-005', name: 'Ultra-Thin Gaming Laptop Sleeve', category: 'Accessories', price: '₹899', stock: 120, platforms: ['Shopify'], rating: '4.1', img: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=100&h=100&fit=crop' },
];

export default function Products() {
  const navigate = useNavigate();
  const [showAiModal, setShowAiModal] = useState(false);
  const [showAddPanel, setShowAddPanel] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(null);
  const [showBundleModal, setShowBundleModal] = useState(false);
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [pricingMode, setPricingMode] = useState('auto');
  const [selectedProducts, setSelectedProducts] = useState([]);

  const toggleProductSelection = (id) => {
    setSelectedProducts(prev =>
      prev.includes(id) ? prev.filter(productId => productId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === mockProducts.length) setSelectedProducts([]);
    else setSelectedProducts(mockProducts.map(p => p.id));
  };

  const StatCard = ({ title, value, subtext, icon: Icon, color, bgGradient }) => (
    <div className="glass-panel" style={{ padding: '1.25rem', border: `1px solid ${color}33`, background: bgGradient }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>{title}</p>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white' }}>{value}</h3>
          {subtext && <p style={{ fontSize: '0.75rem', color: color, marginTop: '0.25rem', fontWeight: 500 }}>{subtext}</p>}
        </div>
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: '8px' }}>
          <Icon size={20} color={color} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="animate-enter" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Master Inventory Engine</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Centralized hub flowing to Amazon, Flipkart, and Shopify.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderColor: 'var(--accent-blue)', color: 'var(--accent-blue)' }} onClick={() => setShowRestockModal(true)}>
            <TrendingUp size={18} /> AI Restock Planner
          </button>
          <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderColor: 'var(--accent-purple)', color: 'var(--accent-purple)' }} onClick={() => setShowAiModal(true)}>
            <Sparkles size={18} /> Bulk Optimize Listings
          </button>
          <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={() => setShowBundleModal(true)}>
            <Layers size={18} /> Create Bundle
          </button>
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={() => navigate('/products/new')}>
            <Plus size={18} /> Add New SKU
          </button>
        </div>
      </div>

      {/* 1. Dashboard KPI Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <StatCard title="Total Active SKUs" value="1,248" subtext="Across 4 categories" icon={Package} color="var(--accent-purple)" bgGradient="linear-gradient(135deg, rgba(123,97,255,0.05), transparent)" />
        <StatCard title="Out of Stock / Low" value="45" subtext="Action Required!" icon={ShieldAlert} color="var(--danger)" bgGradient="linear-gradient(135deg, rgba(255,61,113,0.05), transparent)" />
        <StatCard title="Virtual Bundles Live" value="12" subtext="Kits & Gift Sets" icon={Layers} color="var(--success)" bgGradient="linear-gradient(135deg, rgba(0,230,118,0.05), transparent)" />
        <StatCard title="Total Appx. Retail Value" value="₹12.4 Cr" subtext="Value of active stock" icon={Box} color="var(--accent-blue)" bgGradient="linear-gradient(135deg, rgba(0,210,255,0.05), transparent)" />
      </div>

      {/* Bulk Actions Sticky Bar */}
      <div style={{
        position: 'sticky', top: 'var(--header-height)', zIndex: 40,
        height: selectedProducts.length > 0 ? '60px' : '0', opacity: selectedProducts.length > 0 ? 1 : 0,
        overflow: 'hidden', transition: 'all 0.3s ease',
        background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', borderRadius: 'var(--radius-md)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: selectedProducts.length > 0 ? '0 1.5rem' : '0'
      }}>
        <div><span style={{ fontWeight: 600, color: 'white' }}>{selectedProducts.length} SKU(s) Selected</span></div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0,210,255,0.1)', padding: '0.5rem 1rem', borderRadius: '4px', border: '1px solid var(--accent-blue)', color: 'var(--accent-blue)', fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem' }}>
            Force Sync Pricing
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.1)', padding: '0.5rem 1rem', borderRadius: '4px', border: '1px solid transparent', color: 'white', fontWeight: 500, cursor: 'pointer', fontSize: '0.875rem' }}>
            <Download size={16} /> Export CSV
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,61,113,0.1)', padding: '0.5rem 1rem', borderRadius: '4px', border: '1px solid transparent', color: 'var(--danger)', fontWeight: 500, cursor: 'pointer', fontSize: '0.875rem' }}>
            <Trash2 size={16} /> Delete
          </button>
        </div>
      </div>

      {/* 2. Advanced Products Table */}
      <div className="glass-panel" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '1rem' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input type="text" placeholder="Search Master Catalog by Name, SKU, or Category..." style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.875rem', borderRadius: 'var(--radius-pill)', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)', color: 'white', fontSize: '0.875rem' }} />
          </div>
          <button className="btn-secondary" style={{ padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Filter size={18} /> Filters</button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.02)', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                <th style={{ padding: '1rem 1.5rem', width: '40px' }}>
                  <button onClick={handleSelectAll} style={{ color: 'var(--text-secondary)' }}>
                    {selectedProducts.length === mockProducts.length ? <CheckSquare size={18} color="var(--accent-purple)" /> : <Square size={18} />}
                  </button>
                </th>
                <th style={{ padding: '1rem', fontWeight: 500 }}>Product & SKU</th>
                <th style={{ padding: '1rem', fontWeight: 500 }}>Category</th>
                <th style={{ padding: '1rem', fontWeight: 500 }}>Master Price</th>
                <th style={{ padding: '1rem', fontWeight: 500 }}>Master Stock</th>
                <th style={{ padding: '1rem', fontWeight: 500 }}>Active Channels</th>
                <th style={{ padding: '1rem', fontWeight: 500, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockProducts.map((p, i) => {
                const isSelected = selectedProducts.includes(p.id);
                return (
                  <tr key={i} style={{ borderTop: i !== 0 ? '1px solid var(--border-color)' : 'none', background: isSelected ? 'rgba(123, 97, 255, 0.05)' : 'transparent', transition: 'background 0.2s' }} className="hover:bg-white/5">
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <button onClick={() => toggleProductSelection(p.id)} style={{ color: 'var(--text-secondary)' }}>
                        {isSelected ? <CheckSquare size={18} color="var(--accent-purple)" /> : <Square size={18} />}
                      </button>
                    </td>
                    <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <img src={p.img} alt={p.name} style={{ width: '45px', height: '45px', borderRadius: '6px', objectFit: 'cover', border: '1px solid var(--border-color)' }} />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.2rem', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{p.id}</div>
                      </div>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.02)' }}>{p.category}</span>
                    </td>
                    <td style={{ padding: '1rem', fontWeight: 600, fontSize: '0.875rem' }}>{p.price}</td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ fontSize: '0.875rem', fontWeight: 600, color: p.stock === 0 ? 'var(--danger)' : p.stock < 10 ? 'var(--warning)' : 'var(--success)' }}>
                        {p.stock} Units
                      </div>
                      {p.stock === 0 && <div style={{ fontSize: '0.7rem', color: 'var(--danger)', marginTop: '0.2rem' }}>OUT OF STOCK</div>}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', maxWidth: '150px' }}>
                        {p.platforms.map(plat => (
                          <span key={plat} style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', borderRadius: '4px', background: 'rgba(0,210,255,0.1)', color: 'var(--accent-blue)', border: '1px solid rgba(0,210,255,0.2)' }}>{plat}</span>
                        ))}
                      </div>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                        <button onClick={() => setShowPricingModal(p)} className="btn-secondary" style={{ padding: '0.4rem', color: 'var(--success)', borderColor: 'rgba(0,230,118,0.3)' }} title="AI Pricing Strategy"><DollarSign size={16} /></button>
                        <button onClick={() => setShowAiModal(true)} className="btn-secondary" style={{ padding: '0.4rem', color: 'var(--accent-purple)', borderColor: 'rgba(123,97,255,0.3)' }} title="AI Optimize"><Sparkles size={16} /></button>
                        <button onClick={() => navigate(`/products/${p.id}`)} className="btn-secondary" style={{ padding: '0.4rem' }} title="Edit Product"><Edit2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>



      {/* 4. AI SEO Generator Modal */}
      {showAiModal && (
        <>
          <div onClick={() => setShowAiModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)', zIndex: 200 }}></div>
          <div className="glass-panel animate-scale-in" style={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '600px', zIndex: 201, overflow: 'hidden', border: '1px solid rgba(123,97,255,0.4)', boxShadow: '0 0 50px rgba(123,97,255,0.2)' }}>

            <div style={{ padding: '1.5rem', background: 'linear-gradient(to right, rgba(123,97,255,0.2), transparent)', borderBottom: '1px solid rgba(123,97,255,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white' }}>
                  <Sparkles size={24} color="var(--accent-purple)" /> AI Listing Generator
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.25rem' }}>Generates multi-channel optimized SEO titles & bullet points.</p>
              </div>
              <div style={{ background: 'var(--accent-purple)', color: 'white', padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>5 Coins</div>
            </div>

            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Product Context (Required)</label>
                <textarea placeholder="e.g. Wireless earbuds, noise cancelling, 24 hr battery, black color, fast charging..." style={{ width: '100%', height: '80px', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.3)', color: 'white', resize: 'none', fontSize: '0.875rem' }} />
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Target Platforms</label>
                  <select style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white', fontSize: '0.875rem' }}>
                    <option>Amazon Optimized (High Search Volume)</option>
                    <option>Shopify Optimized (Brand Story)</option>
                    <option>Flipkart Optimized</option>
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Tone</label>
                  <select style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white', fontSize: '0.875rem' }}>
                    <option>Professional & Feature-Heavy</option>
                    <option>Engaging & Emotional</option>
                    <option>Minimalist</option>
                  </select>
                </div>
              </div>

              {/* Output Preview Area (Mock) */}
              <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(123,97,255,0.4)', borderRadius: 'var(--radius-md)', minHeight: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontStyle: 'italic' }}>AI output will stream here...</p>
              </div>
            </div>

            <div style={{ padding: '1rem 1.5rem', background: 'var(--bg-card)', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button className="btn-secondary" onClick={() => setShowAiModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={() => { alert('Generated mock listing! Coins deducted.'); setShowAiModal(false); }} style={{ background: 'linear-gradient(90deg, #7b61ff, #00d2ff)', border: 'none' }}>
                ✨ Generate Title & Bullets
              </button>
            </div>

          </div>
        </>
      )}

      {/* 5. Competitor & Dynamic Pricing Modal */}
      {showPricingModal && (
        <>
          <div onClick={() => setShowPricingModal(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)', zIndex: 200 }}></div>
          <div className="glass-panel animate-scale-in" style={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '650px', zIndex: 201, overflow: 'hidden', border: '1px solid rgba(0,230,118,0.4)', boxShadow: '0 0 50px rgba(0,230,118,0.1)' }}>

            <div style={{ padding: '1.5rem', background: 'linear-gradient(to right, rgba(0,230,118,0.1), transparent)', borderBottom: '1px solid rgba(0,230,118,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white' }}>
                  <DollarSign size={24} color="var(--success)" /> Competitor & Dynamic Pricing
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.25rem' }}>SKU: {showPricingModal.id} • Master Price: <span style={{ color: 'white', fontWeight: 600 }}>{showPricingModal.price}</span></p>
              </div>
              <button onClick={() => setShowPricingModal(null)} style={{ color: 'var(--text-secondary)', background: 'transparent', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
            </div>

            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', maxHeight: '70vh', overflowY: 'auto' }}>

              {/* Competitor Analysis */}
              <div>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Activity size={16} color="var(--accent-blue)" /> Live Competitor Analysis</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Amazon Top Competitor</div>
                    <div style={{ fontWeight: 600, fontSize: '1.125rem', color: 'var(--danger)' }}>₹2,399</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--warning)', marginTop: '0.25rem' }}>Selling cheaper than your master price</div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Flipkart Top Competitor</div>
                    <div style={{ fontWeight: 600, fontSize: '1.125rem', color: 'var(--success)' }}>₹2,599</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--success)', marginTop: '0.25rem' }}>Selling higher than your master price</div>
                  </div>
                </div>
              </div>

              {/* Mode Selection */}
              <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                <button onClick={() => setPricingMode('auto')} style={{ flex: 1, padding: '0.75rem', borderRadius: '4px', border: '1px solid', borderColor: pricingMode === 'auto' ? 'var(--success)' : 'var(--border-color)', background: pricingMode === 'auto' ? 'rgba(0,230,118,0.1)' : 'rgba(255,255,255,0.02)', color: pricingMode === 'auto' ? 'var(--success)' : 'white', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'all 0.2s' }}>
                  <RefreshCw size={18} /> AI Auto-Repricer
                </button>
                <button onClick={() => setPricingMode('manual')} style={{ flex: 1, padding: '0.75rem', borderRadius: '4px', border: '1px solid', borderColor: pricingMode === 'manual' ? 'var(--accent-purple)' : 'var(--border-color)', background: pricingMode === 'manual' ? 'rgba(123,97,255,0.1)' : 'rgba(255,255,255,0.02)', color: pricingMode === 'manual' ? 'var(--accent-purple)' : 'white', fontWeight: 600, transition: 'all 0.2s' }}>
                  Manual Override
                </button>
              </div>

              {/* Pricing Forms */}
              {pricingMode === 'auto' ? (
                <div className="animate-enter" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ background: 'rgba(0,230,118,0.05)', border: '1px solid rgba(0,230,118,0.2)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>AI will automatically adjust prices across all connected platforms to win the Buy Box without dropping below your minimum threshold.</p>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Absolute Min Price (₹)</label>
                      <input type="number" defaultValue="2100" style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--danger)', borderRadius: '4px', color: 'white' }} />
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'block', marginTop: '0.25rem' }}>Floor price. Prevents loss.</span>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Max Price (₹)</label>
                      <input type="number" defaultValue="2999" style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white' }} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '4px', border: '1px solid var(--success)' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--success)' }}>Aggressive Buy Box Strategy Active</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Automatically beat lowest competitor by ₹1</div>
                    </div>
                    <div style={{ width: '36px', height: '20px', background: 'var(--success)', borderRadius: '10px', position: 'relative' }}>
                      <div style={{ position: 'absolute', right: '2px', top: '2px', width: '16px', height: '16px', background: 'white', borderRadius: '50%' }}></div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="animate-enter" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Manually override the master price for specific marketplaces.</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Amazon</span>
                    <input type="number" defaultValue="2499" style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white' }} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Flipkart</span>
                    <input type="number" defaultValue="2599" style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white' }} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Shopify</span>
                    <input type="number" defaultValue="2499" style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white' }} />
                  </div>
                </div>
              )}
            </div>

            <div style={{ padding: '1rem 1.5rem', background: 'var(--bg-card)', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button className="btn-secondary" onClick={() => setShowPricingModal(null)}>Cancel</button>
              <button className="btn-primary" onClick={() => { alert('Pricing Strategy Saved & Synced!'); setShowPricingModal(null); }} style={{ background: pricingMode === 'auto' ? 'var(--success)' : 'var(--accent-purple)', color: pricingMode === 'auto' ? 'black' : 'white', border: 'none', fontWeight: 600 }}>
                {pricingMode === 'auto' ? 'Enable Auto-Repricer' : 'Save Manual Prices'}
              </button>
            </div>

          </div>
        </>
      )}

      {/* 6. Virtual Bundle & Kit Creator Modal */}
      {showBundleModal && (
        <>
          <div onClick={() => setShowBundleModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)', zIndex: 200 }}></div>
          <div className="glass-panel animate-scale-in" style={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '700px', zIndex: 201, overflow: 'hidden', border: '1px solid rgba(255,167,38,0.4)', boxShadow: '0 0 50px rgba(255,167,38,0.1)' }}>

            <div style={{ padding: '1.5rem', background: 'linear-gradient(to right, rgba(255,167,38,0.1), transparent)', borderBottom: '1px solid rgba(255,167,38,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white' }}>
                  <Layers size={24} color="#FFA726" /> Virtual Bundle & Kit Creator
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.25rem' }}>Combine Master SKUs into a single sellable unit. Inventory auto-syncs.</p>
              </div>
              <button onClick={() => setShowBundleModal(false)} style={{ color: 'var(--text-secondary)', background: 'transparent', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
            </div>

            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', maxHeight: '70vh', overflowY: 'auto' }}>

              {/* Bundle Details */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Bundle Title</label>
                  <input type="text" placeholder="e.g., Ultimate WFH Starter Kit" style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Bundle Master SKU</label>
                  <input type="text" placeholder="e.g., BNDL-WFH-001" style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Combined Selling Price (₹)</label>
                  <input type="number" placeholder="4500" style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid #FFA726', borderRadius: '4px', color: 'white' }} />
                </div>
              </div>

              {/* Component SKUs */}
              <div>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Included Master SKUs</h4>
                <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1rem', background: 'rgba(0,0,0,0.2)' }}>
                  {/* Mock Item 1 */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <img src={mockProducts[0].img} alt="" style={{ width: '36px', height: '36px', borderRadius: '4px', objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontSize: '0.875rem', fontWeight: 500 }}>{mockProducts[0].name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Master Stock: {mockProducts[0].stock}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Qty:</span>
                      <input type="number" defaultValue="1" style={{ width: '60px', padding: '0.4rem', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white', textAlign: 'center' }} />
                      <button style={{ background: 'transparent', border: 'none', color: 'var(--danger)', cursor: 'pointer', marginLeft: '0.5rem' }}><X size={16} /></button>
                    </div>
                  </div>
                  {/* Mock Item 2 */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <img src={mockProducts[3].img} alt="" style={{ width: '36px', height: '36px', borderRadius: '4px', objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontSize: '0.875rem', fontWeight: 500 }}>{mockProducts[3].name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Master Stock: {mockProducts[3].stock} <span style={{ color: 'var(--danger)' }}>(Out of Stock)</span></div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Qty:</span>
                      <input type="number" defaultValue="2" style={{ width: '60px', padding: '0.4rem', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white', textAlign: 'center' }} />
                      <button style={{ background: 'transparent', border: 'none', color: 'var(--danger)', cursor: 'pointer', marginLeft: '0.5rem' }}><X size={16} /></button>
                    </div>
                  </div>

                  <button className="btn-secondary" style={{ width: '100%', marginTop: '1rem', borderStyle: 'dashed', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                    <Plus size={16} /> Add Master SKU to Bundle
                  </button>
                </div>

                {/* Logic Alert */}
                <div style={{ marginTop: '1rem', padding: '0.75rem', borderRadius: '4px', background: 'rgba(255,61,113,0.1)', border: '1px solid rgba(255,61,113,0.3)', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <ShieldAlert size={16} color="var(--danger)" style={{ marginTop: '0.1rem' }} />
                  <p style={{ fontSize: '0.875rem', color: 'white' }}>
                    <span style={{ fontWeight: 600, color: 'var(--danger)' }}>Bundle Out of Stock: </span>
                    Because "Minimalist Ceramic Coffee Mug" has 0 master stock, this entire bundle cannot currently be sold.
                  </p>
                </div>
              </div>

            </div>

            <div style={{ padding: '1rem 1.5rem', background: 'var(--bg-card)', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button className="btn-secondary" onClick={() => setShowBundleModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={() => { alert('Virtual Bundle Created!'); setShowBundleModal(false); }} style={{ background: '#FFA726', color: 'black', border: 'none', fontWeight: 600 }}>
                Save Bundle & Sync Constraints
              </button>
            </div>

          </div>
        </>
      )}

      {/* 7. AI Restock Forecasting & Purchase Orders Modal */}
      {showRestockModal && (
        <>
          <div onClick={() => setShowRestockModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)', zIndex: 200 }}></div>
          <div className="glass-panel animate-scale-in" style={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '800px', zIndex: 201, overflow: 'hidden', border: '1px solid rgba(0,210,255,0.4)', boxShadow: '0 0 50px rgba(0,210,255,0.1)' }}>

            <div style={{ padding: '1.5rem', background: 'linear-gradient(to right, rgba(0,210,255,0.1), transparent)', borderBottom: '1px solid rgba(0,210,255,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white' }}>
                  <TrendingUp size={24} color="var(--accent-blue)" /> AI Restock & Procurement Planner
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.25rem' }}>Velocity-based forecasting to prevent stockouts and generate Supplier POs.</p>
              </div>
              <button onClick={() => setShowRestockModal(false)} style={{ color: 'var(--text-secondary)', background: 'transparent', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
            </div>

            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', maxHeight: '70vh', overflowY: 'auto' }}>

              {/* Critical Alerts Banner */}
              <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', background: 'rgba(255,61,113,0.1)', border: '1px solid var(--danger)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <ShieldAlert size={24} color="var(--danger)" />
                <div>
                  <h4 style={{ fontWeight: 600, color: 'var(--danger)', fontSize: '0.875rem' }}>Action Required: Impending Stockouts</h4>
                  <p style={{ fontSize: '0.875rem', color: 'white', marginTop: '0.25rem' }}>2 SKUs are projected to stock out before supplier lead time. Create POs immediately to prevent lost marketplace rank.</p>
                </div>
              </div>

              {/* Forecasting Table */}
              <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                  <thead>
                    <tr style={{ background: 'rgba(255,255,255,0.02)', color: 'var(--text-secondary)' }}>
                      <th style={{ padding: '1rem' }}>SKU</th>
                      <th style={{ padding: '1rem' }}>30-Day Velocity</th>
                      <th style={{ padding: '1rem' }}>Current Stock</th>
                      <th style={{ padding: '1rem' }}>Est. Stockout</th>
                      <th style={{ padding: '1rem' }}>Lead Time</th>
                      <th style={{ padding: '1rem', textAlign: 'right' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderTop: '1px solid var(--border-color)', background: 'rgba(255,61,113,0.05)' }}>
                      <td style={{ padding: '1rem', fontWeight: 600 }}>{mockProducts[1].id}</td>
                      <td style={{ padding: '1rem' }}>4.5 units/day</td>
                      <td style={{ padding: '1rem', color: 'var(--danger)', fontWeight: 600 }}>8 units</td>
                      <td style={{ padding: '1rem', color: 'var(--danger)', fontWeight: 600 }}>2 Days</td>
                      <td style={{ padding: '1rem' }}>14 Days</td>
                      <td style={{ padding: '1rem', textAlign: 'right' }}>
                        <button className="btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', background: 'var(--danger)', border: 'none' }}><ShoppingCart size={14} style={{ display: 'inline', marginRight: '0.3rem' }} /> Draft PO</button>
                      </td>
                    </tr>
                    <tr style={{ borderTop: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '1rem', fontWeight: 600 }}>{mockProducts[0].id}</td>
                      <td style={{ padding: '1rem' }}>12.2 units/day</td>
                      <td style={{ padding: '1rem', color: 'var(--success)' }}>145 units</td>
                      <td style={{ padding: '1rem' }}>11 Days</td>
                      <td style={{ padding: '1rem' }}>7 Days</td>
                      <td style={{ padding: '1rem', textAlign: 'right' }}>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>Safe (Reorder in 4d)</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Quick PO Settings */}
              <div>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.75rem' }}>Supplier Configuration</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Default Supplier Email for Drafts</label>
                    <input type="email" placeholder="orders@chinawholesale.com" style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>AI Safety Buffer %</label>
                    <input type="number" defaultValue="15" style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white' }} />
                  </div>
                </div>
              </div>

            </div>

            <div style={{ padding: '1rem 1.5rem', background: 'var(--bg-card)', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button className="btn-secondary" onClick={() => setShowRestockModal(false)}>Close Dashoard</button>
              <button className="btn-primary" onClick={() => { alert('Generated 2 Supplier POs in PDF!'); setShowRestockModal(false); }} style={{ background: 'var(--accent-blue)', color: 'black', border: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Download size={16} /> Export All Draft POs
              </button>
            </div>

          </div>
        </>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
        .animate-slide-in-right { animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-scale-in { animation: scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes scaleIn { from { transform: translate(-50%, -50%) scale(0.95); opacity: 0; } to { transform: translate(-50%, -50%) scale(1); opacity: 1; } }
      `}} />
    </div>
  );
}
