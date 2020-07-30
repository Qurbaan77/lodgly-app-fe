import React, { Suspense } from 'react';
import { Router, Route } from 'react-router-dom';
// 'history' is pre installed library of react If I install npm i history
// then page rendering is not work-->
// eslint-disable-next-line import/no-extraneous-dependencies
import { createBrowserHistory } from 'history';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Login from './components/login/login';
import Register from './components/register/register';
import Sidenav from './components/navbar/sidenav/sidenav';
import 'antd/dist/antd.css';
import AddProperty from './components/property/addproperty';
import PropertyList from './components/property/propertylist';
import UnitType from './components/property/unittype';
import ChannelManager from './components/property/channelmanager';
import Groups from './components/property/group';
import Task from './components/property/task';
import AdminLogin from './components/admin-panel/login/login';
import AdminSetting from './components/admin-panel/setting/setting';
import CreateBookingPopup from './components/booking/createbookingpopup';
import GuestPopup from './components/booking/guestpopup';
import Booking from './components/booking/booking';
import BookingFilter from './components/booking/filter';
import DeletePopup from './components/property/deletepopup';
import Property from './components/property/property';
import AddUnitType from './components/property/addunittype';
import Forget from './components/forget/forget';
import Thankyou from './components/thankyou/thankyou';
import Reset from './components/reset/reset';
import Services from './components/property/services';
import Calendar from './components/calendar/calendar';
import Popup from './components/calendar/popup';
import Company from './components/company/company';
import { PrivateRoute, LoginRoute } from './Routes/PrivateRoute';
import {
  SecureBooking, SecureCalendar, SecureProperty, SecureTeam,
  SecureOwner, SecureInvoice, SecureService, SecureStats, SecureBilling,
} from './Routes/SecureRoute';

import Owner from './components/owner/owner';
import Team from './components/team/team';
import Profile from './components/profile/profile';
import BillingInformation from './components/profile/billinginformation';
import Invoice from './components/invoice/invoice';
import Stats from './components/stats/stats';

import './responsive.css';

const history = createBrowserHistory();

