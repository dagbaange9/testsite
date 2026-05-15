// On attend que le document soit chargé
document.addEventListener('DOMContentLoaded', () => {
    // 1. Récupérer le paramètre "model" dans l'URL (ex: ?model=Ferrari)
    const urlParams = new URLSearchParams(window.location.search);
    const selectedModel = urlParams.get('model');

    // 2. Si un modèle est présent dans l'URL
    if (selectedModel) {
        // Trouver le select du formulaire de réservation
        // Assure-toi que ton select a l'id "carModelSelect" ou adapte le sélecteur ci-dessous
        const selectElement = document.querySelector('select[name="vehicule"]');
        
        if (selectElement) {
            // Parcourir les options pour trouver celle qui contient le nom du modèle
            for (let i = 0; i < selectElement.options.length; i++) {
                if (selectElement.options[i].value.includes(selectedModel)) {
                    selectElement.selectedIndex = i;
                    break;
                }
            }
        }
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('bookingForm');

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Empêche le rechargement de la page

            // 1. Récupération des données du formulaire
            const formData = new FormData(bookingForm);
            const vehicule = formData.get('vehicule');
            const service = formData.get('service');
            const nom = formData.get('nom');
            const tel = formData.get('tel');
            const email = formData.get('email');
            const message = formData.get('message') || "Aucun message particulier";

            // 2. Configuration de votre numéro WhatsApp (Format international sans le +)
            // Exemple pour la France (+33) : 33600000000
            const monNumeroWhatsApp = "2290154932378"; 

            // 3. Construction du texte du message (avec des émojis pour le style luxe)
            const texteMessage = `✨ *Nouvelle Réservation LuxeDrive* ✨\n\n` +
                                 `🚘 *Véhicule :* ${vehicule}\n` +
                                 `💼 *Service :* ${service}\n\n` +
                                 `👤 *Client :* ${nom}\n` +
                                 `📞 *Téléphone :* ${tel}\n` +
                                 `✉️ *Email :* ${email}\n\n` +
                                 `📝 *Note :* ${message}`;

            // 4. Encodage du texte pour l'URL
            const urlMessageEncodie = encodeURIComponent(texteMessage);

            // 5. Création du lien WhatsApp (ouvre l'application ou WhatsApp Web)
            const lienWhatsApp = `https://wa.me/${monNumeroWhatsApp}?text=${urlMessageEncodie}`;

            // 6. Redirection du client vers WhatsApp
            window.open(lienWhatsApp, '_blank');
        });
    }
});
