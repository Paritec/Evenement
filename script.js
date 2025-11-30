const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1xVBY-Cpbtr64MbCJuzKHm3oAtf0Z8fbJmSRvf3SkswI/pub?output=csv';

/**
 * Fonction principale : charge les données, les filtre et lance l'affichage.
 */
function loadAndDisplayEvents() {

    // --- CORRECTION DU CACHE : AJOUT D'UN HORODATAGE À L'URL ---
    const uniqueURL = `${SHEET_CSV_URL}&timestamp=${new Date().getTime()}`;

    fetch(uniqueURL)
        .then(response => response.text())
        .then(csvData => {
            
            // 1. CORRECTION: Ignorer les 4 premières lignes de configuration (Lignes 1 à 4)
            const lines = csvData.split('\n');
            const dataLines = lines.slice(4).join('\n'); // Utilise la ligne 5 (en-tête) comme première ligne de données
            
            const today = new Date();
            const tomorrow = new Date();
            tomorrow.setDate(today.getDate() + 1);
            const dayAfterTomorrow = new Date();
            dayAfterTomorrow.setDate(today.getDate() + 2);

            // Parsing des données nettoyées
            const events = parseCSVData(dataLines);
            
            const todayEvents = [];
            const tomorrowEvents = [];
            const dayAfterTomorrowEvents = [];

            // 2. LOGIQUE: Filtrer les événements avec validation STRICTE et INDÉPENDANTE
            events.forEach(event => {
                
                // NOUVELLE VÉRIFICATION BASE : Nettoyage et vérification de la longueur des chaînes
                const prenom = (event["Prénom"] || "").trim();
                const nom = (event["Nom"] || "").trim();
                
                // Conditions de base: Nom et Prénom doivent avoir une longueur > 0
                const baseConditions = prenom.length > 0 && nom.length > 0;

                // --- A. GESTION DE L'ANNIVERSAIRE ---
                let eventDate = null;
                // Anniversaire complet : Nom/Prénom + Année/Mois/Jour > 0
                const anivComplet = baseConditions &&
                                       event.Année_Naissance > 0 &&
                                       event.Mois_Naissance > 0 && 
                                       event.Jour_Naissance > 0;
                
                if (anivComplet) {
                    eventDate = new Date(today.getFullYear(), event.Mois_Naissance - 1, event.Jour_Naissance);
                }

                // --- B. GESTION DE LA FÊTE ---
                let feteDate = null;
                // Fête complète : Nom/Prénom + Mois/Jour > 0
                const feteComplet = baseConditions &&
                                       event.Mois_Fête > 0 &&
                                       event.Jour_Fête > 0;
                                       
                if (feteComplet) {
                    feteDate = new Date(today.getFullYear(), event.Mois_Fête - 1, event.Jour_Fête);
                }

                // --- AJOUT DES ÉVÉNEMENTS VALIDÉS : ANNIVERSAIRES ---
                if (eventDate) {
                    const age = calculateAge(event.Année_Naissance);
                    const ageText = age !== "??" ? ` ${age} ans` : "";
                    
                    // UTILISATION DES VARIABLES NETTOYÉES
                    const messageBase = `${prenom} ${nom}${ageText}`;
                    
                    if (isSameDay(eventDate, today)) {
                        todayEvents.push({
                            message: `Anniversaire de ${messageBase}`,
                            sexe: event.Sexe
                        });
                    }
                    if (isSameDay(eventDate, tomorrow)) {
                        tomorrowEvents.push({
                            message: `Demain, Anniversaire de ${messageBase}`,
                            sexe: event.Sexe
                        });
                    }
                    if (isSameDay(eventDate, dayAfterTomorrow)) {
                        dayAfterTomorrowEvents.push({
                            message: `Après-demain, Anniversaire de ${messageBase}`,
                            sexe: event.Sexe
                        });
                    }
                }

                // --- AJOUT DES ÉVÉNEMENTS VALIDÉS : FÊTES ---
                if (feteDate) {
                    // UTILISATION DES VARIABLES NETTOYÉES
                    const messageBase = `${prenom} ${nom}`;

                    if (isSameDay(feteDate, today)) {
                        todayEvents.push({
                            message: `Fête de ${messageBase}`,
                            sexe: event.Sexe
                        });
                    }
                    if (isSameDay(feteDate, tomorrow)) {
                        tomorrowEvents.push({
                            message: `Demain, Fête de ${messageBase}`,
                            sexe: event.Sexe
                        });
                    }
                    if (isSameDay(feteDate, dayAfterTomorrow)) {
                        dayAfterTomorrowEvents.push({
                            message: `Après-demain, Fête de ${messageBase}`,
                            sexe: event.Sexe
                        });
                    }
                }
            });

            // L'appel final envoie les 3 tableaux
            displayEvents(todayEvents, tomorrowEvents, dayAfterTomorrowEvents);
        });
}

// ----------------------------------------------------------------------
// --- FONCTIONS AUXILIAIRES REQUISES PAR LE SCRIPT (Non modifiées) ---
// ----------------------------------------------------------------------

function parseCSVData(csvData) {
    const lines = csvData.trim().split('\n');
    if (lines.length <= 1) return []; 
    const headers = lines[0].split(',').map(header => header.trim());
    const events = [];
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        if (values.length === headers.length) {
            const event = {};
            for (let j = 0; j < headers.length; j++) {
                const key = headers[j];
                let value = values[j].trim();
                if (['Année_Naissance', 'Mois_Naissance', 'Jour_Naissance', 'Mois_Fête', 'Jour_Fête'].includes(key)) {
                    event[key] = parseInt(value) || 0; 
                } else {
                    event[key] = value;
                }
            }
            events.push(event);
        }
    }
    return events;
}

function calculateAge(birthYear) {
    const today = new Date();
    if (birthYear && birthYear > 1900 && birthYear <= today.getFullYear()) {
        return today.getFullYear() - birthYear;
    }
    return "??";
}

function isSameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
}


function displayEvents(todayEvents, tomorrowEvents, dayAfterTomorrowEvents) {
    const container = document.getElementById("events");
    if (!container) return; 
    
    container.innerHTML = "";

    const renderSection = (title, eventsList) => {
        if (eventsList.length > 0) {
            const header = document.createElement("h3");
            header.innerText = title;
            header.style.marginTop = "15px";
            container.appendChild(header);

            eventsList.forEach(event => {
                const eventElement = document.createElement("p");
                eventElement.innerText = event.message;
                const sexe = (event.sexe || "").trim().toLowerCase();
                eventElement.style.color = sexe === "homme" ? "blue" : "red";
                eventElement.style.fontSize = "24px"; 
                container.appendChild(eventElement);
            });
        }
    };

    renderSection("Événements aujourd'hui", todayEvents);
    renderSection("Événements demain", tomorrowEvents);
    renderSection("Événements après-demain", dayAfterTomorrowEvents);
}

document.addEventListener("DOMContentLoaded", loadAndDisplayEvents);
