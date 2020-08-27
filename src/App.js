import React, {
  Suspense, useState, useCallback, lazy,
} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'antd/dist/antd.css';

import { PrivateRoute, LoginRoute } from './Routes/PrivateRoute';
import {
  SecureBooking,
  SecureCalendar,
  SecureProperty,
  SecureTeam,
  SecureOwner,
  SecureInvoice,
  SecureService,
  SecureStats,
  SecureBilling,
} from './Routes/SecureRoute';
import Owner from './components/owner/owner';
import Team from './components/team/team';
import Profile from './components/profile/profile';
import BillingInformation from './components/profile/billinginformation';
import Invoice from './components/invoice/invoice';
import Stats from './components/stats/stats';
import PageNotFound from './components/404/404';
import './responsive.css';

const Header = lazy(() => import('./components/header/header'));
const Sidenav = lazy(() => import('./components/navbar/sidenav/sidenav'));
const Footer = lazy(() => import('./components/footer/footer'));
const Login = lazy(() => import('./components/login/login'));
const AddProperty = lazy(() => import('./components/property/addproperty'));
const PropertyList = lazy(() => import('./components/property/propertylist'));
const UnitType = lazy(() => import('./components/property/unittype'));
const ChannelManager = lazy(() => import('./components/property/channelmanager'));
const Groups = lazy(() => import('./components/property/group'));
const Task = lazy(() => import('./components/property/task'));
const Booking = lazy(() => import('./components/booking/booking'));
const Property = lazy(() => import('./components/property/property'));
const AddUnitType = lazy(() => import('./components/property/addunittype'));
const Forget = lazy(() => import('./components/forget/forget'));
const Reset = lazy(() => import('./components/reset/reset'));
const Services = lazy(() => import('./components/property/services'));
const Calendar = lazy(() => import('./components/calendar/calendar'));
const Popup = lazy(() => import('./components/calendar/popup'));
const Rates = lazy(() => import('./components/property/rates'));
const SeasonRates = lazy(() => import('./components/property/seasonrates'));
const CreateSeasonRates = lazy(() => import('./components/property/createseasonrates'));
const GuestList = lazy(() => import('./components/guests/guests'));
const CompanyList = lazy(() => import('./components/guests/company'));
const App = () => {
  const initialState = {
    booking: true,
    calendar: true,
    channelmanager: true,
    invoice: true,
    owner: true,
    properties: true,
    stats: true,
    team: true,
    websideBuilder: true,
  };
  const [feature, setFeature] = useState(initialState);

  const getFeature = useCallback((data) => {
    if (data) {
      setFeature(data[0]);
    }
  }, []);

  const isSubUser = localStorage.getItem('isSubUser') || false;
  return (
    <div className="App">
      <div className="main-wrapper">
        <>
          <Router>
            <Suspense fallback={null}>
              <Header getFeature={getFeature} />
              <main>
                <div className="main_content">
                  <Switch>
                    <LoginRoute exact path="/" component={() => <Login />} />
                    {/* <LoginRoute
                      exact
                      path="/company"
                      component={() => <Company />}
                    />
                    <LoginRoute
                      exact
                      path="/register"
                      component={() => <Register />}
                    /> */}
                    <PrivateRoute
                      exact
                      path="/sidenav"
                      component={() => <Sidenav />}
                    />
                    {isSubUser ? (
                      <SecureProperty
                        exact
                        path="/addproperty"
                        component={() => <AddProperty />}
                      />
                    ) : feature.properties ? (
                      <PrivateRoute
                        exact
                        path="/addproperty"
                        component={() => <AddProperty />}
                        feature={feature.properties}
                      />
                    ) : (
                      <LoginRoute exact path="/" component={() => <Login />} />
                    )}

                    {isSubUser ? (
                      <SecureProperty
                        exact
                        path="/propertylist"
                        component={() => <PropertyList />}
                      />
                    ) : feature.properties ? (
                      <PrivateRoute
                        exact
                        path="/propertylist"
                        component={() => <PropertyList />}
                      />
                    ) : (
                      <LoginRoute exact path="/" component={() => <Login />} />
                    )}

                    {isSubUser ? (
                      <SecureProperty
                        exact
                        path="/unittype"
                        component={() => <UnitType />}
                      />
                    ) : feature.properties ? (
                      <PrivateRoute
                        exact
                        path="/unittype"
                        component={() => <UnitType />}
                      />
                    ) : (
                      <LoginRoute exact path="/" component={() => <Login />} />
                    )}

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
                    {/* <Route
                      exact
                      path="/admin"
                      component={() => <AdminLogin />}
                    />
                    <Route
                      exact
                      path="/adminsetting"
                      component={() => <AdminSetting />}
                    /> */}
                    {/* {isSubUser ? (
                      <SecureBooking
                        exact
                        path="/createbookingpopup"
                        component={<CreateBookingPopup />}
                      />
                    ) : (
                      <PrivateRoute
                        exact
                        path="/createbookingpopup"
                        component={<CreateBookingPopup />}
                      />
                    )} */}
                    {/* {isSubUser ? (
                      <SecureBooking
                        exact
                        path="/guestpopup"
                        component={() => <GuestPopup />}
                      />
                    ) : (
                      <PrivateRoute
                        exact
                        path="/guestpopup"
                        component={() => <GuestPopup />}
                      />
                    )} */}

                    {isSubUser ? (
                      <SecureBooking
                        exact
                        path="/booking"
                        component={() => <Booking />}
                      />
                    ) : feature.booking || true ? (
                      <PrivateRoute
                        exact
                        path="/booking"
                        component={() => <Booking />}
                      />
                    ) : (
                      <LoginRoute exact path="/" component={() => <Login />} />
                    )}
                    {/* <PrivateRoute
                      exact
                      path="/filter"
                      component={() => <BookingFilter />}
                    /> */}
                    {/* <PrivateRoute
                      exact
                      path="/deletepopup"
                      component={() => <DeletePopup />}
                    /> */}
                    {isSubUser ? (
                      <SecureProperty
                        exact
                        path="/property"
                        component={() => <Property />}
                      />
                    ) : feature.properties ? (
                      <PrivateRoute
                        exact
                        path="/property"
                        component={() => <Property />}
                      />
                    ) : (
                      <LoginRoute exact path="/" component={() => <Login />} />
                    )}

                    {isSubUser ? (
                      <SecureProperty
                        exact
                        path="/addunittype"
                        component={() => <AddUnitType />}
                      />
                    ) : feature.properties ? (
                      <PrivateRoute
                        exact
                        path="/addunittype"
                        component={() => <AddUnitType />}
                      />
                    ) : (
                      <LoginRoute exact path="/" component={() => <Login />} />
                    )}

                    <LoginRoute
                      exact
                      path="/forget"
                      component={() => <Forget />}
                    />
                    <LoginRoute
                      exact
                      path="/reset"
                      component={() => <Reset />}
                    />
                    {/* <LoginRoute
                      exact
                      path="/thankyou"
                      component={() => <Thankyou />}
                    /> */}
                    {isSubUser ? (
                      <SecureService
                        exact
                        path="/services"
                        component={() => <Services />}
                      />
                    ) : feature.properties ? (
                      <PrivateRoute
                        exact
                        path="/services"
                        component={() => <Services />}
                      />
                    ) : (
                      <LoginRoute exact path="/" component={() => <Login />} />
                    )}

                    {isSubUser ? (
                      <SecureCalendar
                        exact
                        path="/calendar"
                        component={() => <Calendar />}
                      />
                    ) : feature.calendar ? (
                      <PrivateRoute
                        exact
                        path="/calendar"
                        component={() => <Calendar />}
                      />
                    ) : (
                      <LoginRoute exact path="/" component={() => <Login />} />
                    )}

                    <PrivateRoute
                      exact
                      path="/popup"
                      component={() => <Popup />}
                    />

                    {isSubUser ? (
                      <SecureOwner
                        exact
                        path="/owner"
                        component={() => <Owner />}
                      />
                    ) : feature.owner ? (
                      <PrivateRoute
                        exact
                        path="/owner"
                        component={() => <Owner />}
                      />
                    ) : (
                      <LoginRoute exact path="/" component={() => <Login />} />
                    )}

                    {/* Additional Work */}

                    {isSubUser ? (
                      <SecureTeam
                        exact
                        path="/team"
                        component={() => <Team />}
                      />
                    ) : feature.team ? (
                      <PrivateRoute
                        exact
                        path="/team"
                        component={() => <Team />}
                      />
                    ) : (
                      <LoginRoute exact path="/" component={() => <Login />} />
                    )}

                    <PrivateRoute
                      exact
                      path="/profile"
                      component={() => <Profile />}
                    />
                    {isSubUser ? (
                      <SecureBilling
                        exact
                        path="/billinginformation"
                        component={() => <BillingInformation />}
                      />
                    ) : (
                      <PrivateRoute
                        exact
                        path="/billinginformation"
                        component={() => <BillingInformation />}
                      />
                    )}
                    {isSubUser ? (
                      <SecureStats
                        exact
                        path="/stats"
                        component={() => <Stats />}
                      />
                    ) : feature.stats ? (
                      <PrivateRoute
                        exact
                        path="/stats"
                        component={() => <Stats />}
                      />
                    ) : (
                      <LoginRoute exact path="/" component={() => <Login />} />
                    )}
                    {isSubUser ? (
                      <SecureInvoice
                        exact
                        path="/invoice"
                        component={() => <Invoice />}
                      />
                    ) : feature.invoice ? (
                      <PrivateRoute
                        exact
                        path="/invoice"
                        component={() => <Invoice />}
                      />
                    ) : (
                      <LoginRoute exact path="/" component={() => <Login />} />
                    )}

                    {isSubUser ? (
                      <SecureProperty
                        exact
                        path="/rates"
                        component={() => <Rates />}
                      />
                    ) : feature.properties ? (
                      <PrivateRoute
                        exact
                        path="/rates"
                        component={() => <Rates />}
                      />
                    ) : (
                      <LoginRoute exact path="/" component={() => <Login />} />
                    )}

                    {isSubUser ? (
                      <SecureProperty
                        exact
                        path="/seasonrates"
                        component={() => <SeasonRates />}
                      />
                    ) : feature.properties ? (
                      <PrivateRoute
                        exact
                        path="/seasonrates"
                        component={() => <SeasonRates />}
                      />
                    ) : (
                      <LoginRoute exact path="/" component={() => <Login />} />
                    )}
                    {isSubUser ? (
                      <SecureProperty
                        exact
                        path="/createseasonrates"
                        component={() => <CreateSeasonRates />}
                      />
                    ) : feature.properties ? (
                      <PrivateRoute
                        exact
                        path="/createseasonrates"
                        component={() => <CreateSeasonRates />}
                      />
                    ) : (
                      <LoginRoute exact path="/" component={() => <Login />} />
                    )}
                    {isSubUser ? (
                      <SecureProperty
                        exact
                        path="/guests"
                        component={() => <GuestList />}
                      />
                    ) : feature.properties ? (
                      <PrivateRoute
                        exact
                        path="/guests"
                        component={() => <GuestList />}
                      />
                    ) : (
                      <LoginRoute exact path="/" component={() => <Login />} />
                    )}
                    {isSubUser ? (
                      <SecureProperty
                        exact
                        path="/companylist"
                        component={() => <CompanyList />}
                      />
                    ) : feature.properties ? (
                      <PrivateRoute
                        exact
                        path="/companylist"
                        component={() => <CompanyList />}
                      />
                    ) : (
                      <LoginRoute exact path="/" component={() => <Login />} />
                    )}

                    {/* <Route exact path="/rates" component={() => <Rates />} />
                    <Route
                      exact
                      path="/seasonrates"
                      component={() => <SeasonRates />}
                    />
                    <Route
                      exact
                      path="/createseasonrates"
                      component={() => <CreateSeasonRates />}
                    />
                    <Route
                      exact
                      path="/guests"
                      component={() => <GuestList />}
                    />
                    <Route
                      exact
                      path="/companylist"
                      component={() => <CompanyList />}
                    /> */}
                    <Route component={PageNotFound} />
                  </Switch>
                </div>
              </main>
              <Footer />
              <ToastContainer
                containerId="B"
                position="bottom-center"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </Suspense>
          </Router>
        </>
      </div>
    </div>
  );
};

export default App;
