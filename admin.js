// Configuration d'authentification simple
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';
const AUTH_KEY = 'luxedrive_admin_auth';
const PRODUCTS_KEY = 'luxedrive_products';

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    checkAuthentication();
    setupEventListeners();
    loadProducts();
});

// Vérifier l'authentification
function checkAuthentication() {
    const isAuthenticated = sessionStorage.getItem(AUTH_KEY);
    const loginSection = document.getElementById('loginSection');
    const adminSection = document.getElementById('adminSection');

    if (isAuthenticated) {
        loginSection.style.display = 'none';
        adminSection.style.display = 'flex';
    } else {
        loginSection.style.display = 'flex';
        adminSection.style.display = 'none';
    }
}

// Configuration des événements
function setupEventListeners() {
    // Login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    // Onglets
    const tabLinks = document.querySelectorAll('.tab-link');
    tabLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            switchTab(e.target.dataset.tab);
        });
    });

    // Ajouter produit
    const addProductForm = document.getElementById('addProductForm');
    if (addProductForm) {
        addProductForm.addEventListener('submit', handleAddProduct);
    }

    // Éditer produit
    const editProductForm = document.getElementById('editProductForm');
    if (editProductForm) {
        editProductForm.addEventListener('submit', handleEditProduct);
    }

    // Modal fermeture
    const closeBtn = document.querySelector('.close');
    const modal = document.getElementById('editModal');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => modal.style.display = 'none');
    }
    if (modal) {
        window.addEventListener('click', (e) => {
            if (e.target === modal) modal.style.display = 'none';
        });
    }

    // Recherche
    const searchProducts = document.getElementById('searchProducts');
    if (searchProducts) {
        searchProducts.addEventListener('input', handleSearch);
    }
}

// Gestion du login
function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('loginError');

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        sessionStorage.setItem(AUTH_KEY, 'true');
        errorDiv.textContent = '';
        checkAuthentication();
        document.getElementById('loginForm').reset();
    } else {
        errorDiv.textContent = 'Identifiant ou mot de passe incorrect';
    }
}

// Gestion du logout
function handleLogout() {
    sessionStorage.removeItem(AUTH_KEY);
    checkAuthentication();
    document.getElementById('loginForm').reset();
}

// Changer d'onglet
function switchTab(tabName) {
    // Masquer tous les onglets
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => tab.classList.remove('active'));

    // Désactiver tous les liens
    const tabLinks = document.querySelectorAll('.tab-link');
    tabLinks.forEach(link => link.classList.remove('active'));

    // Afficher l'onglet sélectionné
    const selectedTab = document.getElementById(tabName + 'Tab');
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    // Activer le lien correspondant
    event.target.classList.add('active');
}

// Charger les produits depuis localStorage ou utiliser les produits par défaut
function loadProducts() {
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
            }
        ];
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    }

    displayProducts(products);
}

// Afficher les produits
function displayProducts(products = null) {
    if (!products) {
        products = JSON.parse(localStorage.getItem(PRODUCTS_KEY)) || [];
    }

    const productsList = document.getElementById('productsList');
    if (!productsList) return;

    if (products.length === 0) {
        productsList.innerHTML = '<p class="no-products">Aucun produit disponible</p>';
        return;
    }

    productsList.innerHTML = products.map(product => `
        <div class="product-item">
            <div class="product-image" style="background-image: url('${product.image}')"></div>
            <div class="product-details">
                <h3>${product.name}</h3>
                <p class="product-type"><span class="badge ${product.type === 'Vente' ? 'sale' : 'rent'}">${product.type}</span></p>
                <p class="product-price">
                    ${product.price.toLocaleString('fr-FR')} ${product.type === 'Vente' ? '€' : '€/jour'}
                </p>
                ${product.engine ? `<p class="product-spec"><strong>Moteur:</strong> ${product.engine}</p>` : ''}
                ${product.power ? `<p class="product-spec"><strong>Puissance:</strong> ${product.power}</p>` : ''}
            </div>
            <div class="product-actions">
                <button class="btn-edit" onclick="openEditModal(${product.id})">Modifier</button>
                <button class="btn-delete" onclick="deleteProduct(${product.id})">Supprimer</button>
            </div>
        </div>
    `).join('');
}

// Ajouter un produit
function handleAddProduct(e) {
    e.preventDefault();

    const products = JSON.parse(localStorage.getItem(PRODUCTS_KEY)) || [];
    
    const newProduct = {
        id: Date.now(),
        name: document.getElementById('productName').value,
        type: document.getElementById('productType').value,
        price: parseFloat(document.getElementById('productPrice').value),
        engine: document.getElementById('productEngine').value,
        power: document.getElementById('productPower').value,
        image: document.getElementById('productImage').value,
        description: document.getElementById('productDescription').value
    };

    products.push(newProduct);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));

    // Afficher message de succès
    const successDiv = document.getElementById('addSuccess');
    successDiv.textContent = 'Produit ajouté avec succès!';
    successDiv.style.display = 'block';

    // Réinitialiser le formulaire
    document.getElementById('addProductForm').reset();

    // Masquer le message après 3 secondes
    setTimeout(() => {
        successDiv.style.display = 'none';
    }, 3000);

    // Recharger les produits
    loadProducts();
}

// Ouvrir le modal d'édition
function openEditModal(productId) {
    const products = JSON.parse(localStorage.getItem(PRODUCTS_KEY)) || [];
    const product = products.find(p => p.id === productId);

    if (product) {
        document.getElementById('editProductId').value = product.id;
        document.getElementById('editProductName').value = product.name;
        document.getElementById('editProductType').value = product.type;
        document.getElementById('editProductPrice').value = product.price;
        document.getElementById('editProductEngine').value = product.engine || '';
        document.getElementById('editProductPower').value = product.power || '';
        document.getElementById('editProductImage').value = product.image;
        document.getElementById('editProductDescription').value = product.description || '';

        document.getElementById('editModal').style.display = 'block';
    }
}

// Éditer un produit
function handleEditProduct(e) {
    e.preventDefault();

    const products = JSON.parse(localStorage.getItem(PRODUCTS_KEY)) || [];
    const productId = parseInt(document.getElementById('editProductId').value);
    const productIndex = products.findIndex(p => p.id === productId);

    if (productIndex !== -1) {
        products[productIndex] = {
            id: productId,
            name: document.getElementById('editProductName').value,
            type: document.getElementById('editProductType').value,
            price: parseFloat(document.getElementById('editProductPrice').value),
            engine: document.getElementById('editProductEngine').value,
            power: document.getElementById('editProductPower').value,
            image: document.getElementById('editProductImage').value,
            description: document.getElementById('editProductDescription').value
        };

        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
        document.getElementById('editModal').style.display = 'none';
        loadProducts();
    }
}

// Supprimer un produit
function deleteProduct(productId) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit?')) {
        let products = JSON.parse(localStorage.getItem(PRODUCTS_KEY)) || [];
        products = products.filter(p => p.id !== productId);
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
        loadProducts();
    }
}

// Rechercher des produits
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    let products = JSON.parse(localStorage.getItem(PRODUCTS_KEY)) || [];
    
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.type.toLowerCase().includes(searchTerm)
    );

    displayProducts(filteredProducts);
}
