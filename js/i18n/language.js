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
    if (
      title.textContent.includes('Sobre mi') ||
      title.textContent.includes('About Me')
    ) {
      title.innerHTML = `<strong>${translations.about.title}</strong>`;
    } else if (
      title.textContent.includes('Lo que hago') ||
      title.textContent.includes('What I Do')
    ) {
      title.innerHTML = `<strong>${translations.services.title}</strong>`;
    } else if (
      title.textContent.includes('Portafolio') ||
      title.textContent.includes('Portfolio')
    ) {
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
    if (downloadCV) {
      downloadCV.textContent = translations.about.download_cv;
      // Actualizar la URL del CV según el idioma
      if (translations.about.cv_url) {
        downloadCV.href = translations.about.cv_url;
      }
    }

    // Traducir párrafos
    const paragraphs = aboutSection.querySelectorAll('.col-md-6:first-child p');
    if (paragraphs.length >= 3) {
      paragraphs[0].textContent = translations.about.paragraphs.first;
      paragraphs[1].textContent = translations.about.paragraphs.second;
      paragraphs[2].textContent = translations.about.paragraphs.third;
    }
  }

  // Education and Experience section titles
  const infoWrappers = document.querySelectorAll('.about--info-wrapper h3');
  infoWrappers.forEach((title) => {
    if (
      title.textContent.includes('Edu') ||
      title.textContent.includes('Education')
    ) {
      title.innerHTML = translations.cv_sections.education;
    } else if (
      title.textContent.includes('Ex') ||
      title.textContent.includes('Experience')
    ) {
      title.innerHTML = translations.cv_sections.experience;
    }
  });

  // Translate Education section items
  if (translations.education && Array.isArray(translations.education)) {
    const educationWrapper = document.querySelector(
      '.about--info-wrapper:first-of-type'
    );
    if (educationWrapper) {
      const educationItems =
        educationWrapper.querySelectorAll('.about--info-item');

      // Only translate if we have the same number of items as in the translation file
      if (educationItems.length === translations.education.length) {
        educationItems.forEach((item, index) => {
          const educationData = translations.education[index];
          const dateElement = item.querySelector('.col-xs-4 p');
          const institutionElement = item.querySelector('.col-xs-4 h5');
          const titleElement = item.querySelector('.col-xs-8 h4');
          const descriptionElement = item.querySelector('.col-xs-8 p');

          if (dateElement) dateElement.textContent = educationData.date;
          if (institutionElement)
            institutionElement.innerHTML = `<strong>${educationData.institution}</strong>`;
          if (titleElement) titleElement.innerHTML = educationData.title;
          if (descriptionElement)
            descriptionElement.textContent = educationData.description;
        });
      }
    }
  }

  // Translate Experience section items
  if (translations.experience && Array.isArray(translations.experience)) {
    // Buscar el wrapper de experiencia buscando el contenedor que tiene el texto "Experiencia" en su título
    const experienceWrappers = document.querySelectorAll(
      '.about--info-wrapper'
    );
    let experienceWrapper = null;

    // Recorrer todos los wrappers para encontrar el que tiene el título de experiencia
    experienceWrappers.forEach((wrapper) => {
      const title = wrapper.querySelector('h3');
      if (
        title &&
        (title.textContent.includes('Ex') ||
          title.textContent.includes('Experience'))
      ) {
        experienceWrapper = wrapper;
      }
    });

    if (experienceWrapper) {
      const experienceItems =
        experienceWrapper.querySelectorAll('.about--info-item');

      // Solo traducir si tenemos el mismo número de elementos que en el archivo de traducción
      if (experienceItems.length === translations.experience.length) {
        experienceItems.forEach((item, index) => {
          const experienceData = translations.experience[index];
          const dateElement = item.querySelector('.col-xs-4 p');
          const companyElement = item.querySelector('.col-xs-4 h5');
          const titleElement = item.querySelector('.col-xs-8 h4');
          const descriptionElement = item.querySelector('.col-xs-8 p');

          if (dateElement) dateElement.textContent = experienceData.date;
          if (companyElement)
            companyElement.innerHTML = `<strong>${experienceData.company}</strong>`;
          if (titleElement) titleElement.innerHTML = experienceData.title;
          if (descriptionElement)
            descriptionElement.textContent = experienceData.description;
        });
      } else {
        console.log(
          'Mismatch between experience items in HTML and translation file:',
          experienceItems.length,
          'items in HTML,',
          translations.experience.length,
          'items in translation'
        );
      }
    } else {
      console.log('Experience wrapper not found');
    }
  }

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
    if (
      item.textContent.includes('Caso de Estudio') ||
      item.textContent.includes('Case Study')
    ) {
      item.textContent = translations.portfolio.case_study;
    } else if (
      item.textContent.includes('Diseño Web') ||
      item.textContent.includes('Web Design')
    ) {
      item.textContent = translations.portfolio.web_design;
    }
  });

  // Translate "View Project" buttons
  document.querySelectorAll('.gallery-overlay .btn').forEach((btn) => {
    btn.textContent = translations.portfolio.view_project;
  });

  // Translate project details in modals
  const galleryModals = document.querySelectorAll('.gallery--details');
  galleryModals.forEach((modal) => {
    const modalId = modal.id;
    let projectKey = '';

    // Determine which project this modal is for
    if (modalId.includes('Wallet')) {
      projectKey = 'wallet';
    } else if (modalId.includes('Factoring')) {
      projectKey = 'factoring';
    } else if (modalId.includes('Nomadix')) {
      projectKey = 'nomadix';
    }

    if (projectKey && translations.portfolio.projects[projectKey]) {
      const project = translations.portfolio.projects[projectKey];
      const title = modal.querySelector('.modal-title');
      const categories = modal.querySelector('.modal-header p');
      const description = modal.querySelector('.gallery--description p');

      if (title) title.textContent = project.title;
      if (categories) categories.textContent = project.categories;
      if (description) description.textContent = project.description;
    }
  });

  // Feedback section
  const feedbackTitle = document.querySelector(
    '.feedback--items .feedback--title'
  );
  const whyMeTitle = document.querySelector('.feedback--faq .feedback--title');

  if (feedbackTitle) feedbackTitle.textContent = translations.feedback.title;
  if (whyMeTitle) whyMeTitle.textContent = translations.feedback.why_me;

  // Feedback accordion items
  const accordionItems = document.querySelectorAll('#feedbackA .panel-title');
  if (accordionItems.length >= 3) {
    // Specialization
    const specializationTitle = accordionItems[0];
    if (specializationTitle) {
      specializationTitle.innerHTML =
        translations.feedback.specializations.title +
        '<i class="fa fa-minus"></i>';
    }

    const specializationBody = document.querySelector(
      '#feedbackA01 .panel-body'
    );
    if (specializationBody) {
      specializationBody.textContent =
        translations.feedback.specializations.description;
    }

    // Leadership
    const leadershipTitle = accordionItems[1];
    if (leadershipTitle) {
      leadershipTitle.innerHTML =
        translations.feedback.leadership.title + '<i class="fa fa-minus"></i>';
    }

    const leadershipBody = document.querySelector('#feedbackA02 .panel-body');
    if (leadershipBody) {
      leadershipBody.textContent = translations.feedback.leadership.description;
    }

    // Innovation
    const innovationTitle = accordionItems[2];
    if (innovationTitle) {
      innovationTitle.innerHTML =
        translations.feedback.innovation.title + '<i class="fa fa-minus"></i>';
    }

    const innovationBody = document.querySelector('#feedbackA03 .panel-body');
    if (innovationBody) {
      innovationBody.textContent = translations.feedback.innovation.description;
    }
  }

  // Testimonials
  const testimonialItems = document.querySelectorAll('.feedback--item');
  if (testimonialItems.length >= 4) {
    const testimonials = translations.feedback.testimonials;

    // First testimonial
    const testimonial1 = testimonialItems[0];
    const testimonialText1 = testimonial1.querySelector('p');
    const testimonialName1 = testimonial1.querySelector('.cite');

    if (testimonialText1)
      testimonialText1.textContent = testimonials.person1.text;
    if (testimonialName1)
      testimonialName1.textContent = testimonials.person1.name;

    // Second testimonial
    const testimonial2 = testimonialItems[1];
    const testimonialText2 = testimonial2.querySelector('p');
    const testimonialName2 = testimonial2.querySelector('.cite');

    if (testimonialText2)
      testimonialText2.textContent = testimonials.person2.text;
    if (testimonialName2)
      testimonialName2.textContent = testimonials.person2.name;

    // Third testimonial
    const testimonial3 = testimonialItems[2];
    const testimonialText3 = testimonial3.querySelector('p');
    const testimonialName3 = testimonial3.querySelector('.cite');

    if (testimonialText3)
      testimonialText3.textContent = testimonials.person3.text;
    if (testimonialName3)
      testimonialName3.textContent = testimonials.person3.name;

    // Fourth testimonial
    const testimonial4 = testimonialItems[3];
    const testimonialText4 = testimonial4.querySelector('p');
    const testimonialName4 = testimonial4.querySelector('.cite');

    if (testimonialText4)
      testimonialText4.textContent = testimonials.person4.text;
    if (testimonialName4)
      testimonialName4.textContent = testimonials.person4.name;
  }

  // Counter section
  const counterItems = document.querySelectorAll('.counter--item');
  if (counterItems.length >= 4) {
    const projectsCounter = counterItems[0].querySelector('.counter--text');
    const clientsCounter = counterItems[1].querySelector('.counter--text');
    const linesCounter = counterItems[2].querySelector('.counter--text');
    const cupsCounter = counterItems[3].querySelector('.counter--text');

    if (projectsCounter)
      projectsCounter.innerHTML = translations.counter.projects;
    if (clientsCounter) clientsCounter.innerHTML = translations.counter.clients;
    if (linesCounter) linesCounter.innerHTML = translations.counter.lines;
    if (cupsCounter) cupsCounter.innerHTML = translations.counter.cups;
  }

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
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    if (nameField) nameField.placeholder = translations.contact.name;
    if (emailField) emailField.placeholder = translations.contact.email;
    if (subjectField) subjectField.placeholder = translations.contact.subject;
    if (messageField) messageField.placeholder = translations.contact.message;
    if (submitBtn) submitBtn.textContent = translations.contact.send;
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
    const submitBtn = hireModal.querySelector('button[type="submit"]');

    if (nameField) nameField.placeholder = translations.hire_me.name;
    if (emailField) emailField.placeholder = translations.hire_me.email;
    if (projectTitleField)
      projectTitleField.placeholder = translations.hire_me.project_title;
    if (messageField) messageField.placeholder = translations.hire_me.message;
    if (submitBtn) submitBtn.textContent = translations.hire_me.send_button;

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

  // Thank you page (if we're on it)
  if (window.location.href.includes('thankyou.html')) {
    const thankYouTitle = document.querySelector('h1');
    const thankYouMessage = document.querySelector('.thank-you-message');
    const backButton = document.querySelector('.back-home');

    if (thankYouTitle) thankYouTitle.textContent = translations.thankyou.title;
    if (thankYouMessage)
      thankYouMessage.textContent = translations.thankyou.message;
    if (backButton) backButton.textContent = translations.thankyou.back_home;
  }
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
    es: {
      flag: '🇪🇸',
      label: 'ES',
    },
    en: {
      flag: '🇺🇸',
      label: 'EN',
    },
  };

  // Create buttons for each language
  Object.keys(languages).forEach((lang) => {
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
    button.style.backgroundColor =
      lang === currentLanguage ? '#2c3e50' : 'rgba(0,0,0,0.5)';

    button.innerHTML = `${languages[lang].flag} ${languages[lang].label}`;

    // Add click event to switch language
    button.addEventListener('click', function () {
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
    const customBtn = document.querySelector(
      '.header--custom-btn.hidden-sm.hidden-xs'
    );
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
        console.error(
          'Could not find appropriate place to add language switcher'
        );
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
