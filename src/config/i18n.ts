import { createI18n } from 'vue-i18n';

import en from '@/lang/en';

export default createI18n<[typeof en], 'en'>({
    warnHtmlMessage: false,
    fallbackLocale: 'en',
    globalInjection: true,
    legacy: false,
    locale: 'en',
    messages: {
        en,
    },
});
