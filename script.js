const nav = document.querySelector('.nav');
const toggle = document.querySelector('.nav__toggle');
const links = document.querySelector('.nav__links');
const langToggle = document.querySelector('#langToggle, #hebButton, [data-lang-toggle]');
const mainEn = document.querySelector('#main-en');
const mainHe = document.querySelector('#main-he');

const navValues = document.querySelector('#navValues');
const navSolutions = document.querySelector('#navSolutions');
const navPlatform = document.querySelector('#navPlatform');
const navCta = document.querySelector('#navCta');

const footerValues = document.querySelector('#footerValues');
const footerSolutions = document.querySelector('#footerSolutions');
const footerCta = document.querySelector('#footerCta');
const footerNote = document.querySelector('#footerNote');
const FORM_ENDPOINT = 'https://formsubmit.co/ajax/rtakss@gmail.com';

let currentLang = 'en';

function applyLanguage() {
  currentLang = 'en';
  const isHebrew = false;

  if (mainEn) {
    mainEn.classList.remove('hidden');
  }

  if (mainHe) {
    mainHe.classList.add('hidden');
  }

  if (langToggle) {
    langToggle.classList.add('hidden');
  }

  if (document && document.documentElement) {
    document.documentElement.lang = 'en';
    document.documentElement.classList.add('lang-en');
    document.title = 'Enterprise Data Independence Assessment | Pollen';
  }

  if (navValues && navSolutions && navPlatform && navCta) {
    navValues.textContent = 'Problem';
    navSolutions.textContent = 'Assessment';
    navPlatform.textContent = 'Deliverables';
    navCta.textContent = 'Book a Call';

    navValues.setAttribute('href', '#values-en');
    navSolutions.setAttribute('href', '#solutions-en');
    navPlatform.setAttribute('href', '#platform-en');
    navCta.setAttribute('href', '#cta-en');
  }

  if (footerValues && footerSolutions && footerCta && footerNote) {
    footerValues.textContent = 'Problem';
    footerSolutions.textContent = 'Assessment';
    footerCta.textContent = 'Contact';

    footerValues.setAttribute('href', '#values-en');
    footerSolutions.setAttribute('href', '#solutions-en');
    footerCta.setAttribute('href', '#cta-en');

    footerNote.textContent = 'Enterprise Data Independence Assessment — clear answers from your business data.';
  }
}

if (toggle) {
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

if (links) {
  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (nav) {
        nav.classList.remove('open');
      }
    });
  });
}

document.querySelectorAll('.cta__form').forEach((form) => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
    }

    const formData = new FormData(form);
    const isHebrew = currentLang === 'he';

    formData.append('_subject', isHebrew ? 'בקשת שירות חדשה מאתר Pollen' : 'New service request from Pollen website');
    formData.append('_template', 'table');
    formData.append('_captcha', 'false');
    formData.append('language', isHebrew ? 'he' : 'en');
    formData.append('request_type', 'service-request');

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      form.reset();
      alert(isHebrew ? 'תודה! בקשת השירות נשלחה ונחזור אליכם בהקדם.' : 'Thanks! Your service request was sent and we will contact you shortly.');
    } catch (error) {
      alert(isHebrew ? 'לא הצלחנו לשלוח כרגע. אפשר לכתוב ל-rtakss@gmail.com.' : 'Unable to send right now. Please email rtakss@gmail.com directly.');
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  });
});

applyLanguage();
