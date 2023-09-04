document.addEventListener("DOMContentLoaded", function() {
    // Initial content in German
    // German content
    const germanContent = {
        "IT": "Als Ihr spezialisiertes Unternehmen für IT- und Netzwerklösungen biete ich Ihnen präzise auf Ihre Anforderungen abgestimmte Dienstleistungen an. Von Serverinfrastruktur und Arbeitsstationen bis hin zu DNS und E-Mail-Management, meine Expertise ermöglicht es Ihnen, sich auf Ihre Kernkompetenzen zu fokussieren.",
        "Automatisierung": "Ich erkenne die Einzigartigkeit jeder Organisation und entwickle daher individuelle Automatisierungslösungen, die Ihre betrieblichen Herausforderungen effizient adressieren.",
        "Cloud": "Die Flexibilität und Leistungsfähigkeit der Cloud-Technologie wird durch meine maßgeschneiderten Lösungen für Microsoft Azure und Google Cloud optimal für Sie nutzbar gemacht. Ich unterstütze Sie dabei, zukunftssichere Technologiestrategien zu implementieren.",
        "Workflow": "Technologie ist nur ein Instrument, und ich verwende es strategisch zur Verbesserung Ihrer internen Arbeitsprozesse. Mein Ziel ist die Reduzierung Ihres organisatorischen Aufwands und die Maximierung Ihrer Effizienz.",
        "KI": "Die Implementierung von KI-Technologien ermöglicht es mir, intelligente und effiziente Lösungen zu schaffen, die Ihre Geschäftsprozesse transformieren. So bleiben Sie immer einen Schritt voraus.",
        "Design": "Ist Ihnen der ansprechende Stil dieser Webseite aufgefallen? Das ist das Ergebnis meiner Expertise im Bereich modernen und futuristischen Designs. Ich biete Ihnen vielfältige Möglichkeiten, Ihre Marke effektvoll zu präsentieren.",
        "menu_IT": "IT",
        "menu_Automatisierung": "Automatisierung",
        "menu_Cloud": "Cloud Lösungen",
        "menu_Workflow": "Workflow Optimierung",
        "menu_KI": "KI Technologien",
        "menu_Design": "Design"
    };

// English translations
    const englishContent = {
        "IT": "As your specialized company for IT and network solutions, I offer services tailored precisely to your needs. From server infrastructure and workstations to DNS and email management, my expertise allows you to focus on your core competencies.",
        "Automatisierung": "I recognize the uniqueness of each organization and therefore develop individual automation solutions that efficiently address your operational challenges.",
        "Cloud": "The flexibility and performance of cloud technology are optimally utilized for you through my customized solutions for Microsoft Azure and Google Cloud. I support you in implementing future-proof technology strategies.",
        "Workflow": "Technology is merely a tool, and I use it strategically to improve your internal work processes. My aim is to reduce your organizational effort and maximize your efficiency.",
        "KI": "The implementation of AI technologies allows me to create intelligent and efficient solutions that transform your business processes. This keeps you always one step ahead.",
        "Design": "Did you notice the appealing style of this website? That is the result of my expertise in modern and futuristic design. I offer you a variety of ways to effectively present your brand.",
        "menu_IT": "IT",
        "menu_Automatisierung": "Automation",
        "menu_Cloud": "Cloud Solutions",
        "menu_Workflow": "Workflow Optimization",
        "menu_KI": "AI Technologies",
        "menu_Design": "Design"
    };

    // Event listeners for language buttons
    document.getElementById("en").addEventListener("click", function() {
        changeLanguage(englishContent);
    });

    document.getElementById("de").addEventListener("click", function() {
        changeLanguage(germanContent);
    });

    function changeLanguage(content) {
        for (let id in content) {
            if (document.getElementById(id)) {
                document.getElementById(id).textContent = content[id];
            }
        }
    }
});
