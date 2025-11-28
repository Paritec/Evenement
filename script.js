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

            // Appel à la fonction corrigée pour parser les données
            const events = parseCSVData(csvData);
            
            const todayEvents = [];
            const tomorrowEvents = [];
            const dayAfterTomorrowEvents = [];

            events.forEach(event => {
                // Assurez-vous que les données nécessaires existent et sont valides
                if (!event["Mois_Naissance"] || !event["Jour_Naissance"]) {
                    // Ignorer les lignes de données invalides ou vides
                    return; 
                }

                const eventDate = new Date(today.getFullYear(), event.Mois_Naissance - 1, event.Jour_Naissance);
                const feteDate = new Date(today.getFullYear(), event.Mois_Fête - 1, event.Jour_Fête);

                // Aujourd'hui
                if (isSameDay(eventDate, today)) {
                    todayEvents.push({
                        message: `Anniversaire de ${event["Prénom"] || "Prénom inconnu"} ${event.Nom || "Nom inconnu"} ${calculateAge(event.Année_Naissance)} ans`,
                        sexe: event.Sexe
                    });
                }
                if (isSameDay(feteDate, today)) {
                    todayEvents.push({
                        message: `Fête de ${event["Prénom"] || "Prénom inconnu"} ${event.Nom || "Nom inconnu"}`,
                        sexe: event.Sexe
                    });
                }

                // Demain
                if (isSameDay(eventDate, tomorrow)) {
                    tomorrowEvents.push({
                        message: `Demain, Anniversaire de ${event["Prénom"] || "Prénom inconnu"} ${event.Nom || "Nom inconnu"} ${calculateAge(event.Année_Naissance)} ans`,
                        sexe: event.Sexe
                    });
                }
                if (isSameDay(feteDate, tomorrow)) {
                    tomorrowEvents.push({
                        message: `Demain, Fête de ${event["Prénom"] || "Prénom inconnu"} ${event.Nom || "Nom inconnu"}`,
                        sexe: event.Sexe
                    });
                }

                // Après-demain
                if (isSameDay(eventDate, dayAfterTomorrow)) {
                    dayAfterTomorrowEvents.push({
                        message: `Après-demain, Anniversaire de ${event["Prénom"] || "Prénom inconnu"} ${event.Nom || "Nom inconnu"} ${calculateAge(event.Année_Naissance)} ans`,
                        sexe: event.Sexe
                    });
                }
                if (isSameDay(feteDate, dayAfterTomorrow)) {
                    dayAfterTomorrowEvents.push({
                        message: `Après-demain, Fête de ${event["Prénom"] || "Prénom inconnu"} ${event.Nom || "Nom inconnu"}`,
                        sexe: event.Sexe
                    });
                }
            });

            displayEvents(todayEvents, tomorrowEvents, dayAfterTomorrowEvents);
        });
}

// Fonction pour analyser les données CSV en un tableau d'objets
function parseCSVData(csv) {
    // Sépare les lignes et retire les lignes vides
    const lines = csv.split("\n").map(line => line.trim()).filter(line => line.length > 0);
    
    // ⭐ MODIFICATION CLÉ 1 : Les en-têtes sont dans la LIGNE 5 du CSV (index 4)
    const headers = lines[4].split(",").map(header => header.trim());

    // ⭐ MODIFICATION CLÉ 2 : Le traitement des données commence à la LIGNE 6 du CSV (index 5)
    // Ceci ignore les 4 lignes de configuration + la ligne d'en-tête
    return lines.slice(5).map(line => { 
        const data = line.split(",");
        const event = {};
        
        headers.forEach((header, index) => {
            // Assure la robustesse contre les colonnes manquantes
            if (header) { 
                event[header] = data[index] ? data[index].trim() : "";
            }
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
    // Gère le cas où l'année de naissance n'est pas un nombre valide
    if (isNaN(parseInt(birthYear))) return "??"; 
    return today.getFullYear() - parseInt(birthYear);
}

// Fonction pour afficher les événements avec formatage
function displayEvents(todayEvents, tomorrowEvents, dayAfterTomorrowEvents) {
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
            eventElement.style.fontSize = "24px";  
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
            eventElement.style.fontSize = "24px";  
            container.appendChild(eventElement);
        });
    }

    if (dayAfterTomorrowEvents.length > 0) {
        const dayAfterTomorrowHeader = document.createElement("h3");
        dayAfterTomorrowHeader.innerText = "Événements après-demain";
        container.appendChild(dayAfterTomorrowHeader);

        dayAfterTomorrowEvents.forEach(event => {
            const eventElement = document.createElement("p");
            eventElement.innerText = event.message;
            eventElement.style.color = event.sexe === "Homme" ? "blue" : "red";
            eventElement.style.fontSize = "24px";  
            container.appendChild(eventElement);
        });
    }
}

// Charger et afficher les événements au chargement de la page
document.addEventListener("DOMContentLoaded", loadAndDisplayEvents);
