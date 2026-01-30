import { useState } from 'react';
import { AuthModal } from '../components/AuthModal';

export function HomePage() {
	const [signInOpen, setSignInOpen] = useState(false);
	const [signUpOpen, setSignUpOpen] = useState(false);

	return (
		<>
			<div className="hero-content">
				<h2 className="hero-title">
					Beautiful Authentication
					<span className="hero-gradient">Made Simple</span>
				</h2>
				<p className="hero-description">
					Modern, accessible, and customizable authentication modals built with
					Radix UI. Perfect for any React application.
				</p>
				<div className="hero-buttons">
					<button
						className="hero-button primary"
						onClick={() => setSignUpOpen(true)}
					>
						Create Account
					</button>
					<button
						className="hero-button secondary"
						onClick={() => setSignInOpen(true)}
					>
						Sign In
					</button>
				</div>
			</div>
			<AuthModal mode="signin" open={signInOpen} onOpenChange={setSignInOpen} />
			<AuthModal mode="signup" open={signUpOpen} onOpenChange={setSignUpOpen} />
		</>
	);
}
