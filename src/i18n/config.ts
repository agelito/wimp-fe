import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'
import sv from 'javascript-time-ago/locale/sv.json'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(sv);

i18n.use(initReactI18next).init({
    fallbackLng: 'en',
    lng: 'en',
    resources: {
        en: {
            translations: require('./locales/en/translations.json'),
        },
        sv: {
            translations: require('./locales/sv/translations.json')
        }
    },
    ns: ['translations'],
    defaultNS: 'translations'
});

i18n.languages = ['en', 'sv'];

export default i18n;