// Language handling
let translations = {};
let currentLanguage = 'es'; // Default language

// Initialize language functionality
document.addEventListener('DOMContentLoaded', function () {
  // Check if user has a previously selected language
  const savedLanguage = localStorage.getItem('preferredLanguage');
  if (savedLanguage) {
    currentLanguage = savedLanguage;
  } else {
    // Check browser language
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith('en')) {
      currentLanguage = 'en';
    }
  }

  // Load language files
  loadTranslations(currentLanguage).then(() => {
    applyTranslations();
    // Add language selector to the navigation
    addLanguageSelector();
  });
});

// Load translations from JSON file
async function loadTranslations(lang) {
  try {
    const response = await fetch(`js/i18n/${lang}.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    translations = await response.json();
  } catch (e) {
    console.error('Error loading translations:', e);
    // Fallback to default Spanish if translation file cannot be loaded
    if (lang !== 'es') {
      currentLanguage = 'es';
      await loadTranslations('es');
    }
  }
}

// Apply translations to the page
function applyTranslations() {
  // Change HTML lang attribute
  document.documentElement.lang = currentLanguage;

  // Translate navigation items
  document.querySelectorAll('#headerNav .nav li a').forEach((el, index) => {
    if (index === 0) el.textContent = translations.nav.home;
    if (index === 1) el.textContent = translations.nav.about;
    if (index === 2) el.textContent = translations.nav.portfolio;
    if (index === 3) el.textContent = translations.nav.contact;
  });

  // Translate banner
  const bannerContent = document.querySelector('.banner--content');
  if (bannerContent) {
    const bannerTitle = bannerContent.querySelector('h2');
    const bannerDesc = bannerContent.querySelector('p');
    const bannerBtn = bannerContent.querySelector('a');

    if (bannerTitle) bannerTitle.innerHTML = translations.banner.title;
    if (bannerDesc) bannerDesc.innerHTML = translations.banner.description;
    if (bannerBtn) bannerBtn.textContent = translations.banner.button;
  }

  // Translate section titles
  const sectionTitles = document.querySelectorAll('.section--title h2');
  sectionTitles.forEach((title) => {
    if (title.textContent.includes('Sobre mi')) {
      title.innerHTML = `<strong>${translations.about.title}</strong>`;
    } else if (title.textContent.includes('Lo que hago')) {
      title.innerHTML = `<strong>${translations.services.title}</strong>`;
    } else if (title.textContent.includes('Portafolio')) {
      title.innerHTML = `<strong>${translations.portfolio.title}</strong>`;
    }
  });

  // About section
  const aboutSection = document.querySelector('#about');
  if (aboutSection) {
    const whoAmI = aboutSection.querySelector('h3:first-of-type');
    const experienceIn = aboutSection.querySelector(
      '.col-md-6:nth-child(2) h3'
    );
    const technologies = aboutSection.querySelector('.col-md-6:nth-child(2) p');
    const downloadCV = aboutSection.querySelector('a.btn');

    if (whoAmI) whoAmI.innerHTML = translations.about.who_am_i;
    if (experienceIn) experienceIn.innerHTML = translations.about.experience_in;
    if (technologies)
      technologies.textContent = translations.about.technologies;
    if (downloadCV) downloadCV.textContent = translations.about.download_cv;
  }

  // Education and Experience section titles - FIXED
  const infoWrappers = document.querySelectorAll('.about--info-wrapper h3');
  infoWrappers.forEach((title) => {
    if (title.textContent.includes('Edu')) {
      title.innerHTML = translations.cv_sections.education;
    } else if (title.textContent.includes('Ex')) {
      title.innerHTML = translations.cv_sections.experience;
    }
  });

  // Services section
  const serviceItems = document.querySelectorAll('.service--item');
  if (serviceItems.length > 0) {
    // Web Design Service
    const webDesign = serviceItems[0];
    webDesign.querySelector('h2').innerHTML =
      translations.services.web_design.title;
    webDesign.querySelector('p').textContent =
      translations.services.web_design.description;

    // User Flow Service
    const userFlow = serviceItems[1];
    userFlow.querySelector('h2').innerHTML = translations.services.flow.title;
    userFlow.querySelector('p').textContent =
      translations.services.flow.description;

    // Visual Design Service
    const visualDesign = serviceItems[2];
    visualDesign.querySelector('h2').innerHTML =
      translations.services.visual.title;
    visualDesign.querySelector('p').textContent =
      translations.services.visual.description;

    // Mobile App Service
    const mobileApp = serviceItems[3];
    mobileApp.querySelector('h2').innerHTML =
      translations.services.mobile.title;
    mobileApp.querySelector('p').textContent =
      translations.services.mobile.description;

    // UX/UI Service
    const uxUi = serviceItems[4];
    uxUi.querySelector('h2').innerHTML = translations.services.ux_ui.title;
    uxUi.querySelector('p').textContent =
      translations.services.ux_ui.description;
  }

  // Portfolio section
  const galleryFilter = document.querySelector('.gallery-filter-menu');
  if (galleryFilter) {
    const allFilter = galleryFilter.querySelector('li:first-child a');
    if (allFilter) allFilter.textContent = translations.portfolio.all;
  }

  // Translate gallery items case study/web design labels
  document.querySelectorAll('.gallery--case-study').forEach((item) => {
    if (item.textContent.includes('Caso de Estudio')) {
      item.textContent = translations.portfolio.case_study;
    } else if (item.textContent.includes('Diseño Web')) {
      item.textContent = translations.portfolio.web_design;
    }
  });

  // Translate "View Project" buttons
  document.querySelectorAll('.gallery-overlay .btn').forEach((btn) => {
    btn.textContent = translations.portfolio.view_project;
  });

  // Feedback section
  const feedbackTitle = document.querySelector(
    '.feedback--items .feedback--title'
  );
  const whyMeTitle = document.querySelector('.feedback--faq .feedback--title');

  if (feedbackTitle) feedbackTitle.textContent = translations.feedback.title;
  if (whyMeTitle) whyMeTitle.textContent = translations.feedback.why_me;

  // Contact section
  const contactTitle = document.querySelector('.contact--address h2');
  if (contactTitle) contactTitle.textContent = translations.contact.title;

  // Contact form
  const contactForm = document.querySelector('.contact--form form');
  if (contactForm) {
    const nameField = contactForm.querySelector('input[name="name"]');
    const emailField = contactForm.querySelector('input[name="email"]');
    const subjectField = contactForm.querySelector('input[name="subject"]');
    const messageField = contactForm.querySelector('textarea[name="message"]');
    const submitBtn = contactForm.querySelector('input[type="submit"]');

    if (nameField) nameField.placeholder = translations.contact.name;
    if (emailField) emailField.placeholder = translations.contact.email;
    if (subjectField) subjectField.placeholder = translations.contact.subject;
    if (messageField) messageField.placeholder = translations.contact.message;
    if (submitBtn) submitBtn.value = translations.contact.send;
  }

  // Hire Me Modal
  const hireModal = document.querySelector('#hireMeModal');
  if (hireModal) {
    const modalTitle = hireModal.querySelector('.modal-title');
    const modalSubtitle = hireModal.querySelector('.modal-header p');

    if (modalTitle) modalTitle.textContent = translations.hire_me.title;
    if (modalSubtitle)
      modalSubtitle.textContent = translations.hire_me.subtitle;

    // Form fields
    const nameField = hireModal.querySelector('input[name="name"]');
    const emailField = hireModal.querySelector('input[name="email"]');
    const projectTitleField = hireModal.querySelector(
      'input[name="project_title"]'
    );
    const messageField = hireModal.querySelector('textarea[name="message"]');
    const submitBtn = hireModal.querySelector('input[type="submit"]');

    if (nameField) nameField.placeholder = translations.hire_me.name;
    if (emailField) emailField.placeholder = translations.hire_me.email;
    if (projectTitleField)
      projectTitleField.placeholder = translations.hire_me.project_title;
    if (messageField) messageField.placeholder = translations.hire_me.message;
    if (submitBtn) submitBtn.value = translations.hire_me.send_button;

    // Category select
    const categorySelect = hireModal.querySelector('select[name="category"]');
    if (categorySelect && categorySelect.options[0]) {
      categorySelect.options[0].text = translations.hire_me.category;
    }

    // Budget select
    const budgetSelect = hireModal.querySelector('select[name="budget"]');
    if (budgetSelect && budgetSelect.options[0]) {
      budgetSelect.options[0].text = translations.hire_me.budget;
    }

    // Date field
    const dateField = hireModal.querySelector('input[name="date"]');
    if (dateField) dateField.placeholder = translations.hire_me.estimate_date;

    // Estimate question
    const estimateQuestion = hireModal.querySelector('.estimate-text h4');
    const noEstimate = hireModal.querySelector('label[for="estimateZERO"]');
    const yesEstimate = hireModal.querySelector('label[for="estimateONE"]');

    if (estimateQuestion)
      estimateQuestion.textContent = translations.hire_me.estimate_question;
    if (noEstimate) noEstimate.textContent = translations.hire_me.no_estimate;
    if (yesEstimate)
      yesEstimate.textContent = translations.hire_me.yes_estimate;
  }

  // Footer copyright
  const copyright = document.querySelector('.footer--copyright p');
  if (copyright) copyright.innerHTML = translations.footer.copyright;
}

// Add language selector to the navigation
function addLanguageSelector() {
  // Create the language switcher HTML
  const languageSwitcher = document.createElement('div');
  languageSwitcher.className = 'language-switcher';
  
  // Estilos para el contenedor
  languageSwitcher.style.display = 'inline-block';
  languageSwitcher.style.float = 'right';
  languageSwitcher.style.margin = '15px 10px 0 0';
  languageSwitcher.style.zIndex = '1000';
  
  // Define flags and language labels
  const languages = {
    'es': {
      flag: '🇪🇸',
      label: 'ES'
    },
    'en': {
      flag: '🇺🇸',
      label: 'EN'
    }
  };
  
  // Create buttons for each language
  Object.keys(languages).forEach(lang => {
    const button = document.createElement('button');
    button.className = 'lang-btn';
    button.setAttribute('data-lang', lang);
    
    // Estilos para los botones
    button.style.background = 'none';
    button.style.border = '1px solid #ddd';
    button.style.cursor = 'pointer';
    button.style.padding = '5px 8px';
    button.style.fontSize = '14px';
    button.style.color = lang === currentLanguage ? '#ffffff' : '#cccccc';
    button.style.fontWeight = lang === currentLanguage ? 'bold' : 'normal';
    button.style.marginLeft = '5px';
    button.style.borderRadius = '3px';
    button.style.backgroundColor = lang === currentLanguage ? '#2c3e50' : 'rgba(0,0,0,0.5)';
    
    button.innerHTML = `${languages[lang].flag} ${languages[lang].label}`;
    
    // Add click event to switch language
    button.addEventListener('click', function() {
      changeLanguage(lang);
    });
    
    languageSwitcher.appendChild(button);
  });
  
  // Insert the language switcher into the page
  // Cambiamos la estrategia de inserción para usar un mejor lugar en el DOM
  const headerNav = document.querySelector('#headerNav');
  if (headerNav) {
    // Lo insertamos justo antes del nav
    headerNav.parentNode.insertBefore(languageSwitcher, headerNav);
    console.log('Language switcher added before headerNav');
  } else {
    // Alternativa: intentamos ponerlo en el área de custom button
    const customBtn = document.querySelector('.header--custom-btn.hidden-sm.hidden-xs');
    if (customBtn) {
      customBtn.parentNode.insertBefore(languageSwitcher, customBtn);
      console.log('Language switcher added near custom button');
    } else {
      // Última opción: lo agregamos al navbar container
      const navbar = document.querySelector('.header--navbar .container');
      if (navbar) {
        navbar.appendChild(languageSwitcher);
        console.log('Language switcher added to navbar container');
      } else {
        console.error('Could not find appropriate place to add language switcher');
      }
    }
  }
}

// Change language function
async function changeLanguage(lang) {
  if (lang === currentLanguage) return;

  currentLanguage = lang;
  localStorage.setItem('preferredLanguage', lang);

  await loadTranslations(lang);
  applyTranslations();

  // Update language switcher active state
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    const btnLang = btn.getAttribute('data-lang');
    btn.style.color = btnLang === lang ? '#ffffff' : '#cccccc';
    btn.style.fontWeight = btnLang === lang ? 'bold' : 'normal';
    btn.style.backgroundColor =
      btnLang === lang ? '#2c3e50' : 'rgba(0,0,0,0.5)';
  });

  console.log('Language changed to', lang); // Debug log
}
