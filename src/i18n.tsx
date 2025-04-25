import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEnglish from './common/translation/en/translation.json';
import translationUzbek from './common/translation/uz/translation.json';
import translationRussian from './common/translation/ru/translation.json';

const resources = {
  en: {
    translation: translationEnglish,
  },
  uz: {
    translation: translationUzbek,
  },
  ru: {
    translation: translationRussian,
  },
};

i18next.use(initReactI18next).init({
  resources,
  lng: 'uz', //default language
});

export default i18next;
