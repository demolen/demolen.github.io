document.addEventListener('DOMContentLoaded', (event) => {
    const en = document.getElementById('en');
    const de = document.getElementById('de');

    en.addEventListener('click', function() {
        translate('en');
    });

    de.addEventListener('click', function() {
        translate('de');
    });

    function translate(selectedLanguage) {
        const translations = {
            'de': {
                // This will be filled dynamically from data attributes
            },
            'en': {
                'IT und Netzwerklösungen': 'IT and Network Solutions',
                'Automatisierung': 'Automation',
                'Cloud Lösungen': 'Cloud Solutions',
                'Workflow Optimierung': 'Workflow Optimization',
                'KI Technologien': 'AI Technologies',
                'Design': 'Design'
                // Add more English phrases here as needed
            }
        };

        const elementsToTranslate = document.querySelectorAll('.services a, .descriptions div');

        elementsToTranslate.forEach((element) => {
            if (!element.dataset.originalText) {
                // Store the original text if not stored yet
                element.dataset.originalText = element.textContent;
            }

            // Populate the 'de' translations from data attributes
            translations['de'][element.dataset.originalText] = element.dataset.originalText;

            const text = selectedLanguage === 'de' ? element.dataset.originalText : element.textContent;
            const translatedText = translations[selectedLanguage][text];
            if (translatedText) {
                element.textContent = translatedText;
            }
        });
    }
});
