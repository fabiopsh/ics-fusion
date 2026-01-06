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

	// Registry to track events we have included
	// Key: "StartDate_EndDate_Summary_Location" -> to detect exact duplicates
	const processedSignatures = new Set<string>();

	for (const file of files) {
		try {
			const component = await parseIcsFile(file);
			// We assume the root is VCALENDAR. We extract all VEVENTs.
			const events = component.getAllSubcomponents("vevent");

			for (const event of events) {
				const summary = event.getFirstPropertyValue("summary") || "";
				const location = event.getFirstPropertyValue("location") || "";

				const dtStartProp = event.getFirstPropertyValue("dtstart");
				const startDate = dtStartProp ? dtStartProp.toString() : "";

				const dtEndProp = event.getFirstPropertyValue("dtend");
				const endDate = dtEndProp ? dtEndProp.toString() : "";

				// Enhanced signature for robust duplicate detection
				const signature = `${startDate}_${endDate}_${summary}_${location}`;

				if (processedSignatures.has(signature)) {
					// Exact duplicate found (same time, name, loc). SKIP it.
					continue;
				}

				// It's a valid, unique event instance.
				processedSignatures.add(signature);

				// STRATEGY: Fresh UUIDs
				// The input files have weak/repetitive UIDs (e.g. "0@default") which confuse Google Calendar.
				// We intentionally ignore the input UID and generate a fresh, standards-compliant UUID.
				const newUid = `${crypto.randomUUID()}@ics-fusion`;
				event.updatePropertyWithValue("uid", newUid);

				// Ensure DTSTAMP is updated to now, as we are effectively creating a new record of this event
				// checking if ICAL.Time.now() is available or construct it manually
				try {
					const now = ICAL.Time.now();
					event.updatePropertyWithValue("dtstamp", now);
				} catch (e) {
					// Fallback if ICAL.Time.now() fails or isn't standard
					// Usually ical.js handles this, if not we leave original or set string
				}

				allEvents.push(event);
			}
		} catch (e) {
			console.error(`Error parsing file ${file.name}:`, e);
			throw new Error(`Failed to parse ${file.name}`);
		}
	}

	// Create new VCALENDAR
	const mergedCalendar = new ICAL.Component(["vcalendar", [], []]);
	mergedCalendar.updatePropertyWithValue("version", "2.0");
	mergedCalendar.updatePropertyWithValue("prodid", "-//ICS Fusion App//IT");
	mergedCalendar.updatePropertyWithValue("calscale", "GREGORIAN");
	mergedCalendar.updatePropertyWithValue("method", "PUBLISH"); // Helpful for some importers

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
