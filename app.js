// FramerClone Application JavaScript

// Application Data
const appData = {
  templates: [
    {
      id: 1,
      name: "Portfolio Créatif",
      category: "Portfolio",
      image: "https://via.placeholder.com/400x300/3b82f6/ffffff?text=Portfolio+Créatif",
      description: "Design moderne pour artistes et créateurs",
      features: ["Gallery", "Contact", "About"]
    },
    {
      id: 2,
      name: "Startup Landing",
      category: "Business",
      image: "https://via.placeholder.com/400x300/f59e0b/333333?text=Startup+Landing",
      description: "Page de conversion pour startup tech",
      features: ["Hero", "Features", "Pricing", "CTA"]
    },
    {
      id: 3,
      name: "E-commerce Boutique",
      category: "E-commerce",
      image: "https://via.placeholder.com/400x300/ef4444/ffffff?text=E-commerce+Boutique",
      description: "Site de vente en ligne moderne",
      features: ["Product Grid", "Cart", "Checkout"]
    },
    {
      id: 4,
      name: "Blog Magazine",
      category: "Blog",
      image: "https://via.placeholder.com/400x300/10b981/ffffff?text=Blog+Magazine",
      description: "Template pour blog et magazine",
      features: ["Articles", "Categories", "Newsletter"]
    },
    {
      id: 5,
      name: "Portfolio Photographe",
      category: "Portfolio",
      image: "https://via.placeholder.com/400x300/8b5cf6/ffffff?text=Portfolio+Photo",
      description: "Galerie élégante pour photographes",
      features: ["Gallery", "Lightbox", "Contact"]
    },
    {
      id: 6,
      name: "Corporate Business",
      category: "Business",
      image: "https://via.placeholder.com/400x300/06b6d4/333333?text=Corporate+Business",
      description: "Site professionnel pour entreprises",
      features: ["About", "Services", "Team", "Contact"]
    }
  ],

  plans: [
    {
      name: "Gratuit",
      price: "0€",
      period: "gratuit",
      features: ["1 site", "1k visiteurs/mois", "Templates basiques", "Support communauté"],
      limitations: ["Branding FramerClone", "Fonctionnalités limitées"],
      popular: false
    },
    {
      name: "Mini",
      price: "15€",
      period: "/mois",
      features: ["3 sites", "Domaine personnalisé", "5k visiteurs/mois", "Tous les templates", "Support email"],
      popular: false
    },
    {
      name: "Basic",
      price: "29€",
      period: "/mois",
      features: ["10 sites", "CMS intégré", "25k visiteurs/mois", "Analytics avancés", "Collaboration 2 users"],
      popular: true
    },
    {
      name: "Pro",
      price: "59€",
      period: "/mois",
      features: ["Sites illimités", "Trafic illimité", "API personnalisée", "White label", "Support prioritaire"],
      popular: false
    }
  ],

  elements: [
    {type: "text", icon: "type", label: "Texte"},
    {type: "heading", icon: "heading", label: "Titre"},
    {type: "image", icon: "image", label: "Image"},
    {type: "button", icon: "mouse-pointer", label: "Bouton"},
    {type: "container", icon: "square", label: "Container"},
    {type: "form", icon: "file-input", label: "Formulaire"},
    {type: "video", icon: "play", label: "Vidéo"},
    {type: "map", icon: "map", label: "Carte"}
  ],

  projects: [
    {
      id: 1,
      name: "Mon Portfolio",
      template: "Portfolio Créatif",
      lastModified: "Il y a 2 heures",
      status: "published",
      views: 1247,
      thumbnail: "https://via.placeholder.com/80x60/3b82f6/ffffff?text=Portfolio"
    },
    {
      id: 2,
      name: "Site Restaurant",
      template: "Business",
      lastModified: "Hier",
      status: "draft",
      views: 0,
      thumbnail: "https://via.placeholder.com/80x60/f59e0b/333333?text=Restaurant"
    },
    {
      id: 3,
      name: "Boutique Mode",
      template: "E-commerce",
      lastModified: "Il y a 3 jours",
      status: "published",
      views: 523,
      thumbnail: "https://via.placeholder.com/80x60/ef4444/ffffff?text=Mode"
    }
  ]
};

