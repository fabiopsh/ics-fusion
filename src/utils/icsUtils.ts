import ICAL from "ical.js";

export const parseIcsFile = (file: File): Promise<ICAL.Component> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = (e) => {
			try {
				const text = e.target?.result as string;
				const jcalData = ICAL.parse(text);
				const component = new ICAL.Component(jcalData);
				resolve(component);
			} catch (err) {
				reject(err);
			}
		};
		reader.onerror = (err) => reject(err);
		reader.readAsText(file);
	});
};

export const mergeIcsFiles = async (files: File[]): Promise<string> => {
	const allEvents: ICAL.Component[] = [];

	for (const file of files) {
		try {
			const component = await parseIcsFile(file);
			// We assume the root is VCALENDAR. We extract all VEVENTs.
			const events = component.getAllSubcomponents("vevent");
			allEvents.push(...events);
		} catch (e) {
			console.error(`Error parsing file ${file.name}:`, e);
			// Constructing a simpler error with file name
			throw new Error(`Failed to parse ${file.name}`);
		}
	}

	// Create new VCALENDAR
	const mergedCalendar = new ICAL.Component(["vcalendar", [], []]);
	mergedCalendar.updatePropertyWithValue("version", "2.0");
	mergedCalendar.updatePropertyWithValue("prodid", "-//ICS Fusion App//IT");
	mergedCalendar.updatePropertyWithValue("calscale", "GREGORIAN");

	// Add all events
	for (const event of allEvents) {
		mergedCalendar.addSubcomponent(event);
	}

	return mergedCalendar.toString();
};

export const downloadIcsFile = (content: string, filename: string = "fusion_calendar.ics") => {
	const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
};
