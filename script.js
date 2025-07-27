// DOM Elements
const filterGroups = document.querySelectorAll('.filter-group h4');
const checkboxes = document.querySelectorAll('.checkbox-label input');
const productCards = document.querySelectorAll('.featured-card, .brand-card');
const searchInput = document.querySelector('.search-bar input');
const searchButton = document.querySelector('.search-bar button');
const navLinks = document.querySelectorAll('.nav-link, .sub-link');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeFilters();
    initializeSearch();
    initializeNavigation();
    initializeAnimations();
    initializeProductInteractions();
});

// Filter functionality
function initializeFilters() {
    // Toggle filter groups
    filterGroups.forEach(group => {
        group.addEventListener('click', function() {
            const filterOptions = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            if (filterOptions.style.display === 'none') {
                filterOptions.style.display = 'block';
                icon.style.transform = 'rotate(0deg)';
            } else {
                filterOptions.style.display = 'none';
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });

    // Checkbox filtering
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            applyFilters();
            updateFilterCounts();
        });
    });
}

function applyFilters() {
    const activeFilters = getActiveFilters();
    const products = document.querySelectorAll('.featured-card');
    
    products.forEach(product => {
        const shouldShow = matchesFilters(product, activeFilters);
        
        if (shouldShow) {
            product.style.display = 'block';
            product.classList.add('fade-in');
        } else {
            product.style.display = 'none';
            product.classList.remove('fade-in');
        }
    });
}

function getActiveFilters() {
    const filters = {
        price: [],
        family: [],
        series: []
    };
    
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const label = checkbox.parentElement.textContent.trim();
            const filterGroup = checkbox.closest('.filter-group');
            const groupTitle = filterGroup.querySelector('h4 span').textContent.toLowerCase();
            
            if (groupTitle.includes('preço')) {
                filters.price.push(label);
            } else if (groupTitle.includes('família')) {
                filters.family.push(label);
            } else if (groupTitle.includes('série')) {
                filters.series.push(label);
            }
        }
    });
    
    return filters;
}

function matchesFilters(product, filters) {
    // Simplified filter matching - in a real app, this would check product data
    if (filters.price.length === 0 && filters.family.length === 0 && filters.series.length === 0) {
        return true;
    }
    
    // For demo purposes, randomly show/hide products based on filter selection
    return Math.random() > 0.3;
}

function updateFilterCounts() {
    const activeCount = document.querySelectorAll('.checkbox-label input:checked').length;
    const filterTitle = document.querySelector('.filter-section h3');
    
    if (activeCount > 0) {
        filterTitle.textContent = `Filtrar por Especificações (${activeCount} ativos)`;
    } else {
        filterTitle.textContent = 'Filtrar por Especificações';
    }
}

// Search functionality
function initializeSearch() {
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        debounce(performSearch, 300)(searchTerm);
    });
    
    searchButton.addEventListener('click', function(e) {
        e.preventDefault();
        performSearch(searchInput.value.toLowerCase());
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            performSearch(this.value.toLowerCase());
        }
    });
}

function performSearch(searchTerm) {
    const products = document.querySelectorAll('.featured-card, .brand-card');
    
    products.forEach(product => {
        const productText = product.textContent.toLowerCase();
        const shouldShow = productText.includes(searchTerm) || searchTerm === '';
        
        if (shouldShow) {
            product.style.display = 'block';
            product.classList.add('search-highlight');
            setTimeout(() => product.classList.remove('search-highlight'), 2000);
        } else {
            product.style.display = 'none';
        }
    });
    
    // Show "no results" message if needed
    showNoResultsMessage(searchTerm);
}

