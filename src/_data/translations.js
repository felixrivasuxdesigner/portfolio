const en = require('./translations/en.json');
const es = require('./translations/es.json');
const caseStudiesEn = require('./translations/case-studies/en.json');
const caseStudiesEs = require('./translations/case-studies/es.json');

// Reorganizar la estructura para garantizar que las traducciones funcionen correctamente
module.exports = {
  es: {
    ...es,
    case_studies: {
      ...caseStudiesEs,
    },
  },
  en: {
    ...en,
    case_studies: {
      ...caseStudiesEn,
    },
  },
};
