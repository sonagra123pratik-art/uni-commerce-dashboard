import { useState } from 'react';
import {
    Users, Search, Filter, MoreVertical, ShieldAlert, Key,
    LogIn, UserX, UserCheck, Shield, Mail, Edit3, Trash2
} from 'lucide-react';

const MOCK_CUSTOMERS = [
    { id: 'c-1', name: 'Rahul Sharma', email: 'rahul@acmecorp.in', tenant: 'Acme Corp', role: 'Owner', status: 'Active', lastLogin: '10 mins ago' },
    { id: 'c-2', name: 'Priya Patel', email: 'priya.p@startups.io', tenant: 'StartUp Inc', role: 'Admin', status: 'Suspended', lastLogin: '2 days ago' },
    { id: 'c-3', name: 'Karan Singh', email: 'karan@globaltech.com', tenant: 'Global Tech', role: 'Staff', status: 'Active', lastLogin: '1 hour ago' },
    { id: 'c-4', name: 'Anjali Desai', email: 'anjali@acmecorp.in', tenant: 'Acme Corp', role: 'Staff', status: 'Active', lastLogin: '5 mins ago' },
    { id: 'c-5', name: 'Vikram Mehta', email: 'vikram.m@badactor.net', tenant: 'FraudCo', role: 'Owner', status: 'Banned', lastLogin: '5 months ago' },
];

