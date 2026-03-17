import { 
  ShoppingBag, Search, Filter, MoreHorizontal, Download, Printer, 
  CheckSquare, Square, AlertTriangle, ShieldAlert, Check, X, 
  TrendingUp, Truck, RefreshCcw, Box, ArrowRight, XCircle, 
  User, MapPin, CreditCard, Settings, Plus, FileText 
} from 'lucide-react';
import { useState } from 'react';

const mockOrders = [
  { id: 'ORD-2098', date: 'Oct 24, 2026', customer: 'Rahul Sharma', phone: '+91 9876543210', pincode: '400001', platform: 'Amazon', amount: '₹1,299', payment: 'Prepaid', status: 'New', courier: 'Pending', riskLevel: 'Low', riskScore: 12, item: 'Wireless Keyboard', sku: 'SKU-KBD-01', qty: 1 },
  { id: 'ORD-2097', date: 'Oct 24, 2026', customer: 'Priya Patel', phone: '+91 9123456780', pincode: '380015', platform: 'Flipkart', amount: '₹3,450', payment: 'COD', status: 'Shipped', courier: 'Delhivery', tracking: 'DEL9928374', riskLevel: 'Low', riskScore: 8, item: 'Smartwatch Series 5', sku: 'SKU-WTCH-05', qty: 1 },
  { id: 'ORD-2096', date: 'Oct 23, 2026', customer: 'Arun Kumar', phone: '+91 9988776655', pincode: '110020', platform: 'Meesho', amount: '₹4,999', payment: 'COD', status: 'Pending Review', courier: 'Pending', riskLevel: 'High', riskScore: 89, alertReason: 'Customer matched with 4 previous RTOs on different platforms.', item: 'Sneakers Pro', sku: 'SKU-SNK-B', qty: 2 },
  { id: 'ORD-2095', date: 'Oct 23, 2026', customer: 'Sneha Gupta', phone: '+91 9871122334', pincode: '560034', platform: 'Shopify', amount: '₹2,100', payment: 'Prepaid', status: 'NDR', courier: 'Ecom Express', tracking: 'EE44556677', riskLevel: 'Medium', riskScore: 45, ndrReason: 'Customer Unavailable', item: 'Ceramic Vase Set', sku: 'SKU-VASE-03', qty: 1 },
  { id: 'ORD-2094', date: 'Oct 22, 2026', customer: 'Vikram Singh', phone: '+91 9900887766', pincode: '411001', platform: 'Shopify', amount: '₹5,890', payment: 'Prepaid', status: 'RTO Initiated', courier: 'BlueDart', tracking: 'BD11223344', riskLevel: 'High', riskScore: 78, item: 'Gaming Headset', sku: 'SKU-GHS-01', qty: 1 },
];

