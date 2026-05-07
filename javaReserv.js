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
