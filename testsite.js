document.addEventListener('DOMContentLoaded', () => {
    const filterBtn = document.getElementById('filterBtn');
    const typeFilter = document.getElementById('typeFilter');
    const priceSort = document.getElementById('priceSort');
    const carGrid = document.getElementById('carGrid');

    filterBtn.addEventListener('click', () => {
        let cards = Array.from(document.querySelectorAll('.car-card'));
        const selectedType = typeFilter.value;
        const selectedSort = priceSort.value;

        // 1. Filtrage par type
        cards.forEach(card => {
            const cardType = card.getAttribute('data-type');
            if (selectedType === "all" || cardType === selectedType) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });

        // 2. Tri par prix (uniquement sur les éléments visibles)
        if (selectedSort !== "default") {
            cards.sort((a, b) => {
                const priceA = parseInt(a.getAttribute('data-price'));
                const priceB = parseInt(b.getAttribute('data-price'));
                return selectedSort === "low" ? priceA - priceB : priceB - priceA;
            });

            // Réorganiser les éléments dans le DOM
            cards.forEach(card => carGrid.appendChild(card));
        }
    });
});
