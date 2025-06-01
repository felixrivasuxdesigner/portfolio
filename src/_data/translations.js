module.exports = {
  es: {
    ...require('./translations/es.json'),
    case_studies: {
      ...require('./translations/case-studies/es.json')
    },
    designSystem: {
      ...require('./translations/case-studies/designSystem/es.json')
    },
    designSystemNomadix: {
      ...require('./translations/case-studies/designSystem/nomadix/es.json')
    },
    designSystemJourneyLaw: {
      ...require('./translations/case-studies/designSystem/journeylaw/es.json')
    }
  },
  en: {
    ...require('./translations/en.json'),
    case_studies: {
      ...require('./translations/case-studies/en.json')
    },
    designSystem: {
      ...require('./translations/case-studies/designSystem/en.json')
    },
    designSystemNomadix: {
      ...require('./translations/case-studies/designSystem/nomadix/en.json')
    },
    designSystemJourneyLaw: {
      ...require('./translations/case-studies/designSystem/journeylaw/en.json')
    }
  }
};