export default function AdminCustomers() {
    const [search, setSearch] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [showActionMenu, setShowActionMenu] = useState(null);

    // Modals
    const [showResetModal, setShowResetModal] = useState(false);
    const [showStatusModal, setShowStatusModal] = useState(false);

    const handleActionClick = (id) => {
        if (showActionMenu === id) setShowActionMenu(null);
        else setShowActionMenu(id);
    };

    const openAction = (user, modalSetter) => {
        setSelectedUser(user);
        setShowActionMenu(null);
        modalSetter(true);
    };

    const executeAction = (message) => {
        alert(message);
        setShowResetModal(false);
        setShowStatusModal(false);
    };

    return (
        <div className="animate-enter" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '2rem', paddingBottom: '4rem' }}>

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', background: 'var(--bg-elevated)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Users color="var(--accent-blue)" /> End-Customer Accounts
                    </h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Global control center for all platform end-users across every brand.</p>
                </div>
            </div>

            {/* Main Table */}
            <div className="glass-panel" style={{ overflow: 'visible' }}>

                {/* Toolbar */}
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flex: 1 }}>
                        <div style={{ position: 'relative', width: '100%', maxWidth: '350px' }}>
                            <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                            <input
                                type="text"
                                placeholder="Search user name or email..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                style={{ width: '100%', padding: '0.6rem 1rem 0.6rem 2.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)', color: 'white', fontSize: '0.875rem' }}
                            />
                        </div>
                        <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1rem', background: 'var(--bg-elevated)', border: '1px solid var(--border-color)' }}>
                            <Filter size={16} /> Filter by Tenant
                        </button>
                    </div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                        {MOCK_CUSTOMERS.length} total users
                    </div>
                </div>

                <div style={{ overflowX: 'auto', minHeight: '300px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ background: 'rgba(255,255,255,0.02)', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Customer Info</th>
                                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Brand / Tenant</th>
                                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Role</th>
                                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Status</th>
                                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Last Login</th>
                                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, textAlign: 'right' }}>Admin Control</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MOCK_CUSTOMERS.map((u, i) => (
                                <tr key={u.id} style={{ borderBottom: i < MOCK_CUSTOMERS.length - 1 ? '1px solid var(--border-color)' : 'none' }} className="hover-bg-light transition-all">
                                    <td style={{ padding: '1rem 1.5rem' }}>
                                        <div style={{ fontWeight: 600, color: 'white' }}>{u.name}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{u.email}</div>
                                    </td>
                                    <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                        {u.tenant}
                                    </td>
                                    <td style={{ padding: '1rem 1.5rem' }}>
                                        <span style={{
                                            padding: '0.25rem 0.5rem',
                                            background: u.role === 'Owner' ? 'rgba(123, 97, 255, 0.1)' : 'rgba(255,255,255,0.05)',
                                            color: u.role === 'Owner' ? 'var(--accent-purple)' : 'white',
                                            border: `1px solid ${u.role === 'Owner' ? 'rgba(123, 97, 255, 0.3)' : 'var(--border-color)'}`,
                                            borderRadius: '4px',
                                            fontSize: '0.75rem',
                                            fontWeight: 600
                                        }}>
                                            {u.role}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem 1.5rem' }}>
                                        <div style={{
                                            display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem',
                                            background: u.status === 'Active' ? 'rgba(0,230,118,0.1)' : u.status === 'Suspended' ? 'rgba(255,170,0,0.1)' : 'rgba(255,61,113,0.1)',
                                            padding: '0.3rem 0.6rem', borderRadius: '2rem', width: 'fit-content',
                                            color: u.status === 'Active' ? 'var(--success)' : u.status === 'Suspended' ? 'var(--warning)' : 'var(--danger)',
                                            border: `1px solid ${u.status === 'Active' ? 'var(--success)' : u.status === 'Suspended' ? 'var(--warning)' : 'var(--danger)'}`
                                        }}>
                                            {u.status === 'Active' ? <UserCheck size={12} /> : u.status === 'Suspended' ? <ShieldAlert size={12} /> : <UserX size={12} />}
                                            <span style={{ fontWeight: 600 }}>{u.status}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                        {u.lastLogin}
                                    </td>
                                    <td style={{ padding: '1rem 1.5rem', textAlign: 'right', position: 'relative' }}>
                                        <button
                                            onClick={() => handleActionClick(u.id)}
                                            className="btn-secondary"
                                            style={{ padding: '0.4rem', background: showActionMenu === u.id ? 'var(--bg-elevated)' : 'transparent', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}
                                        >
                                            <MoreVertical size={16} />
                                        </button>

                                        {/* Dropdown Menu */}
                                        {showActionMenu === u.id && (
                                            <div className="animate-scale-in" style={{ position: 'absolute', right: '1.5rem', top: '100%', zIndex: 100, background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', width: '220px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

                                                <button onClick={() => executeAction(`Impersonating ${u.name}...`)} style={{ padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'transparent', border: 'none', borderBottom: '1px solid var(--border-color)', color: 'white', textAlign: 'left', cursor: 'pointer', fontSize: '0.875rem' }} className="hover-bg-light">
                                                    <LogIn size={16} color="var(--accent-blue)" /> Log in as User
                                                </button>

                                                <button onClick={() => openAction(u, setShowResetModal)} style={{ padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'transparent', border: 'none', borderBottom: '1px solid var(--border-color)', color: 'white', textAlign: 'left', cursor: 'pointer', fontSize: '0.875rem' }} className="hover-bg-light">
                                                    <Key size={16} color="var(--warning)" /> Force Password Reset
                                                </button>

                                                <button onClick={() => openAction(u, setShowStatusModal)} style={{ padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'transparent', border: 'none', borderBottom: '1px solid var(--border-color)', color: 'white', textAlign: 'left', cursor: 'pointer', fontSize: '0.875rem' }} className="hover-bg-light">
                                                    <ShieldAlert size={16} color="var(--danger)" /> Change Account Status
                                                </button>

                                                <button onClick={() => executeAction(`Deleted user ${u.name}`)} style={{ padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(255,61,113,0.05)', border: 'none', color: 'var(--danger)', textAlign: 'left', cursor: 'pointer', fontSize: '0.875rem' }} className="hover-bg-light">
                                                    <Trash2 size={16} /> Permanently Delete
                                                </button>

                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Force Password Reset Modal */}
            {showResetModal && selectedUser && (
                <>
                    <div onClick={() => setShowResetModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', zIndex: 200 }} className="animate-fade-in"></div>
                    <div className="glass-panel animate-scale-in" style={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '400px', zIndex: 201, padding: '0', overflow: 'hidden' }}>
                        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(255,170,0,0.1)' }}>
                            <Key color="var(--warning)" size={24} />
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--warning)' }}>Force Reset</h2>
                        </div>
                        <div style={{ padding: '2rem' }}>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.5 }}>
                                This will immediately invalidate all active sessions for <strong>{selectedUser.name}</strong>. An email with a unique password reset link will be sent to <strong>{selectedUser.email}</strong>.
                            </p>
                        </div>
                        <div style={{ padding: '1.5rem', background: 'var(--bg-card)', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                            <button className="btn-secondary" onClick={() => setShowResetModal(false)}>Cancel</button>
                            <button className="btn-primary" onClick={() => executeAction("Reset link sent!")} style={{ background: 'var(--warning)', color: 'black', border: 'none' }}>Send Reset Link</button>
                        </div>
                    </div>
                </>
            )}

            {/* Change Status Modal */}
            {showStatusModal && selectedUser && (
                <>
                    <div onClick={() => setShowStatusModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', zIndex: 200 }} className="animate-fade-in"></div>
                    <div className="glass-panel animate-scale-in" style={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '400px', zIndex: 201, padding: '0', overflow: 'hidden' }}>
                        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(255,61,113,0.1)' }}>
                            <ShieldAlert color="var(--danger)" size={24} />
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--danger)' }}>Account Restrictions</h2>
                        </div>
                        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                Change access level for <strong>{selectedUser.name}</strong> ({selectedUser.tenant}).
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <button onClick={() => executeAction("User is now ACTIVE")} className="btn-secondary hover-border-glow" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', textAlign: 'left', border: '1px solid var(--success)' }}>
                                    <UserCheck size={18} color="var(--success)" />
                                    <div>
                                        <div style={{ fontWeight: 600, color: 'white' }}>Set Active</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Restore full access.</div>
                                    </div>
                                </button>

                                <button onClick={() => executeAction("User is now SUSPENDED")} className="btn-secondary hover-border-glow" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', textAlign: 'left', border: '1px solid var(--warning)' }}>
                                    <ShieldAlert size={18} color="var(--warning)" />
                                    <div>
                                        <div style={{ fontWeight: 600, color: 'white' }}>Suspend Account</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Temporary block. Cannot login.</div>
                                    </div>
                                </button>

                                <button onClick={() => executeAction("User is now BANNED")} className="btn-secondary hover-border-glow" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', textAlign: 'left', border: '1px solid var(--danger)' }}>
                                    <UserX size={18} color="var(--danger)" />
                                    <div>
                                        <div style={{ fontWeight: 600, color: 'white' }}>Ban User (Fraud/TOS)</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Permanent ban across networks.</div>
                                    </div>
                                </button>
                            </div>

                        </div>
                        <div style={{ padding: '1.5rem', background: 'var(--bg-card)', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end' }}>
                            <button className="btn-secondary" onClick={() => setShowStatusModal(false)}>Close</button>
                        </div>
                    </div>
                </>
            )}

        </div>
    );
}
