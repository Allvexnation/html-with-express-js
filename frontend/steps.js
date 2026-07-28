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
    form.querySelectorAll('input').forEach((input, i) => {
        input.parentElement.style.cssText = `transition: all 0.3s ease; opacity: ${i === 0 ? 1 : 0}; transform: ${i === 0 ? 'translateX(0)' : 'translateX(20px)'}; display: ${i === 0 ? 'block' : 'none'}`;
        steps.push(input.parentElement);

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const nextBtn = document.getElementById('nextBtn');
                const submitBtn = form.querySelector('button[type="submit"]');
                if (nextBtn && nextBtn.style.display !== 'none') {
                    nextBtn.click();
                } else if (submitBtn && submitBtn.style.display !== 'none') {
                    submitBtn.click();
                }
            }
        });

        input.addEventListener('blur', () => {
            if (window.validateField) {
                validateField(input);
            }
        });

        input.addEventListener('input', () => {
            if (window.validateField && input.value.trim()) {
                validateField(input);
            } else if (window.resetFieldStyle && !input.value.trim()) {
                resetFieldStyle(input);
            }
        });
    });

    form.insertAdjacentHTML('beforeend', `
        <div class="flex justify-between mt-6">
            <button type="button" id="prevBtn" class="px-4 py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-all hidden">Previous</button>
            <button type="button" id="nextBtn" class="px-4 py-2 bg-white text-black font-semibold rounded-lg hover:bg-white/90 transition-all ml-auto">Next</button>
        </div>
    `);

    document.getElementById('prevBtn').onclick = () => changeStep(-1);
    document.getElementById('nextBtn').onclick = () => changeStep(1);
    form.querySelector('button[type="submit"]').style.display = 'none';
}

function changeStep(dir) {
    const newStep = currentStep + dir;
    if (newStep < 0 || newStep >= steps.length) return;

    if (dir > 0) {
        const currentInput = steps[currentStep].querySelector('input');
        if (window.validateField) {
            const isValid = validateField(currentInput);
            if (!isValid) {
                currentInput.focus();
                return;
            }
            if (window.triggerGreenBlink) window.triggerGreenBlink();
            setTimeout(() => {
                proceedToStep(dir, newStep);
            }, 300);
            return;
        } else {
            if (!currentInput.value.trim()) {
                currentInput.style.borderColor = 'red';
                currentInput.focus();
                if (window.triggerRedBlink) window.triggerRedBlink();
                return;
            }
        }
    }

    proceedToStep(dir, newStep);
}

function proceedToStep(dir, newStep) {

    steps[currentStep].style.opacity = 0;
    steps[currentStep].style.transform = dir > 0 ? 'translateX(-20px)' : 'translateX(20px)';
    
    setTimeout(() => {
        steps[currentStep].style.display = 'none';
        currentStep = newStep;
        steps[currentStep].style.display = 'block';
        setTimeout(() => {
            steps[currentStep].style.opacity = 1;
            steps[currentStep].style.transform = 'translateX(0)';
        }, 10);

        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const submitBtn = document.querySelector('form button[type="submit"]');

        prevBtn.classList.toggle('hidden', currentStep === 0);
        nextBtn.style.display = currentStep === steps.length - 1 ? 'none' : 'block';
        submitBtn.style.display = currentStep === steps.length - 1 ? 'block' : 'none';
    }, 300);
}
