import { useState } from 'react';
import { PackageOpen, AlertTriangle, Truck, Send, FileText, Download, CheckCircle2, Factory, Calendar, Search, Filter, MessageCircle, Mail, MapPin, Phone, Globe } from 'lucide-react';

const MOCK_STOCK_ALERTS = [
    { id: 1, name: 'Wireless Noise-Canceling Headphones', sku: 'HP-ANC-X1', status: 'Critical', daysLeft: 12, burnRate: '45/day', supplier: 'AudioTech Shenzhen Ltd.' },
    { id: 2, name: 'Ergonomic Desk Chair', sku: 'CHR-ERG-01', status: 'Warning', daysLeft: 28, burnRate: '12/day', supplier: 'Zhejiang Furniture Co.' },
];

const INITIAL_MOCK_POS = [
    { id: 'PO-2026-089', date: 'Today, 10:45 AM', supplier: 'AudioTech Shenzhen Ltd.', items: 1200, total: '₹24,500', status: 'Draft' },
    { id: 'PO-2026-088', date: 'Oct 12, 2026', supplier: 'Zhejiang Furniture Co.', items: 500, total: '₹18,250', status: 'Sent via Email' },
    { id: 'PO-2026-087', date: 'Oct 05, 2026', supplier: 'AudioTech Shenzhen Ltd.', items: 2000, total: '₹41,000', status: 'In Production' },
    { id: 'PO-2026-086', date: 'Sep 28, 2026', supplier: 'Packaging Solutions Inc.', items: 10000, total: '₹4,500', status: 'Delivered' },
];

const MOCK_SUPPLIERS = [
    { id: 'SUP-001', name: 'AudioTech Shenzhen Ltd.', contact: '+86 138 0013 8000', email: 'orders@audiotech.cn', location: 'Shenzhen, China', status: 'Active', rating: 4.8 },
    { id: 'SUP-002', name: 'Zhejiang Furniture Co.', contact: '+86 139 0014 9000', email: 'sales@zhejiangfurn.cn', location: 'Hangzhou, China', status: 'Active', rating: 4.5 },
    { id: 'SUP-003', name: 'Packaging Solutions Inc.', contact: '+1 (555) 123-4567', email: 'hello@packagingsolutions.com', location: 'California, US', status: 'Active', rating: 4.9 },
];

