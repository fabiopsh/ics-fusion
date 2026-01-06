import type { Component, JSX } from "solid-js";
import TopBar from "./TopBar";

interface LayoutProps {
	children: JSX.Element;
}

const Layout: Component<LayoutProps> = (props) => {
	return (
		<div class="h-screen w-screen bg-background flex flex-col overflow-hidden">
			<TopBar />
			<main class="flex-1 w-full max-w-[1920px] mx-auto p-4 md:p-6 overflow-hidden">
				<div class="h-full w-full bg-surface md:rounded-3xl shadow-lg border border-outline/10 flex flex-col overflow-hidden">
					{props.children}
				</div>
			</main>
		</div>
	);
};

export default Layout;
