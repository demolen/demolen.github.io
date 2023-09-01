document.addEventListener("DOMContentLoaded", function() {
    // Initial content in German
    const germanContent = {
        "IT": "Wir sind Ihr vertrauenswürdiger Partner für die Planung und Implementierung von IT- und Netzwerklösungen, die genau auf Ihre Bedürfnisse zugeschnitten sind. Wir kümmern uns um alles, von Servern und Arbeitsstationen bis hin zu DNS und E-Mail, damit Sie sich auf Ihr Kerngeschäft konzentrieren können.",
        "Automatisierung": "Wir verstehen, dass jede Organisation einzigartig ist. Deshalb entwickeln wir maßgeschneiderte Automatisierungsskripte und Tools, die speziell auf Ihre betrieblichen Herausforderungen und Anforderungen abgestimmt sind.",
        "Cloud": "Nutzen Sie die Flexibilität und Leistungsfähigkeit der Cloud mit unseren individuellen Lösungen für Microsoft Azure und Google Cloud. Wir begleiten Sie sicher und effizient in die Zukunft der Technologie.",
        "Workflow": "Wir setzen nicht einfach nur Technologie ein; wir entwickeln proaktive Strategien zur Optimierung Ihres internen Workflows. Unser Ziel ist es, Ihren organisatorischen Aufwand zu minimieren und Ihre Effizienz zu steigern.",
        "KI": "Wir sind stolz darauf, KI-Technologien einzusetzen, um intelligente und effiziente Lösungen zu entwickeln, die Ihre Geschäftsprozesse revolutionieren. Mit uns sind Sie immer einen Schritt voraus.",
        "Design": "Lieben Sie den modernen und ansprechenden Stil dieser Website? Das ist kein Zufall! Wir sind Pioniere im Bereich des organischen und futuristischen Designs und bieten Ihnen innovative Möglichkeiten, Ihre Marke eindrucksvoll darzustellen.",
        "menu_IT": "IT und Netzwerklösungen",
        "menu_Automatisierung": "Automatisierung",
        "menu_Cloud": "Cloud Lösungen",
        "menu_Workflow": "Workflow Optimierung",
        "menu_KI": "KI Technologien",
        "menu_Design": "Design"
    };

    // English translations
    const englishContent = {
        "IT": "We are your trusted partner for planning and implementing IT and network solutions tailored specifically to your needs. We handle everything from servers and workstations to DNS and email so you can focus on your core business.",
        "Automatisierung": "We understand that each organization is unique. Therefore, we develop custom automation scripts and tools tailored to your operational challenges and requirements.",
        "Cloud": "Leverage the flexibility and power of the cloud with our bespoke solutions for Microsoft Azure and Google Cloud. We securely and efficiently guide you into the future of technology.",
        "Workflow": "We don’t just implement technology; we proactively develop strategies for optimizing your internal workflow. Our aim is to minimize your organizational effort and boost your efficiency.",
        "KI": "We take pride in implementing AI technologies to develop smart and efficient solutions that revolutionize your business processes. With us, you are always one step ahead.",
        "Design": "Do you love the modern and appealing style of this website? That's no coincidence! We are pioneers in the field of organic and futuristic design, offering you innovative ways to dramatically present your brand.",
        "menu_IT": "IT and Network Solutions",
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
