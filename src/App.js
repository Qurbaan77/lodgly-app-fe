import React, { Suspense, useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Login from './components/login/login';
import Register from './components/register/register';
import Sidenav from './components/navbar/sidenav/sidenav';
import 'antd/dist/antd.css';
import AddProperty from './components/property/addproperty';
import PropertyList from './components/property/propertylist';
import UnitType from './components/property/unittype';
// import ChannelManager from './components/property/channelmanager';
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
import Rates from './components/property/rates';
import SeasonRates from './components/property/seasonrates';
import CreateSeasonRates from './components/property/createseasonrates';
import GuestList from './components/guests/guests';
import CompanyList from './components/guests/company';
import NotAuthorize from './components/userlock/UserNotAuhtorize';
import Overview from './components/property/overview';
import Location from './components/property/location';
import Photos from './components/property/photos';

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
  SecureGuests,
  SecureOverview,
  SecureChannel,
} from './Routes/SecureRoute';
import Owner from './components/owner/owner';
import Team from './components/team/team';
import Profile from './components/profile/profile';
import BillingInformation from './components/profile/billinginformation';
import Invoice from './components/invoice/invoice';
import Stats from './components/stats/stats';

import Channel from './components/channelmanager/channelmanager';
import ChannelBooking from './components/channelmanager/channelbooking';
import ChannelExpedia from './components/channelmanager/channelexpedia';
import ChannelAirbnb from './components/channelmanager/channelairbnb';

import PageNotFound from './components/404/404';
import './responsive.css';

