
// Menu Data - this would typically come from a backend/database
const CATEGORIES = [
    {
        id: 'coffee',
        name: 'Coffee',
        description: 'Our selection of specialty coffees'
    },
    {
        id: 'pastries',
        name: 'Pastries',
        description: 'Freshly prepared French pastries'
    },
    {
        id: 'breakfast',
        name: 'Breakfast',
        description: 'Morning dishes prepared with care'
    },
    {
        id: 'lunch',
        name: 'Lunch',
        description: 'Light dishes for lunch'
    }
];

const MENU_ITEMS = [
    {  
        id: 'espresso',
        name: 'Espresso',
        description: 'Shot of our signature espresso blend',
        price: 250,
        image: 'photos/espresso.webp',
        category: 'coffee',
        featured: true
    },
    {
        id: 'cappuccino',
        name: 'Cappuccino',
        description: 'Espresso with steamed milk and foam',
        price: 320,
        image: 'photos/cappuccino.webp',
        category: 'coffee',
        featured: true
    },
    {
        id: 'latte',
        name: 'Café Latte',
        description: 'Espresso with steamed milk',
        price: 350,
        image: 'photos/cafe_latte.webp',
        category: 'coffee'
    },
    {
        id: 'americano',
        name: 'Americano',
        description: 'Espresso diluted with hot water',
        price: 280,
        image: 'photos/Americano.webp',
        category: 'coffee'
    },
    {
        id: 'croissant',
        name: 'Croissant',
        description: 'Classic buttery French croissant',
        price: 150,
        image: 'photos/croissant.webp',
        category: 'pastries',
        featured: true
    },
    {
        id: 'pain-au-chocolat',
        name: 'Pain au Chocolat',
        description: 'Chocolate-filled buttery pastry',
        price: 180,
        image: 'photos/pain_au_chocolat.webp',
        category: 'pastries',
        featured: true
    },
    {
        id: 'eclair',
        name: 'Chocolate Éclair',
        description: 'Chocolate filled éclair with chocolate glaze',
        price: 200,
        image: 'photos/chocolate_eclair.webp',
        category: 'pastries'
    },
    {
        id: 'avocado-toast',
        name: 'Avocado Toast',
        description: 'Sourdough toast with avocado, radish, and microgreens',
        price: 400,
        image: 'photos/avocado.webp',
        category: 'breakfast',
        featured: true
    },
    {
        id: 'french-toast',
        name: 'French Toast',
        description: 'Brioche french toast with maple syrup and berries',
        price: 450,
        image: 'photos/french_toast.webp',
        category: 'breakfast'
    },
    {
        id: 'quiche',
        name: 'Quiche Lorraine',
        description: 'Classic quiche with bacon and Gruyère cheese',
        price: 380,
        image: 'photos/Quiche_Lorraine.webp',
        category: 'lunch',
        featured: true
    },
    {
        id: 'nicoise-salad',
        name: 'Niçoise Salad',
        description: 'Tuna, egg, olives, and vegetables with Dijon vinaigrette',
        price: 500,
        image: 'photos/Nicoise_Salad.webp',
        category: 'lunch'
    }
];

// DOM Elements
const featuredItems = document.getElementById('featuredItems');
const categoryButtons = document.querySelector('.category-buttons');
const menuCategories = document.getElementById('menuCategories');
const categoryNav = document.getElementById('categoryNav');

// Initialize the menu
document.addEventListener('DOMContentLoaded', () => {
    // Load featured items on home page
    if (featuredItems) {
        loadFeaturedItems();
    }
    
    // Load menu categories and items on menu page
    if (categoryButtons && menuCategories) {
        loadCategoryButtons();
        loadMenuCategories();
        
        // Sticky category navigation
        window.addEventListener('scroll', handleCategoryNavScroll);
    }
});

// Load featured items on home page
function loadFeaturedItems() {
    const featured = MENU_ITEMS.filter(item => item.featured);
    
    // Limit to 3 items
    const displayItems = featured.slice(0, 3);
    
    displayItems.forEach((item, index) => {
        const itemEl = document.createElement('div');
        itemEl.classList.add('featured-item');
        itemEl.style.animationDelay = `${index * 200}ms`;
        
        itemEl.innerHTML = `
            <div class="featured-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="featured-item-content">
                <div class="featured-item-header">
                    <h3 class="featured-item-title">${item.name}</h3>
                    <span class="featured-item-price">₹${item.price.toFixed(2)}</span>
                </div>
                <p class="featured-item-description">${item.description}</p>
                <div class="featured-item-footer">
                    <span class="featured-item-category">${getCategoryName(item.category)}</span>
                    <button class="add-to-cart-btn" data-id="${item.id}">Add to cart</button>
                </div>
            </div>
        `;
        
        featuredItems.appendChild(itemEl);
    });
    
    // Add event listeners to add to cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            const item = MENU_ITEMS.find(item => item.id === id);
            if (item) {
                addToCart(item);
            }
        });
    });
}

