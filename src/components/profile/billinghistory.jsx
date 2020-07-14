import React from 'react';
import './profile.css';

const BillingHistory = () => (
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
            <tr>
              <td>June 28</td>
              <td>Monthly Subscription</td>
              <td>
                14,000
                <span>EUR</span>
              </td>
              <td>
                <a href="#">Download Invoice</a>
              </td>
            </tr>

            <tr>
              <td>June 28</td>
              <td>Monthly Subscription</td>
              <td>
                14,000
                <span>EUR</span>
              </td>
              <td>
                <a href="#">Download Invoice</a>
              </td>
            </tr>

            <tr>
              <td>June 28</td>
              <td>Monthly Subscription</td>
              <td>
                14,000
                <span>EUR</span>
              </td>
              <td>
                <a href="#">Download Invoice</a>
              </td>
            </tr>

            <tr>
              <td>June 28</td>
              <td>Monthly Subscription</td>
              <td>
                14,000
                <span>EUR</span>
              </td>
              <td>
                <a href="#">Download Invoice</a>
              </td>
            </tr>

            <tr>
              <td>June 28</td>
              <td>Monthly Subscription</td>
              <td>
                14,000
                <span>EUR</span>
              </td>
              <td>
                <a href="#">Download Invoice</a>
              </td>
            </tr>

            <tr>
              <td>June 28</td>
              <td>Monthly Subscription</td>
              <td>
                14,000
                <span>EUR</span>
              </td>
              <td>
                <a href="#">Download Invoice</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default BillingHistory;
