// Main Application Class
class Portfolio {
    constructor() {
        this.modules = {};
        this.initializeModules();
        this.setupEventListeners();
    }

    initializeModules() {
        this.modules = {
            loader: new LoadingScreen(),
            themeManager: new ThemeManager(),
            navigation: new Navigation(),
            projects: new ProjectsManager(),
            skills: new SkillsAnimation(),
            contact: new ContactForm(),
            animations: new AnimationManager()
        };
    }

    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', this.onDOMContentLoaded.bind(this));
    }

    onDOMContentLoaded() {
        this.modules.loader.hide();
        this.modules.animations.initializeOnScroll();
        this.updateFooterYear();
    }

    updateFooterYear() {
        const currentYearElement = document.getElementById('current-year');
        if (currentYearElement) {
            currentYearElement.textContent = new Date().getFullYear();
        }
    }
}

// Loading Screen Module
class LoadingScreen {
    constructor() {
        this.loader = document.querySelector('.loader');
        this.hideDelay = 1000;
        this.fadeOutDuration = 500;
    }

    hide() {
        if (!this.loader) return;

        setTimeout(() => {
            this.fadeOut();
        }, this.hideDelay);
    }

    fadeOut() {
        this.loader.style.opacity = '0';
        setTimeout(() => {
            this.loader.style.display = 'none';
        }, this.fadeOutDuration);
    }
}

// Theme Manager Module
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.body = document.body;
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.themes = ['light', 'dark'];
        this.icons = {
            light: 'fa-moon',
            dark: 'fa-sun'
        };
        this.initializeTheme();
        this.setupEventListeners();
    }

    initializeTheme() {
        this.setTheme(this.currentTheme);
    }

    setupEventListeners() {
        this.themeToggle?.addEventListener('click', () => this.toggleTheme());
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    setTheme(theme) {
        if (!this.themes.includes(theme)) return;

        this.currentTheme = theme;
        this.themes.forEach(t => this.body.classList.toggle(t, t === theme));
        this.updateToggleButton();
        localStorage.setItem('theme', theme);
    }

    updateToggleButton() {
        if (!this.themeToggle) return;

        const iconClass = this.icons[this.currentTheme];
        this.themeToggle.innerHTML = `<i class="fas ${iconClass}"></i>`;
    }
}

// Navigation Module
class Navigation {
    constructor() {
        this.header = document.querySelector('.header');
        this.navToggle = document.querySelector('.nav-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.setupEventListeners();
    }

    setupEventListeners() {
        window.addEventListener('scroll', () => this.handleScroll());
        this.navToggle.addEventListener('click', () => this.toggleMenu());
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });
    }

    handleScroll() {
        if (window.scrollY > 100) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }
    }

    toggleMenu() {
        this.navMenu.classList.toggle('active');
        this.navToggle.classList.toggle('active');
    }

    handleNavClick(e) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
            this.toggleMenu();
        }
    }
}

// Projects Manager Module
class ProjectsManager {
    constructor() {
        this.projects = [
            {
                title: 'Project 1',
                description: 'A brief description of Project 1.',
                image: 'proj.jpg',
                category: 'web',
                link: '#'
            },
            {
                title: 'Project 2',
                description: 'A brief description of Project 2.',
                image: 'proj.jpg',
                category: 'app',
                link: '#'
            },
            {
                title: 'Project 3',
                description: 'A brief description of Project 3.',
                image: 'proj.jpg',
                category: 'design',
                link: '#'
            }
        ];
        this.projectsGrid = document.querySelector('.projects-grid');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.initializeProjects();
        this.setupEventListeners();
    }

    initializeProjects() {
        this.renderProjects('all');
    }

    setupEventListeners() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                this.filterProjects(filter);
            });
        });
    }

    renderProjects(filter) {
        this.projectsGrid.innerHTML = '';
        const filteredProjects = filter === 'all' ? this.projects : this.projects.filter(project => project.category === filter);
        
        filteredProjects.forEach(project => {
            const projectElement = this.createProjectElement(project);
            this.projectsGrid.appendChild(projectElement);
        });
    }

    createProjectElement(project) {
        const projectElement = document.createElement('div');
        projectElement.classList.add('project-item');
        projectElement.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <a href="${project.link}" class="btn">View Project</a>
            </div>
        `;
        return projectElement;
    }

    filterProjects(filter) {
        this.filterButtons.forEach(button => button.classList.remove('active'));
        const activeButton = document.querySelector(`[data-filter="${filter}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }
        this.renderProjects(filter);
    }
}

// Skills Animation Module
class SkillsAnimation {
    constructor() {
        this.skillBars = document.querySelectorAll('.progress');
        this.animateSkills();
    }

    animateSkills() {
        this.skillBars.forEach(bar => {
            const percent = bar.getAttribute('data-percent');
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = percent + '%';
            }, 100);
        });
    }
}

// Contact Form Module
class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    handleSubmit(e) {
        e.preventDefault();
        // Add form submission logic here (e.g., AJAX request to server)
        console.log('Form submitted');
        this.form.reset();
    }
}

// Animation Manager Module
class AnimationManager {
    constructor() {
        this.animatedElements = document.querySelectorAll('.animate-on-scroll');
    }

    initializeOnScroll() {
        window.addEventListener('scroll', () => this.checkVisibility());
        this.checkVisibility();
    }

    checkVisibility() {
        this.animatedElements.forEach(element => {
            if (this.isElementInViewport(element)) {
                element.classList.add('animated');
            }
        });
    }

    isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
}

// Initialize the application
const portfolio = new Portfolio();
