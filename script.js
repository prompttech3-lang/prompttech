const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
  navigation.classList.toggle('is-open', !isOpen);
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open menu');
    navigation.classList.remove('is-open');
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll('.intro, .service-card, .approach-intro, .steps article, .principles-grid > div, .stats-grid, .team-heading, .team-card, .testimonial-placeholder, .faq-heading, .faq-list details, .contact-inner > div, #contact-form');
revealItems.forEach((item) => item.classList.add('reveal'));

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

document.querySelector('#contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const note = document.querySelector('#form-note');
  if (!form.reportValidity()) return;
  const fields = new FormData(form);
  const subject = encodeURIComponent(`PromptTech Recovery inquiry: ${fields.get('topic')}`);
  const body = encodeURIComponent([
    `Name: ${fields.get('name')}`,
    `Reply email: ${fields.get('email')}`,
    `Topic: ${fields.get('topic')}`,
    '',
    'Message:',
    fields.get('message') || '(No additional message provided)'
  ].join('\n'));
  note.textContent = 'Opening your email app with the inquiry details. Please review and send the message to complete your request.';
  note.classList.add('form-feedback');
  window.location.href = `mailto:prompttechrecovery@gmail.com?subject=${subject}&body=${body}`;
});