// Load category buttons on menu page
function loadCategoryButtons() {
    CATEGORIES.forEach((category, index) => {
        const button = document.createElement('button');
        button.classList.add('category-btn');
        button.dataset.category = category.id;
        button.textContent = category.name;
        
        if (index === 0) {
            button.classList.add('active');
        }
        
        categoryButtons.appendChild(button);
    });
    
    // Add event listeners to category buttons
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const categoryId = e.target.dataset.category;
            
            // Update active button
            document.querySelectorAll('.category-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            e.target.classList.add('active');
            
            // Scroll to category
            scrollToCategory(categoryId);
        });
    });
}

// Load menu categories and items on menu page
function loadMenuCategories() {
    CATEGORIES.forEach((category, categoryIndex) => {
        const categoryEl = document.createElement('div');
        categoryEl.classList.add('menu-category');
        categoryEl.id = `category-${category.id}`;
        categoryEl.style.animationDelay = `${categoryIndex * 200}ms`;
        
        const categoryItems = MENU_ITEMS.filter(item => item.category === category.id);
        
        if (categoryItems.length === 0) return;
        
        categoryEl.innerHTML = `
            <div class="category-header">
                <h2 class="category-title">${category.name}</h2>
                <div class="category-divider"></div>
            </div>
            ${category.description ? `<p class="category-description">${category.description}</p>` : ''}
            <div class="menu-items-grid" id="items-${category.id}"></div>
        `;
        
        menuCategories.appendChild(categoryEl);
        
        // Add menu items to this category
        const itemsGrid = document.getElementById(`items-${category.id}`);
        
        categoryItems.forEach((item, index) => {
            const itemEl = document.createElement('div');
            itemEl.classList.add('menu-item');
            itemEl.style.animationDelay = `${index * 100}ms`;
            
            itemEl.innerHTML = `
                <div class="menu-item-image">
                    <img src="${item.image}" alt="${item.name}">
                    <button class="add-to-cart-btn-fixed" data-id="${item.id}">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <div class="menu-item-content">
                    <div class="menu-item-header">
                        <h3 class="menu-item-title">${item.name}</h3>
                        <span class="menu-item-price">₹${item.price.toFixed(2)}</span>
                    </div>
                    <p class="menu-item-description">${item.description}</p>
                    ${item.ingredients || item.allergens ? `
                        <div class="menu-item-details">
                            ${item.ingredients ? `
                                <div class="menu-item-detail">
                                    <h4 class="menu-item-detail-title">Ingredients:</h4>
                                    <p class="menu-item-detail-text">${item.ingredients.join(', ')}</p>
                                </div>
                            ` : ''}
                            ${item.allergens ? `
                                <div class="menu-item-detail">
                                    <h4 class="menu-item-detail-title">Allergens:</h4>
                                    <p class="menu-item-detail-text">${item.allergens.join(', ')}</p>
                                </div>
                            ` : ''}
                        </div>
                    ` : ''}
                    <div class="menu-item-footer">
                        <span class="menu-item-category">${getCategoryName(item.category)}</span>
                        <button class="add-to-cart-btn" data-id="${item.id}">Add to cart</button>
                    </div>
                </div>
            `;
            
            itemsGrid.appendChild(itemEl);
        });
    });
    
    // Add event listeners to add to cart buttons
    document.querySelectorAll('.add-to-cart-btn, .add-to-cart-btn-fixed').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.closest('[data-id]').dataset.id;
            const item = MENU_ITEMS.find(item => item.id === id);
            if (item) {
                addToCart(item);
            }
        });
    });
}

// Handle category navigation scroll
function handleCategoryNavScroll() {
    if (!categoryNav) return;
    
    const scrollPosition = window.scrollY;
    const headerHeight = document.querySelector('.menu-header').offsetHeight;
    
    if (scrollPosition > headerHeight - 60) {
        categoryNav.classList.add('sticky');
    } else {
        categoryNav.classList.remove('sticky');
    }
    
    // Update active category button based on scroll position
    const categories = document.querySelectorAll('.menu-category');
    
    categories.forEach(category => {
        const rect = category.getBoundingClientRect();
        
        if (rect.top <= 200 && rect.bottom >= 200) {
            const categoryId = category.id.replace('category-', '');
            
            document.querySelectorAll('.category-btn').forEach(btn => {
                btn.classList.remove('active');
                
                if (btn.dataset.category === categoryId) {
                    btn.classList.add('active');
                }
            });
        }
    });
}

// Scroll to a specific category
function scrollToCategory(categoryId) {
    const category = document.getElementById(`category-${categoryId}`);
    
    if (category) {
        const yOffset = -120; // Adjust for navbar and category nav
        const y = category.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        window.scrollTo({
            top: y,
            behavior: 'smooth'
        });
    }
}

// Helper function to get category name for display
function getCategoryName(categoryId) {
    switch (categoryId) {
        case 'coffee':
            return 'Coffee';
        case 'pastries':
            return 'Pastry';
        case 'breakfast':
            return 'Breakfast';
        case 'lunch':
            return 'Lunch';
        default:
            return categoryId.charAt(0).toUpperCase() + categoryId.slice(1);
    }
}
