import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export default {
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
    },
    designSystemIntelliResearch: {
      ...require('./translations/case-studies/designSystem/intelliresearch/es.json')
    },
    designSystemRadioDAO: {
      ...require('./translations/case-studies/designSystem/radio_dao/es.json')
    },
    designSystemWallet: {
      ...require('./translations/case-studies/designSystem/wallet/es.json')
    },
    designSystemFactoring: {
      ...require('./translations/case-studies/designSystem/factoring/es.json')
    },
    designSystemFifaPredictor: {
      ...require('./translations/case-studies/designSystem/fifa_predictor/es.json')
    },
    designSystemAgileRadar: {
      ...require('./translations/case-studies/designSystem/agile_radar/es.json')
    },
    designSystemAiReader: {
      ...require('./translations/case-studies/designSystem/ai_reader/es.json')
    },
    designSystemGrantThornton: {
      ...require('./translations/case-studies/designSystem/grant_thornton/es.json')
    },
    projectDesignSystems: {
      nomadix: require('./translations/case-studies/designSystem/nomadix/es.json'),
      journeylaw: require('./translations/case-studies/designSystem/journeylaw/es.json'),
      intelliresearch: require('./translations/case-studies/designSystem/intelliresearch/es.json'),
      radio_dao: require('./translations/case-studies/designSystem/radio_dao/es.json'),
      wallet: require('./translations/case-studies/designSystem/wallet/es.json'),
      factoring: require('./translations/case-studies/designSystem/factoring/es.json'),
      fifa_predictor: require('./translations/case-studies/designSystem/fifa_predictor/es.json'),
      agile_radar: require('./translations/case-studies/designSystem/agile_radar/es.json'),
      ai_reader: require('./translations/case-studies/designSystem/ai_reader/es.json'),
      grant_thornton: require('./translations/case-studies/designSystem/grant_thornton/es.json')
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
    },
    designSystemIntelliResearch: {
      ...require('./translations/case-studies/designSystem/intelliresearch/en.json')
    },
    designSystemRadioDAO: {
      ...require('./translations/case-studies/designSystem/radio_dao/en.json')
    },
    designSystemWallet: {
      ...require('./translations/case-studies/designSystem/wallet/en.json')
    },
    designSystemFactoring: {
      ...require('./translations/case-studies/designSystem/factoring/en.json')
    },
    designSystemFifaPredictor: {
      ...require('./translations/case-studies/designSystem/fifa_predictor/en.json')
    },
    designSystemAgileRadar: {
      ...require('./translations/case-studies/designSystem/agile_radar/en.json')
    },
    designSystemAiReader: {
      ...require('./translations/case-studies/designSystem/ai_reader/en.json')
    },
    designSystemGrantThornton: {
      ...require('./translations/case-studies/designSystem/grant_thornton/en.json')
    },
    projectDesignSystems: {
      nomadix: require('./translations/case-studies/designSystem/nomadix/en.json'),
      journeylaw: require('./translations/case-studies/designSystem/journeylaw/en.json'),
      intelliresearch: require('./translations/case-studies/designSystem/intelliresearch/en.json'),
      radio_dao: require('./translations/case-studies/designSystem/radio_dao/en.json'),
      wallet: require('./translations/case-studies/designSystem/wallet/en.json'),
      factoring: require('./translations/case-studies/designSystem/factoring/en.json'),
      fifa_predictor: require('./translations/case-studies/designSystem/fifa_predictor/en.json'),
      agile_radar: require('./translations/case-studies/designSystem/agile_radar/en.json'),
      ai_reader: require('./translations/case-studies/designSystem/ai_reader/en.json'),
      grant_thornton: require('./translations/case-studies/designSystem/grant_thornton/en.json')
    }
  }
};
