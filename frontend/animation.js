/*
Developer: Jhon Ladines
Website: https://www.jhonladines.top/
Copyright © 2026 Jhon Ladines
This script is from ELEC 07 for school purposes
Made by Jhon Ladines
All rights reserved.
*/

document.addEventListener('DOMContentLoaded', function() {
    const card = document.querySelector('.js-card');
    if (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(100px) scale(0.8) rotateX(20deg)';
        card.style.transition = 'opacity 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55), transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
        }, 100);
    }

    const leftPanel = document.querySelector('.js-left-panel');
    if (leftPanel) {
        leftPanel.style.opacity = '0';
        leftPanel.style.transition = 'opacity 1s ease-out';
        setTimeout(() => {
            leftPanel.style.opacity = '1';
        }, 300);
    }

    const rightPanel = document.querySelector('.js-right-panel');
    if (rightPanel) {
        rightPanel.style.opacity = '0';
        rightPanel.style.transform = 'translateX(50px)';
        rightPanel.style.transition = 'opacity 0.6s ease-out, transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        setTimeout(() => {
            rightPanel.style.opacity = '1';
            rightPanel.style.transform = 'translateX(0)';
        }, 400);
    }

    const heading = document.querySelector('.js-heading');
    if (heading) {
        heading.style.opacity = '0';
        heading.style.transform = 'scale(0) rotate(-10deg)';
        heading.style.transition = 'opacity 0.5s ease-out, transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        setTimeout(() => {
            heading.style.opacity = '1';
            heading.style.transform = 'scale(1) rotate(0deg)';
        }, 500);
    }

    const subheading = document.querySelector('.js-subheading');
    if (subheading) {
        subheading.style.opacity = '0';
        subheading.style.transform = 'translateX(-30px)';
        subheading.style.transition = 'opacity 0.5s ease-out, transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        setTimeout(() => {
            subheading.style.opacity = '1';
            subheading.style.transform = 'translateX(0)';
        }, 600);
    }

    const formGroups = document.querySelectorAll('.js-form-group, .form-group');
    formGroups.forEach((group, index) => {
        group.style.opacity = '0';
        group.style.transform = 'translateY(30px) rotate(-5deg) scale(0.9)';
        group.style.transition = 'opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        setTimeout(() => {
            group.style.opacity = '1';
            group.style.transform = 'translateY(0) rotate(0deg) scale(1)';
        }, 700 + (index * 100));
    });

    const primaryBtn = document.querySelector('.js-btn-primary');
    if (primaryBtn) {
        primaryBtn.style.opacity = '0';
        primaryBtn.style.transform = 'scale(0) translateY(20px)';
        primaryBtn.style.transition = 'opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        setTimeout(() => {
            primaryBtn.style.opacity = '1';
            primaryBtn.style.transform = 'scale(1) translateY(0)';
            setTimeout(() => {
                primaryBtn.style.animation = 'pulse 2s infinite';
            }, 500);
        }, 700 + (formGroups.length * 100) + 100);
    }

    const footer = document.querySelector('footer');
    if (footer) {
        footer.style.opacity = '0';
        footer.style.transform = 'translateY(20px)';
        footer.style.transition = 'opacity 0.5s ease-out, transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        setTimeout(() => {
            footer.style.opacity = '1';
            footer.style.transform = 'translateY(0)';
        }, 700 + (formGroups.length * 100) + 200);
    }
});

export function animateProfileShow(profileElement) {
    if (!profileElement) return;
    
    const blurOverlay = document.getElementById('blurOverlay');
    if (blurOverlay) {
        blurOverlay.classList.remove('hidden');
        blurOverlay.style.opacity = '0';
        blurOverlay.style.transition = 'opacity 0.5s ease-out';
        setTimeout(() => {
            blurOverlay.style.opacity = '1';
        }, 50);
    }
    
    profileElement.style.opacity = '0';
    profileElement.style.transform = 'scale(0.5) translateY(-30px)';
    profileElement.style.transition = 'opacity 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55), transform 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    
    profileElement.offsetHeight;
    
    profileElement.style.opacity = '1';
    profileElement.style.transform = 'scale(1) translateY(0)';
    
    const profileImage = profileElement.querySelector('#profileImage');
    const defaultAvatar = profileElement.querySelector('#defaultAvatar');
    const imageContainer = profileElement.querySelector('.w-24');
    
    if (imageContainer) {
        imageContainer.style.transform = 'scale(0) rotate(180deg)';
        imageContainer.style.transition = 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        setTimeout(() => {
            imageContainer.style.transform = 'scale(1) rotate(0deg)';
        }, 100);
    }
    
    const welcomeMessage = profileElement.querySelector('#welcomeMessage');
    const userEmail = profileElement.querySelector('#userEmail');
    
    if (welcomeMessage) {
        welcomeMessage.style.opacity = '0';
        welcomeMessage.style.transform = 'translateX(-20px)';
        welcomeMessage.style.transition = 'opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        setTimeout(() => {
            welcomeMessage.style.opacity = '1';
            welcomeMessage.style.transform = 'translateX(0)';
        }, 300);
    }
    
    if (userEmail) {
        userEmail.style.opacity = '0';
        userEmail.style.transform = 'translateX(20px)';
        userEmail.style.transition = 'opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        setTimeout(() => {
            userEmail.style.opacity = '1';
            userEmail.style.transform = 'translateX(0)';
        }, 400);
    }
}

export function animateProfileHide(profileElement, callback) {
    if (!profileElement) {
        if (callback) callback();
        return;
    }
    
    const blurOverlay = document.getElementById('blurOverlay');
    if (blurOverlay) {
        blurOverlay.style.opacity = '0';
        blurOverlay.style.transition = 'opacity 0.4s ease-out';
    }
    
    profileElement.style.transition = 'opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    profileElement.style.opacity = '0';
    profileElement.style.transform = 'scale(0.8) translateY(20px) rotate(5deg)';
    
    const imageContainer = profileElement.querySelector('.w-24');
    if (imageContainer) {
        imageContainer.style.transform = 'scale(0) rotate(-180deg)';
        imageContainer.style.transition = 'transform 0.4s ease-out';
    }
    
    const welcomeMessage = profileElement.querySelector('#welcomeMessage');
    const userEmail = profileElement.querySelector('#userEmail');
    
    if (welcomeMessage) {
        welcomeMessage.style.opacity = '0';
        welcomeMessage.style.transform = 'translateX(-20px)';
    }
    
    if (userEmail) {
        userEmail.style.opacity = '0';
        userEmail.style.transform = 'translateX(20px)';
    }
    
    setTimeout(() => {
        if (blurOverlay) {
            blurOverlay.classList.add('hidden');
        }
        if (callback) callback();
    }, 500);
}