export default function Orders() {
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [activeOrder, setActiveOrder] = useState(null);
  const [showAutomation, setShowAutomation] = useState(false);

  const toggleOrderSelection = (id) => {
    setSelectedOrders(prev => 
      prev.includes(id) ? prev.filter(orderId => orderId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedOrders.length === mockOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(mockOrders.map(o => o.id));
    }
  };

  const safeOrders = selectedOrders.filter(id => mockOrders.find(o => o.id === id)?.riskLevel !== 'High');
  const riskyOrders = selectedOrders.filter(id => mockOrders.find(o => o.id === id)?.riskLevel === 'High');

  const handleAcceptAll = () => {
    if (riskyOrders.length > 0) {
      alert(`Accepted ${safeOrders.length} safe orders! \n\nWe did NOT auto-accept the ${riskyOrders.length} High-Risk RTO order(s) you selected. Please review them manually.`);
    } else {
      alert(`Accepted ${safeOrders.length} safe orders successfully!`);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'New': return 'var(--accent-purple)';
      case 'Pending Review': return 'var(--danger)';
      case 'Processing': return 'var(--warning)';
      case 'Shipped': return 'var(--accent-blue)';
      case 'Delivered': return 'var(--success)';
      case 'NDR': return '#ffaa00'; // Dark Yellow / Orange
      case 'RTO Initiated': return 'var(--danger)';
      default: return 'var(--text-secondary)';
    }
  };

  const OrderSummaryCard = ({ title, value, subtext, icon: Icon, color }) => (
    <div className="glass-panel" style={{ padding: '1.25rem', borderTop: `3px solid ${color}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>{title}</p>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{value}</h3>
          {subtext && <p style={{ fontSize: '0.75rem', color: 'gray', marginTop: '0.5rem' }}>{subtext}</p>}
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
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Orders Hub</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Automated lifecycle management and fulfillment.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={() => setShowAutomation(true)} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderColor: 'var(--accent-purple)', color: 'var(--accent-purple)' }}>
            <Settings size={18} /> Automation Rules
          </button>
          <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Filter size={18} /> Deep Filters
          </button>
        </div>
      </div>

      {/* 1. Dashboard Overview Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <OrderSummaryCard title="Today's Orders" value="142" subtext="Across 4 platforms" icon={ShoppingBag} color="var(--accent-purple)" />
        <OrderSummaryCard title="Pending Dispatch" value="38" subtext="SLA breach in 4h" icon={Box} color="var(--warning)" />
        <OrderSummaryCard title="COD vs Prepaid" value="65% / 35%" subtext="COD Risk Mode Active" icon={CreditCard} color="var(--accent-blue)" />
        <OrderSummaryCard title="Active NDR / RTO" value="12" subtext="Requires manual action" icon={Truck} color="var(--danger)" />
      </div>

      {/* 8 & 9. AI Fraud & NDR Action Banners */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* RTO Alert */}
        <div className="glass-panel" style={{ padding: '1rem 1.5rem', background: 'linear-gradient(135deg, rgba(255,61,113,0.1), rgba(0,0,0,0))', border: '1px solid rgba(255,61,113,0.3)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <ShieldAlert size={20} color="var(--danger)" />
          <div style={{ flex: 1 }}>
            <span style={{ fontWeight: 600, color: 'var(--danger)', marginRight: '1rem' }}>AI Fraud Detection:</span>
            <span style={{ color: 'var(--text-secondary)' }}>1 new order flagged with 89% probability of RTO based on pin-code analysis.</span>
          </div>
          <button className="btn-secondary" style={{ borderColor: 'var(--danger)', color: 'var(--danger)', padding: '0.3rem 1rem', fontSize: '0.875rem' }}>Review (1)</button>
        </div>

        {/* NDR Alert */}
        <div className="glass-panel" style={{ padding: '1rem 1.5rem', background: 'linear-gradient(135deg, rgba(255,170,0,0.1), rgba(0,0,0,0))', border: '1px solid rgba(255,170,0,0.3)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <AlertTriangle size={20} color="var(--warning)" />
          <div style={{ flex: 1 }}>
            <span style={{ fontWeight: 600, color: 'var(--warning)', marginRight: '1rem' }}>Delivery Exceptions (NDR):</span>
            <span style={{ color: 'var(--text-secondary)' }}>1 shipment failed delivery ("Customer Unavailable"). Action needed within 24h to prevent RTO.</span>
          </div>
          <button className="btn-secondary" style={{ borderColor: 'var(--warning)', color: 'var(--warning)', padding: '0.3rem 1rem', fontSize: '0.875rem' }}>Reattempt Delivery (1)</button>
        </div>
      </div>

      {/* 6. Sticky Bulk Actions Bar */}
      <div style={{ 
          position: 'sticky',
          top: 'var(--header-height)',
          zIndex: 40,
          height: selectedOrders.length > 0 ? '60px' : '0', 
          opacity: selectedOrders.length > 0 ? 1 : 0, 
          overflow: 'hidden', 
          transition: 'all 0.3s ease',
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-color)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: selectedOrders.length > 0 ? '0 1.5rem' : '0'
        }}>
          <div>
            <span style={{ fontWeight: 600, color: 'white' }}>{selectedOrders.length} Selected Total</span>
            {riskyOrders.length > 0 && (
              <span style={{ marginLeft: '1rem', fontSize: '0.875rem', color: 'var(--danger)', fontWeight: 500, background: 'rgba(255,61,113,0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                <AlertTriangle size={12} style={{ display: 'inline', marginRight: '4px' }} />
                {riskyOrders.length} High Risk
              </span>
            )}
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={handleAcceptAll} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--success)', padding: '0.5rem 1rem', borderRadius: '4px', border: 'none', color: 'black', fontWeight: 600, cursor: 'pointer' }}>
               <Check size={16} /> Accept Safe ({safeOrders.length})
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.2)', padding: '0.5rem 1rem', borderRadius: '4px', border: 'none', color: 'white', fontWeight: 500, cursor: 'pointer' }}>
               <Printer size={16} /> Generate AWS & Labels
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.2)', padding: '0.5rem 1rem', borderRadius: '4px', border: 'none', color: 'white', fontWeight: 500, cursor: 'pointer' }}>
               <Download size={16} /> Bulk Invoices
            </button>
          </div>
      </div>

      {/* 2. Main Orders Table */}
      <div className="glass-panel" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '1rem' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input type="text" placeholder="Search ID, customer, SKU, tracking..." style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.875rem', borderRadius: 'var(--radius-pill)', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)', color: 'white', fontSize: '0.875rem' }} />
          </div>
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.02)', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                <th style={{ padding: '1rem 1.5rem', width: '40px' }}>
                  <button onClick={handleSelectAll} style={{ color: 'var(--text-secondary)' }}>
                    {selectedOrders.length === mockOrders.length ? <CheckSquare size={18} color="var(--accent-purple)" /> : <Square size={18} />}
                  </button>
                </th>
                <th style={{ padding: '1rem', fontWeight: 500 }}>Order ID & Date</th>
                <th style={{ padding: '1rem', fontWeight: 500 }}>Customer</th>
                <th style={{ padding: '1rem', fontWeight: 500 }}>Product</th>
                <th style={{ padding: '1rem', fontWeight: 500 }}>Payment</th>
                <th style={{ padding: '1rem', fontWeight: 500 }}>Status & Logistics</th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.map((order, i) => {
                const isSelected = selectedOrders.includes(order.id);
                return (
                <tr key={i} onClick={() => setActiveOrder(order)} style={{ borderTop: '1px solid var(--border-color)', background: isSelected ? 'rgba(123, 97, 255, 0.05)' : 'transparent', cursor: 'pointer', transition: 'background 0.2s' }} className="hover:bg-white/5">
                  <td style={{ padding: '1rem 1.5rem' }} onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => toggleOrderSelection(order.id)} style={{ color: 'var(--text-secondary)' }}>
                      {isSelected ? <CheckSquare size={18} color="var(--accent-purple)" /> : <Square size={18} />}
                    </button>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: 600, color: 'var(--accent-blue)', marginBottom: '0.2rem' }}>{order.id}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>via {order.platform}<br/>{order.date}</div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: 500 }}>{order.customer}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.2rem' }}>
                      <MapPin size={10} /> PIN: {order.pincode}
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontSize: '0.875rem' }}>{order.item}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>{order.sku} (Qty: {order.qty})</div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: 600 }}>{order.amount}</div>
                    <div style={{ fontSize: '0.75rem', marginTop: '0.2rem' }}>
                      <span style={{ padding: '0.1rem 0.4rem', borderRadius: '4px', background: order.payment === 'COD' ? 'rgba(255,170,0,0.2)' : 'rgba(0,230,118,0.2)', color: order.payment === 'COD' ? 'var(--warning)' : 'var(--success)', fontWeight: 600 }}>
                        {order.payment}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', color: getStatusColor(order.status), fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: getStatusColor(order.status) }}></span>
                      {order.status}
                    </span>
                    {order.riskLevel === 'High' && (
                       <div style={{ fontSize: '0.7rem', color: 'var(--danger)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                         <ShieldAlert size={10} /> HIGH RTO RISK
                       </div>
                    )}
                    {order.courier !== 'Pending' && (
                       <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                         <Truck size={10} /> {order.courier}
                       </div>
                    )}
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Deep Order Details Slide-Out Panel */}
      {activeOrder && (
        <>
          <div onClick={() => setActiveOrder(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, backdropFilter: 'blur(2px)' }}></div>
          <div className="animate-slide-in-right" style={{ position: 'fixed', right: 0, top: 0, bottom: 0, width: '100%', maxWidth: '600px', background: 'var(--bg-elevated)', zIndex: 101, borderLeft: '1px solid var(--border-color)', boxShadow: '-10px 0 30px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column' }}>
            
            <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Order {activeOrder.id}</h2>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{activeOrder.platform} • {activeOrder.date}</div>
              </div>
              <button onClick={() => setActiveOrder(null)} style={{ color: 'var(--text-secondary)', background: 'transparent', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              {/* Intelligent Actions logic based on state */}
              {activeOrder.status === 'New' && (
                <div style={{ display: 'flex', gap: '1rem', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                   <div style={{ flex: 1 }}>
                     <h4 style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.25rem' }}>Awaiting Fulfillment</h4>
                     <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>Confirm this order to allocate stock.</p>
                   </div>
                   <button className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>Confirm & Generate AWB</button>
                </div>
              )}

              {activeOrder.riskLevel === 'High' && (
                <div style={{ background: 'rgba(255,61,113,0.1)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px dashed var(--danger)' }}>
                   <h4 style={{ fontWeight: 600, color: 'var(--danger)', fontSize: '0.875rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ShieldAlert size={16} /> AI RTO Intervention Required
                   </h4>
                   <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1rem' }}>{activeOrder.alertReason}</p>
                   <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn-secondary" style={{ borderColor: 'var(--danger)', color: 'var(--danger)', fontSize: '0.75rem', padding: '0.4rem 0.8rem' }}>Call Customer via IVR</button>
                      <button className="btn-secondary" style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem' }}>Force Cancel Order</button>
                   </div>
                </div>
              )}

              {/* Customer Details */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>Customer</h4>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.5rem', borderRadius: '50%' }}><User size={16} /></div>
                    <div>
                      <div style={{ fontWeight: 500, fontSize: '0.875rem' }}>{activeOrder.customer}</div>
                      <div style={{ color: 'var(--accent-blue)', fontSize: '0.875rem', marginTop: '0.2rem' }}>{activeOrder.phone}</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>Delivery Address</h4>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: '1.5' }}>
                    A-102, Orchid Towers,<br />
                    M.G Road, Opp. Metro Station<br />
                    Mumbai, Maharashtra {activeOrder.pincode}
                  </div>
                </div>
              </div>

              {/* Items */}
              <div>
                <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>Line Items</h4>
                <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                  <div style={{ display: 'flex', padding: '1rem', gap: '1rem', alignItems: 'center', borderBottom: '1px solid var(--border-color)' }}>
                    <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Box size={20} color="gray" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{activeOrder.item}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>{activeOrder.sku}</div>
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>x{activeOrder.qty}</div>
                    <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{activeOrder.amount}</div>
                  </div>
                  <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Total ({activeOrder.payment})</span>
                    <span style={{ fontSize: '1.125rem', fontWeight: 700 }}>{activeOrder.amount}</span>
                  </div>
                </div>
              </div>

              {/* Timeline & Notes */}
              <div>
                <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>Internal Notes & Workflow</h4>
                <textarea 
                  placeholder="Add a note (e.g., Customer requested delay)..." 
                  style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'white', fontSize: '0.875rem', minHeight: '80px', resize: 'none' }}
                />
                <button className="btn-secondary" style={{ marginTop: '0.5rem', fontSize: '0.75rem', padding: '0.4rem 0.8rem' }}>Save Note</button>
              </div>

            </div>
          </div>
        </>
      )}

      {/* 14. Automation Rules Modal */}
      {showAutomation && (
        <>
          <div onClick={() => setShowAutomation(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 200, backdropFilter: 'blur(4px)' }}></div>
          <div className="animate-scale-in" style={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '600px', background: 'var(--bg-elevated)', zIndex: 201, border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', overflow: 'hidden' }}>
             <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', background: 'linear-gradient(to right, rgba(123, 97, 255, 0.1), transparent)' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Settings size={20} color="var(--accent-purple)"/> Automation Workflow Rules</h2>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Define smart logic to reduce manual intervention.</p>
             </div>
             
             <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', background: 'rgba(255,255,255,0.03)', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                   <div style={{ marginTop: '0.2rem' }}><CheckSquare size={18} color="var(--success)" /></div>
                   <div style={{ flex: 1 }}>
                     <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>Prepaid Enforcement Engine</div>
                     <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>If Order Value &gt; ₹5,000, force flag COD orders for manual review.</div>
                   </div>
                   <button style={{ color: 'var(--text-secondary)' }}><MoreHorizontal size={18}/></button>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', background: 'rgba(255,255,255,0.03)', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                   <div style={{ marginTop: '0.2rem' }}><CheckSquare size={18} color="var(--success)" /></div>
                   <div style={{ flex: 1 }}>
                     <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>AI RTO Pin-Code Shield</div>
                     <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>If delivery pin-code historic return rate &gt; 40%, automatically flag order as High Risk.</div>
                   </div>
                   <button style={{ color: 'var(--text-secondary)' }}><MoreHorizontal size={18}/></button>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', background: 'rgba(255,255,255,0.03)', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                   <div style={{ marginTop: '0.2rem' }}><Square size={18} color="var(--text-secondary)" /></div>
                   <div style={{ flex: 1 }}>
                     <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Low Inventory Alerting</div>
                     <div style={{ fontSize: '0.75rem', color: 'gray', marginTop: '0.2rem' }}>If SKU stock &lt; 10 after order sync, aggressively pause listings on slow platforms.</div>
                   </div>
                   <button style={{ color: 'var(--text-secondary)' }}><MoreHorizontal size={18}/></button>
                </div>

                <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', borderStyle: 'dashed', marginTop: '1rem' }}>
                   <Plus size={16} /> Create Custom Rule
                </button>
             </div>
             <div style={{ padding: '1rem 1.5rem', background: 'var(--bg-card)', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button onClick={() => setShowAutomation(false)} className="btn-secondary">Close</button>
             </div>
          </div>
        </>
      )}
      <style dangerouslySetInnerHTML={{__html: `
        .animate-slide-in-right { animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-scale-in { animation: scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes scaleIn { from { transform: translate(-50%, -50%) scale(0.95); opacity: 0; } to { transform: translate(-50%, -50%) scale(1); opacity: 1; } }
      `}}/>
    </div>
  );
}
