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
  }

  if (navValues && navSolutions && navPlatform && navCta) {
    navValues.textContent = isHebrew ? 'ערכים' : 'Values';
    navSolutions.textContent = isHebrew ? 'פתרונות' : 'Solutions';
    navPlatform.textContent = isHebrew ? 'פלטפורמה' : 'Platform';
    navCta.textContent = isHebrew ? 'צור קשר' : 'Talk to us';

    navValues.setAttribute('href', isHebrew ? '#values-he' : '#values-en');
    navSolutions.setAttribute('href', isHebrew ? '#solutions-he' : '#solutions-en');
    navPlatform.setAttribute('href', isHebrew ? '#platform-he' : '#platform-en');
    navCta.setAttribute('href', isHebrew ? '#cta-he' : '#cta-en');
  }

  if (footerValues && footerSolutions && footerCta && footerNote) {
    footerValues.textContent = isHebrew ? 'ערכים' : 'Values';
    footerSolutions.textContent = isHebrew ? 'פתרונות' : 'Solutions';
    footerCta.textContent = isHebrew ? 'צור קשר' : 'Contact';

    footerValues.setAttribute('href', isHebrew ? '#values-he' : '#values-en');
    footerSolutions.setAttribute('href', isHebrew ? '#solutions-he' : '#solutions-en');
    footerCta.setAttribute('href', isHebrew ? '#cta-he' : '#cta-en');

    footerNote.textContent = isHebrew
      ? 'נבנה עבור בעלות עסקית על נתונים וללא תלות בספק.'
      : 'Built for business-owned, vendor-neutral data governance.';
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
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (currentLang === 'he') {
      alert('תודה! נחזור אליכם בהקדם.');
      return;
    }

    alert('Thanks! We will reach out shortly.');
  });
});

applyLanguage(getStoredLanguage());
