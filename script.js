const PRODUCTS_KEY = 'luxedrive_products';

document.addEventListener('DOMContentLoaded', () => {
    loadProductsFromStorage();
    setupFilters();
});

// Charger les produits depuis localStorage
function loadProductsFromStorage() {
    let products = JSON.parse(localStorage.getItem(PRODUCTS_KEY));
    
    if (!products) {
        // Produits par défaut s'ils n'existent pas
        products = [
            {
                id: 1,
                name: 'Ferrari F8 Tributo',
                type: 'Vente',
                price: 280000,
                engine: 'V8 Biturbo',
                power: '720 ch',
                image: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Ferrari/Purosangue/9317/1663156716477/rear-left-view-121.jpg',
                description: 'Une célébration de l\'excellence du moteur V8 italien.'
            },
            {
                id: 2,
                name: 'Lamborghini Urus',
                type: 'Location',
                price: 1500,
                engine: 'V10 Atmo',
                power: '640 ch',
                image: 'https://img.freepik.com/photos-premium/lamborghini-urus-voiture-devrait-etre-personnalisee-motifs-tribaux-vivants-metalliques_997024-2751.jpg?semt=ais_hybrid&w=740&q=80',
                description: 'Un SUV de luxe aux performances exceptionnelles.'
            },
            {
                id: 3,
                name: 'Bugatti Chiron',
                type: 'Vente',
                price: 3200000,
                engine: 'W16 Quattro',
                power: '1500 ch',
                image: 'https://cdn.motor1.com/images/mgl/L3jqXN/s3/bugatti-w16-mistral.jpg',
                description: 'L\'hypersportive ultime avec une puissance inégalée.'
            },
            {
                id: 4,
                name: 'GLE 63s Full AMG',
                type: 'Vente',
                price: 3200000,
                engine: 'V8 Biturbo',
                power: '1500 ch',
                image: 'https://www.annonces-automobile.com/images/data/actualite/main/110237.jpg',
                description: 'Luxe et performance Mercedes'
            },
            {
                id: 5,
                name: 'Jeep Wrangler 4x4',
                type: 'Vente',
                price: 3200000,
                engine: 'W16 Quattro',
                power: '1500 ch',
                image: 'https://static0.hotcarsimages.com/wordpress/wp-content/uploads/2023/06/f44_11-jeep392-2star-65.jpg?q=50&fit=crop&w=825&dpr=1.5',
                description: 'SUV robuste et polyvalent'
            },
            {
                id: 6,
                name: 'Mercedes Benz C300',
                type: 'Location',
                price: 1800,
                engine: 'V6',
                power: '640 ch',
                image: 'https://i.ytimg.com/vi/MFFCKD4bIUg/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCTfl8ebmLItOa_5I1LZ_5o2GlFZg',
                description: 'Élégance et confort Mercedes'
            }
        ];
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    }

    displayProducts(products);
}

// Afficher les produits
function displayProducts(products) {
    const carGrid = document.getElementById('carGrid');
    
    if (!carGrid) return;

    // Vider la grille
    carGrid.innerHTML = '';

    // Créer les cartes produits
    products.forEach(product => {
        const priceText = product.type === 'Location' 
            ? `${product.price.toLocaleString('fr-FR')} € <span>/ jour</span>`
            : `${product.price.toLocaleString('fr-FR')} €`;

        const badgeClass = product.type === 'Location' ? 'badge rent' : 'badge';

        const card = document.createElement('div');
        card.className = 'car-card';
        card.setAttribute('data-type', product.type);
        card.setAttribute('data-price', product.price);
        card.innerHTML = `
            <div class="car-image" style="background-image: url('${product.image}');">
                <span class="${badgeClass}">${product.type}</span>
            </div>
            <div class="car-info">
                <h3>${product.name}</h3>
                <p class="price">${priceText}</p>
                <div class="specs">
                    ${product.engine ? `<span>${product.engine}</span>` : ''}
                    ${product.power ? `<span>${product.power}</span>` : ''}
                </div>
                <a href="${product.type === 'Vente' ? 'decouvre.html' : 'reserve.html'}" class="btn-card">
                    ${product.type === 'Vente' ? 'Découvrir' : 'Réserver'}
                </a>
            </div>
        `;

        carGrid.appendChild(card);
    });
}

// Configuration des filtres
function setupFilters() {
    const filterBtn = document.getElementById('filterBtn');
    const typeFilter = document.getElementById('typeFilter');
    const priceSort = document.getElementById('priceSort');

    if (filterBtn) {
        filterBtn.addEventListener('click', applyFilters);
    }
}

// Appliquer les filtres
function applyFilters() {
    let products = JSON.parse(localStorage.getItem(PRODUCTS_KEY)) || [];
    const typeFilter = document.getElementById('typeFilter').value;
    const priceSort = document.getElementById('priceSort').value;

    // Filtrer par type
    if (typeFilter !== 'all') {
        products = products.filter(p => p.type === typeFilter);
    }

    // Trier par prix
    if (priceSort !== 'default') {
        products.sort((a, b) => {
            return priceSort === 'low' ? a.price - b.price : b.price - a.price;
        });
    }

    displayProducts(products);
}