export default function PurchaseOrders() {
    const [activeTab, setActiveTab] = useState('orders');
    const [selectedPO, setSelectedPO] = useState(null);
    const [pos, setPos] = useState(INITIAL_MOCK_POS);

    const handleSendCommunication = (method) => {
        setPos(currentPos => currentPos.map(p => 
            p.id === selectedPO.id ? { ...p, status: 'Sent via Email' } : p
        ));
        setSelectedPO({ ...selectedPO, status: 'Sent via Email' });
        if (method === 'whatsapp') {
            alert(`Purchase Order ${selectedPO.id} successfully sent to supplier via Auto WhatsApp & Email!`);
        } else {
            alert(`Purchase Order ${selectedPO.id} successfully emailed to the supplier.`);
        }
    };

    const handleMarkReceived = (e, poId) => {
        if (e) e.stopPropagation();
        setPos(currentPos => currentPos.map(p => 
            p.id === poId ? { ...p, status: 'Delivered' } : p
        ));
        if (selectedPO?.id === poId) {
            setSelectedPO(prev => prev ? { ...prev, status: 'Delivered' } : null);
        }
        alert(`Stock for PO ${poId} marked as received. Auto-added to Inventory!`);
    };

    return (
        <div className="animate-enter" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '2rem', paddingBottom: '4rem' }}>

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', background: 'var(--bg-elevated)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Factory color="var(--info)" /> Supplier & PO Management
                    </h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Predictive inventory alerts & automated Purchase Order generation.</p>
                </div>
                <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--info)', color: 'black', border: 'none', padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-md)' }}>
                    <FileText size={18} /> Create Blank PO
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(350px, 1fr) 2fr', gap: '1.5rem' }}>

                {/* Left Side: AI Stock Prediction Alerts */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <AlertTriangle color="var(--warning)" size={20} /> AI Stock Forecast
                        </h3>
                    </div>

                    {MOCK_STOCK_ALERTS.map(alert => (
                        <div key={alert.id} className="glass-panel hover-scale" style={{ padding: '1.25rem', borderLeft: alert.status === 'Critical' ? '4px solid var(--danger)' : '4px solid var(--warning)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <div style={{ fontWeight: 600, color: 'white' }}>{alert.name}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>SKU: {alert.sku} • Supplier: {alert.supplier}</div>
                                </div>
                                <div style={{ background: alert.status === 'Critical' ? 'rgba(255,61,113,0.1)' : 'rgba(255,170,0,0.1)', color: alert.status === 'Critical' ? 'var(--danger)' : 'var(--warning)', padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
                                    {alert.status}
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Estimated Stockout</div>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: alert.status === 'Critical' ? 'var(--danger)' : 'white' }}>{alert.daysLeft} Days</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Current Burn Rate</div>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{alert.burnRate}</div>
                                </div>
                            </div>

                            <button
                                onClick={() => setSelectedPO(pos[0])}
                                className="btn-primary"
                                style={{ width: '100%', padding: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'var(--accent-purple)', color: 'white', border: 'none' }}
                            >
                                <FileText size={16} /> Auto-Generate PO Draft
                            </button>
                        </div>
                    ))}
                </div>

                {/* Right Side: PO Registry */}
                <div className="glass-panel" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', gap: '1.5rem', borderBottom: '2px solid transparent' }}>
                            <h3 
                                onClick={() => setActiveTab('orders')}
                                style={{ fontSize: '1.125rem', fontWeight: 600, cursor: 'pointer', color: activeTab === 'orders' ? 'var(--info)' : 'var(--text-secondary)', borderBottom: activeTab === 'orders' ? '2px solid var(--info)' : 'none', paddingBottom: '0.5rem', marginBottom: '-2px' }}
                            >
                                PO Registry
                            </h3>
                            <h3 
                                onClick={() => setActiveTab('suppliers')}
                                style={{ fontSize: '1.125rem', fontWeight: 600, cursor: 'pointer', color: activeTab === 'suppliers' ? 'var(--info)' : 'var(--text-secondary)', borderBottom: activeTab === 'suppliers' ? '2px solid var(--info)' : 'none', paddingBottom: '0.5rem', marginBottom: '-2px' }}
                            >
                                Suppliers Directory
                            </h3>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <div style={{ position: 'relative', width: '200px' }}>
                                <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                                <input type="text" placeholder={activeTab === 'orders' ? "Search POs..." : "Search Suppliers..."} style={{ width: '100%', padding: '0.4rem 1rem 0.4rem 2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)', color: 'white', fontSize: '0.875rem' }} />
                            </div>
                            <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'var(--bg-elevated)', border: '1px solid var(--border-color)' }}>
                                <Filter size={16} /> Filter
                            </button>
                        </div>
                    </div>

                    {activeTab === 'orders' && (
                        <div style={{ flex: 1, overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ background: 'rgba(255,255,255,0.02)', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                    <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>PO Number</th>
                                    <th style={{ padding: '1rem', fontWeight: 600 }}>Supplier</th>
                                    <th style={{ padding: '1rem', fontWeight: 600 }}>Total Value</th>
                                    <th style={{ padding: '1rem', fontWeight: 600 }}>Status</th>
                                    <th style={{ padding: '1rem 1.5rem', fontWeight: 600, textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pos.map((po, i) => (
                                    <tr key={po.id} style={{ borderBottom: i < pos.length - 1 ? '1px solid var(--border-color)' : 'none' }} className="hover-bg-light transition-all">
                                        <td style={{ padding: '1rem 1.5rem' }}>
                                            <div style={{ fontWeight: 600, color: 'white' }}>{po.id}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>{po.date}</div>
                                        </td>
                                        <td style={{ padding: '1rem', fontWeight: 500, fontSize: '0.875rem' }}>{po.supplier}</td>
                                        <td style={{ padding: '1rem', fontWeight: 600, color: 'white' }}>{po.total} <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 400 }}>({po.items} units)</span></td>
                                        <td style={{ padding: '1rem' }}>
                                            <div style={{
                                                display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem',
                                                background: po.status === 'Delivered' ? 'rgba(0,230,118,0.1)' : po.status === 'Sent via Email' ? 'rgba(56,189,248,0.1)' : po.status === 'In Production' ? 'rgba(145,124,255,0.1)' : 'rgba(255,255,255,0.05)',
                                                padding: '0.3rem 0.6rem', borderRadius: '2rem', width: 'fit-content',
                                                color: po.status === 'Delivered' ? 'var(--success)' : po.status === 'Sent via Email' ? 'var(--info)' : po.status === 'In Production' ? 'var(--accent-purple)' : 'var(--text-secondary)'
                                            }}>
                                                {po.status === 'Delivered' ? <CheckCircle2 size={12} /> : po.status === 'Sent via Email' ? <Send size={12} /> : po.status === 'In Production' ? <Factory size={12} /> : <FileText size={12} />}
                                                <span style={{ fontWeight: 600 }}>{po.status}</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '1rem 1.5rem', textAlign: 'right', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                            {(po.status === 'Sent via Email' || po.status === 'In Production') && (
                                                <button
                                                    onClick={(e) => handleMarkReceived(e, po.id)}
                                                    className="btn-primary hover-scale"
                                                    style={{ padding: '0.4rem 0.8rem', background: 'var(--success)', border: 'none', color: 'black', borderRadius: 'var(--radius-md)', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 600 }}
                                                >
                                                    Mark Received
                                                </button>
                                            )}
                                            <button
                                                onClick={() => setSelectedPO(po)}
                                                className="btn-secondary hover-scale"
                                                style={{ padding: '0.4rem 0.8rem', background: 'transparent', border: '1px solid var(--border-color)', color: 'white', borderRadius: 'var(--radius-md)', fontSize: '0.75rem', cursor: 'pointer' }}
                                            >
                                                View PDF
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'suppliers' && (
                        <div style={{ flex: 1, overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead>
                                    <tr style={{ background: 'rgba(255,255,255,0.02)', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                        <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Supplier</th>
                                        <th style={{ padding: '1rem', fontWeight: 600 }}>Contact Info</th>
                                        <th style={{ padding: '1rem', fontWeight: 600 }}>Location</th>
                                        <th style={{ padding: '1rem', fontWeight: 600 }}>Status</th>
                                        <th style={{ padding: '1rem 1.5rem', fontWeight: 600, textAlign: 'right' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {MOCK_SUPPLIERS.map((sup, i) => (
                                        <tr key={sup.id} style={{ borderBottom: i < MOCK_SUPPLIERS.length - 1 ? '1px solid var(--border-color)' : 'none' }} className="hover-bg-light transition-all">
                                            <td style={{ padding: '1rem 1.5rem' }}>
                                                <div style={{ fontWeight: 600, color: 'white' }}>{sup.name}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>ID: {sup.id} • ⭐ {sup.rating}</div>
                                            </td>
                                            <td style={{ padding: '1rem', fontSize: '0.875rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}><Mail size={12} color="var(--text-secondary)" /> {sup.email}</div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Phone size={12} color="var(--text-secondary)" /> {sup.contact}</div>
                                            </td>
                                            <td style={{ padding: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><MapPin size={12} /> {sup.location}</div>
                                            </td>
                                            <td style={{ padding: '1rem' }}>
                                                <div style={{ background: 'rgba(0,230,118,0.1)', color: 'var(--success)', padding: '0.3rem 0.6rem', borderRadius: '2rem', width: 'fit-content', fontSize: '0.75rem', fontWeight: 600 }}>
                                                    {sup.status}
                                                </div>
                                            </td>
                                            <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                                                <button className="btn-secondary hover-scale" style={{ padding: '0.4rem 0.8rem', background: 'transparent', border: '1px solid var(--border-color)', color: 'white', borderRadius: 'var(--radius-md)', fontSize: '0.75rem', cursor: 'pointer' }}>
                                                    View Profile
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

            </div>

            {/* Mock PDF Modal */}
            {selectedPO && (
                <>
                    <div onClick={() => setSelectedPO(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', zIndex: 200 }} className="animate-fade-in"></div>
                    <div className="glass-panel animate-scale-in" style={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '700px', maxHeight: '90vh', zIndex: 201, padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ padding: '1.25rem 2rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-card)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <FileText color="white" size={20} />
                                <h2 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Document Preview: {selectedPO.id}.pdf</h2>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button className="btn-secondary" style={{ padding: '0.4rem 0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem' }}><Download size={14} /> Download</button>
                                <button onClick={() => setSelectedPO(null)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.5rem' }}>✕</button>
                            </div>
                        </div>

                        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem', overflowY: 'auto', background: 'white', color: 'black' }}>
                            {/* Mock PDF Content (White Background) */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #eee', paddingBottom: '1.5rem' }}>
                                <div>
                                    <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: 0, color: '#1a1d27' }}>PURCHASE ORDER</h1>
                                    <p style={{ color: '#555', marginTop: '0.5rem' }}>PO Number: <strong>{selectedPO.id}</strong><br />Date: {selectedPO.date}</p>
                                </div>
                                <div style={{ textAlign: 'right', color: '#555' }}>
                                    <h3 style={{ margin: 0, color: '#1a1d27' }}>Flux-Ehub Global</h3>
                                    <p style={{ margin: 0 }}>123 Commerce St.<br />San Francisco, CA 94105<br />billing@flux-ehub.com</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '4rem' }}>
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ color: '#888', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Vendor</h4>
                                    <p style={{ fontWeight: 600, margin: 0 }}>{selectedPO.supplier}</p>
                                    <p style={{ color: '#555', margin: 0 }}>Industrial Park B, Unit 4<br />Shenzhen, Guangdong, China<br />Contact: supplier@example.com</p>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ color: '#888', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Ship To</h4>
                                    <p style={{ fontWeight: 600, margin: 0 }}>FBA Warehouse (LGB8)</p>
                                    <p style={{ color: '#555', margin: 0 }}>1568 N. San Bernardino Ave.<br />Rialto, CA 92376<br />United States</p>
                                </div>
                            </div>

                            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                                <thead style={{ background: '#f8f9fa' }}>
                                    <tr>
                                        <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #ddd', color: '#555' }}>Item & Description</th>
                                        <th style={{ padding: '0.75rem', textAlign: 'center', borderBottom: '1px solid #ddd', color: '#555' }}>Qty</th>
                                        <th style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #ddd', color: '#555' }}>Unit Price</th>
                                        <th style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '1px solid #ddd', color: '#555' }}>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{ padding: '1rem 0.75rem', borderBottom: '1px solid #eee' }}>
                                            <div style={{ fontWeight: 600 }}>Primary Product (As per Specs)</div>
                                            <div style={{ fontSize: '0.875rem', color: '#777' }}>SKU: HP-ANC-X1 / Color: Matte Black</div>
                                        </td>
                                        <td style={{ padding: '1rem 0.75rem', textAlign: 'center', borderBottom: '1px solid #eee' }}>{selectedPO.items}</td>
                                        <td style={{ padding: '1rem 0.75rem', textAlign: 'right', borderBottom: '1px solid #eee' }}>₹20.41</td>
                                        <td style={{ padding: '1rem 0.75rem', textAlign: 'right', borderBottom: '1px solid #eee', fontWeight: 600 }}>{selectedPO.total}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                                <div style={{ width: '300px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', color: '#555' }}>
                                        <span>Subtotal:</span>
                                        <span>{selectedPO.total}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', color: '#555' }}>
                                        <span>Shipping (FOB):</span>
                                        <span>₹0.00</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderTop: '2px solid #eee', fontWeight: 700, fontSize: '1.25rem', color: '#1a1d27' }}>
                                        <span>Total INR:</span>
                                        <span>{selectedPO.total}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{ padding: '1.25rem 2rem', background: 'var(--bg-card)', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                            {selectedPO.status === 'Draft' && (
                                <div style={{ display: 'flex', gap: '0.75rem' }}>
                                    <button className="btn-primary hover-scale" onClick={() => handleSendCommunication('email')} style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                                        <Mail size={16} /> Email PO
                                    </button>
                                    <button className="btn-primary hover-scale" onClick={() => handleSendCommunication('whatsapp')} style={{ background: '#25D366', color: 'black', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                                        <MessageCircle size={16} /> Auto WhatsApp & Email
                                    </button>
                                </div>
                            )}
                            {(selectedPO.status === 'Sent via Email' || selectedPO.status === 'In Production') && (
                                <>
                                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Send color="var(--info)" size={16} /> PO Sent to Supplier.
                                    </div>
                                    <button className="btn-primary hover-scale" onClick={(e) => handleMarkReceived(e, selectedPO.id)} style={{ background: 'var(--success)', color: 'black', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                                        <PackageOpen size={16} /> Mark as Received
                                    </button>
                                </>
                            )}
                            {selectedPO.status === 'Delivered' && (
                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <CheckCircle2 color="var(--success)" size={16} /> Stock Received & Added to Inventory.
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}

        </div>
    );
}
