import { setLocale } from 'yup';

export default ({ t }) => {
  setLocale({
    mixed: {
      required: t('validation.required'),
    },
  });
};
