import { Bell, AlertTriangle, CheckCircle2, Package, TrendingUp, Info, ShoppingCart, Check } from 'lucide-react';
import { useState } from 'react';

const initialNotifications = [
  { id: 1, type: 'alert', title: 'Low Inventory Warning', message: 'SKU: PRO-WHEY-2KG-CHOC is below 15 days of stock (Amazon FBA).', time: '10 mins ago', read: false },
  { id: 2, type: 'success', title: 'Payout Reconciled', message: '₹12,450 successfully recovered from Amazon MWS dispute.', time: '1 hour ago', read: false },
  { id: 3, type: 'info', title: 'New Zepto Hub Live', message: 'You can now route inventory to Zepto Darkstore (Bengaluru Central).', time: '3 hours ago', read: false },
  { id: 4, type: 'order', title: 'High Value Order Detected', message: 'Order #100452 (₹18,500) received via Shopify. Requires manual KYC verification.', time: '5 hours ago', read: true },
  { id: 5, type: 'alert', title: 'NDR Escalation', message: 'Delivery failed for AWB-55612 (Flipkart). Customer unreachable.', time: '1 day ago', read: true },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type) => {
    switch(type) {
      case 'alert': return <AlertTriangle size={20} color="var(--warning)" />;
      case 'success': return <CheckCircle2 size={20} color="var(--success)" />;
      case 'order': return <ShoppingCart size={20} color="var(--accent-blue)" />;
      case 'info': return <Info size={20} color="var(--accent-purple)" />;
      default: return <Bell size={20} color="var(--text-secondary)" />;
    }
  };

  return (
    <div className="animate-enter" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingBottom: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', background: 'var(--bg-elevated)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'rgba(0, 210, 255, 0.1)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
            <Bell size={24} color="var(--accent-blue)" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Notifications {unreadCount > 0 && <span style={{ background: 'var(--accent-blue)', color: 'black', fontSize: '0.75rem', padding: '0.1rem 0.5rem', borderRadius: 'var(--radius-pill)', fontWeight: 700 }}>{unreadCount} New</span>}
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>System alerts, inventory warnings, and omnichannel updates.</p>
          </div>
        </div>
        <button onClick={markAllRead} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Check size={18} /> Mark all as read
        </button>
      </div>

      <div className="glass-panel" style={{ overflow: 'hidden' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {notifications.map((notif, i) => (
            <div 
              key={notif.id} 
              className="hover-bg-light"
              style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: '1rem', 
                padding: '1.5rem', 
                borderBottom: i < notifications.length - 1 ? '1px solid var(--border-color)' : 'none',
                background: notif.read ? 'transparent' : 'rgba(255,255,255,0.02)',
                borderLeft: notif.read ? '3px solid transparent' : '3px solid var(--accent-blue)',
                transition: 'background 0.2s'
              }}
            >
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: '50%' }}>
                {getIcon(notif.type)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, color: notif.read ? 'var(--text-secondary)' : 'white' }}>{notif.title}</h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{notif.time}</span>
                </div>
                <p style={{ fontSize: '0.875rem', color: notif.read ? 'var(--text-secondary)' : '#ddd', lineHeight: 1.5 }}>{notif.message}</p>
                
                {!notif.read && notif.type === 'alert' && (
                  <button className="btn-secondary" style={{ marginTop: '0.75rem', fontSize: '0.75rem', padding: '0.4rem 0.8rem', borderColor: 'var(--warning)', color: 'var(--warning)' }}>Take Action</button>
                )}
                {!notif.read && notif.type === 'order' && (
                  <button className="btn-secondary" style={{ marginTop: '0.75rem', fontSize: '0.75rem', padding: '0.4rem 0.8rem', borderColor: 'var(--accent-blue)', color: 'var(--accent-blue)' }}>View Details</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
