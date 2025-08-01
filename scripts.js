// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all Lucide icons
    lucide.createIcons();
    
    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = document.getElementById('menuIcon');
    const closeIcon = document.getElementById('closeIcon');
    
    let isMenuOpen = false;
    
    mobileMenuBtn.addEventListener('click', function() {
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            mobileMenu.classList.add('show');
            menuIcon.style.display = 'none';
            closeIcon.style.display = 'block';
        } else {
            mobileMenu.classList.remove('show');
            menuIcon.style.display = 'block';
            closeIcon.style.display = 'none';
        }
    });
    
    // Smooth scroll navigation for desktop buttons
    const navButtons = document.querySelectorAll('.nav-button');
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            scrollToSection(target);
        });
    });
    
    // Smooth scroll navigation for mobile buttons
    const navButtonsMobile = document.querySelectorAll('.nav-button-mobile');
    navButtonsMobile.forEach(button => {
        button.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            scrollToSection(target);
            
            // Close mobile menu after navigation
            isMenuOpen = false;
            mobileMenu.classList.remove('show');
            menuIcon.style.display = 'block';
            closeIcon.style.display = 'none';
        });
    });
    
    // Smooth scroll function
    function scrollToSection(targetId) {
        const element = document.getElementById(targetId);
        if (element) {
            const headerHeight = document.querySelector('.navigation').offsetHeight;
            const elementPosition = element.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const nav = document.querySelector('.navigation');
        if (isMenuOpen && !nav.contains(event.target)) {
            isMenuOpen = false;
            mobileMenu.classList.remove('show');
            menuIcon.style.display = 'block';
            closeIcon.style.display = 'none';
        }
    });
    
    // Close mobile menu on window resize to desktop size
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768 && isMenuOpen) {
            isMenuOpen = false;
            mobileMenu.classList.remove('show');
            menuIcon.style.display = 'block';
            closeIcon.style.display = 'none';
        }
    });
    
    // Add scroll effect to navigation
    let lastScrollTop = 0;
    const navigation = document.querySelector('.navigation');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navigation.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navigation.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
    
    // Add transition to navigation
    navigation.style.transition = 'transform 0.3s ease-in-out';
    
    // Highlight active section in navigation
    const sections = document.querySelectorAll('.department-section');
    const navButtonsAll = document.querySelectorAll('.nav-button, .nav-button-mobile');
    
    function updateActiveNavigation() {
        let current = '';
        const scrollPosition = window.scrollY + 200; // Offset for better UX
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navButtonsAll.forEach(button => {
            button.classList.remove('active');
            if (button.getAttribute('data-target') === current) {
                button.classList.add('active');
            }
        });
    }
    
    // Add active state styles
    const style = document.createElement('style');
    style.textContent = `
        .nav-button.active,
        .nav-button-mobile.active {
            background: hsla(0, 0%, 98%, 0.2) !important;
            font-weight: 600;
        }
    `;
    document.head.appendChild(style);
    
    // Update active navigation on scroll
    window.addEventListener('scroll', updateActiveNavigation);
    
    // Initial call to set active state
    updateActiveNavigation();
    
    // Add intersection observer for fade-in animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Add fade-in animation styles
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .department-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
    `;
    document.head.appendChild(animationStyle);
    
    // Observe all department cards
    const departmentCards = document.querySelectorAll('.department-card');
    departmentCards.forEach(card => {
        observer.observe(card);
    });
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease-in-out';
    
    // Fade in the page
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});