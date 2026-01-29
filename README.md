# Auth Widget

A modern, professional authentication modal built with React and Radix UI. Can be used as a React component or as a standalone widget that works in any HTML page.

## Features

- Beautiful, modern UI with dark mode support
- Sign In and Sign Up modals with seamless switching
- Social login buttons (Google, GitHub)
- Fully accessible (built on Radix UI primitives)
- Mobile responsive
- Works as a standalone widget via `<script>` tag
- Single file distribution (JS + CSS bundled)

## Installation

```bash
# Using bun
bun install

# Using npm
npm install

# Using yarn
yarn install
```

## Development

```bash
# Start development server
bun run dev

# Build the React app
bun run build

# Build the standalone widget
bun run build:widget
```

---

## Usage

### Option 1: Standalone Widget (Any HTML Page)

Include the script and use the global `window.AuthModalWidget` API:

```html
<!DOCTYPE html>
<html>
<head>
  <title>My App</title>
</head>
<body>
  <button onclick="window.AuthModalWidget.openSignIn()">Sign In</button>
  <button onclick="window.AuthModalWidget.openSignUp()">Sign Up</button>

  <!-- Include the widget (single file, includes CSS) -->
  <script src="path/to/auth-widget.iife.js"></script>
  
  <script>
    // Configure callbacks
    window.AuthModalWidget.configure({
      onSignIn: function(data) {
        console.log('Sign in:', data.email, data.password);
        // Call your API here
        window.AuthModalWidget.close();
      },
      onSignUp: function(data) {
        console.log('Sign up:', data.email, data.password, data.name);
        // Call your API here
        window.AuthModalWidget.close();
      },
      onSocialLogin: function(provider) {
        console.log('Social login:', provider); // 'google' or 'github'
        // Redirect to OAuth flow
      },
      onForgotPassword: function(email) {
        console.log('Forgot password:', email);
        // Handle password reset
      },
      onClose: function() {
        console.log('Modal closed');
      }
    });
  </script>
</body>
</html>
```

### Option 2: React Component

```tsx
import { useState } from 'react';
import { AuthModal } from './components/AuthModal';

function App() {
  const [signInOpen, setSignInOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);

  return (
    <>
      <button onClick={() => setSignInOpen(true)}>Sign In</button>
      <button onClick={() => setSignUpOpen(true)}>Sign Up</button>

      <AuthModal 
        mode="signin" 
        open={signInOpen} 
        onOpenChange={setSignInOpen} 
      />
      <AuthModal 
        mode="signup" 
        open={signUpOpen} 
        onOpenChange={setSignUpOpen} 
      />
    </>
  );
}
```

---

## Widget API Reference

### `window.AuthModalWidget`

#### Methods

| Method | Description |
|--------|-------------|
| `openSignIn()` | Opens the Sign In modal |
| `openSignUp()` | Opens the Sign Up modal |
| `close()` | Closes the modal |
| `configure(options)` | Configure callback handlers |
| `isOpen()` | Returns `true` if modal is currently open |
| `getMode()` | Returns current mode: `'signin'`, `'signup'`, or `null` |
| `destroy()` | Removes the widget and cleans up resources |

#### Configuration Options

```typescript
window.AuthModalWidget.configure({
  // Called when user submits the sign in form
  onSignIn?: (data: { email: string; password: string }) => void;
  
  // Called when user submits the sign up form
  onSignUp?: (data: { email: string; password: string; name: string }) => void;
  
  // Called when user clicks a social login button
  onSocialLogin?: (provider: 'google' | 'github') => void;
  
  // Called when user clicks "Forgot password?"
  onForgotPassword?: (email: string) => void;
  
  // Called when modal is closed
  onClose?: () => void;
});
```

---

## Customization

### Styling

The widget uses CSS custom properties and can be styled by overriding the CSS classes. The main classes are:

| Class | Description |
|-------|-------------|
| `.auth-modal-overlay` | Background overlay |
| `.auth-modal-content` | Modal container |
| `.auth-modal-title` | Modal title |
| `.auth-modal-description` | Modal subtitle |
| `.auth-form-input` | Input fields |
| `.auth-submit-button` | Primary submit button |
| `.auth-social-button` | Social login buttons |
| `.auth-link-button` | Text links |

### Dark Mode

The widget automatically supports dark mode via `prefers-color-scheme: dark` media query.

---

## Build Output

After running `bun run build:widget`, you'll find:

```
dist-widget/
└── auth-widget.iife.js    # Single file bundle (~238KB, ~76KB gzipped)
```

The bundle includes:
- React & ReactDOM (production build)
- Radix UI Dialog
- All CSS (injected at runtime)

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## License

MIT
