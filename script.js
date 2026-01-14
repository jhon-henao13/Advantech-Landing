// ============================================
// NAVIGATION
// ============================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observe about section elements with data-aos
const aboutElements = document.querySelectorAll('[data-aos]');
aboutElements.forEach(element => {
    observer.observe(element);
});

// Custom observer for data-aos animations
const aosObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
            aosObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(el => {
    aosObserver.observe(el);
});

// ============================================
// STATS COUNTER ANIMATION
// ============================================
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const statNumber = entry.target.querySelector('.stat-number');
            const target = parseInt(statNumber.getAttribute('data-target'));
            animateCounter(statNumber, target);
            entry.target.classList.add('counted');
        }
    });
}, { threshold: 0.5 });

const statItems = document.querySelectorAll('.stat-item');
statItems.forEach(item => {
    statsObserver.observe(item);
});

// ============================================
// FLOATING CARDS ANIMATION
// ============================================
const floatingCards = document.querySelectorAll('.floating-card');
floatingCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.5}s`;
    
    // Add mouse move parallax effect
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-20px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ============================================
// SERVICE CARDS HOVER EFFECTS
// ============================================
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// ============================================
// FORM HANDLING
// ============================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Show success message (you can integrate with your backend here)
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<span>Enviando...</span>';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        submitBtn.innerHTML = '<span>✓ Mensaje enviado</span>';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    }, 1500);
    
    // Here you would typically send the data to your backend
    console.log('Form data:', data);
});

// ============================================
// PARALLAX EFFECT FOR HERO SECTION
// ============================================
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.5;
    
    if (scrolled < hero.offsetHeight) {
        heroContent.style.transform = `translateY(${rate}px)`;
        heroContent.style.opacity = 1 - (scrolled / hero.offsetHeight) * 0.5;
    }
});

// ============================================
// CURSOR EFFECT (Optional - can be removed if not needed)
// ============================================
const createCursorEffect = () => {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        width: 20px;
        height: 20px;
        border: 2px solid #05DBF2;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        display: none;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursor.style.display = 'block';
    });
    
    // Add hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .floating-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.borderColor = '#05C7F2';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = '#05DBF2';
        });
    });
};

// Uncomment to enable custom cursor
// createCursorEffect();

// ============================================
// TYPING EFFECT FOR HERO TITLE (Optional)
// ============================================
const createTypingEffect = () => {
    const titleHighlight = document.querySelector('.title-line.highlight');
    if (!titleHighlight) return;
    
    const text = titleHighlight.textContent;
    titleHighlight.textContent = '';
    titleHighlight.style.borderRight = '2px solid #05DBF2';
    
    let index = 0;
    const typeInterval = setInterval(() => {
        if (index < text.length) {
            titleHighlight.textContent += text[index];
            index++;
        } else {
            clearInterval(typeInterval);
            setTimeout(() => {
                titleHighlight.style.borderRight = 'none';
            }, 500);
        }
    }, 100);
};

// Uncomment to enable typing effect
// window.addEventListener('load', createTypingEffect);

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================
const revealOnScroll = () => {
    const elements = document.querySelectorAll('.section-header, .contact-info, .contact-form');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.2 });
    
    elements.forEach(element => revealObserver.observe(element));
};

revealOnScroll();

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
// Throttle scroll events
let ticking = false;
const optimizedScroll = () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Scroll-based animations here
            ticking = false;
        });
        ticking = true;
    }
};

window.addEventListener('scroll', optimizedScroll, { passive: true });



window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.classList.add("hidden");
    }, 700); // Tiempo visible del splash
});


tsParticles.load("particles-hero", {
    fpsLimit: 60,
    background: { color: "transparent" },
    particles: {
        number: { 
            value: 60, 
            density: { enable: true, value_area: 800 } 
        },
        color: { value: ["#05DBF2", "#0487D9", "#05C7F2"] },
        shape: { type: "circle" },
        opacity: { 
            value: 0.6, 
            random: true 
        },
        size: { 
            value: { min: 1, max: 3 } 
        },
        links: {
            enable: true,
            color: "#05DBF2",
            distance: 120,
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 1.2,
            direction: "none",
            outModes: "out"
        }
    },
    interactivity: {
        events: {
            onHover: { enable: true, mode: "grab" },
            resize: true
        },
        modes: {
            grab: {
                distance: 180,
                links: { opacity: 0.7 }
            }
        }
    },
    detectRetina: true
});


let currentLang = localStorage.getItem("lang") || "es";

function hashText(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0;
    }
    return "k" + Math.abs(hash);
}

/*******************************************************
 *   NODOS QUE NO SE DEBEN TRADUCIR
 *******************************************************/
function isIgnored(node) {
    if (!node.parentElement) return true;

    const p = node.parentElement;

    return (
        p.closest("svg") ||                             // ICONOS SVG
        p.classList.contains("stat-number") ||          // NUMEROS ANIMADOS
        p.tagName === "SCRIPT" ||                       // SCRIPTS
        p.tagName === "STYLE" ||                        // STYLES
        p.tagName === "INPUT" ||                        // INPUTS
        p.tagName === "TEXTAREA" ||                     // TEXTAREAS
        p.hasAttribute("contenteditable")               // EDITABLES
    );
}

/*******************************************************
 *   ESCANEO AUTOMÁTICO SEGURO
 *******************************************************/
function scanDOM() {
    const textNodes = [];

    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode(node) {
                const t = node.nodeValue.trim();

                if (!t) return NodeFilter.FILTER_REJECT;
                if (isIgnored(node)) return NodeFilter.FILTER_REJECT;

                return NodeFilter.FILTER_ACCEPT;
            }
        }
    );

    let node;
    while ((node = walker.nextNode())) {
        textNodes.push(node);
    }

    // Envolver cada nodo DESPUÉS de recopilar la lista (seguro)
    textNodes.forEach(node => {
        const text = node.nodeValue.trim();
        const key = text; // use the original text as the translation key (easier to maintain)

        const span = document.createElement("span");
        span.dataset.i18nKey = key;
        span.textContent = text;

        // Reemplazar nodo
        node.parentNode.replaceChild(span, node);

        // Registrar traducciones
        if (!TRANSLATIONS.es[key]) TRANSLATIONS.es[key] = text;
        if (!TRANSLATIONS.en[key]) TRANSLATIONS.en[key] = text;
    });
}

/*******************************************************
 *   APLICAR TRADUCCIÓN
 *******************************************************/
function applyTranslations() {
    document.querySelectorAll("[data-i18n-key]").forEach(el => {
        const key = el.dataset.i18nKey;
        const translated = TRANSLATIONS[currentLang][key];
        if (translated) {
            el.textContent = translated;
        }
    });

    updateLangButton();
}

// Also translate common attributes (placeholders)
function applyAttributeTranslations() {
    const inputs = document.querySelectorAll('input[placeholder], textarea[placeholder]');
    inputs.forEach(el => {
        const ph = el.getAttribute('placeholder');
        if (!ph) return;
        const translated = TRANSLATIONS[currentLang][ph];
        if (translated) el.setAttribute('placeholder', translated);
    });
}

// Wrap applyTranslations to ensure attributes are also updated
const applyTranslationsWithAttrs = () => {
    applyTranslations();
    applyAttributeTranslations();
};

/*******************************************************
 *   BOTÓN DE IDIOMA
 *******************************************************/
function updateLangButton() {
    document.getElementById("langToggle").textContent =
        currentLang === "es" ? "ES 🇪🇸" : "EN 🇺🇸";
}

document.getElementById("langToggle").addEventListener("click", () => {
    currentLang = currentLang === "es" ? "en" : "es";
    localStorage.setItem("lang", currentLang);
    document.documentElement.lang = currentLang;
    applyTranslationsWithAttrs();
});

/*******************************************************
 *   INICIALIZACIÓN
 *******************************************************/
window.addEventListener("load", () => {
    scanDOM();          // Escaneo estable (cuando TODO está cargado)
    applyTranslationsWithAttrs();
    
    // Actualizar el idioma del atributo lang en <html>
    document.documentElement.lang = currentLang;
});
