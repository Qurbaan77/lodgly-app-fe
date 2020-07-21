import React from 'react';
import PropTypes from 'prop-types';
import './profile.css';

const BillingHistory = ({ invoiceList, data }) => (
  <div className="billing-page">
    <div className="page-header">
      <h1>Billing History</h1>
    </div>

    <div className="billing-list">
      <div className="custom-table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Payment Plan</th>
              <th style={{ width: '50%' }}>Total Usage</th>
              <th>Balance</th>
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
                      ly Subscription
                    </td>
                    <td>
                      {el.amount}
                      <span>{el.currency}</span>
                    </td>
                    <td>
                      <a href={el.pdf}>Download Invoice</a>
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

BillingHistory.propTypes = {
  invoiceList: PropTypes.objectOf(PropTypes.array).isRequired,
  data: PropTypes.objectOf(PropTypes.array).isRequired,
};

export default BillingHistory;