// Application State
let currentPage = 'dashboard';
let selectedElement = null;
let isDarkMode = false;
let currentDevice = 'desktop';

// DOM Elements
const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('.nav-link');

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
  setupEventListeners();
  loadInitialData();
});

function initializeApp() {
  // Initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Set initial page
  showPage('dashboard');

  // Load theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    toggleTheme();
  }
}

function setupEventListeners() {
  // Navigation
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = link.dataset.page;
      showPage(page);
    });
  });

  // Page buttons
  document.querySelectorAll('[data-page]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const page = btn.dataset.page;
      showPage(page);
    });
  });

  // Theme toggle
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  // Modal controls
  document.querySelectorAll('[data-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = btn.dataset.modal + 'Modal';
      showModal(modalId);
    });
  });

  document.querySelectorAll('[data-modal-close]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = btn.dataset.modalClose;
      hideModal(modalId);
    });
  });

  // Editor controls
  setupEditorControls();

  // AI Interface
  setupAIInterface();

  // Template filters
  setupTemplateFilters();
}

function showPage(pageId) {
  // Update navigation
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.dataset.page === pageId) {
      link.classList.add('active');
    }
  });

  // Update pages
  pages.forEach(page => {
    page.classList.remove('active');
    if (page.id === pageId) {
      page.classList.add('active');
    }
  });

  currentPage = pageId;

  // Load page-specific data
  switch(pageId) {
    case 'dashboard':
      loadDashboard();
      break;
    case 'templates':
      loadTemplates();
      break;
    case 'editor':
      loadEditor();
      break;
    case 'pricing':
      loadPricing();
      break;
  }
}

function toggleTheme() {
  isDarkMode = !isDarkMode;
  document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

  const themeIcon = document.querySelector('.theme-toggle i');
  if (themeIcon) {
    themeIcon.setAttribute('data-lucide', isDarkMode ? 'sun' : 'moon');
    lucide.createIcons();
  }
}

function loadInitialData() {
  loadDashboard();
  loadAnalyticsChart();
}

function loadDashboard() {
  const projectsGrid = document.getElementById('projectsGrid');
  if (!projectsGrid) return;

  projectsGrid.innerHTML = appData.projects.map(project => `
    <div class="project-card" onclick="openProject(${project.id})">
      <div class="project-thumbnail">
        <img src="${project.thumbnail}" alt="${project.name}">
      </div>
      <div class="project-info">
        <h4>${project.name}</h4>
        <p>${project.lastModified} • ${project.views} vues</p>
      </div>
      <div class="project-status ${project.status}">
        ${project.status === 'published' ? 'Publié' : 'Brouillon'}
      </div>
    </div>
  `).join('');
}

