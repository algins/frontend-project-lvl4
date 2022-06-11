import { setLocale } from 'yup';

export default ({ t }) => {
  setLocale({
    mixed: {
      notOneOf: t('validation.notOneOf'),
      oneOf: t('validation.oneOf'),
      required: t('validation.required'),
    },
    string: {
      max: t('validation.max', { max: '${max}' }),
      min: t('validation.min', { min: '${min}' }),
    },
  });
};
