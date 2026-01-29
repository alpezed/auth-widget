import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import './AuthModal.css';

type AuthMode = 'signin' | 'signup';

interface AuthModalWidgetProps {
  mode: AuthMode | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onModeChange: (mode: AuthMode) => void;
  onSignIn?: (data: { email: string; password: string }) => void;
  onSignUp?: (data: { email: string; password: string; name: string }) => void;
  onForgotPassword?: (email: string) => void;
  onSocialLogin?: (provider: 'google' | 'github') => void;
}

export function AuthModalWidget({
  mode,
  open,
  onOpenChange,
  onModeChange,
  onSignIn,
  onSignUp,
  onForgotPassword,
  onSocialLogin,
}: AuthModalWidgetProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setName('');
    setIsSubmitting(false);
  };

  // Reset form when modal closes or mode changes
  useEffect(() => {
    if (!open) {
      resetForm();
    }
  }, [open]);

  useEffect(() => {
    resetForm();
  }, [mode]);

  const switchMode = (newMode: AuthMode) => {
    resetForm();
    onModeChange(newMode);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (mode === 'signin') {
        onSignIn?.({ email, password });
      } else if (mode === 'signup') {
        if (password !== confirmPassword) {
          alert('Passwords do not match');
          setIsSubmitting(false);
          return;
        }
        onSignUp?.({ email, password, name });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = () => {
    onForgotPassword?.(email);
  };

  const handleSocialLogin = (provider: 'google' | 'github') => {
    onSocialLogin?.(provider);
  };

  if (!mode) return null;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="auth-modal-overlay" />
        <Dialog.Content className="auth-modal-content">
          <div className="auth-modal-header">
            <Dialog.Title className="auth-modal-title">
              {mode === 'signin' ? 'Welcome back' : 'Create an account'}
            </Dialog.Title>
            <Dialog.Description className="auth-modal-description">
              {mode === 'signin'
                ? 'Enter your credentials to access your account'
                : 'Fill in your details to get started'}
            </Dialog.Description>
          </div>

          <form onSubmit={handleSubmit} className="auth-modal-form">
            {mode === 'signup' && (
              <div className="auth-form-field">
                <label htmlFor="auth-name" className="auth-form-label">
                  Full Name
                </label>
                <input
                  id="auth-name"
                  type="text"
                  className="auth-form-input"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </div>
            )}

            <div className="auth-form-field">
              <label htmlFor="auth-email" className="auth-form-label">
                Email
              </label>
              <input
                id="auth-email"
                type="email"
                className="auth-form-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="auth-form-field">
              <label htmlFor="auth-password" className="auth-form-label">
                Password
              </label>
              <input
                id="auth-password"
                type="password"
                className="auth-form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                disabled={isSubmitting}
              />
            </div>

            {mode === 'signup' && (
              <div className="auth-form-field">
                <label htmlFor="auth-confirm-password" className="auth-form-label">
                  Confirm Password
                </label>
                <input
                  id="auth-confirm-password"
                  type="password"
                  className="auth-form-input"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                  disabled={isSubmitting}
                />
              </div>
            )}

            {mode === 'signin' && (
              <div className="auth-form-forgot">
                <button
                  type="button"
                  className="auth-link-button"
                  onClick={handleForgotPassword}
                  disabled={isSubmitting}
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button type="submit" className="auth-submit-button" disabled={isSubmitting}>
              {isSubmitting
                ? 'Please wait...'
                : mode === 'signin'
                  ? 'Sign In'
                  : 'Create Account'}
            </button>

            <div className="auth-divider">
              <span className="auth-divider-line" />
              <span className="auth-divider-text">or continue with</span>
              <span className="auth-divider-line" />
            </div>

            <div className="auth-social-buttons">
              <button
                type="button"
                className="auth-social-button"
                onClick={() => handleSocialLogin('google')}
                disabled={isSubmitting}
              >
                <GoogleIcon />
                Google
              </button>
              <button
                type="button"
                className="auth-social-button"
                onClick={() => handleSocialLogin('github')}
                disabled={isSubmitting}
              >
                <GithubIcon />
                GitHub
              </button>
            </div>
          </form>

          <div className="auth-modal-footer">
            {mode === 'signin' ? (
              <p>
                Don't have an account?{' '}
                <button
                  type="button"
                  className="auth-link-button"
                  onClick={() => switchMode('signup')}
                  disabled={isSubmitting}
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  className="auth-link-button"
                  onClick={() => switchMode('signin')}
                  disabled={isSubmitting}
                >
                  Sign in
                </button>
              </p>
            )}
          </div>

          <Dialog.Close asChild>
            <button className="auth-modal-close" aria-label="Close" disabled={isSubmitting}>
              <CloseIcon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// Icon components
function CloseIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17.64 9.20455C17.64 8.56636 17.5827 7.95273 17.4764 7.36364H9V10.845H13.8436C13.635 11.97 13.0009 12.9232 12.0477 13.5614V15.8195H14.9564C16.6582 14.2527 17.64 11.9455 17.64 9.20455Z"
        fill="#4285F4"
      />
      <path
        d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5614C11.2418 14.1014 10.2109 14.4205 9 14.4205C6.65591 14.4205 4.67182 12.8373 3.96409 10.71H0.957275V13.0418C2.43818 15.9832 5.48182 18 9 18Z"
        fill="#34A853"
      />
      <path
        d="M3.96409 10.71C3.78409 10.17 3.68182 9.59318 3.68182 9C3.68182 8.40682 3.78409 7.83 3.96409 7.29V4.95818H0.957275C0.347727 6.17318 0 7.54773 0 9C0 10.4523 0.347727 11.8268 0.957275 13.0418L3.96409 10.71Z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957275 4.95818L3.96409 7.29C4.67182 5.16273 6.65591 3.57955 9 3.57955Z"
        fill="#EA4335"
      />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
        fill="currentColor"
      />
    </svg>
  );
}
