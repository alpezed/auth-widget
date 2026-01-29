import { createRoot, type Root } from 'react-dom/client';
import { AuthModalWidget } from './components/AuthModalWidget';
import './components/AuthModal.css';

// Widget state
let root: Root | null = null;
let container: HTMLDivElement | null = null;
let currentMode: 'signin' | 'signup' | null = null;
let isOpen = false;

// Callbacks
let onSignIn: ((data: { email: string; password: string }) => void) | null =
	null;
let onSignUp:
	| ((data: { email: string; password: string; name: string }) => void)
	| null = null;
let onClose: (() => void) | null = null;
let onForgotPassword: ((email: string) => void) | null = null;
let onSocialLogin: ((provider: 'google' | 'github') => void) | null = null;

function ensureContainer() {
	if (!container) {
		container = document.createElement('div');
		container.id = 'auth-modal-widget-root';
		document.body.appendChild(container);
		root = createRoot(container);
	}
}

function render() {
	ensureContainer();
	root?.render(
		<AuthModalWidget
			mode={currentMode}
			open={isOpen}
			onOpenChange={open => {
				isOpen = open;
				if (!open) {
					currentMode = null;
					onClose?.();
				}
				render();
			}}
			onModeChange={mode => {
				currentMode = mode;
				render();
			}}
			onSignIn={onSignIn || undefined}
			onSignUp={onSignUp || undefined}
			onForgotPassword={onForgotPassword || undefined}
			onSocialLogin={onSocialLogin || undefined}
		/>
	);
}

// Public API
const AuthModalWidgetAPI = {
	/**
	 * Open the Sign In modal
	 */
	openSignIn() {
		currentMode = 'signin';
		isOpen = true;
		render();
	},

	/**
	 * Open the Sign Up modal
	 */
	openSignUp() {
		currentMode = 'signup';
		isOpen = true;
		render();
	},

	/**
	 * Close the modal
	 */
	close() {
		isOpen = false;
		currentMode = null;
		render();
	},

	/**
	 * Configure callbacks for auth events
	 */
	configure(options: {
		onSignIn?: (data: { email: string; password: string }) => void;
		onSignUp?: (data: {
			email: string;
			password: string;
			name: string;
		}) => void;
		onClose?: () => void;
		onForgotPassword?: (email: string) => void;
		onSocialLogin?: (provider: 'google' | 'github') => void;
	}) {
		if (options.onSignIn) onSignIn = options.onSignIn;
		if (options.onSignUp) onSignUp = options.onSignUp;
		if (options.onClose) onClose = options.onClose;
		if (options.onForgotPassword) onForgotPassword = options.onForgotPassword;
		if (options.onSocialLogin) onSocialLogin = options.onSocialLogin;
	},

	/**
	 * Check if modal is currently open
	 */
	isOpen() {
		return isOpen;
	},

	/**
	 * Get current mode ('signin' | 'signup' | null)
	 */
	getMode() {
		return currentMode;
	},

	/**
	 * Destroy the widget and clean up
	 */
	destroy() {
		if (root) {
			root.unmount();
			root = null;
		}
		if (container) {
			container.remove();
			container = null;
		}
		isOpen = false;
		currentMode = null;
		onSignIn = null;
		onSignUp = null;
		onClose = null;
		onForgotPassword = null;
		onSocialLogin = null;
	},
};

// Expose to window
declare global {
	interface Window {
		AuthModalWidget: typeof AuthModalWidgetAPI;
	}
}

window.AuthModalWidget = AuthModalWidgetAPI;

export default AuthModalWidgetAPI;