const App = () => {
  const isSubUser = localStorage.getItem('isSubUser') || false;
  return (
    <div className="App">
      <div className="main-wrapper">
        <>
          <Suspense fallback={null}>
            <Router history={history}>
              <Header />
              <main>
                <div className="main_content">
                  <LoginRoute exact path="/" component={() => <Login />} />
                  <LoginRoute exact path="/company" component={() => <Company />} />
                  <LoginRoute exact path="/register" component={() => <Register />} />
                  <PrivateRoute
                    exact
                    path="/sidenav"
                    component={() => <Sidenav />}
                  />
                  {
                  isSubUser ? <SecureProperty exact path="/addproperty" component={() => <AddProperty />} /> : <PrivateRoute exact path="/addproperty" component={() => <AddProperty />} />
                }

                  {
                  isSubUser
                    ? (
                      <SecureProperty
                        exact
                        path="/propertylist"
                        component={() => <PropertyList />}
                      />
                    ) : (
                      <PrivateRoute
                        exact
                        path="/propertylist"
                        component={() => <PropertyList />}
                      />
                    )
                }

                  {
                  isSubUser
                    ? (
                      <SecureProperty
                        exact
                        path="/unittype"
                        component={() => <UnitType />}
                      />
                    ) : (
                      <PrivateRoute
                        exact
                        path="/unittype"
                        component={() => <UnitType />}
                      />
                    )
                }

                  <PrivateRoute
                    exact
                    path="/groups"
                    component={() => <Groups />}
                  />
                  <PrivateRoute
                    exact
                    path="/task"
                    component={() => <Task />}
                  />
                  <PrivateRoute
                    exact
                    path="/channelmanager"
                    component={() => <ChannelManager />}
                  />
                  <Route exact path="/admin" component={() => <AdminLogin />} />
                  <Route
                    exact
                    path="/adminsetting"
                    component={() => <AdminSetting />}
                  />
                  {
                  isSubUser
                    ? (
                      <SecureBooking
                        exact
                        path="/createbookingpopup"
                        component={() => <CreateBookingPopup />}
                      />
                    )
                    : (
                      <PrivateRoute
                        exact
                        path="/createbookingpopup"
                        component={() => <CreateBookingPopup />}
                      />
                    )
                }
                  {
                  isSubUser
                    ? (
                      <SecureBooking
                        exact
                        path="/guestpopup"
                        component={() => <GuestPopup />}
                      />
                    )
                    : (
                      <PrivateRoute
                        exact
                        path="/guestpopup"
                        component={() => <GuestPopup />}
                      />
                    )
                }

                  {
                  isSubUser
                    ? (
                      <SecureBooking
                        exact
                        path="/booking"
                        component={() => <Booking />}
                      />
                    )
                    : (
                      <PrivateRoute
                        exact
                        path="/booking"
                        component={() => <Booking />}
                      />
                    )
                }
                  <PrivateRoute
                    exact
                    path="/filter"
                    component={() => <BookingFilter />}
                  />
                  <PrivateRoute
                    exact
                    path="/deletepopup"
                    component={() => <DeletePopup />}
                  />
                  {
                  isSubUser
                    ? (
                      <SecureProperty
                        exact
                        path="/property"
                        component={() => <Property />}
                      />
                    )
                    : (
                      <PrivateRoute
                        exact
                        path="/property"
                        component={() => <Property />}
                      />
                    )
                }

                  {
                  isSubUser
                    ? (
                      <SecureProperty
                        exact
                        path="/addunittype"
                        component={() => <AddUnitType />}
                      />
                    )
                    : (
                      <PrivateRoute
                        exact
                        path="/addunittype"
                        component={() => <AddUnitType />}
                      />
                    )
                }

                  <LoginRoute exact path="/forget" component={() => <Forget />} />
                  <LoginRoute exact path="/reset" component={() => <Reset />} />
                  <LoginRoute exact path="/thankyou" component={() => <Thankyou />} />
                  {
                  isSubUser ? <SecureService exact path="/services" component={() => <Services />} /> : <PrivateRoute exact path="/services" component={() => <Services />} />
                }

                  {
                  isSubUser ? <SecureCalendar exact path="/calendar" component={() => <Calendar />} /> : (
                    <PrivateRoute
                      exact
                      path="/calendar"
                      component={() => <Calendar />}
                    />
                  )
                }

                  <PrivateRoute exact path="/popup" component={() => <Popup />} />

                  {
                  isSubUser ? <SecureOwner exact path="/owner" component={() => <Owner />} /> : <PrivateRoute exact path="/owner" component={() => <Owner />} />
                }

                  {/* Additional Work */}

                  {
                  isSubUser ? <SecureTeam exact path="/team" component={() => <Team />} /> : <PrivateRoute exact path="/team" component={() => <Team />} />
                }

                  <PrivateRoute exact path="/profile" component={() => <Profile />} />
                  {
                    isSubUser ? (
                      <SecureBilling
                        exact
                        path="/billinginformation"
                        component={() => <BillingInformation />}
                      />
                    )
                      : (
                        <PrivateRoute
                          exact
                          path="/billinginformation"
                          component={() => <BillingInformation />}
                        />
                      )
                  }
                  {
                    isSubUser ? (
                      <SecureStats
                        exact
                        path="/stats"
                        component={() => <Stats />}
                      />
                    )
                      : (
                        <PrivateRoute
                          exact
                          path="/stats"
                          component={() => <Stats />}
                        />
                      )
                  }
                  {
                  isSubUser ? <SecureInvoice exact path="/invoice" component={() => <Invoice />} /> : <PrivateRoute exact path="/invoice" component={() => <Invoice />} />
                }
                </div>
              </main>
              <Footer />
            </Router>
          </Suspense>
        </>
      </div>
    </div>
  );
};

export default App;
