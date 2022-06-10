import { setLocale } from 'yup';

export default ({ t }) => {
  setLocale({
    mixed: {
      notOneOf: t('validation.notOneOf'),
      required: t('validation.required'),
    },
    string: {
      max: t('validation.max'),
      min: t('validation.min'),
    },
  });
};
