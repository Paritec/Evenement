// Données statiques d'événements (au lieu de les charger depuis un fichier JSON)
const eventsData = [
   {
  "Nom": "LONGIS",
  "Prénom": "Christiane",
  "Sexe": "Femme",
  "Année_Anniversaire": 1933,
  "Mois_Anniversaires": 4,
  "Jour_Anniversaire": 10,
  "Mois_Fête": 12,
  "Jour_Fête": 15
 },
 {
  "Nom": "RYO",
  "Prénom": "Michel",
  "Sexe": "Homme",
  "Année_Anniversaire": 1947,
  "Mois_Anniversaires": 6,
  "Jour_Anniversaire": 2,
  "Mois_Fête": 9,
  "Jour_Fête": 26
 },
 {
  "Nom": "RICHARD",
  "Prénom": "Hélène",
  "Sexe": "Femme",
  "Année_Anniversaire": 1936,
  "Mois_Anniversaires": 10,
  "Jour_Anniversaire": 5,
  "Mois_Fête": 8,
  "Jour_Fête": 18
 },
 {
  "Nom": "RICHARD",
  "Prénom": "Arlette",
  "Sexe": "Femme",
  "Année_Anniversaire": 1941,
  "Mois_Anniversaires": 10,
  "Jour_Anniversaire": 5,
  "Mois_Fête": 7,
  "Jour_Fête": 17
 },
 {
  "Nom": "RICHARD",
  "Prénom": "Alain",
  "Sexe": "Homme",
  "Année_Anniversaire": 1945,
  "Mois_Anniversaires": 11,
  "Jour_Anniversaire": 25,
  "Mois_Fête": 9,
  "Jour_Fête": 9
 },
 {
  "Nom": "NOËL",
  "Prénom": "Jean Paul",
  "Sexe": "Homme",
  "Année_Anniversaire": 1944,
  "Mois_Anniversaires": 10,
  "Jour_Anniversaire": 8,
  "Mois_Fête": 6,
  "Jour_Fête": 26
 },
 {
  "Nom": "GRANDIN",
  "Prénom": "Renée",
  "Sexe": "Femme",
  "Année_Anniversaire": 1944,
  "Mois_Anniversaires": 10,
  "Jour_Anniversaire": 31,
  "Mois_Fête": 10,
  "Jour_Fête": 19
 },
 {
  "Nom": "DUBREUIL",
  "Prénom": "Jean Pierre",
  "Sexe": "Homme",
  "Année_Anniversaire": 1947,
  "Mois_Anniversaires": 3,
  "Jour_Anniversaire": 3,
  "Mois_Fête": 6,
  "Jour_Fête": 24
 },
 {
  "Nom": "RICHARD",
  "Prénom": "Jacqueline",
  "Sexe": "Femme",
  "Année_Anniversaire": 1949,
  "Mois_Anniversaires": 1,
  "Jour_Anniversaire": 3,
  "Mois_Fête": 2,
  "Jour_Fête": 8
 },
 {
  "Nom": "LONGIS",
  "Prénom": "Daniel",
  "Sexe": "Homme",
  "Année_Anniversaire": 1953,
  "Mois_Anniversaires": 11,
  "Jour_Anniversaire": 11,
  "Mois_Fête": 12,
  "Jour_Fête": 11
 },
 {
  "Nom": "CLAICHE",
  "Prénom": "Marie France",
  "Sexe": "Femme",
  "Année_Anniversaire": 1954,
  "Mois_Anniversaires": 10,
  "Jour_Anniversaire": 25,
  "Mois_Fête": 4,
  "Jour_Fête": 3
 },
 {
  "Nom": "FURET",
  "Prénom": "Nicole",
  "Sexe": "Femme",
  "Année_Anniversaire": 1955,
  "Mois_Anniversaires": 12,
  "Jour_Anniversaire": 2,
  "Mois_Fête": 3,
  "Jour_Fête": 6
 },
 {
  "Nom": "LONGIS",
  "Prénom": "Josette",
  "Sexe": "Femme",
  "Année_Anniversaire": 1955,
  "Mois_Anniversaires": 10,
  "Jour_Anniversaire": 25,
  "Mois_Fête": 3,
  "Jour_Fête": 19
 },
 {
  "Nom": "RICHARD",
  "Prénom": "Pascal",
  "Sexe": "Homme",
  "Année_Anniversaire": 1957,
  "Mois_Anniversaires": 2,
  "Jour_Anniversaire": 24,
  "Mois_Fête": 5,
  "Jour_Fête": 17
 },
 {
  "Nom": "GOBERT",
  "Prénom": "Pierre",
  "Sexe": "Homme",
  "Année_Anniversaire": 1957,
  "Mois_Anniversaires": 12,
  "Jour_Anniversaire": 23,
  "Mois_Fête": 6,
  "Jour_Fête": 29
 },
 {
  "Nom": "RICHARD",
  "Prénom": "Patricia",
  "Sexe": "Femme",
  "Année_Anniversaire": 1958,
  "Mois_Anniversaires": 10,
  "Jour_Anniversaire": 29,
  "Mois_Fête": 3,
  "Jour_Fête": 17
 },
 {
  "Nom": "GOBERT",
  "Prénom": "Henia",
  "Sexe": "Femme",
  "Année_Anniversaire": 1959,
  "Mois_Anniversaires": 11,
  "Jour_Anniversaire": 2,
  "Mois_Fête": 8,
  "Jour_Fête": 18
 },
 {
  "Nom": "TJONCKE",
  "Prénom": "Bruno",
  "Sexe": "Homme",
  "Année_Anniversaire": 1963,
  "Mois_Anniversaires": 3,
  "Jour_Anniversaire": 14,
  "Mois_Fête": 10,
  "Jour_Fête": 6
 },
 {
  "Nom": "TJONCKE",
  "Prénom": "Nicole",
  "Sexe": "Femme",
  "Année_Anniversaire": 1962,
  "Mois_Anniversaires": 3,
  "Jour_Anniversaire": 31,
  "Mois_Fête": 3,
  "Jour_Fête": 6
 },
 {
  "Nom": "LEHMANN",
  "Prénom": "Nadia",
  "Sexe": "Femme",
  "Année_Anniversaire": 1975,
  "Mois_Anniversaires": 2,
  "Jour_Anniversaire": 1,
  "Mois_Fête": 9,
  "Jour_Fête": 18
 },
 {
  "Nom": "GHAMMAGUI",
  "Prénom": "Virginie",
  "Sexe": "Femme",
  "Année_Anniversaire": 1977,
  "Mois_Anniversaires": 8,
  "Jour_Anniversaire": 25,
  "Mois_Fête": 1,
  "Jour_Fête": 7
 },
 {
  "Nom": "RICHARD",
  "Prénom": "Sonia",
  "Sexe": "Femme",
  "Année_Anniversaire": 1981,
  "Mois_Anniversaires": 6,
  "Jour_Anniversaire": 10,
  "Mois_Fête": 9,
  "Jour_Fête": 18
 },
 {
  "Nom": "LONGIS",
  "Prénom": "Emilie",
  "Sexe": "Femme",
  "Année_Anniversaire": 1984,
  "Mois_Anniversaires": 12,
  "Jour_Anniversaire": 21,
  "Mois_Fête": 9,
  "Jour_Fête": 19
 },
 {
  "Nom": "RICHARD",
  "Prénom": "Nicolas",
  "Sexe": "Homme",
  "Année_Anniversaire": 1986,
  "Mois_Anniversaires": 9,
  "Jour_Anniversaire": 17,
  "Mois_Fête": 12,
  "Jour_Fête": 6
 },
 {
  "Nom": "BEAUDOT",
  "Prénom": "Mathilde",
  "Sexe": "Femme",
  "Année_Anniversaire": 1986,
  "Mois_Anniversaires": 3,
  "Jour_Anniversaire": 13,
  "Mois_Fête": 3,
  "Jour_Fête": 14
 },
 {
  "Nom": "LONGIS",
  "Prénom": "Emmanuelle",
  "Sexe": "Femme",
  "Année_Anniversaire": 1986,
  "Mois_Anniversaires": 12,
  "Jour_Anniversaire": 13,
  "Mois_Fête": 12,
  "Jour_Fête": 25
 },
 {
  "Nom": "LEHMANN",
  "Prénom": "Rosario",
  "Sexe": "Femme",
  "Année_Anniversaire": 1999,
  "Mois_Anniversaires": 11,
  "Jour_Anniversaire": 11,
  "Mois_Fête": 8,
  "Jour_Fête": 23
 },
 {
  "Nom": "GHAMMAGUI",
  "Prénom": "Lola",
  "Sexe": "Femme",
  "Année_Anniversaire": 2006,
  "Mois_Anniversaires": 4,
  "Jour_Anniversaire": 25,
  "Mois_Fête": 9,
  "Jour_Fête": 15
 },
 {
  "Nom": "COLLAS",
  "Prénom": "Gilles",
  "Sexe": "Homme",
  "Année_Anniversaire": 1966,
  "Mois_Anniversaires": 4,
  "Jour_Anniversaire": 23,
  "Mois_Fête": 9,
  "Jour_Fête": 1
 },
 {
  "Nom": "YACE",
  "Prénom": "Charles Emmanuel",
  "Sexe": "Homme",
  "Année_Anniversaire": 1964,
  "Mois_Anniversaires": 8,
  "Jour_Anniversaire": 16,
  "Mois_Fête": 11,
  "Jour_Fête": 4
 },
 {
  "Nom": "DEVAUX",
  "Prénom": "Hugues",
  "Sexe": "Homme",
  "Année_Anniversaire": 1957,
  "Mois_Anniversaires": 8,
  "Jour_Anniversaire": 4,
  "Mois_Fête": 4,
  "Jour_Fête": 1
 },
 {
  "Nom": "RICHARD",
  "Prénom": "Noé",
  "Sexe": "Homme",
  "Année_Anniversaire": 2018,
  "Mois_Anniversaires": 11,
  "Jour_Anniversaire": 17,
  "Mois_Fête": 11,
  "Jour_Fête": 10
 },
 {
  "Nom": "LACROIX",
  "Prénom": "Lucie",
  "Sexe": "Femme",
  "Année_Anniversaire": 2018,
  "Mois_Anniversaires": 12,
  "Jour_Anniversaire": 15,
  "Mois_Fête": 12,
  "Jour_Fête": 13
 },
 {
  "Nom": "LACROIX",
  "Prénom": "Gabriel",
  "Sexe": "Homme",
  "Année_Anniversaire": 2020,
  "Mois_Anniversaires": 7,
  "Jour_Anniversaire": 19,
  "Mois_Fête": 9,
  "Jour_Fête": 29
 },
 {
  "Nom": "RICHARD",
  "Prénom": "Léo",
  "Sexe": "Homme",
  "Année_Anniversaire": 2022,
  "Mois_Anniversaires": 6,
  "Jour_Anniversaire": 7,
  "Mois_Fête": 11,
  "Jour_Fête": 6
 },
 {
  "Nom": "GOURMELOR",
  "Prénom": "Christophe",
  "Sexe": "Homme",
  "Année_Anniversaire": 1976,
  "Mois_Anniversaires": 8,
  "Jour_Anniversaire": 23,
  "Mois_Fête": 8,
  "Jour_Fête": 21
 },
 {
  "Nom": "CARRELAGE",
  "Prénom": "Julien",
  "Sexe": "Homme",
  "Année_Anniversaire": 1975,
  "Mois_Anniversaires": 8,
  "Jour_Anniversaire": 22,
  "Mois_Fête": 8,
  "Jour_Fête": 2
 }
]

// Fonction pour calculer l'âge à partir de l'année de naissance
function calculateAge(birthYear) {
//const today = new Date();
	const today = new Date("2024-11-10");  
    return today.getFullYear() - birthYear;
}

// Fonction pour ajouter un élément d'événement au DOM avec la bonne couleur
function addEventToDOM(text, gender) {
    const eventsContainer = document.getElementById('eventsContainer');
    const eventElement = document.createElement('div');

    // Formatage du texte pour l'affichage
    eventElement.textContent = text;

    // Appliquer la couleur en fonction du sexe
    if (gender === 'Femme') {
        eventElement.classList.add('event-femme');
    } else if (gender === 'Homme') {
        eventElement.classList.add('event-homme');
    }

    // Ajouter l'événement à la page
    eventsContainer.appendChild(eventElement);
}

// Fonction pour charger et afficher les événements du jour et de demain
function afficherEvenements(events) {
    const today = new Date();
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

// Afficher les événements au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    afficherEvenements(eventsData);
});
