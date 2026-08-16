import { sharedClassMap } from './class.js';
import { TailwindClass } from 'https://jhon-code-elec7.netlify.app/tailwind-init.js';

// Dito sir is mga tailwind class for sign up only
const signupClassMap = {
    'js-label-mb3': 'block text-sm font-medium text-gray-700 mb-3',
    'js-checkbox': 'w-4 h-4 mt-1 text-blue-600 focus:ring-blue-500',
    'js-checkbox-no-mt': 'w-4 h-4 text-blue-600 focus:ring-blue-500',
    'js-form': 'space-y-4',
    'js-checkbox-label': 'flex items-start cursor-pointer',
    'js-card': 'bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden w-full max-w-5xl flex flex-col md:flex-row relative z-10 border border-white/20',
    'js-hobbies-grid': 'grid grid-cols-2 gap-2',
    'js-radio-group': 'flex space-x-6'
};

const classMap = { ...sharedClassMap, ...signupClassMap };

document.addEventListener('DOMContentLoaded', () => TailwindClass(classMap));
