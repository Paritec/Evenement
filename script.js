// URL du fichier CSV publié de Google Sheets
//https://docs.google.com/spreadsheets/d/e/2PACX-1vRR-tdJ_UMTbpAFKRhtxzS_V6fnUVwfK2a4wQr1gcx0Fc5XRy8Lw5OpGkEKx10Kj-PJA7pix-Nmxr-p/pub?gid=0&single=true&output=csv
const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1xVBY-Cpbtr64MbCJuzKHm3oAtf0Z8fbJmSRvf3SkswI/pub?gid=0&single=true&output=csv';

// Fonction pour charger les données CSV de Google Sheets
async function loadSheetData() {
    try {
        const response = await fetch(SHEET_CSV_URL);
        const csvText = await response.text();

        // Conversion CSV en tableau d'objets
        const events = parseCSV(csvText);

        afficherEvenements(events);

    } catch (error) {
        console.error("Erreur lors du chargement des données CSV de la feuille Google Sheets :", error);
    }
}

// Fonction pour convertir le texte CSV en tableau d'objets
function parseCSV(csvText) {
    const rows = csvText.split('\n').map(row => row.split(','));
    const headers = rows[0];
    return rows.slice(1).map(row => {
        let event = {};
        headers.forEach((header, index) => {
            event[header.trim()] = row[index].trim();
        });
        return event;
    });
}

// Fonction pour afficher les événements
function afficherEvenements(events) {
    const eventsContainer = document.getElementById("eventsContainer");
    eventsContainer.innerHTML = ''; // Vider le contenu précédent

    events.forEach(event => {
        const eventElement = document.createElement("div");
        const age = calculateAge(event['Année_Naissance']);
        eventElement.className = event['Sexe'] === 'Homme' ? 'event-homme' : 'event-femme';

        // Formatage des informations de l'événement
        eventElement.innerHTML = `
            <p>${event['Nom']} ${event['Prénom']} - Anniversaire : ${event['Jour_Naissance']}/${event['Mois_Naissance']}, ${age} ans</p>
            <p>Fête : ${event['Jour_Fête']}/${event['Mois_Fête']}</p>
        `;

        eventsContainer.appendChild(eventElement);
    });
}

// Fonction pour calculer l'âge
function calculateAge(birthYear) {
    const today = new Date();
    return today.getFullYear() - birthYear;
}

// Charger les données de la feuille Google Sheets au chargement de la page
document.addEventListener("DOMContentLoaded", loadSheetData);
