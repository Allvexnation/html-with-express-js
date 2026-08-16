/*
Developer: Jhon Ladines
Website: https://www.jhonladines.top/
Copyright © 2026 Jhon Ladines
This script is from ELEC 07 for school purposes
Made by Jhon Ladines
All rights reserved.
*/
document.addEventListener('DOMContentLoaded', function() {
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

    const welcomeCard = document.querySelector('.bg-gradient-to-r');
    if (welcomeCard) {
        welcomeCard.style.opacity = '0';
        welcomeCard.style.transform = 'translateY(50px) scale(0.9)';
        welcomeCard.style.transition = 'opacity 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55), transform 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        setTimeout(() => {
            welcomeCard.style.opacity = '1';
            welcomeCard.style.transform = 'translateY(0) scale(1)';
        }, 300);
    }

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

    const tables = document.querySelectorAll('table');
    tables.forEach((table, index) => {
        table.style.opacity = '0';
        table.style.transform = 'translateX(-50px) scale(0.9)';
        table.style.transition = 'opacity 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55), transform 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        setTimeout(() => {
            table.style.opacity = '1';
            table.style.transform = 'translateX(0) scale(1)';
        }, 400 + (index * 100));
    });
});

export function animatePageTransition(pageElement) {
    if (!pageElement) return;
    
    pageElement.style.opacity = '0';
    pageElement.style.transform = 'translateX(30px)';
    pageElement.style.transition = 'opacity 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55), transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    
    pageElement.offsetHeight;
    
    pageElement.style.opacity = '1';
    pageElement.style.transform = 'translateX(0)';
}

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

export function animateCardHover() {
    const cards = document.querySelectorAll('.bg-white.rounded-xl.shadow-md');
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

export function animateModalShow(modalElement) {
    if (!modalElement) return;
    
    modalElement.style.opacity = '0';
    modalElement.style.transform = 'scale(0.5) translateY(-30px) rotate(-10deg)';
    modalElement.style.transition = 'opacity 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55), transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    
    modalElement.offsetHeight;
    
    modalElement.style.opacity = '1';
    modalElement.style.transform = 'scale(1) translateY(0) rotate(0deg)';
}

export function animateModalHide(modalElement, callback) {
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

export function animateProfileShow(modalElement) {
    if (!modalElement) return;
    
    modalElement.style.opacity = '0';
    modalElement.style.transform = 'scale(0.5) translateY(-30px) rotate(-10deg)';
    modalElement.style.transition = 'opacity 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55), transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    
    modalElement.offsetHeight;
    
    modalElement.style.opacity = '1';
    modalElement.style.transform = 'scale(1) translateY(0) rotate(0deg)';
}

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

export function animateTables() {
    const tables = document.querySelectorAll('table');
    tables.forEach((table, index) => {
        table.style.opacity = '0';
        table.style.transform = 'translateX(-50px)';
        table.style.transition = 'opacity 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55), transform 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        setTimeout(() => {
            table.style.opacity = '1';
            table.style.transform = 'translateX(0)';
        }, 300 + (index * 100));
    });
}

export function animateTableRowsDomino() {
    const tables = document.querySelectorAll('table tbody');
    tables.forEach(tbody => {
        const rows = tbody.querySelectorAll('tr');
        rows.forEach((row, index) => {
            row.style.opacity = '0';
            row.style.transform = 'translateX(-20px)';
            row.style.transition = 'opacity 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55), transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            setTimeout(() => {
                row.style.opacity = '1';
                row.style.transform = 'translateX(0)';
            }, 50 + (index * 80));
        });
    });
}

export function refreshAnimations() {
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

    const quickAccessCards = document.querySelectorAll('.grid.grid-cols-1.md\\:grid-cols-4 .cursor-pointer');
    quickAccessCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-30px)';
        card.style.transition = 'opacity 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55), transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateX(0)';
        }, 200 + (index * 80));
    });

    animateCardHover();
    animateButtons();
    animateNavLinks();
}
