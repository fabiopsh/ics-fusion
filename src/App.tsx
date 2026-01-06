import type { Component } from "solid-js";
import { createSignal, createEffect } from "solid-js";
import Layout from "./components/Layout";
import UploadArea from "./components/UploadArea";
import FileList from "./components/FileList";
import OutputPreview from "./components/OutputPreview";
import Snackbar from "./components/Snackbar";
import { mergeIcsFiles, downloadIcsFile } from "./utils/icsUtils";
import ICAL from "ical.js";

const App: Component = () => {
	const [files, setFiles] = createSignal<File[]>([]);
	const [mergedContent, setMergedContent] = createSignal<string>("");
	const [eventCount, setEventCount] = createSignal<number>(0);
	const [isProcessing, setIsProcessing] = createSignal(false);
	const [snackbar, setSnackbar] = createSignal<{ isOpen: boolean; message: string; type: "success" | "error" }>({
		isOpen: false,
		message: "",
		type: "success",
	});

	const handleFilesAdded = (newFiles: File[]) => {
		setFiles((prev) => [...prev, ...newFiles]);
	};

	const handleRemoveFile = (index: number) => {
		setFiles((prev) => prev.filter((_, i) => i !== index));
	};

	const handleClearAll = () => {
		setFiles([]);
	};

	// Real-time merging
	createEffect(async () => {
		const currentFiles = files();
		if (currentFiles.length === 0) {
			setMergedContent("");
			setEventCount(0);
			return;
		}

		setIsProcessing(true);
		try {
			const mergedIcs = await mergeIcsFiles(currentFiles);
			setMergedContent(mergedIcs);

			// Basic event counting using ical.js structure assumption
			const jcalData = ICAL.parse(mergedIcs);
			const component = new ICAL.Component(jcalData);
			const events = component.getAllSubcomponents("vevent");
			setEventCount(events.length);
		} catch (error) {
			console.error(error);
			setSnackbar({ isOpen: true, message: "Error merging files.", type: "error" });
		} finally {
			setIsProcessing(false);
		}
	});

	const handleDownload = () => {
		if (!mergedContent()) return;
		downloadIcsFile(mergedContent());
		setSnackbar({ isOpen: true, message: "Download started!", type: "success" });
	};

	return (
		<Layout>
			<div class="h-full grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-outline/10">
				{/* Column 1: Upload */}
				<div class="flex flex-col p-6 h-full overflow-hidden">
					<h2 class="text-xl font-medium text-on-surface mb-6 flex items-center gap-2">
						<span class="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
							1
						</span>
						Upload
					</h2>
					<div class="flex-1 flex flex-col justify-center">
						<UploadArea onFilesAdded={handleFilesAdded} />
					</div>
				</div>

				{/* Column 2: List */}
				<div class="flex flex-col p-6 h-full overflow-hidden relative bg-surface">
					<div class="flex items-center justify-between mb-6 shrink-0 z-10">
						<h2 class="text-xl font-medium text-on-surface flex items-center gap-2">
							<span class="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
								2
							</span>
							Files
						</h2>
						{files().length > 0 && (
							<button
								onClick={handleClearAll}
								class="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
							>
								Clear All
							</button>
						)}
					</div>

					<div class="flex-1 overflow-y-auto pr-2 -mr-2">
						{files().length > 0 ? (
							<FileList files={files()} onRemove={handleRemoveFile} />
						) : (
							<div class="h-full flex flex-col items-center justify-center text-on-surface-variant/50 text-sm">
								No files selected
							</div>
						)}
					</div>
				</div>

				{/* Column 3: Output */}
				<OutputPreview
					mergedContent={mergedContent()}
					eventCount={eventCount()}
					onDownload={handleDownload}
					isProcessing={isProcessing()}
				/>
			</div>

			<Snackbar
				isOpen={snackbar().isOpen}
				message={snackbar().message}
				type={snackbar().type}
				onClose={() => setSnackbar({ ...snackbar(), isOpen: false })}
			/>
		</Layout>
	);
};

export default App;
