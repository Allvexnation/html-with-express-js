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
    
    // Clear existing steps array
    steps = [];
    
    // Define step boundaries based on field indices
    // Personal Information: 0-5 (6 fields) -> 3 steps of 2
    // Account Information: 6-8 (3 fields) -> 1 step of 3
    // Additional Requirements: 9-11 (3 fields) -> 1 step of 3
    const stepConfig = [
        { start: 0, end: 2 },   // Step 1: Full Name, Address
        { start: 2, end: 4 },   // Step 2: Cell Number, Date of Birth
        { start: 4, end: 6 },   // Step 3: Age, Email
        { start: 6, end: 9 },   // Step 4: Username, Password, Confirm Password (3 fields)
        { start: 9, end: 12 }   // Step 5: Gender, Hobbies, Agreement (3 fields)
    ];
    
    // Group field containers into steps based on config
    stepConfig.forEach(config => {
        const stepFields = [];
        for (let i = config.start; i < config.end && i < fieldContainers.length; i++) {
            stepFields.push(fieldContainers[i]);
        }
        steps.push(stepFields);
    });
    
    // Hide all field containers first
    fieldContainers.forEach(container => {
        container.style.display = 'none';
        container.style.transition = 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out';
    });
    
    // Show only the first step's fields
    steps[0].forEach(container => {
        container.style.display = 'block';
        container.style.opacity = 1;
        container.style.transform = 'translateX(0)';
    });

    form.insertAdjacentHTML('beforeend', `
        <div class="flex justify-between mt-6">
            <button type="button" id="prevBtn" class="inline-flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 transition-opacity duration-200 hover:opacity-90 hidden">Previous</button>
            <button type="button" id="nextBtn" class="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-opacity duration-200 hover:opacity-90 ml-auto">Next</button>
        </div>
    `);

    document.getElementById('prevBtn').onclick = () => changeStep(-1);
    document.getElementById('nextBtn').onclick = () => changeStep(1);
    form.querySelector('button[type="submit"]').style.display = 'none';

    // Add keyboard navigation
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
                // On last step, submit the form
                form.querySelector('button[type="submit"]').click();
            } else {
                // On other steps, go to next step
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
        
        // Check email validation before proceeding from step 3 (which contains email)
        if (currentStep === 2) {
            const emailField = document.getElementById('email');
            const emailError = document.getElementById('emailError');
            
            if (emailField && emailError) {
                const emailValue = emailField.value.trim();
                console.log('Email step validation - emailValue:', emailValue);
                
                if (emailValue && emailValue.includes('@') && emailValue.includes('.')) {
                    // Trigger email validation check (async)
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
                            
                            // Check if it's an actual error (red text) vs success message (green text)
                            const hasError = emailError.classList.contains('text-red-500');
                            
                            if (hasError) {
                                emailField.focus();
                                console.log('Blocking navigation due to email error');
                                return; // Don't proceed if email has error
                            }
                            // Proceed if no error (either hidden or green success message)
                            if (window.triggerGreenBlink) window.triggerGreenBlink();
                            proceedToStep(dir, newStep);
                        });
                        return; // Block immediate navigation, wait for async check
                    }
                }
            }
        }
        
        // Check username validation before proceeding from step 4 (which contains username)
        if (currentStep === 3) {
            const usernameField = document.getElementById('regUsername');
            const usernameError = document.getElementById('usernameError');
            
            if (usernameField && usernameError) {
                const usernameValue = usernameField.value.trim();
                if (usernameValue.length >= 3) {
                    // Trigger username validation check (async)
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
                            
                            // Check if it's an actual error (red text) vs success message (green text)
                            const hasError = usernameError.classList.contains('text-red-500');
                            
                            if (hasError) {
                                usernameField.focus();
                                return; // Don't proceed if username has error
                            }
                            // Proceed if no error (either hidden or green success message)
                            if (window.triggerGreenBlink) window.triggerGreenBlink();
                            proceedToStep(dir, newStep);
                        });
                        return; // Block immediate navigation, wait for async check
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
    // Fade out current step fields
    steps[currentStep].forEach(container => {
        container.style.opacity = 0;
        container.style.transform = dir > 0 ? 'translateX(-20px)' : 'translateX(20px)';
    });
    
    setTimeout(() => {
        steps[currentStep].forEach(container => {
            container.style.display = 'none';
        });
        
        currentStep = newStep;
        
        // Prepare new step fields for fade in
        steps[currentStep].forEach(container => {
            container.style.display = 'block';
            container.style.opacity = 0;
            container.style.transform = dir > 0 ? 'translateX(20px)' : 'translateX(-20px)';
        });
        
        // Trigger reflow
        void steps[currentStep][0].offsetHeight;
        
        // Fade in new step fields
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
