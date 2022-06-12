import { setLocale } from 'yup';

export default ({ t }) => {
  setLocale({
    mixed: {
      notOneOf: t('validation.notOneOf'),
      required: t('validation.required'),
    },
  });
};
