// Map custom class names to Tailwind classes
export const classMap = {
    'js-input': 'flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50',
    'js-input-toggle': 'flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50',
    'js-label': 'block text-sm font-medium text-gray-700 mb-2',
    'js-label-mb3': 'block text-sm font-medium text-gray-700 mb-3',
    'js-btn-primary': 'inline-flex items-center justify-center w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer',
    'js-btn-toggle': 'absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700',
    'js-form': 'space-y-6',
    'js-link': 'text-blue-600 font-semibold hover:text-blue-800 hover:underline transition-all duration-200',
    'js-card': 'bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl flex flex-col md:flex-row',
    'js-left-panel': 'md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-8',
    'js-right-panel': 'md:w-1/2 p-8 md:p-12',
    'js-heading': 'text-2xl font-bold text-gray-900 mb-2',
    'js-subheading': 'text-gray-600 mb-8',
    'js-section-heading': 'text-3xl font-bold mb-2',
    'js-section-subheading': 'text-blue-100 text-lg',
    'js-radio-group': 'flex flex-wrap gap-4',
    'js-radio-label': 'flex items-center space-x-2 cursor-pointer',
    'js-radio': 'w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500',
    'js-span': 'text-sm text-gray-700',
    'js-span-sm': 'text-sm text-gray-600',
    'js-checkbox-label': 'flex items-center space-x-2 cursor-pointer',
    'js-checkbox': 'w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500',
    'js-hobbies-grid': 'flex flex-wrap gap-3'
};

import { TailwindClass } from './tailwind-init.js';

document.addEventListener('DOMContentLoaded', () => TailwindClass(classMap));
