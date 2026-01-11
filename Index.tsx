import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

/**
 * This is the entry point of your NGO website.
 * It finds the 'root' element in your index.html and 
 * renders the entire App.tsx inside it.
 */
const container = document.getElementById('root');

if (container) {
    const root = createRoot(container);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}
