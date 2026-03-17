import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function useTheme() {
    return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        // Check local storage for saved theme on initial load
        const savedTheme = localStorage.getItem('flux-ehub-theme');
        return savedTheme || 'midnight';
    });

    useEffect(() => {
        // Sync the theme to localStorage
        localStorage.setItem('flux-ehub-theme', theme);

        // Apply the theme to the root HTML element so CSS variables can cascade
        if (theme === 'midnight') {
            document.documentElement.removeAttribute('data-theme');
        } else {
            document.documentElement.setAttribute('data-theme', theme);
        }
    }, [theme]);

    // Available themes for UI rendering
    const availableThemes = [
        { id: 'midnight', name: 'Midnight Ocean', description: 'Deep blues and purples. The default Flux-Ehub aesthetic.', colors: { primary: '#0f111a', accent1: '#7b61ff', accent2: '#00d2ff' } },
        { id: 'cyber', name: 'Neon Cyber', description: 'True black canvas with high-contrast magenta and cyan lasers.', colors: { primary: '#050505', accent1: '#f72585', accent2: '#4cc9f0' } },
    ];

    const value = {
        theme,
        setTheme,
        availableThemes
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}
