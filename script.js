const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1xVBY-Cpbtr64MbCJuzKHm3oAtf0Z8fbJmSRvf3SkswI/pub?output=csv';

function loadAndDisplayEvents() {
    fetch(SHEET_CSV_URL)
        .then(response => response.text())
        .then(csvData => {
            const today = new Date();
            const tomorrow = new Date();
            tomorrow.setDate(today.getDate() + 1);
            const dayAfterTomorrow = new Date();
            dayAfterTomorrow.setDate(today.getDate() + 2);

            const events = parseCSVData(csvData);
            
            const todayEvents = [];
            const tomorrowEvents = [];
            const dayAfterTomorrowEvents = [];

            events.forEach(event => {
                // Nettoyage des données
                const prenom = (event["Prénom"] || "").trim();
                const nom = (event["Nom"] || "").trim();
                const moisN = parseInt(event["Mois_Naissance"]);
                const jourN = parseInt(event["Jour_Naissance"]);
                const moisF = parseInt(event["Mois_Fête"]);
                const jourF = parseInt(event["Jour_Fête"]);
                const anneeN = parseInt(event["Année_Naissance"]);

                // --- CONDITION STRICTE DE BASE : Nom et Prénom obligatoires ---
                if (prenom === "" || nom === "") {
                    return; // On ignore totalement cette ligne
                }

                // --- LOGIQUE DE LIAISON DE/D' ---
                let liaison = " de ";
                const premiereLettre = prenom.charAt(0).toUpperCase();
                const voyelles = ["A", "E", "I", "O", "U", "Y", "É", "È", "Ê", "Ë", "À", "Â", "Î", "Ï", "Ô", "Û", "Ù"];
                if (voyelles.includes(premiereLettre)) {
                    liaison = " d'";
                }

                // --- TRAITEMENT DES ANNIVERSAIRES ---
                // Condition : Jour, Mois et Année de naissance doivent être valides (> 0)
                if (!isNaN(jourN) && jourN > 0 && !isNaN(moisN) && moisN > 0 && !isNaN(anneeN) && anneeN > 0) {
                    const eventDate = new Date(today.getFullYear(), moisN - 1, jourN);
                    const age = today.getFullYear() - anneeN;
                    const msgAnniv = `Anniversaire${liaison}${prenom} ${nom} ${age} ans`;

                    if (isSameDay(eventDate, today)) {
                        todayEvents.push({ message: msgAnniv, sexe: event.Sexe });
                    } else if (isSameDay(eventDate, tomorrow)) {
                        tomorrowEvents.push({ message: `Demain, ${msgAnniv}`, sexe: event.Sexe });
                    } else if (isSameDay(eventDate, dayAfterTomorrow)) {
                        dayAfterTomorrowEvents.push({ message: `Après-demain, ${msgAnniv}`, sexe: event.Sexe });
                    }
                }

                // --- TRAITEMENT DES FÊTES ---
                // Condition : Jour et Mois de fête doivent être valides (> 0)
                if (!isNaN(jourF) && jourF > 0 && !isNaN(moisF) && moisF > 0) {
                    const feteDate = new Date(today.getFullYear(), moisF - 1, jourF);
                    const msgFete = `Fête${liaison}${prenom} ${nom}`;

                    if (isSameDay(feteDate, today)) {
                        todayEvents.push({ message: msgFete, sexe: event.Sexe });
                    } else if (isSameDay(feteDate, tomorrow)) {
                        tomorrowEvents.push({ message: `Demain, ${msgFete}`, sexe: event.Sexe });
                    } else if (isSameDay(feteDate, dayAfterTomorrow)) {
                        dayAfterTomorrowEvents.push({ message: `Après-demain, ${msgFete}`, sexe: event.Sexe });
                    }
                }
            });

            displayEvents(todayEvents, tomorrowEvents, dayAfterTomorrowEvents);
        });
}

function parseCSVData(csv) {
    const lines = csv.split("\n").map(line => line.trim()).filter(line => line.length > 0);
    const headers = lines[4].split(",").map(header => header.trim());

    return lines.slice(5).map(line => { 
        const data = line.split(",");
        const event = {};
        headers.forEach((header, index) => {
            if (header) { 
                event[header] = data[index] ? data[index].trim() : "";
            }
        });
        return event;
    });
}

function isSameDay(date1, date2) {
    return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth();
}

function displayEvents(todayEvents, tomorrowEvents, dayAfterTomorrowEvents) {
    const container = document.getElementById("events");
    container.innerHTML = "";

    const renderSection = (title, eventsList) => {
        if (eventsList.length > 0) {
            const header = document.createElement("h3");
            header.innerText = title;
            container.appendChild(header);
            eventsList.forEach(event => {
                const p = document.createElement("p");
                p.innerText = event.message;
                p.style.color = event.sexe === "Homme" ? "blue" : "red";
                p.style.fontSize = "24px";  
                container.appendChild(p);
            });
        }
    };

    renderSection("Événements d'aujourd'hui", todayEvents);
    renderSection("Événements de demain", tomorrowEvents);
    renderSection("Événements après-demain", dayAfterTomorrowEvents);
}

document.addEventListener("DOMContentLoaded", loadAndDisplayEvents);