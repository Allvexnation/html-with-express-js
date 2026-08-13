import { sharedClassMap } from './tailwind-shared.js';
import { TailwindClass } from './tailwind-init.js';

// Login-specific class extensions
const loginClassMap = {
    'js-form': 'space-y-6',
    'js-card': 'bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl flex flex-col md:flex-row',
    'js-left-panel': 'w-full md:w-1/2 p-8 flex flex-col justify-center bg-cover bg-center',
    'js-header': 'text-center text-white',
    'js-figure': 'mb-6',
    'js-logo': 'w-24 h-24 mx-auto opacity-90',
    'js-right-panel': 'w-full md:w-1/2 p-8 flex flex-col justify-center',
    'js-form-group': 'mb-4',
    'js-relative': 'relative',
    'js-icon': 'w-5 h-5',
    'js-footer': 'mt-6 text-center',
    'js-footer-text': 'text-gray-600 text-sm'
};

const classMap = { ...sharedClassMap, ...loginClassMap };

document.addEventListener('DOMContentLoaded', () => TailwindClass(classMap));
