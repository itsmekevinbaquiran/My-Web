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