import type { Component } from "solid-js";

const TopBar: Component = () => {
	return (
		<div class="bg-surfaceOne text-on-surface h-16 flex items-center px-6 shrink-0 z-10 border-b border-outline/10">
			<h1 class="text-2xl font-medium tracking-tight text-primary">ICS Fusion</h1>
		</div>
	);
};

export default TopBar;
