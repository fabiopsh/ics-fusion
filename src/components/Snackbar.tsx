import type { Component } from "solid-js";
import { Show, createEffect } from "solid-js";

interface SnackbarProps {
	message: string;
	isOpen: boolean;
	type?: "success" | "error";
	onClose: () => void;
}

const Snackbar: Component<SnackbarProps> = (props) => {
	createEffect(() => {
		if (props.isOpen) {
			const timer = setTimeout(() => {
				props.onClose();
			}, 4000);
			return () => clearTimeout(timer);
		}
	});

	return (
		<Show when={props.isOpen}>
			<div
				class={`fixed bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl shadow-lg z-50 transition-all animate-in fade-in slide-in-from-bottom-4
        ${props.type === "error" ? "bg-error text-on-error" : "bg-inverse-surface text-inverse-on-surface"}`}
				style={props.type !== "error" ? "background-color: #313033; color: #F4EFF4;" : ""}
			>
				<span class="font-medium text-sm">{props.message}</span>
			</div>
		</Show>
	);
};

export default Snackbar;
