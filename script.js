const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1xVBY-Cpbtr64MbCJuzKHm3oAtf0Z8fbJmSRvf3SkswI/pub?output=csv';

function loadAndDisplayEvents() {
    fetch(SHEET_CSV_URL)
        .then(response => response.text())
        .then(csvData => {
            const today = new Date();
            const tomorrow = new Date();
            tomorrow.setDate(today.getDate() + 1);

            const events = parseCSVData(csvData);
            const todayEvents = [];
            const tomorrowEvents = [];

            // Filtrer les événements du jour et de demain
            events.forEach(event => {
                const eventDate = new Date(today.getFullYear(), event.Mois_Naissance - 1, event.Jour_Naissance);
                const feteDate = new Date(today.getFullYear(), event.Mois_Fête - 1, event.Jour_Fête);

                if (isSameDay(eventDate, today)) {
                    todayEvents.push({
                        message: `Anniversaire de ${event["Prénom"] || "Prénom inconnu"} ${event.Nom || "Nom inconnu"} ${calculateAge(event.Année_Naissance)} ans`,
                        sexe: event.Sexe
                    });
                }
                if (isSameDay(eventDate, tomorrow)) {
                    tomorrowEvents.push({
                        message: `Demain, Anniversaire de ${event["Prénom"] || "Prénom inconnu"} ${event.Nom || "Nom inconnu"} ${calculateAge(event.Année_Naissance)} ans`,
                        sexe: event.Sexe
                    });
                }

                if (isSameDay(feteDate, today)) {
                    todayEvents.push({
                        message: `Fête de ${event["Prénom"] || "Prénom inconnu"} ${event.Nom || "Nom inconnu"}`,
                        sexe: event.Sexe
                    });
                }
                if (isSameDay(feteDate, tomorrow)) {
                    tomorrowEvents.push({
                        message: `Demain, Fête de ${event["Prénom"] || "Prénom inconnu"} ${event.Nom || "Nom inconnu"}`,
                        sexe: event.Sexe
                    });
                }
            });

            displayEvents(todayEvents, tomorrowEvents);
        });
}

// Fonction pour analyser les données CSV en un tableau d'objets
function parseCSVData(csv) {
    const lines = csv.split("\n").map(line => line.trim());
    const headers = lines[0].split(",");

    return lines.slice(1).map(line => {
        const data = line.split(",");
        const event = {};
        headers.forEach((header, index) => {
            event[header.trim()] = data[index] ? data[index].trim() : "";
        });
        return event;
    });
}

// Fonction pour vérifier si deux dates sont le même jour et le même mois
function isSameDay(date1, date2) {
    return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth();
}

// Fonction pour calculer l'âge
function calculateAge(birthYear) {
    const today = new Date();
    return today.getFullYear() - birthYear;
}

// Fonction pour afficher les événements avec formatage
function displayEvents(todayEvents, tomorrowEvents) {
    const container = document.getElementById("events");
    container.innerHTML = "";

    if (todayEvents.length > 0) {
        const todayHeader = document.createElement("h3");
        todayHeader.innerText = "Événements d'aujourd'hui";
        container.appendChild(todayHeader);

        todayEvents.forEach(event => {
            const eventElement = document.createElement("p");
            eventElement.innerText = event.message;
            eventElement.style.color = event.sexe === "Homme" ? "blue" : "red";
            container.appendChild(eventElement);
        });
    }

    if (tomorrowEvents.length > 0) {
        const tomorrowHeader = document.createElement("h3");
        tomorrowHeader.innerText = "Événements de demain";
        container.appendChild(tomorrowHeader);

        tomorrowEvents.forEach(event => {
            const eventElement = document.createElement("p");
            eventElement.innerText = event.message;
            eventElement.style.color = event.sexe === "Homme" ? "blue" : "red";
            container.appendChild(eventElement);
        });
    }
}

// Charger et afficher les événements au chargement de la page
document.addEventListener("DOMContentLoaded", loadAndDisplayEvents);
