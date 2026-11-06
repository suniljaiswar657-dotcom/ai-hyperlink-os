import React, { useEffect, useState } from 'react';
import { supabase, supabaseConfigured } from './lib/supabase';
import { Command, LockKeyhole, Mail, ShieldCheck, Sparkles } from 'lucide-react';
import './auth.css';

export default function AuthGate({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [mode, setMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!supabaseConfigured) { setLoading(false); return; }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession));
    return () => listener.subscription.unsubscribe();
  }, []);

  async function submit(e) {
    e.preventDefault();
    setBusy(true); setError(''); setMessage('');
    try {
      const result = mode === 'signin'
        ? await supabase.auth.signInWithPassword({ email: email.trim(), password })
        : await supabase.auth.signUp({ email: email.trim(), password });
      if (result.error) throw result.error;
      if (mode === 'signup' && !result.data.session) {
        setMessage('Account created. Email confirmation required—check your inbox, then sign in.');
      } else {
        setMessage(mode === 'signup' ? 'Account created and signed in.' : 'Signed in successfully.');
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally { setBusy(false); }
  }

  if (loading) return <div className="auth-loading"><div className="auth-spinner"/>Checking secure session…</div>;
  if (session) return <>{React.cloneElement(children, { user: session.user, onLogout: async () => { await supabase.auth.signOut(); } })}</>;

  return <div className="auth-screen"><div className="auth-card">
    <div className="auth-brand"><div className="auth-brand-icon"><Command size={24}/></div><div><b>HYPERLINK OS</b><span>CONNECTED INTELLIGENCE</span></div></div>
    <div className="auth-eyebrow"><Sparkles size={14}/> SECURE WORKSPACE ACCESS</div>
    <h1>{mode === 'signin' ? 'Welcome back.' : 'Create your workspace access.'}</h1>
    <p className="auth-subtitle">{mode === 'signin' ? 'Sign in to access your private AI command center.' : 'Create an account to start your private workspace.'}</p>
    <form onSubmit={submit} className="auth-form">
      <label>Email address</label><div className="auth-input-wrap"><Mail size={17}/><input type="email" autoComplete="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/></div>
      <label>Password</label><div className="auth-input-wrap"><LockKeyhole size={17}/><input type="password" autoComplete={mode==='signin'?'current-password':'new-password'} minLength={6} required value={password} onChange={e=>setPassword(e.target.value)} placeholder="At least 6 characters"/></div>
      {error && <div className="auth-error">{error}</div>}
      {message && <div className="auth-message">{message}</div>}
      <button className="auth-submit" disabled={busy}>{busy ? 'Please wait…' : mode==='signin' ? 'Sign in securely' : 'Create account'}</button>
    </form>
    <button className="auth-switch" onClick={()=>{setMode(mode==='signin'?'signup':'signin');setError('');setMessage('')}}>{mode==='signin'?'New here? Create an account':'Already registered? Sign in'}</button>
    <div className="auth-security"><ShieldCheck size={15}/> Protected by Supabase Auth · private user sessions</div>
  </div><div className="auth-footer">HYPERLINK OS <span>·</span> AUTHENTICATION GATE</div></div>;
}
