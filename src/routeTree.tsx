import {
	Outlet,
	Link,
	createRouter,
	createRoute,
	createRootRoute,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';

const RootLayout = () => (
	<>
		<div className="app-container">
			<header className="app-header">
				<Link to="/" className="app-logo">
					AuthWidget
				</Link>
				<nav className="app-nav">
					<Link to="/" className="nav-button secondary [&.active]:font-bold">
						Home
					</Link>
					<Link to="/about" className="nav-button secondary [&.active]:font-bold">
						About
					</Link>
				</nav>
			</header>
			<main className="app-main">
				<Outlet />
			</main>
		</div>
		<TanStackRouterDevtools />
	</>
);

const rootRoute = createRootRoute({
	component: RootLayout,
});

const indexRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/',
	component: HomePage,
});

const aboutRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/about',
	component: AboutPage,
});

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}
