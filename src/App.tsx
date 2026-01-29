import { useState } from 'react';
import { AuthModal } from './components/AuthModal';
import './App.css';

function App() {
  const [signInOpen, setSignInOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-logo">AuthWidget</h1>
        <nav className="app-nav">
          <button className="nav-button secondary" onClick={() => setSignInOpen(true)}>
            Sign In
          </button>
          <button className="nav-button primary" onClick={() => setSignUpOpen(true)}>
            Get Started
          </button>
        </nav>
      </header>

      <main className="app-main">
        <div className="hero-content">
          <h2 className="hero-title">
            Beautiful Authentication
            <span className="hero-gradient">Made Simple</span>
          </h2>
          <p className="hero-description">
            Modern, accessible, and customizable authentication modals built with Radix UI.
            Perfect for any React application.
          </p>
          <div className="hero-buttons">
            <button className="hero-button primary" onClick={() => setSignUpOpen(true)}>
              Create Account
            </button>
            <button className="hero-button secondary" onClick={() => setSignInOpen(true)}>
              Sign In
            </button>
          </div>
        </div>
      </main>

      <AuthModal mode="signin" open={signInOpen} onOpenChange={setSignInOpen} />
      <AuthModal mode="signup" open={signUpOpen} onOpenChange={setSignUpOpen} />
    </div>
  );
}

export default App;
