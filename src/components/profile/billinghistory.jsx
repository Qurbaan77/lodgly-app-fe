import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import './profile.css';

const BillingHistory = ({ invoiceList, data }) => {
  const { t } = useTranslation();
  return (
    <div className="billing-page">
      <div className="page-header">
        <h1>{t('billinghistory.heading1')}</h1>
      </div>

      <div className="billing-list">
        <div className="custom-table">
          <table>
            <thead>
              <tr>
                <th>{t('strings.date')}</th>
                <th>{t('billinghistory.label2')}</th>
                <th style={{ width: '50%' }}>{t('billinghistory.label3')}</th>
                <th>{t('billinghistory.label4')}</th>
              </tr>
            </thead>

            <tbody>
              {
              invoiceList && invoiceList.length > 0
                ? invoiceList.map((el) => (
                  <tr key={el.invoiceId}>
                    <td>{el.start}</td>
                    <td>
                      {data.interval}
                      {t('billinghistory.label5')}
                    </td>
                    <td>
                      {el.amount}
                      <span>{el.currency}</span>
                    </td>
                    <td>
                      <a href={el.pdf}>{t('billinghistory.label6')}</a>
                    </td>
                  </tr>
                ))
                : ''
            }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

BillingHistory.propTypes = {
  invoiceList: PropTypes.objectOf(PropTypes.array),
  data: PropTypes.objectOf(PropTypes.array),
};
BillingHistory.defaultProps = {
  invoiceList: [],
  data: [],
};
export default BillingHistory;
