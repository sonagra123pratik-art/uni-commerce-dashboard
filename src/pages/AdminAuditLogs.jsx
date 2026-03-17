import { useState } from 'react';
import { ShieldAlert, Search, Filter, Terminal, Copy, DownloadCloud, Activity, Eye, PlayCircle } from 'lucide-react';

const mockLogs = [
    { id: 1, event: 'TENANT_CREATED', user: 'super.alok@techstore.in', ip: '192.168.1.45', time: '2 mins ago', severity: 'info', details: 'Provisioned new tenant: Acme Corp (acme.flux-ehub.com)' },
    { id: 2, event: 'API_KEY_ROTATED', user: 'system_cron', ip: 'internal.aws', time: '1 hour ago', severity: 'warning', details: 'Automatically rotated Stripe connection keys for Acme Corp.' },
    { id: 3, event: 'FAILED_LOGIN_ATTEMPT', user: 'unknown', ip: '45.22.11.9', time: '3 hours ago', severity: 'danger', details: 'Invalid credentials. 5 consecutive failures.' },
    { id: 4, event: 'GLOBAL_SETTING_CHANGED', user: 'super.alok@techstore.in', ip: '192.168.1.45', time: '5 hours ago', severity: 'warning', details: 'Changed Default Platform Security Policy: enforce_mfa=true' },
    { id: 5, event: 'USER_LOGIN_SUCCESS', user: 'admin@globaltech.com', ip: '12.34.56.78', time: '6 hours ago', severity: 'info', details: 'Logged into Global Tech tenant scope.' },
    { id: 6, event: 'DATABASE_BACKUP_COMPLETE', user: 'system_aws_rds', ip: 'internal.aws', time: '12 hours ago', severity: 'success', details: 'Daily automated snapshot completed. Hash: 8f9a2b.' },
];

export default function AdminAuditLogs() {
    const [isTailing, setIsTailing] = useState(true);

    return (
        <div className="animate-enter" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '2rem', paddingBottom: '4rem' }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', background: 'var(--bg-elevated)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <ShieldAlert color="var(--danger)" /> Platform Audit Logs
                    </h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Immutable trail of access, modifications, and system events.</p>
                </div>
                <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid var(--border-color)' }}>
                    <DownloadCloud size={18} /> Export CSV
                </button>
            </div>

            <div className="glass-panel" style={{ overflow: 'hidden' }}>

                {/* Toolbar */}
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                        <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
                            <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                            <input type="text" placeholder="Search events, IPs, users, or payload..." style={{ width: '100%', padding: '0.6rem 1rem 0.6rem 2.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)', color: 'white', fontSize: '0.875rem' }} />
                        </div>
                        <button className="btn-secondary flex-center" style={{ gap: '0.5rem' }}><Filter size={16} /> Filters Engine</button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <select style={{ padding: '0.6rem', background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'white', fontSize: '0.875rem' }}>
                            <option>All Severities</option>
                            <option>🔴 Danger</option>
                            <option>🟠 Warning</option>
                            <option>🔵 Info</option>
                            <option>🟢 Success</option>
                        </select>
                    </div>
                </div>

                {/* Live Stream Terminal Segment */}
                <div style={{ background: '#050505', padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Terminal size={16} color="var(--success)" />
                        <code style={{ color: isTailing ? 'var(--success)' : 'var(--text-secondary)', fontSize: '0.875rem', fontFamily: 'monospace' }}>
                            {isTailing ? 'Tailing live stream from production cluster...' : 'Stream paused. Viewing historical logs.'}
                        </code>
                    </div>
                    <button onClick={() => setIsTailing(!isTailing)} className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem', borderRadius: '4px' }}>
                        {isTailing ? <><Activity size={14} className="animate-pulse" color="var(--danger)" /> Stop Tailing</> : <><PlayCircle size={14} color="var(--success)" /> Resume Stream</>}
                    </button>
                </div>

                {/* Master Log Table */}
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontFamily: 'monospace', fontSize: '0.875rem' }}>
                        <thead>
                            <tr style={{ background: 'rgba(255,255,255,0.02)', color: 'var(--text-secondary)' }}>
                                <th style={{ padding: '1rem 1.5rem', width: '120px' }}>Timestamp</th>
                                <th style={{ padding: '1rem 1.5rem', width: '220px' }}>Event Type</th>
                                <th style={{ padding: '1rem 1.5rem', width: '200px' }}>Actor</th>
                                <th style={{ padding: '1rem 1.5rem', width: '140px' }}>IP / Source</th>
                                <th style={{ padding: '1rem 1.5rem' }}>Payload Snippet</th>
                                <th style={{ padding: '1rem 1.5rem', textAlign: 'right', width: '100px' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockLogs.map((log) => (
                                <tr key={log.id} style={{ borderBottom: '1px solid #222' }} className="hover-bg-light transition-all">
                                    <td style={{ padding: '1rem 1.5rem', color: 'gray' }}>{log.time}</td>
                                    <td style={{ padding: '1rem 1.5rem' }}>
                                        <span style={{
                                            color: log.severity === 'info' ? 'var(--info)' : log.severity === 'warning' ? 'var(--warning)' : log.severity === 'success' ? 'var(--success)' : 'var(--danger)',
                                            background: `rgba(${log.severity === 'info' ? '56,189,248' : log.severity === 'warning' ? '255,167,38' : log.severity === 'success' ? '0,230,118' : '255,51,102'}, 0.1)`,
                                            padding: '0.2rem 0.5rem',
                                            borderRadius: '4px',
                                            fontWeight: 600
                                        }}>
                                            {log.event}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem 1.5rem', color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{log.user}</td>
                                    <td style={{ padding: '1rem 1.5rem', color: 'gray' }}>{log.ip}</td>
                                    <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '300px' }}>
                                        {log.details}
                                    </td>
                                    <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                            <button className="btn-secondary" title="View Payload Schema" style={{ padding: '0.4rem', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}><Eye size={16} /></button>
                                            <button className="btn-secondary" title="Copy Raw JSON" style={{ padding: '0.4rem', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}><Copy size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}
