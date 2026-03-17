import { Terminal, Copy, ShieldAlert } from 'lucide-react';

const mockLogs = [
  { id: '1092', time: '18:05:22', level: 'INFO', message: 'User "Demo Seller" generated Amazon listing for SKU-104 (5 coins deducted).' },
  { id: '1091', time: '17:59:14', level: 'WARN', message: 'Failed sync attempt on Marketplace "Meesho" (Rate Limited).' },
  { id: '1090', time: '17:45:00', level: 'ERROR', message: 'Payment gateway timeout during Pro plan upgrade.' },
  { id: '1089', time: '17:42:33', level: 'INFO', message: 'New user registered: sales@techstore.in' },
];

export default function AdminSystemLogs() {
  const getLevelColor = (level) => {
    switch(level) {
      case 'INFO': return '#00d2ff';
      case 'WARN': return '#ffaa00';
      case 'ERROR': return '#ff3d71';
      default: return 'gray';
    }
  };

  return (
    <div className="animate-enter" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem', color: 'var(--danger)' }}>System Logs & Health</h1>
          <p style={{ color: 'gray' }}>Real-time monitoring of platform events and API errors.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
           <button style={{ background: '#222', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '4px', border: '1px solid #333' }}>Export CSV</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
        <div style={{ background: '#111', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid #333' }}>
          <p style={{ color: 'gray', marginBottom: '0.5rem', fontSize: '0.875rem' }}>API Error Rate (1hr)</p>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--success)' }}>0.04%</h3>
        </div>
        <div style={{ background: '#111', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid #333' }}>
          <p style={{ color: 'gray', marginBottom: '0.5rem', fontSize: '0.875rem' }}>OpenAI Tokens Used (24h)</p>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--warning)' }}>485,200</h3>
        </div>
        <div style={{ background: '#111', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid #333' }}>
          <p style={{ color: 'gray', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Active Sessions</p>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-blue)' }}>1,204</h3>
        </div>
      </div>

      <div style={{ background: '#000', border: '1px solid #333', borderRadius: 'var(--radius-md)', overflow: 'hidden', fontFamily: 'monospace' }}>
        <div style={{ padding: '1rem', background: '#111', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: 'gray', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Terminal size={16} /> Server Terminal View</span>
          <Copy size={16} color="gray" style={{ cursor: 'pointer' }} />
        </div>
        <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
          {mockLogs.map((log, i) => (
            <div key={i} style={{ display: 'flex', gap: '1rem' }}>
              <span style={{ color: '#666' }}>[{log.time}]</span>
              <span style={{ color: getLevelColor(log.level), width: '50px' }}>{log.level}</span>
              <span style={{ color: '#ccc' }}>{log.message}</span>
            </div>
          ))}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', opacity: 0.5 }}>
             <span style={{ color: '#666' }}>[18:06:50]</span>
             <span style={{ color: '#00e676', width: '50px' }}>WAIT</span>
             <span style={{ color: '#ccc' }}>Waiting for incoming events...</span>
             <span style={{ width: '8px', height: '14px', background: 'gray', display: 'inline-block', animation: 'blink 1s infinite' }}></span>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `}} />
    </div>
  );
}
