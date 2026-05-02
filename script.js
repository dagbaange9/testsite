document.addEventListener('DOMContentLoaded', () => {
    const filterBtn = document.getElementById('filterBtn');
    const typeFilter = document.getElementById('typeFilter');
    const priceSort = document.getElementById('priceSort');
    const carGrid = document.getElementById('carGrid');

    filterBtn.addEventListener('click', () => {
        let cards = Array.from(document.querySelectorAll('.car-card'));
        const selectedType = typeFilter.value;
        const selectedSort = priceSort.value;

        cards.forEach(card => {
            const cardType = card.getAttribute('data-type');
            if (selectedType === "all" || cardType === selectedType) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });

        if (selectedSort !== "default") {
            cards.sort((a, b) => {
                const priceA = parseInt(a.getAttribute('data-price'));
                const priceB = parseInt(b.getAttribute('data-price'));
                return selectedSort === "low" ? priceA - priceB : priceB - priceA;
            });
            cards.forEach(card => carGrid.appendChild(card));
        }
    });
});
