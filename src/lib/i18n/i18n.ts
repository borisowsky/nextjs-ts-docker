import NextI18Next from 'next-i18next';

const nextI18nOptions = {
  defaultLanguage: 'en',
  otherLanguages: ['en'],
};

const languages = nextI18nOptions.otherLanguages;
languages.push(nextI18nOptions.defaultLanguage);

const NextI18NextInstance = new NextI18Next({
  ...nextI18nOptions,
  localePath: '/src/locales',
});

if (
  NextI18NextInstance &&
  NextI18NextInstance.i18n &&
  !NextI18NextInstance.i18n.languages
) {
  NextI18NextInstance.i18n.languages = languages;
}

export default NextI18NextInstance;
