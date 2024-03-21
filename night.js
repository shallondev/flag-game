document.addEventListener("DOMContentLoaded", () => { 
    const body = document.body;
    let isDarkMode = false;

    // Initialize background color
    body.style.backgroundColor = '#f8f8f8';

    const toggleDarkMode = () => {
        if (isDarkMode) {
            // Switch to light mode
            body.style.backgroundColor = '#f8f8f8';
            body.style.color = '#000000';
            document.getElementById('darkMode').classList.remove('hover:bg-gray-700');
            document.getElementById('darkMode').classList.add('hover:bg-gray-100');
        } else {
            // Switch to dark mode
            body.style.backgroundColor = '#1a1a1a';
            body.style.color = '#f0f0f0';
            document.getElementById('darkMode').classList.remove('hover:bg-gray-100');
            document.getElementById('darkMode').classList.add('hover:bg-gray-700');
        }
        isDarkMode = !isDarkMode;
    };

    document.getElementById('darkMode').addEventListener('click', toggleDarkMode);
});
