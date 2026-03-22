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
const LANGUAGE_STORAGE_KEY = 'pollen-site-language';
const FORM_ENDPOINT = 'https://formsubmit.co/ajax/rtakss@gmail.com';

let currentLang = 'en';

function getStoredLanguage() {
  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return stored === 'he' ? 'he' : 'en';
  } catch (error) {
    return 'en';
  }
}

function setStoredLanguage(lang) {
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  } catch (error) {
    // Ignore storage errors in restricted browsing modes.
  }
}

function applyLanguage(lang) {
  const normalizedLang = lang === 'he' ? 'he' : 'en';
  currentLang = normalizedLang;
  const isHebrew = normalizedLang === 'he';

  if (mainEn && mainHe) {
    mainEn.classList.toggle('hidden', isHebrew);
    mainHe.classList.toggle('hidden', !isHebrew);
  }

  if (langToggle) {
    langToggle.textContent = isHebrew ? 'English' : 'עברית';
  }

  if (document && document.documentElement) {
    document.documentElement.lang = isHebrew ? 'he' : 'en';
    document.documentElement.classList.toggle('lang-en', !isHebrew);
    document.title = isHebrew ? 'Pollen – הערכת נתונים עסקית' : 'Enterprise Data Independence Assessment | Pollen';
  }

  if (navValues && navSolutions && navPlatform && navCta) {
    navValues.textContent = isHebrew ? 'ערכים' : 'Problem';
    navSolutions.textContent = isHebrew ? 'פתרונות' : 'Assessment';
    navPlatform.textContent = isHebrew ? 'פלטפורמה' : 'Deliverables';
    navCta.textContent = isHebrew ? 'צור קשר' : 'Book a Call';

    navValues.setAttribute('href', isHebrew ? '#values-he' : '#values-en');
    navSolutions.setAttribute('href', isHebrew ? '#solutions-he' : '#solutions-en');
    navPlatform.setAttribute('href', isHebrew ? '#platform-he' : '#platform-en');
    navCta.setAttribute('href', isHebrew ? '#cta-he' : '#cta-en');
  }

  if (footerValues && footerSolutions && footerCta && footerNote) {
    footerValues.textContent = isHebrew ? 'ערכים' : 'Problem';
    footerSolutions.textContent = isHebrew ? 'פתרונות' : 'Assessment';
    footerCta.textContent = isHebrew ? 'צור קשר' : 'Contact';

    footerValues.setAttribute('href', isHebrew ? '#values-he' : '#values-en');
    footerSolutions.setAttribute('href', isHebrew ? '#solutions-he' : '#solutions-en');
    footerCta.setAttribute('href', isHebrew ? '#cta-he' : '#cta-en');

    footerNote.textContent = isHebrew
      ? 'נבנה עבור בעלות עסקית על נתונים וללא תלות בספק.'
      : 'Business Data Assessment — clear answers from your business data.';
  }

  setStoredLanguage(normalizedLang);
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

if (langToggle) {
  langToggle.addEventListener('click', () => {
    applyLanguage(currentLang === 'en' ? 'he' : 'en');
    if (nav) {
      nav.classList.remove('open');
    }
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

applyLanguage(getStoredLanguage());
