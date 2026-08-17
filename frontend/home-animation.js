// Entrance animations for home page
document.addEventListener('DOMContentLoaded', function() {
    // Animate header with slide down effect
    const header = document.querySelector('header');
    if (header) {
        header.style.opacity = '0';
        header.style.transform = 'translateY(-50px)';
        header.style.transition = 'opacity 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55), transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        setTimeout(() => {
            header.style.opacity = '1';
            header.style.transform = 'translateY(0)';
        }, 100);
    }

    // Animate welcome card with bounce effect
    const welcomeCard = document.querySelector('.glass-card, .bg-gradient-to-r');
    if (welcomeCard) {
        welcomeCard.style.opacity = '0';
        welcomeCard.style.transform = 'translateY(50px) scale(0.9)';
        welcomeCard.style.transition = 'opacity 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55), transform 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        setTimeout(() => {
            welcomeCard.style.opacity = '1';
            welcomeCard.style.transform = 'translateY(0) scale(1)';
        }, 300);
    }

    // Animate stats cards with staggered bounce
    const statsCards = document.querySelectorAll('.grid.grid-cols-1.md\\:grid-cols-4 > div');
    statsCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.8) rotate(-5deg)';
        card.style.transition = 'opacity 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55), transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1) rotate(0deg)';
        }, 500 + (index * 100));
    });

    // Animate quick access cards with staggered slide
    const quickAccessCards = document.querySelectorAll('.grid.grid-cols-1.md\\:grid-cols-4 .cursor-pointer');
    quickAccessCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-30px) rotate(-3deg)';
        card.style.transition = 'opacity 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55), transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateX(0) rotate(0deg)';
        }, 900 + (index * 100));
    });

    // Animate subject cards with staggered fade and scale
    const subjectCards = document.querySelectorAll('#allSubjectsContainer > div, #myEnrolledSubjectsContainer > div');
    subjectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px) scale(0.85)';
        card.style.transition = 'opacity 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55), transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        }, 400 + (index * 80));
    });

    // Animate grades table with slide
    const gradesTable = document.querySelector('table');
    if (gradesTable) {
        gradesTable.style.opacity = '0';
        gradesTable.style.transform = 'translateX(-50px)';
        gradesTable.style.transition = 'opacity 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55), transform 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        setTimeout(() => {
            gradesTable.style.opacity = '1';
            gradesTable.style.transform = 'translateX(0)';
        }, 400);
    }
});

// Page transition animation
export function animatePageTransition(pageElement) {
    if (!pageElement) return;
    
    pageElement.style.opacity = '0';
    pageElement.style.transform = 'translateX(30px)';
    pageElement.style.transition = 'opacity 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55), transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    
    // Force reflow
    pageElement.offsetHeight;
    
    pageElement.style.opacity = '1';
    pageElement.style.transform = 'translateX(0)';
}

// Navigation link hover animation
export function animateNavLinks() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        });
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Card hover animation
export function animateCardHover() {
    const cards = document.querySelectorAll('.glass-card, .glass-card-light, .bg-white.rounded-xl');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
            this.style.transition = 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55), box-shadow 0.3s ease';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
}

// Button pulse animation
export function animateButtons() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        });
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Profile modal show animation
export function animateProfileShow(modalElement) {
    if (!modalElement) return;
    
    modalElement.style.opacity = '0';
    modalElement.style.transform = 'scale(0.5) translateY(-30px) rotate(-10deg)';
    modalElement.style.transition = 'opacity 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55), transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    
    // Force reflow
    modalElement.offsetHeight;
    
    modalElement.style.opacity = '1';
    modalElement.style.transform = 'scale(1) translateY(0) rotate(0deg)';
}

// Profile modal hide animation
export function animateProfileHide(modalElement, callback) {
    if (!modalElement) {
        if (callback) callback();
        return;
    }
    
    modalElement.style.transition = 'opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    modalElement.style.opacity = '0';
    modalElement.style.transform = 'scale(0.8) translateY(20px) rotate(5deg)';
    
    setTimeout(() => {
        if (callback) callback();
    }, 500);
}

// Animate grades table specifically
export function animateGradesTable() {
    const gradesTable = document.querySelector('table');
    if (gradesTable) {
        gradesTable.style.opacity = '0';
        gradesTable.style.transform = 'translateX(-50px) scale(0.9)';
        gradesTable.style.transition = 'opacity 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55), transform 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        setTimeout(() => {
            gradesTable.style.opacity = '1';
            gradesTable.style.transform = 'translateX(0) scale(1)';
        }, 300);
    }
}

// Refresh animations when content changes
export function refreshAnimations() {
    // Animate stats cards
    const statsCards = document.querySelectorAll('.grid.grid-cols-1.md\\:grid-cols-4 > div');
    statsCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.8)';
        card.style.transition = 'opacity 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55), transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        }, 100 + (index * 80));
    });

    // Animate subject cards
    const subjectCards = document.querySelectorAll('#allSubjectsContainer > div, #myEnrolledSubjectsContainer > div');
    subjectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px) scale(0.85)';
        card.style.transition = 'opacity 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55), transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        }, 200 + (index * 80));
    });

    // Re-apply hover animations
    animateCardHover();
    animateButtons();
    animateNavLinks();
}
