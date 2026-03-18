import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

export default function Login() {
  const [isSignUP, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [gstin, setGstin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      // In the Firebase-free stub we prompt for the Google email to simulate
      // an OAuth response. Enter your admin email to land on the admin panel.
      const simulatedEmail = window.prompt('Enter Google account email to continue:');
      if (!simulatedEmail) throw new Error('Google login cancelled');
      const user = await loginWithGoogle(simulatedEmail);
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Google Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUP) {
        // GSTIN basic validation (15 chars) before sending to server
        if (gstin.trim().length !== 15) {
          throw new Error('Please enter a valid 15-character GSTIN');
        }
        await signup(email, password, companyName, gstin);
        navigate('/');
      } else {
        const user = await login(email, password);
        if (user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div className="glass-panel animate-scale-in" style={{ width: '100%', maxWidth: '450px', padding: '2.5rem', borderRadius: 'var(--radius-lg)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 className="gradient-text" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Flux-Ehub</h1>
          <p style={{ color: 'var(--text-secondary)' }}>{isSignUP ? 'Start your 30-Day Free Trial' : 'Log in to scale your brand'}</p>
        </div>

        {/* Toggle Login / SignUp */}
        <div style={{ display: 'flex', background: 'var(--glass-opacity-5)', borderRadius: 'var(--radius-pill)', padding: '0.25rem', marginBottom: '2rem' }}>
          <button
            type="button"
            onClick={() => { setIsSignUp(false); setError(''); }}
            style={{ flex: 1, padding: '0.5rem', background: !isSignUP ? 'var(--accent-blue)' : 'transparent', color: !isSignUP ? 'black' : 'var(--text-secondary)', fontWeight: 600, border: 'none', borderRadius: 'var(--radius-pill)', cursor: 'pointer', transition: 'all 0.2s' }}>
            Log In
          </button>
          <button
            type="button"
            onClick={() => { setIsSignUp(true); setError(''); }}
            style={{ flex: 1, padding: '0.5rem', background: isSignUP ? 'var(--accent-blue)' : 'transparent', color: isSignUP ? 'black' : 'var(--text-secondary)', fontWeight: 600, border: 'none', borderRadius: 'var(--radius-pill)', cursor: 'pointer', transition: 'all 0.2s' }}>
            Free Trial
          </button>
        </div>

        {error && (
          <div style={{ background: 'rgba(255, 61, 113, 0.1)', border: '1px solid rgba(255, 61, 113, 0.3)', color: 'var(--danger)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', alignItems: 'flex-start', fontSize: '0.875rem', lineHeight: 1.4 }}>
            <ShieldAlert size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>{error}</span>
          </div>
        )}

        <button 
          onClick={handleGoogleLogin} 
          disabled={loading}
          type="button" 
          style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'white', color: 'black', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.5rem', cursor: 'pointer' }}
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" style={{ width: '18px', height: '18px' }} />
          Continue with Google
        </button>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
          <span style={{ padding: '0 0.75rem' }}>or</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

          {isSignUP && (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
                  Full Name <span style={{ color: 'var(--danger)' }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--glass-opacity-10)', color: 'var(--text-primary)' }}
                  placeholder="John Doe"
                />
              </div>
            </>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Work Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--glass-opacity-10)', color: 'var(--text-primary)' }}
              placeholder="admin@flux-ehub.com"
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--glass-opacity-10)', color: 'var(--text-primary)' }}
              placeholder="••••••••"
            />
          </div>

          <button disabled={loading} type="submit" className="btn-primary" style={{ marginTop: '0.5rem' }}>
            {loading ? 'Processing...' : isSignUP ? 'Start 30-Day Free Trial' : 'Log In'}
          </button>

          {isSignUP && (
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textAlign: 'center', marginTop: '0.5rem' }}>
              By starting your trial, you agree to our Terms of Service. No credit card required. Multiple trial attempts per legal entity will result in an immediate ban.
            </p>
          )}

        </form>

      </div>
    </div>
  );
}
