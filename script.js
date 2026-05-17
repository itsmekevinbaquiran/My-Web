const anchorLinks = document.querySelectorAll('a[href^="#"]');
const contactForm = document.querySelector('#contact-form');
const formMessage = document.querySelector('#form-message');

anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = this.name.value.trim();
        const email = this.email.value.trim();
        const message = this.message.value.trim();

        if (!name || !email || !message) {
            formMessage.textContent = 'Please complete every field before sending.';
            formMessage.style.color = '#dc2626';
            return;
        }

        formMessage.textContent = `Thank you, ${name}! Your message has been received.`;
        formMessage.style.color = '#16a34a';
        this.reset();
    });
}

window.addEventListener('load', function() {
    console.log('Portfolio page loaded successfully!');
});

const learnMoreLink = document.querySelector('#learn-more');
const aboutSummary = document.querySelector('#about-summary');
const aboutHeader = document.querySelector('#about .section-header');
let infoLoaded = false;

// Mobile nav toggle
const navToggle = document.querySelector('#nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
    navToggle.addEventListener('click', function() {
        const isOpen = navLinks.classList.toggle('open');
        navToggle.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile nav when a link is clicked
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
    }));
}

if (learnMoreLink && aboutSummary && aboutHeader) {
    learnMoreLink.addEventListener('click', async function() {
        if (infoLoaded) {
            return;
        }

        try {
            const response = await fetch('Pages/my-information.html');
            if (!response.ok) {
                throw new Error('Could not load information page.');
            }

            const htmlText = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlText, 'text/html');
            const infoAboutSection = doc.querySelector('#about');
            if (infoAboutSection) {
                const infoHeader = infoAboutSection.querySelector('.section-header');
                const infoSummaryCard = infoAboutSection.querySelector('.summary-card');

                if (infoHeader) {
                    aboutHeader.innerHTML = infoHeader.innerHTML;
                }

                if (infoSummaryCard) {
                    aboutSummary.innerHTML = infoSummaryCard.innerHTML + '<a href="Pages/my-information.html" class="btn btn-secondary" style="margin-top:1rem; display: inline-flex;">View Full Information</a>';
                } else {
                    aboutSummary.innerHTML = '<p>Summary content cannot be loaded right now. Please view the full information page.</p><a href="Pages/my-information.html" class="btn btn-secondary">View Full Information</a>';
                }

                infoLoaded = true;
            } else {
                aboutSummary.innerHTML = '<p>Summary content cannot be loaded right now. Please view the full information page.</p><a href="Pages/my-information.html" class="btn btn-secondary">View Full Information</a>';
            }
        } catch (error) {
            aboutSummary.innerHTML = `<p>${error.message}</p><a href="Pages/my-information.html" class="btn btn-secondary">View Full Information</a>`;
        }
    });
}