function loadAnalyticsChart() {
  const ctx = document.getElementById('analyticsChart');
  if (!ctx) return;

  // Simulate chart with Chart.js
  const chartData = {
    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    datasets: [{
      label: 'Visiteurs',
      data: [120, 190, 300, 500, 200, 300, 450],
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4
    }]
  };

  if (typeof Chart !== 'undefined') {
    new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}

function loadTemplates() {
  const templatesGrid = document.getElementById('templatesGrid');
  if (!templatesGrid) return;

  templatesGrid.innerHTML = appData.templates.map(template => `
    <div class="template-card" data-category="${template.category}" onclick="useTemplate(${template.id})">
      <div class="template-image">
        <img src="${template.image}" alt="${template.name}">
      </div>
      <div class="template-content">
        <span class="template-category">${template.category}</span>
        <h3>${template.name}</h3>
        <p>${template.description}</p>
        <div class="template-features">
          ${template.features.map(feature => `<span class="template-feature">${feature}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

function setupTemplateFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category;

      // Update active filter
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter templates
      const templateCards = document.querySelectorAll('.template-card');
      templateCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

function loadPricing() {
  const pricingGrid = document.getElementById('pricingGrid');
  if (!pricingGrid) return;

  pricingGrid.innerHTML = appData.plans.map(plan => `
    <div class="pricing-card ${plan.popular ? 'popular' : ''}">
      <h3>${plan.name}</h3>
      <div class="pricing-price">${plan.price}</div>
      <div class="pricing-period">${plan.period}</div>
      <ul class="pricing-features">
        ${plan.features.map(feature => `<li>${feature}</li>`).join('')}
      </ul>
      <button class="btn btn--primary btn--full" onclick="selectPlan('${plan.name}')">
        ${plan.name === 'Gratuit' ? 'Commencer' : 'Choisir ce plan'}
      </button>
    </div>
  `).join('');
}

function loadEditor() {
  const elementsPalette = document.getElementById('elementsPalette');
  if (!elementsPalette) return;

  elementsPalette.innerHTML = appData.elements.map(element => `
    <div class="element-item" draggable="true" data-type="${element.type}">
      <i data-lucide="${element.icon}"></i>
      <span>${element.label}</span>
    </div>
  `).join('');

  // Reinitialize icons
  lucide.createIcons();

  // Setup drag and drop
  setupDragAndDrop();
}

function setupEditorControls() {
  // Device preview buttons
  document.querySelectorAll('.device-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.device-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentDevice = btn.dataset.device;
      updateCanvasSize();
    });
  });

  // Editor buttons
  const undoBtn = document.getElementById('undoBtn');
  const redoBtn = document.getElementById('redoBtn');
  const previewBtn = document.getElementById('previewBtn');
  const publishBtn = document.getElementById('publishBtn');

  if (undoBtn) undoBtn.addEventListener('click', () => showNotification('Annulation effectuée', 'success'));
  if (redoBtn) redoBtn.addEventListener('click', () => showNotification('Rétablissement effectué', 'success'));
  if (previewBtn) previewBtn.addEventListener('click', () => showNotification('Mode aperçu activé', 'success'));
  if (publishBtn) publishBtn.addEventListener('click', () => showNotification('Site publié avec succès!', 'success'));
}

function setupDragAndDrop() {
  const elementItems = document.querySelectorAll('.element-item');
  const canvas = document.getElementById('editorCanvas');

  elementItems.forEach(item => {
    item.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', item.dataset.type);
    });
  });

  if (canvas) {
    canvas.addEventListener('dragover', (e) => {
      e.preventDefault();
      canvas.classList.add('drag-over');
    });

    canvas.addEventListener('dragleave', () => {
      canvas.classList.remove('drag-over');
    });

    canvas.addEventListener('drop', (e) => {
      e.preventDefault();
      canvas.classList.remove('drag-over');

      const elementType = e.dataTransfer.getData('text/plain');
      addElementToCanvas(elementType, e.offsetX, e.offsetY);
    });
  }
}

function addElementToCanvas(type, x, y) {
  const canvas = document.getElementById('editorCanvas');
  const placeholder = canvas.querySelector('.canvas-placeholder');

  if (placeholder) {
    placeholder.style.display = 'none';
  }

  const element = document.createElement('div');
  element.className = 'canvas-element';
  element.style.position = 'absolute';
  element.style.left = x + 'px';
  element.style.top = y + 'px';
  element.style.padding = '10px';
  element.style.border = '2px solid #3b82f6';
  element.style.borderRadius = '4px';
  element.style.background = 'rgba(59, 130, 246, 0.1)';
  element.style.cursor = 'move';

  switch(type) {
    case 'text':
      element.innerHTML = 'Texte exemple';
      break;
    case 'heading':
      element.innerHTML = '<h2>Titre exemple</h2>';
      break;
    case 'image':
      element.innerHTML = '🖼️ Image';
      break;
    case 'button':
      element.innerHTML = '<button style="padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 4px;">Bouton</button>';
      break;
    default:
      element.innerHTML = type.charAt(0).toUpperCase() + type.slice(1);
  }

  element.addEventListener('click', () => selectElement(element));
  canvas.appendChild(element);

  showNotification(`Élément ${type} ajouté`, 'success');
}

