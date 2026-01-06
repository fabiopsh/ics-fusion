Documento dei Requisiti Tecnici e Funzionali: ICS Fusion

1. Introduzione

L'obiettivo del progetto è creare una Web Application "client-side" denominata ICS Fusion. L'app permette agli utenti di caricare più file in formato .ics, unificarne il contenuto in un unico flusso di eventi e scaricare un file finale consolidato, il tutto con un'esperienza utente moderna e curata.

2. Obiettivi Funzionali

L'utente deve essere in grado di:

Caricare file: Selezionare più file .ics tramite input classico o drag-and-drop.

Gestire la coda: Visualizzare l'elenco dei file pronti per l'unione e poter rimuovere quelli errati.

Processare l'unione: Avviare il merging tramite un'azione chiara e intuitiva.

Scaricare il risultato: Ottenere un file fusion_calendar.ics con tutti gli eventi aggregati.

Feedback di sistema: Visualizzare stati di caricamento, successo o errore tramite componenti UI dedicati.

3. Requisiti Tecnici e Design

Per garantire prestazioni, portabilità e un'estetica professionale:

Framework: SolidJS (scelto per la reattività granulare e le performance).

Linguaggio: TypeScript (per la robustezza del codice).

Design System: Material Design 3 (M3) di Google. L'interfaccia deve utilizzare componenti e stili tipici di M3 (es. angoli arrotondati, palette colori dinamica, icone simboliche).

Stilizzazione: Tailwind CSS (configurato con i design token di Material 3).

Librerie core: ical.js per il parsing dei dati.

Hosting: Deploy statico su GitHub Pages.

4. Logica di Elaborazione (Specifiche per l'Agente IA)

L'agente deve implementare la seguente logica:

A. Parsing e Estrazione

Leggere ogni file caricato come testo.

Isolare i blocchi BEGIN:VEVENT ... END:VEVENT.

Validare che il file contenga almeno un evento valido.

B. Algoritmo di Unione (ICS Fusion)

Il file finale deve essere ricostruito come segue:

Header:

BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//ICS Fusion App//IT
CALSCALE:GREGORIAN

Corpo: Inserimento di tutti i blocchi VEVENT collezionati.

Footer:

END:VCALENDAR

5. Architettura della UI (Material Design 3)

L'interfaccia deve riflettere la gerarchia di M3:

Top App Bar: Contenente il titolo "ICS Fusion" e un'eventuale icona di calendario.

Main Container: Una superficie (Surface) centrale con angoli molto arrotondati (24px-28px).

Upload Area: Una "Dashed Card" che funge da zona di drop.

File List: Utilizzare "List Items" di M3 con icone per la rimozione dei file.

FAB (Floating Action Button) o Filled Button: Per avviare il processo di "Fusion".

Snackbar: Per notifiche brevi di operazione completata.

6. Vincoli

Esecuzione 100% lato client (Privacy-first).

Gestione della codifica caratteri UTF-8 per supportare accenti e simboli negli eventi.
