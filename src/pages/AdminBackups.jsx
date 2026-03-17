import { useState } from 'react';
import { Database, HardDrive, History, ServerCrash, CheckCircle2, AlertTriangle, SwitchCamera, Play, Search, Filter, ShieldCheck, MoreVertical, Archive } from 'lucide-react';

const MOCK_BACKUPS = [
    { id: 1, tenant: 'Acme Corp', lastBackup: 'Today, 03:00 AM', size: '1.2 GB', type: 'Automated', status: 'Healthy', regions: ['ap-south-1', 'eu-west-1'] },
    { id: 2, tenant: 'Global Tech', lastBackup: 'Yesterday, 03:00 AM', size: '840 MB', type: 'Manual', status: 'Healthy', regions: ['ap-south-1'] },
    { id: 3, tenant: 'StartUp Inc', lastBackup: '14 mins ago', size: '12 MB', type: 'Triggered (API)', status: 'In Progress', regions: ['ap-south-1'] },
    { id: 4, tenant: 'FraudCo', lastBackup: '3 days ago', size: '0 Bytes', type: 'Automated', status: 'Failed', regions: [] }
];

export default function AdminBackups() {
    const [globalBackupEnabled, setGlobalBackupEnabled] = useState(true);
    const [showRestoreModal, setShowRestoreModal] = useState(false);
    const [selectedTenant, setSelectedTenant] = useState(null);

    const triggerRestore = (tenant) => {
        setSelectedTenant(tenant);
        setShowRestoreModal(true);
    };

    const confirmRestore = () => {
        alert(`Data restoration process initiated for ${selectedTenant}. They will experience ~2 mins of downtime.`);
        setShowRestoreModal(false);
    };

    return (
        <div className="animate-enter" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '2rem', paddingBottom: '4rem' }}>

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', background: 'var(--bg-elevated)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <HardDrive color="var(--info)" /> Snapshots & Disaster Recovery
                    </h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Manage automated backups and 1-click database rollbacks for all tenant instances.</p>
                </div>
                <button onClick={() => alert('Triggered global manual snapshot of all databases.')} className="btn-primary hover-scale" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--info)', color: 'black', border: 'none', padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-md)' }}>
                    <Play size={18} /> Run Manual Global Snapshot
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>

                {/* Global Config Card */}
                <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid var(--success)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <History size={18} color="var(--success)" /> Automated Nightly Backups
                        </h3>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Runs daily at 03:00 GMT across all active tenant nodes.</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: 'var(--radius-md)', marginTop: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                            <span style={{ width: 8, height: 8, borderRadius: '50%', background: globalBackupEnabled ? 'var(--success)' : 'var(--text-secondary)' }}></span>
                            {globalBackupEnabled ? 'System Active' : 'System Paused'}
                        </div>
                        <button
                            onClick={() => setGlobalBackupEnabled(!globalBackupEnabled)}
                            style={{ background: globalBackupEnabled ? 'rgba(0,230,118,0.1)' : 'rgba(255,255,255,0.1)', color: globalBackupEnabled ? 'var(--success)' : 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '2rem', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}
                        >
                            {globalBackupEnabled ? 'Pause Backups' : 'Enable Backups'}
                        </button>
                    </div>
                </div>

                {/* Storage Analytics Card */}
                <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid var(--info)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <Database size={18} color="var(--info)" /> Vault Storage Used
                        </h3>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Total S3 snapshot footprint across all retention policies.</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
                        <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'white' }}>4.2</div>
                        <div>
                            <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--info)' }}>TB</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>~₹8,400/mo AWS Cost</div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Backup Registry Table */}
            <div className="glass-panel" style={{ overflow: 'hidden', padding: 0 }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Tenant Snapshot Logs</h2>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <div style={{ position: 'relative', width: '250px' }}>
                            <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                            <input type="text" placeholder="Search tenants..." style={{ width: '100%', padding: '0.5rem 1rem 0.5rem 2.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)', color: 'white', fontSize: '0.875rem' }} />
                        </div>
                        <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'var(--bg-elevated)', border: '1px solid var(--border-color)' }}>
                            <Filter size={16} /> Status
                        </button>
                    </div>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ background: 'rgba(255,255,255,0.02)', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Tenant Brand</th>
                                <th style={{ padding: '1rem', fontWeight: 600 }}>Last Successful Clone</th>
                                <th style={{ padding: '1rem', fontWeight: 600 }}>Redundancy</th>
                                <th style={{ padding: '1rem', fontWeight: 600 }}>Footprint</th>
                                <th style={{ padding: '1rem', fontWeight: 600 }}>Integrity</th>
                                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, textAlign: 'right' }}>Disaster Recovery</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MOCK_BACKUPS.map((b, i) => (
                                <tr key={b.id} style={{ borderBottom: i < MOCK_BACKUPS.length - 1 ? '1px solid var(--border-color)' : 'none' }} className="hover-bg-light transition-all">
                                    <td style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>{b.tenant}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ fontSize: '0.875rem' }}>{b.lastBackup}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>{b.type}</div>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                                            {b.regions.length > 0 ? b.regions.map(r => (
                                                <span key={r} style={{ fontSize: '0.7rem', padding: '0.2rem 0.4rem', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', border: '1px solid var(--border-color)' }}>{r}</span>
                                            )) : <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>None</span>}
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{b.size}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{
                                            display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem',
                                            background: b.status === 'Healthy' ? 'rgba(0,230,118,0.1)' : b.status === 'In Progress' ? 'rgba(56,189,248,0.1)' : 'rgba(255,61,113,0.1)',
                                            padding: '0.3rem 0.6rem', borderRadius: '2rem', width: 'fit-content',
                                            color: b.status === 'Healthy' ? 'var(--success)' : b.status === 'In Progress' ? 'var(--info)' : 'var(--danger)'
                                        }}>
                                            {b.status === 'Healthy' ? <ShieldCheck size={12} /> : b.status === 'In Progress' ? <SwitchCamera size={12} className="animate-spin" /> : <ServerCrash size={12} />}
                                            <span style={{ fontWeight: 600 }}>{b.status}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                                        <button
                                            onClick={() => triggerRestore(b.tenant)}
                                            disabled={b.status !== 'Healthy'}
                                            className="btn-secondary"
                                            style={{ padding: '0.4rem 0.8rem', background: 'transparent', border: '1px solid var(--warning)', color: 'var(--warning)', borderRadius: 'var(--radius-md)', fontSize: '0.75rem', cursor: b.status === 'Healthy' ? 'pointer' : 'not-allowed', opacity: b.status === 'Healthy' ? 1 : 0.5 }}
                                        >
                                            <History size={14} style={{ display: 'inline', marginRight: '0.4rem', verticalAlign: 'middle' }} /> Rollback...
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Restore Confirmation Modal */}
            {showRestoreModal && (
                <>
                    <div onClick={() => setShowRestoreModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', zIndex: 200 }} className="animate-fade-in"></div>
                    <div className="glass-panel animate-scale-in" style={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '450px', zIndex: 201, padding: '0', overflow: 'hidden', borderTop: '4px solid var(--warning)' }}>
                        <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <AlertTriangle color="var(--warning)" size={24} />
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Confirm Data Rollback</h2>
                        </div>

                        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                                You are about to restore the database layout for <strong>{selectedTenant}</strong> to the last known health snapshot.
                            </p>
                            <div style={{ background: 'rgba(255,170,0,0.1)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,170,0,0.2)', display: 'flex', gap: '0.75rem', color: 'var(--warning)', fontSize: '0.875rem' }}>
                                <ServerCrash size={18} style={{ flexShrink: 0 }} />
                                <span>
                                    <strong>CRITICAL:</strong> Any products added, AI scripts generated, or invoices paid between NOW and the snapshot time will be permanently lost and overwritten.
                                </span>
                            </div>
                        </div>

                        <div style={{ padding: '1.5rem 2rem', background: 'var(--bg-card)', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                            <button className="btn-secondary" onClick={() => setShowRestoreModal(false)}>Cancel Action</button>
                            <button className="btn-primary" onClick={confirmRestore} style={{ background: 'var(--warning)', color: 'black', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                                <History size={16} /> Execute Rollback
                            </button>
                        </div>
                    </div>
                </>
            )}

        </div>
    );
}