function selectElement(element) {
  // Remove previous selection
  document.querySelectorAll('.canvas-element').forEach(el => {
    el.style.borderColor = '#3b82f6';
  });

  // Select current element
  element.style.borderColor = '#ef4444';
  selectedElement = element;

  // Update properties panel
  updatePropertiesPanel(element);
}

function updatePropertiesPanel(element) {
  const panel = document.getElementById('propertiesPanel');
  if (!panel) return;

  panel.innerHTML = `
    <h4>Propriétés de l'élément</h4>
    <div class="form-group">
      <label>Position X</label>
      <input type="number" value="${parseInt(element.style.left)}" onchange="updateElementProperty('left', this.value + 'px')">
    </div>
    <div class="form-group">
      <label>Position Y</label>
      <input type="number" value="${parseInt(element.style.top)}" onchange="updateElementProperty('top', this.value + 'px')">
    </div>
    <div class="form-group">
      <label>Largeur</label>
      <input type="text" placeholder="auto" onchange="updateElementProperty('width', this.value)">
    </div>
    <div class="form-group">
      <label>Hauteur</label>
      <input type="text" placeholder="auto" onchange="updateElementProperty('height', this.value)">
    </div>
    <button class="btn btn--outline btn--sm" onclick="deleteSelectedElement()">
      <i data-lucide="trash"></i> Supprimer
    </button>
  `;

  lucide.createIcons();
}

function updateElementProperty(property, value) {
  if (selectedElement) {
    selectedElement.style[property] = value;
  }
}

function deleteSelectedElement() {
  if (selectedElement) {
    selectedElement.remove();
    selectedElement = null;
    document.getElementById('propertiesPanel').innerHTML = '<p>Sélectionnez un élément</p>';
    showNotification('Élément supprimé', 'success');
  }
}

function updateCanvasSize() {
  const canvas = document.getElementById('editorCanvas');
  if (!canvas) return;

  switch(currentDevice) {
    case 'desktop':
      canvas.style.maxWidth = '1200px';
      break;
    case 'tablet':
      canvas.style.maxWidth = '768px';
      break;
    case 'mobile':
      canvas.style.maxWidth = '375px';
      break;
  }
}

function setupAIInterface() {
  const aiInput = document.getElementById('aiInput');
  const aiSendBtn = document.getElementById('aiSendBtn');
  const aiChat = document.getElementById('aiChat');

  // Suggestion buttons
  document.querySelectorAll('.suggestion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const suggestion = btn.textContent;
      if (aiInput) aiInput.value = suggestion;
      sendAIMessage(suggestion);
    });
  });

  if (aiSendBtn && aiInput) {
    aiSendBtn.addEventListener('click', () => {
      const message = aiInput.value.trim();
      if (message) {
        sendAIMessage(message);
        aiInput.value = '';
      }
    });

    aiInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const message = aiInput.value.trim();
        if (message) {
          sendAIMessage(message);
          aiInput.value = '';
        }
      }
    });
  }
}

