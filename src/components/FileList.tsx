import type { Component } from "solid-js";
import { For } from "solid-js";

interface FileListProps {
	files: File[];
	onRemove: (index: number) => void;
}

const FileList: Component<FileListProps> = (props) => {
	return (
		<div class="flex flex-col gap-2 w-full">
			<h2 class="text-lg font-medium text-on-surface mb-2">Files ({props.files.length})</h2>
			<For each={props.files}>
				{(file, index) => (
					<div class="flex items-center justify-between bg-surface-variant/50 p-3 rounded-lg border border-outline/20">
						<div class="flex items-center gap-3 overflow-hidden">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24"
								class="fill-primary shrink-0"
							>
								<path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0 0v-560 560Zm280-280 160-160H200v320h440L480-480Z" />
							</svg>
							<div class="flex flex-col truncate">
								<span class="text-on-surface truncate font-medium">{file.name}</span>
								<span class="text-xs text-on-surface-variant">{(file.size / 1024).toFixed(1)} KB</span>
							</div>
						</div>
						<button
							onClick={() => props.onRemove(index())}
							class="p-2 hover:bg-error-container/20 rounded-full text-on-surface-variant hover:text-error transition-colors"
							title="Remove file"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 -960 960 960"
								width="24"
								class="fill-current"
							>
								<path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-612h80v368h-80v-368Zm160 0h80v368h-80v-368ZM280-720v520-520Z" />
							</svg>
						</button>
					</div>
				)}
			</For>
		</div>
	);
};

export default FileList;
