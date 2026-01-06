import type { Component } from "solid-js";
import { createSignal } from "solid-js";

interface UploadAreaProps {
	onFilesAdded: (files: File[]) => void;
}

const UploadArea: Component<UploadAreaProps> = (props) => {
	const [isDragOver, setIsDragOver] = createSignal(false);
	let fileInputRef: HTMLInputElement | undefined;

	const handleDragOver = (e: DragEvent) => {
		e.preventDefault();
		setIsDragOver(true);
	};

	const handleDragLeave = () => {
		setIsDragOver(false);
	};

	const handleDrop = (e: DragEvent) => {
		e.preventDefault();
		setIsDragOver(false);
		if (e.dataTransfer?.files) {
			const files = Array.from(e.dataTransfer.files).filter(
				(f) => f.name.endsWith(".ics") || f.type === "text/calendar"
			);
			if (files.length > 0) {
				props.onFilesAdded(files);
			}
		}
	};

	const handleClick = () => {
		fileInputRef?.click();
	};

	const handleFileChange = (e: Event) => {
		const target = e.target as HTMLInputElement;
		if (target.files) {
			const files = Array.from(target.files);
			props.onFilesAdded(files);
		}
		target.value = ""; // Reset input
	};

	return (
		<div
			class={`h-full border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
				isDragOver()
					? "border-primary bg-primary-container"
					: "border-outline/30 hover:bg-surface-variant/30 hover:border-primary/50"
			}`}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleDrop}
			onClick={handleClick}
		>
			<input
				type="file"
				multiple
				accept=".ics,text/calendar"
				class="hidden"
				ref={fileInputRef}
				onChange={handleFileChange}
			/>
			<div class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
				{/* Simple Upload Icon */}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="32"
					viewBox="0 -960 960 960"
					width="32"
					class="fill-primary"
				>
					<path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
				</svg>
			</div>
			<p class="text-lg font-medium text-on-surface">Drop ICS files</p>
			<p class="text-sm text-on-surface-variant mt-1">or click to browse</p>
		</div>
	);
};

export default UploadArea;
