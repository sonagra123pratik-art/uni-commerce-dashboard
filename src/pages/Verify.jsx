import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Verify() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [msg, setMsg] = useState('Verifying...');
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    if (!token) {
      setMsg('Missing token');
      return;
    }
    fetch(`/api/auth/verify?token=${encodeURIComponent(token)}`)
      .then(r => r.json())
      .then(async (j) => {
        if (j.email) {
          await login(j.email);
          setMsg('Email verified — signing you in...');
          setTimeout(() => navigate('/'), 1000);
        } else {
          setMsg(j.error || 'Verification failed');
        }
      })
      .catch((e) => setMsg('Verification error'));
  }, [token]);

  return (
    <div style={{ display: 'flex', minHeight: '60vh', alignItems: 'center', justifyContent: 'center' }}>
      <div className="glass-panel" style={{ padding: '2rem' }}>{msg}</div>
    </div>
  );
}
