/*
Developer: Jhon Ladines
Website: https://www.jhonladines.top/
Copyright © 2026 Jhon Ladines
This script is from ELEC 07 for school purposes
Made by Jhon Ladines
All rights reserved.
*/

let currentStep = 0, steps = [];

function initSteps(formId) {
    const form = document.getElementById(formId);
    const fieldContainers = Array.from(form.children).filter(child => 
        child.querySelector && (child.querySelector('input') || child.querySelector('select'))
    );
    
    steps = [];
    
    const stepConfig = [
        { start: 0, end: 2 },
        { start: 2, end: 4 },
        { start: 4, end: 6 },
        { start: 6, end: 9 },
        { start: 9, end: 12 }
    ];
    
    stepConfig.forEach(config => {
        const stepFields = [];
        for (let i = config.start; i < config.end && i < fieldContainers.length; i++) {
            stepFields.push(fieldContainers[i]);
        }
        steps.push(stepFields);
    });
    
    fieldContainers.forEach(container => {
        container.style.display = 'none';
        container.style.transition = 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out';
    });
    
    steps[0].forEach(container => {
        container.style.display = 'block';
        container.style.opacity = 1;
        container.style.transform = 'translateX(0)';
    });

    form.insertAdjacentHTML('beforeend', `
        <div class="flex justify-between mt-6">
            <button type="button" id="prevBtn" class="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-opacity duration-200 hover:opacity-90 hidden">Previous</button>
            <button type="button" id="nextBtn" class="inline-flex items-center justify-center px-4 py-2 bg-yellow-400 text-blue-900 font-medium rounded-md hover:bg-yellow-300 transition-opacity duration-200 hover:opacity-90 ml-auto">Next</button>
        </div>
    `);

    document.getElementById('prevBtn').onclick = () => changeStep(-1);
    document.getElementById('nextBtn').onclick = () => changeStep(1);
    form.querySelector('button[type="submit"]').style.display = 'none';

    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            changeStep(-1);
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            changeStep(1);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (currentStep === steps.length - 1) {
                form.querySelector('button[type="submit"]').click();
            } else {
                changeStep(1);
            }
        }
    });
}

export { initSteps };
window.initSteps = initSteps;

function changeStep(dir) {
    const newStep = currentStep + dir;
    if (newStep < 0 || newStep >= steps.length) return;

    if (dir > 0) {
        const currentFields = steps[currentStep];
        let allValid = true;
        
        currentFields.forEach(container => {
            const field = container.querySelector('input, select');
            if (window.validateField) {
                const isValid = validateField(field);
                if (!isValid) {
                    allValid = false;
                    field.focus();
                }
            } else {
                if (!field.value.trim()) {
                    allValid = false;
                    field.style.borderColor = 'red';
                    field.focus();
                    if (window.triggerRedBlink) window.triggerRedBlink();
                }
            }
        });
        
        if (!allValid) return;
        
        if (currentStep === 2) {
            const emailField = document.getElementById('email');
            const emailError = document.getElementById('emailError');
            
            if (emailField && emailError) {
                const emailValue = emailField.value.trim();
                console.log('Email step validation - emailValue:', emailValue);
                
                if (emailValue && emailValue.includes('@') && emailValue.includes('.')) {
                    if (window.checkEmailExists) {
                        const nextBtn = document.getElementById('nextBtn');
                        if (nextBtn) {
                            nextBtn.disabled = true;
                            nextBtn.classList.add('opacity-50', 'cursor-not-allowed');
                        }
                        
                        window.checkEmailExists(emailValue).then(() => {
                            if (nextBtn) {
                                nextBtn.disabled = false;
                                nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                            }
                            
                            console.log('After validation - error hidden?', emailError.classList.contains('hidden'));
                            console.log('Error text color classes:', emailError.className);
                            
                            const hasError = emailError.classList.contains('text-red-500');
                            
                            if (hasError) {
                                emailField.focus();
                                console.log('Blocking navigation due to email error');
                                return;
                            }
                            if (window.triggerGreenBlink) window.triggerGreenBlink();
                            proceedToStep(dir, newStep);
                        });
                        return;
                    }
                }
            }
        }
        
        if (currentStep === 3) {
            const usernameField = document.getElementById('regUsername');
            const usernameError = document.getElementById('usernameError');
            
            if (usernameField && usernameError) {
                const usernameValue = usernameField.value.trim();
                if (usernameValue.length >= 3) {
                    if (window.checkUsernameExists) {
                        const nextBtn = document.getElementById('nextBtn');
                        if (nextBtn) {
                            nextBtn.disabled = true;
                            nextBtn.classList.add('opacity-50', 'cursor-not-allowed');
                        }
                        
                        window.checkUsernameExists(usernameValue).then(() => {
                            if (nextBtn) {
                                nextBtn.disabled = false;
                                nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                            }
                            
                            const hasError = usernameError.classList.contains('text-red-500');
                            
                            if (hasError) {
                                usernameField.focus();
                                return;
                            }
                            if (window.triggerGreenBlink) window.triggerGreenBlink();
                            proceedToStep(dir, newStep);
                        });
                        return;
                    }
                }
            }
        }
        
        if (window.triggerGreenBlink) window.triggerGreenBlink();
        proceedToStep(dir, newStep);
        return;
    }

    proceedToStep(dir, newStep);
}

function proceedToStep(dir, newStep) {
    steps[currentStep].forEach(container => {
        container.style.opacity = 0;
        container.style.transform = dir > 0 ? 'translateX(-20px)' : 'translateX(20px)';
    });
    
    setTimeout(() => {
        steps[currentStep].forEach(container => {
            container.style.display = 'none';
        });
        
        currentStep = newStep;
        
        steps[currentStep].forEach(container => {
            container.style.display = 'block';
            container.style.opacity = 0;
            container.style.transform = dir > 0 ? 'translateX(20px)' : 'translateX(-20px)';
        });
        
        void steps[currentStep][0].offsetHeight;
        
        setTimeout(() => {
            steps[currentStep].forEach(container => {
                container.style.opacity = 1;
                container.style.transform = 'translateX(0)';
            });
        }, 10);

        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const submitBtn = document.querySelector('form button[type="submit"]');

        prevBtn.classList.toggle('hidden', currentStep === 0);
        nextBtn.style.display = currentStep === steps.length - 1 ? 'none' : 'block';
        submitBtn.style.display = currentStep === steps.length - 1 ? 'block' : 'none';
    }, 300);
}
