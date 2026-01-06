import type { Component } from "solid-js";
import { Show } from "solid-js";

interface OutputPreviewProps {
	mergedContent: string;
	eventCount: number;
	onDownload: () => void;
	isProcessing: boolean;
}

const OutputPreview: Component<OutputPreviewProps> = (props) => {
	const getFileSize = () => {
		const bytes = new Blob([props.mergedContent]).size;
		return (bytes / 1024).toFixed(2) + " KB";
	};

	return (
		<div class="h-full flex flex-col p-6 bg-surface-variant/30 md:rounded-r-3xl relative overflow-hidden">
			<div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0" />

			<h2 class="text-xl font-medium text-on-surface mb-6 flex items-center gap-2">
				<span class="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
					3
				</span>
				Output
			</h2>

			<div class="flex-1 flex flex-col items-center justify-center text-center gap-4 border-2 border-dashed border-outline/20 rounded-2xl p-8 bg-surface/50">
				<Show
					when={props.mergedContent}
					fallback={
						<div class="text-on-surface-variant/50 flex flex-col items-center gap-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="48"
								viewBox="0 -960 960 960"
								width="48"
								class="fill-current opacity-50"
							>
								<path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0 0v-560 560Zm280-280 160-160H200v320h440L480-480Z" />
							</svg>
							<p>Add files to see preview</p>
						</div>
					}
				>
					<div class="flex flex-col items-center gap-2 animate-in fade-in zoom-in duration-300">
						<div class="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="40"
								viewBox="0 -960 960 960"
								width="40"
								class="fill-primary"
							>
								<path d="M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H260Zm0-80h480q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-83 0-141.5 58.5T280-520v60h-20q-58 0-99 41t-41 99q0 58 41 99t99 41Zm220-420Z" />
							</svg>
						</div>
						<h3 class="text-2xl font-bold text-primary">{props.eventCount} Events</h3>
						<p class="text-on-surface-variant font-medium">Ready to download</p>
						<span class="text-sm px-3 py-1 rounded-full bg-outline/10 text-on-surface-variant">
							{getFileSize()}
						</span>
					</div>
				</Show>
			</div>

			<div class="mt-6">
				<button
					onClick={props.onDownload}
					disabled={!props.mergedContent || props.isProcessing}
					class={`
            w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl shadow-sm transition-all
            font-medium text-lg
            ${
					props.mergedContent && !props.isProcessing
						? "bg-primary text-on-primary hover:bg-primary/90 hover:shadow-md cursor-pointer"
						: "bg-surface-variant/50 text-on-surface-variant/50 cursor-not-allowed"
				}
          `}
				>
					<Show when={props.isProcessing} fallback="Download ICS">
						Processing...
					</Show>
				</button>
			</div>
		</div>
	);
};

export default OutputPreview;
