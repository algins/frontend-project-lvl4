import React from 'react';
import { useTranslation } from 'react-i18next';
import routes from '../routes.js';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <h1 className="h4 text-muted">{t('notFoundPage.title')}</h1>
      <p className="text-muted">
        {t('notFoundPage.goTo')}
        &nbsp;
        <a href={routes.web.homePath()}>{t('notFoundPage.home')}</a>
      </p>
    </div>
  );
};

export default NotFoundPage;