function showNoResultsMessage(searchTerm) {
    const visibleProducts = document.querySelectorAll('.featured-card:not([style*="display: none"]), .brand-card:not([style*="display: none"])');
    const productArea = document.querySelector('.product-area');
    let noResultsMsg = document.querySelector('.no-results-message');
    
    if (visibleProducts.length === 0 && searchTerm !== '') {
        if (!noResultsMsg) {
            noResultsMsg = document.createElement('div');
            noResultsMsg.className = 'no-results-message';
            noResultsMsg.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #666;">
                    <i class="fas fa-search" style="font-size: 48px; margin-bottom: 20px; opacity: 0.5;"></i>
                    <h3>Nenhum produto encontrado</h3>
                    <p>Tente usar termos diferentes ou remova alguns filtros.</p>
                </div>
            `;
            productArea.appendChild(noResultsMsg);
        }
    } else if (noResultsMsg) {
        noResultsMsg.remove();
    }
}

// Navigation functionality
function initializeNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from siblings
            const siblings = this.parentElement.parentElement.querySelectorAll('.nav-link, .sub-link');
            siblings.forEach(sibling => sibling.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Smooth scroll to relevant section
            const linkText = this.textContent.toLowerCase();
            scrollToSection(linkText);
        });
    });
}

function scrollToSection(sectionName) {
    let targetElement;
    
    if (sectionName.includes('notebook')) {
        targetElement = document.querySelector('.featured-products');
    } else if (sectionName.includes('promoção')) {
        targetElement = document.querySelector('.hero');
    } else {
        targetElement = document.querySelector('.brand-section');
    }
    
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Animation functionality
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all product cards and sections
    const elementsToAnimate = document.querySelectorAll('.featured-card, .brand-card, .filter-section, .hero-content');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        
        if (hero && scrolled < hero.offsetHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Product interaction functionality
function initializeProductInteractions() {
    productCards.forEach(card => {
        // Add click event for product cards
        card.addEventListener('click', function() {
            showProductModal(this);
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover-effect');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover-effect');
        });
    });
    
    // Price animation on scroll
    animatePrices();
}

function showProductModal(productCard) {
    const productName = productCard.querySelector('h3, h4').textContent;
    const productImage = productCard.querySelector('img');
    const productPrice = productCard.querySelector('.price-value');
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'product-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="modal-product">
                <img src="${productImage ? productImage.src : ''}" alt="${productName}">
                <div class="modal-info">
                    <h2>${productName}</h2>
                    ${productPrice ? `<div class="modal-price">${productPrice.textContent}</div>` : ''}
                    <p>Especificações detalhadas do produto apareceriam aqui.</p>
                    <div class="modal-actions">
                        <button class="btn-primary">Comprar Agora</button>
                        <button class="btn-secondary">Adicionar ao Carrinho</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => modal.remove());
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Animate modal in
    setTimeout(() => modal.classList.add('show'), 10);
}

function animatePrices() {
    const priceElements = document.querySelectorAll('.price-value');
    
    const priceObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const priceElement = entry.target;
                const finalPrice = priceElement.textContent;
                const numericPrice = parseFloat(finalPrice.replace(/[^\d,]/g, '').replace(',', '.'));
                
                animateNumber(priceElement, 0, numericPrice, 1000, finalPrice);
                priceObserver.unobserve(priceElement);
            }
        });
    });
    
    priceElements.forEach(price => priceObserver.observe(price));
}

function animateNumber(element, start, end, duration, finalText) {
    const startTime = performance.now();
    const prefix = finalText.substring(0, finalText.indexOf(end.toString().replace('.', ',')));
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentValue = start + (end - start) * easeOutQuart(progress);
        const formattedValue = currentValue.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        
        element.textContent = prefix + formattedValue;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        } else {
            element.textContent = finalText;
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function easeOutQuart(t) {
    return 1 - (--t) * t * t * t;
}

// Add CSS for animations and modal
const additionalStyles = `
    .fade-in {
        animation: fadeIn 0.5s ease-in;
    }
    
    .search-highlight {
        animation: highlight 2s ease-in-out;
    }
    
    .animate-in {
        animation: slideInUp 0.6s ease-out;
    }
    
    .hover-effect {
        transform: scale(1.02) !important;
    }
    
    .product-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .product-modal.show {
        opacity: 1;
    }
    
    .modal-content {
        background: white;
        border-radius: 12px;
        max-width: 600px;
        width: 90%;
        max-height: 80%;
        overflow-y: auto;
        position: relative;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    }
    
    .product-modal.show .modal-content {
        transform: scale(1);
    }
    
    .close-modal {
        position: absolute;
        top: 15px;
        right: 20px;
        font-size: 24px;
        cursor: pointer;
        z-index: 1;
        background: rgba(0,0,0,0.1);
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .modal-product {
        padding: 30px;
    }
    
    .modal-product img {
        width: 100%;
        max-height: 200px;
        object-fit: cover;
        border-radius: 8px;
        margin-bottom: 20px;
    }
    
    .modal-info h2 {
        margin-bottom: 15px;
        color: #333;
    }
    
    .modal-price {
        font-size: 24px;
        font-weight: 700;
        color: #e60012;
        margin-bottom: 20px;
    }
    
    .modal-actions {
        display: flex;
        gap: 15px;
        margin-top: 25px;
    }
    
    .btn-primary, .btn-secondary {
        padding: 12px 24px;
        border: none;
        border-radius: 6px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
    }
    
    .btn-primary {
        background: #e60012;
        color: white;
    }
    
    .btn-primary:hover {
        background: #c8000f;
    }
    
    .btn-secondary {
        background: transparent;
        color: #e60012;
        border: 2px solid #e60012;
    }
    
    .btn-secondary:hover {
        background: #e60012;
        color: white;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes highlight {
        0%, 100% { background: transparent; }
        50% { background: rgba(230, 0, 18, 0.1); }
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);