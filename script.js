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

// Fonction pour charger et afficher les événements du jour et de demain
function afficherEvenements(events) {
    const today = new Date();
	//const today = new Date("2024-11-10"); 
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    events.forEach(event => {
        const age = event.Année_Anniversaire ? calculateAge(event.Année_Anniversaire) : null;

        const todayEventText = age !== null ? `Anniversaire de ${event.Prénom} ${event.Nom} (${age} ans)` : `Fête de ${event.Prénom} ${event.Nom}`;
        const tomorrowEventText = age !== null ? `Demain Anniversaire de ${event.Prénom} ${event.Nom} (${age} ans)` : `Demain Fête de ${event.Prénom} ${event.Nom}`;

        // Vérifier les anniversaires
        if (event.Jour_Anniversaire && event.Mois_Anniversaires) {
            const eventDate = new Date(today.getFullYear(), event.Mois_Anniversaires - 1, event.Jour_Anniversaire);
            if (eventDate.getDate() === today.getDate() && eventDate.getMonth() === today.getMonth()) {
                addEventToDOM(`Anniversaire de ${event.Prénom} ${event.Nom} (${age} ans)`, event.Sexe);
            } else if (eventDate.getDate() === tomorrow.getDate() && eventDate.getMonth() === tomorrow.getMonth()) {
                addEventToDOM(`Demain Anniversaire de ${event.Prénom} ${event.Nom} (${age} ans)`, event.Sexe);
            }
        }

        // Vérifier les fêtes
        if (event.Jour_Fête && event.Mois_Fête) {
            const feteDate = new Date(today.getFullYear(), event.Mois_Fête - 1, event.Jour_Fête);
            if (feteDate.getDate() === today.getDate() && feteDate.getMonth() === today.getMonth()) {
                addEventToDOM(`Fête de ${event.Prénom} ${event.Nom}`, event.Sexe);
            } else if (feteDate.getDate() === tomorrow.getDate() && feteDate.getMonth() === tomorrow.getMonth()) {
                addEventToDOM(`Demain Fête de ${event.Prénom} ${event.Nom}`, event.Sexe);
            }
        }
    });
}


// Charger les données de la feuille Google Sheets au chargement de la page
document.addEventListener("DOMContentLoaded", loadSheetData);