function sendAIMessage(message) {
  const aiChat = document.getElementById('aiChat');
  if (!aiChat) return;

  // Add user message
  const userMessage = document.createElement('div');
  userMessage.className = 'ai-message user-message';
  userMessage.innerHTML = `
    <div class="ai-avatar" style="background: #10b981;">👤</div>
    <div class="message-content">
      <p>${message}</p>
    </div>
  `;
  aiChat.appendChild(userMessage);

  // Simulate AI response
  setTimeout(() => {
    const aiResponse = generateAIResponse(message);
    const aiMessage = document.createElement('div');
    aiMessage.className = 'ai-message';
    aiMessage.innerHTML = `
      <div class="ai-avatar">🤖</div>
      <div class="message-content">
        <p>${aiResponse}</p>
        <button class="btn btn--primary btn--sm" onclick="createSiteFromAI('${message}')">
          Créer ce site
        </button>
      </div>
    `;
    aiChat.appendChild(aiMessage);
    aiChat.scrollTop = aiChat.scrollHeight;
  }, 1000);

  aiChat.scrollTop = aiChat.scrollHeight;
}

function generateAIResponse(message) {
  const responses = {
    'restaurant': 'Parfait ! Je vais créer un site pour votre restaurant avec un menu interactif, une galerie de photos de plats, un système de réservation et vos informations de contact. Le design sera chaleureux et appétissant.',
    'photographe': 'Excellent ! Je vais concevoir un portfolio photographe avec une galerie en grille, un système de lightbox, des catégories pour organiser vos photos, une page à propos et un formulaire de contact pour vos clients.',
    'app mobile': 'Super ! Je vais créer une landing page pour votre app avec une section hero accrocheuse, les fonctionnalités principales, des témoignages, les liens de téléchargement et un design optimisé conversion.',
    'e-commerce': 'Génial ! Je vais développer un site e-commerce avec une vitrine produits, un panier d'achat, un système de filtres, des fiches produits détaillées et un design moderne qui encourage l'achat.',
    'default': 'Je comprends votre demande ! Je vais créer un site web personnalisé qui correspond parfaitement à vos besoins. Le design sera moderne, responsive et optimisé pour vos objectifs.'
  };

  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('restaurant')) return responses.restaurant;
  if (lowerMessage.includes('photographe') || lowerMessage.includes('photo')) return responses.photographe;
  if (lowerMessage.includes('app') || lowerMessage.includes('application')) return responses['app mobile'];
  if (lowerMessage.includes('e-commerce') || lowerMessage.includes('boutique') || lowerMessage.includes('vente')) return responses['e-commerce'];

  return responses.default;
}

function createSiteFromAI(description) {
  showNotification('Création du site en cours...', 'success');

  setTimeout(() => {
    showPage('editor');
    showNotification('Site créé ! Vous pouvez maintenant le personnaliser.', 'success');
  }, 2000);
}

// Utility Functions
function showModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
  }
}

function hideModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
  }
}

function showNotification(message, type = 'success') {
  const container = document.getElementById('notifications');
  if (!container) return;

  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <p>${message}</p>
  `;

  container.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

function openProject(projectId) {
  showNotification(`Ouverture du projet ${projectId}...`, 'success');
  setTimeout(() => {
    showPage('editor');
  }, 1000);
}

function useTemplate(templateId) {
  const template = appData.templates.find(t => t.id === templateId);
  showNotification(`Utilisation du template "${template.name}"...`, 'success');

  setTimeout(() => {
    showPage('editor');
    showNotification('Template chargé ! Personnalisez votre site.', 'success');
  }, 1500);
}

function selectPlan(planName) {
  if (planName === 'Gratuit') {
    showNotification('Compte gratuit créé ! Commencez à créer votre site.', 'success');
    setTimeout(() => showPage('dashboard'), 1000);
  } else {
    showNotification(`Redirection vers le paiement pour le plan ${planName}...`, 'success');
    // Simulate Stripe payment
    setTimeout(() => {
      showNotification(`Plan ${planName} activé ! Profitez de toutes les fonctionnalités.`, 'success');
      showPage('dashboard');
    }, 2000);
  }
}

// Export functions for global access
window.openProject = openProject;
window.useTemplate = useTemplate;
window.selectPlan = selectPlan;
window.createSiteFromAI = createSiteFromAI;
window.updateElementProperty = updateElementProperty;
window.deleteSelectedElement = deleteSelectedElement;