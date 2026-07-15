import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './WizLogin.css';

function WizLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isActive, setIsActive] = useState(location.state?.isSignup || false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  useEffect(() => {
    if (location.state?.isSignup !== undefined) {
      setIsActive(location.state.isSignup);
    }
  }, [location.state]);
  
  const handleAuth = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    
    const user = { 
      email, 
      name: isActive ? name : 'Demo User' 
    };
    
    sessionStorage.setItem('wizUser', JSON.stringify(user));
    navigate('/wiz/subjects');
  };

  return (
    <div className="wiz-login-wrapper">
      <div className={`wiz-login-container ${isActive ? 'active' : ''}`} id="container">
        {/* Sign Up Form */}
        <div className="form-container sign-up">
          <form onSubmit={handleAuth}>
            <h1>Create Account</h1>
            <input 
              type="text" 
              placeholder="Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required={isActive}
            />
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required={isActive}
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required={isActive}
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className="form-container sign-in">
          <form onSubmit={handleAuth}>
            <div className="logo" style={{ marginBottom: '3dvh' }}>
              <img src="/wiz-assets/wizlogo.png" alt="Wiz Logo" style={{ width: '150px' }} />
            </div>
            <h1>Log In</h1>
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required={!isActive}
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required={!isActive}
            />
            <button type="submit" style={{ marginTop: '5px' }}>Log In</button>
            <div style={{ marginTop: '15px', padding: '10px', background: '#f8f9fa', borderRadius: '8px', border: '1px solid #e2e8f0', width: '100%' }}>
              <p style={{ margin: 0, fontSize: '11px', color: '#64748b', fontWeight: 'bold' }}>Demo credentials:</p>
              <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#334155', fontFamily: 'monospace' }}>test@gmail.com / password123</p>
            </div>
          </form>
        </div>

        {/* Toggle Overlay Panel */}
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button type="button" className="toggle-ghost-btn" onClick={() => setIsActive(false)}>Sign In</button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, Classmate!</h1>
              <p>No account yet? Register with your personal details to use all of site features</p>
              <button type="button" className="toggle-ghost-btn" onClick={() => setIsActive(true)}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WizLogin;
