const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1xVBY-Cpbtr64MbCJuzKHm3oAtf0Z8fbJmSRvf3SkswI/pub?output=csv';

/**
 * Fonction principale : charge les données, les filtre et lance l'affichage.
 */
function loadAndDisplayEvents() {

    fetch(SHEET_CSV_URL)
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

            // 2. NOUVELLE LOGIQUE: Filtrer les événements avec validation stricte
            events.forEach(event => {
                
                // Conditions de base: Prénom et Nom doivent être présents pour TOUT événement
                const baseConditions = event["Prénom"] && event["Nom"];

                // A. CONDITIONS ANNIVERSAIRE: Prénom, Nom, Année, Mois, Jour
                const anivConditions = baseConditions &&
                                       event.Année_Naissance > 0 && // Vérifie que l'année est un nombre > 0
                                       event.Mois_Naissance > 0 && 
                                       event.Jour_Naissance > 0;
                
                let eventDate = null;
                if (anivConditions) {
                    // Les mois JS sont basés sur 0 (Janvier=0), d'où le '- 1'
                    eventDate = new Date(today.getFullYear(), event.Mois_Naissance - 1, event.Jour_Naissance);
                }

                // B. CONDITIONS FÊTE: Prénom, Nom, Mois, Jour
                const feteConditions = baseConditions &&
                                       event.Mois_Fête > 0 &&
                                       event.Jour_Fête > 0;
                                       
                let feteDate = null;
                if (feteConditions) {
                    feteDate = new Date(today.getFullYear(), event.Mois_Fête - 1, event.Jour_Fête);
                }

                // --- AJOUT DES ÉVÉNEMENTS VALIDÉS : ANNIVERSAIRES ---
                if (eventDate) {
                    const age = calculateAge(event.Année_Naissance);
                    const ageText = age !== "??" ? ` ${age} ans` : "";
                    const messageBase = `${event["Prénom"]} ${event.Nom}${ageText}`;
                    
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
                    const messageBase = `${event["Prénom"]} ${event.Nom}`;

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
// --- FONCTIONS AUXILIAIRES REQUISES PAR LE SCRIPT ---
// ----------------------------------------------------------------------

/**
 * Analyse le texte CSV et le convertit en un tableau d'objets JavaScript.
 * @param {string} csvData - Le texte CSV nettoyé (sans les lignes 1-4).
 */
function parseCSVData(csvData) {
    const lines = csvData.trim().split('\n');
    if (lines.length <= 1) return []; // Moins de deux lignes (en-tête + données)
    
    // Récupère les en-têtes (qui correspondent à la ligne 5 de la Google Sheet)
    const headers = lines[0].split(',').map(header => header.trim());
    
    const events = [];
    
    // Parcourt les lignes de données (à partir de la deuxième ligne du CSV)
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        
        // S'assure que le nombre de valeurs correspond au nombre d'en-têtes
        if (values.length === headers.length) {
            const event = {};
            for (let j = 0; j < headers.length; j++) {
                const key = headers[j];
                let value = values[j].trim();
                
                // Convertit les champs de date/année en nombres pour la validation (0 si vide)
                if (['Année_Naissance', 'Mois_Naissance', 'Jour_Naissance', 'Mois_Fête', 'Jour_Fête'].includes(key)) {
                    // Utilise parseInt pour s'assurer que c'est un nombre, 0 si ce n'est pas un nombre
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

/**
 * Calcule l'âge à partir de l'année de naissance.
 * @param {number} birthYear - L'année de naissance.
 * @returns {number|string} L'âge ou "??" si l'année n'est pas valide.
 */
function calculateAge(birthYear) {
    const today = new Date();
    // Ne calcule l'âge que si l'année est un nombre valide
    if (birthYear && birthYear > 1900 && birthYear <= today.getFullYear()) {
        return today.getFullYear() - birthYear;
    }
    return "??";
}

/**
 * Compare si deux objets Date représentent le même jour (année, mois, jour).
 */
function isSameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
}


/**
 * Affiche les événements dans l'élément HTML avec l'ID "events".
 * N'affiche rien si la liste des événements est vide.
 */
function displayEvents(todayEvents, tomorrowEvents, dayAfterTomorrowEvents) {
    const container = document.getElementById("events");
    // Sort si l'élément "events" n'existe pas ou si aucune liste d'événement n'est fournie
    if (!container) return; 
    
    // Réinitialise le contenu du conteneur
    container.innerHTML = "";

    // Fonction utilitaire pour le rendu d'une section
    const renderSection = (title, eventsList) => {
        if (eventsList.length > 0) {
            const header = document.createElement("h3");
            header.innerText = title;
            header.style.marginTop = "15px";
            container.appendChild(header);

            eventsList.forEach(event => {
                const eventElement = document.createElement("p");
                eventElement.innerText = event.message;
                // Détermination de la couleur (Rouge pour Femme, Bleu pour Homme)
                const sexe = (event.sexe || "").trim().toLowerCase();
                eventElement.style.color = sexe === "homme" ? "blue" : "red";
                eventElement.style.fontSize = "24px"; 
                container.appendChild(eventElement);
            });
        }
    };

    // Rendu des trois sections. Si toutes sont vides, le container reste vide.
    renderSection("Événements aujourd'hui", todayEvents);
    renderSection("Événements demain", tomorrowEvents);
    renderSection("Événements après-demain", dayAfterTomorrowEvents);
}

// ----------------------------------------------------------------------

// Charger et afficher les événements au chargement de la page
document.addEventListener("DOMContentLoaded", loadAndDisplayEvents);