const App = () => {
  const initialState = {
    booking: true,
    calendar: true,
    channelManager: true,
    invoice: true,
    owner: true,
    properties: true,
    stats: true,
    team: true,
    guests: true,
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
          <Suspense fallback={null}>
            <Router>
              <Header getFeature={getFeature} />
              <main>
                <div className="main_content">
                  <Switch>
                    <LoginRoute exact path="/" component={() => <Login />} />
                    <LoginRoute
                      exact
                      path="/company"
                      component={() => <Company />}
                    />
                    <LoginRoute
                      exact
                      path="/register"
                      component={() => <Register />}
                    />
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
                      <PrivateRoute exact path="/addproperty" component={() => <NotAuthorize />} />
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
                      <PrivateRoute exact path="/propertylist" component={() => <NotAuthorize />} />
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
                    {/* <PrivateRoute
                      exact
                      path="/channelmanager"
                      component={() => <ChannelManager />}
                    /> */}
                    <Route
                      exact
                      path="/admin"
                      component={() => <AdminLogin />}
                    />
                    <Route
                      exact
                      path="/adminsetting"
                      component={() => <AdminSetting />}
                    />
                    {isSubUser ? (
                      <SecureBooking
                        exact
                        path="/createbookingpopup"
                        component={() => <CreateBookingPopup />}
                      />
                    ) : (
                      <PrivateRoute
                        exact
                        path="/createbookingpopup"
                        component={() => <CreateBookingPopup />}
                      />
                    )}
                    {isSubUser ? (
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
                    )}

                    {isSubUser ? (
                      <SecureBooking
                        exact
                        path="/booking"
                        component={() => <Booking />}
                      />
                    ) : feature.booking ? (
                      <PrivateRoute
                        exact
                        path="/booking"
                        component={() => <Booking />}
                      />
                    ) : (
                      <LoginRoute exact path="/" component={() => <Login />} />
                    )}
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
                    <PrivateRoute
                      exact
                      path="/thankyou"
                      component={() => <Thankyou />}
                    />
                    {isSubUser ? (
                      <SecureService
                        exact
                        path="/services"
                        component={() => <Services />}
                      />
                    ) : feature.properties ? (
                      <SecureOverview
                        exact
                        path="/services"
                        component={() => <Services />}
                      />
                    ) : (
                      <PrivateRoute exact path="/services" component={() => <NotAuthorize />} />
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
                      <PrivateRoute exact path="/calendar" component={() => <NotAuthorize />} />
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
                      <PrivateRoute exact path="/owner" component={() => <NotAuthorize />} />
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
                      <PrivateRoute exact path="/team" component={() => <NotAuthorize />} />
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
                      <PrivateRoute exact path="/stats" component={() => <NotAuthorize />} />
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
                      <PrivateRoute exact path="/invoice" component={() => <NotAuthorize />} />
                    )}
                    {isSubUser ? (
                      <SecureProperty
                        exact
                        path="/rates"
                        component={() => <Rates />}
                      />
                    ) : feature.properties ? (
                      <SecureOverview
                        exact
                        path="/rates"
                        component={() => <Rates />}
                      />
                    ) : (
                      <PrivateRoute exact path="/rates" component={() => <NotAuthorize />} />
                    )}

                    {isSubUser ? (
                      <SecureProperty
                        exact
                        path="/seasonrates"
                        component={() => <SeasonRates />}
                      />
                    ) : feature.properties ? (
                      <SecureOverview
                        exact
                        path="/seasonrates"
                        component={() => <SeasonRates />}
                      />
                    ) : (
                      <PrivateRoute exact path="/seasonrates" component={() => <NotAuthorize />} />
                    )}
                    {isSubUser ? (
                      <SecureProperty
                        exact
                        path="/createseasonrates"
                        component={() => <CreateSeasonRates />}
                      />
                    ) : feature.properties ? (
                      <SecureOverview
                        exact
                        path="/createseasonrates"
                        component={() => <CreateSeasonRates />}
                      />
                    ) : (
                      <LoginRoute exact path="/" component={() => <Login />} />
                    )}
                    {isSubUser ? (
                      <SecureGuests
                        exact
                        path="/guests"
                        component={() => <GuestList />}
                      />
                    ) : feature.guests ? (
                      <PrivateRoute
                        exact
                        path="/guests"
                        component={() => <GuestList />}
                      />
                    ) : (
                      <PrivateRoute exact path="/guests" component={() => <NotAuthorize />} />
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
                    {isSubUser && localStorage.getItem('unitTypeV2Id') ? (
                      <SecureProperty
                        exact
                        path="/overview"
                        component={() => <Overview />}
                      />
                    ) : feature.properties ? (
                      <SecureOverview
                        exact
                        path="/overview"
                        component={() => <Overview />}
                      />
                    ) : (
                      <PrivateRoute exact path="/overview" component={() => <NotAuthorize />} />
                    )}
                    {isSubUser && localStorage.getItem('unitTypeV2Id') ? (
                      <SecureProperty
                        exact
                        path="/location"
                        component={() => <Location />}
                      />
                    ) : feature.properties ? (
                      <SecureOverview
                        exact
                        path="/location"
                        component={() => <Location />}
                      />
                    ) : (
                      <PrivateRoute exact path="/location" component={() => <NotAuthorize />} />
                    )}
                    {isSubUser && localStorage.getItem('unitTypeV2Id') ? (
                      <SecureProperty
                        exact
                        path="/photos"
                        component={() => <Photos />}
                      />
                    ) : feature.properties ? (
                      <SecureOverview
                        exact
                        path="/photos"
                        component={() => <Photos />}
                      />
                    ) : (
                      <PrivateRoute exact path="/photos" component={() => <NotAuthorize />} />
                    )}

                    {/* <SecureOverview exact path="/overview" component={() => <Overview />} />
                    <SecureOverview exact path="/location" component={() => <Location />} />
                    <SecureOverview exact path="/photos" component={() => <Photos />} /> */}
                    {isSubUser ? feature.channelManager ? (
                      <SecureChannel
                        exact
                        path="/channel"
                        component={() => <Channel />}
                      />
                    ) : (
                      <PrivateRoute exact path="/channel" component={() => <NotAuthorize />} />
                    ) : feature.channelManager ? (
                      <PrivateRoute
                        exact
                        path="/channel"
                        component={() => <Channel />}
                      />
                    ) : (
                      <PrivateRoute exact path="/channel" component={() => <NotAuthorize />} />
                    )}
                    {isSubUser ? feature.channelManager ? (
                      <SecureChannel
                        exact
                        path="/channelbooking"
                        component={() => <ChannelBooking />}
                      />
                    ) : (
                      <PrivateRoute exact path="/channel" component={() => <NotAuthorize />} />
                    ) : feature.channelManager ? (
                      <PrivateRoute
                        exact
                        path="/channelbooking"
                        component={() => <ChannelBooking />}
                      />
                    ) : (
                      <PrivateRoute exact path="/channelbooking" component={() => <NotAuthorize />} />
                    )}
                    {isSubUser ? feature.channelManager ? (
                      <SecureChannel
                        exact
                        path="/channelexpedia"
                        component={() => <ChannelExpedia />}
                      />
                    ) : (
                      <PrivateRoute exact path="/channel" component={() => <NotAuthorize />} />
                    ) : feature.channelManager ? (
                      <PrivateRoute
                        exact
                        path="/channelexpedia"
                        component={() => <ChannelExpedia />}
                      />
                    ) : (
                      <PrivateRoute exact path="/channelexpedia" component={() => <NotAuthorize />} />
                    )}
                    {isSubUser ? feature.channelManager ? (
                      <SecureChannel
                        exact
                        path="/channelairbnb"
                        component={() => <ChannelAirbnb />}
                      />
                    ) : (
                      <PrivateRoute exact path="/channel" component={() => <NotAuthorize />} />
                    ) : feature.channelManager ? (
                      <PrivateRoute
                        exact
                        path="/channelairbnb"
                        component={() => <ChannelAirbnb />}
                      />
                    ) : (
                      <PrivateRoute exact path="/channelairbnb" component={() => <NotAuthorize />} />
                    )}
                    {/* <Route exact path="/channel" component={() => <Channel />} />
                    <Route exact path="/channelbooking" component={() => <ChannelBooking />} />
                    <Route exact path="/channelexpedia" component={() => <ChannelExpedia />} />
                    <Route exact path="/channelairbnb" component={() => <ChannelAirbnb />} /> */}
                    <Route exact path="/notauthorize" component={NotAuthorize} />

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
            </Router>
          </Suspense>
        </>
      </div>
    </div>
  );
};

export default App;
