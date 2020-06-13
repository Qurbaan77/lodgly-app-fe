import React, { useState } from 'react';
import { Router, Route, Redirect } from 'react-router-dom';
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
import CleaningGroup from './components/property/cleaninggroup';
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

const history = createBrowserHistory();

const App = () => {
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem('token') ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );

  return (
    <div className="App">
      <div className="main-wrapper">
        <React.Fragment>
          <Router history={history}>
            <Header />
            <main>
              <div className="main_content">
                <Route exact path="/" render={() => <Login />} />
                <Route exact path="/register" render={() => <Register />} />
                <PrivateRoute exact path="/sidenav" render={() => <Sidenav />} />
                <PrivateRoute
                  exact
                  path="/addproperty"
                  render={() => <AddProperty />}
                />
                <PrivateRoute
                  exact
                  path="/propertylist"
                  component={() => <PropertyList />}
                />
                <PrivateRoute exact path="/unittype" render={() => <UnitType />} />
                <PrivateRoute exact path="/groups" render={() => <Groups />} />
                <PrivateRoute
                  exact
                  path="/cleaninggroup"
                  render={() => <CleaningGroup />}
                />
                <PrivateRoute
                  exact
                  path="/channelmanager"
                  render={() => <ChannelManager />}
                />
                <Route exact path="/admin" render={() => <AdminLogin />} />
                <Route
                  exact
                  path="/adminsetting"
                  render={() => <AdminSetting />}
                />
                <PrivateRoute
                  exact
                  path="/createbookingpopup"
                  render={() => <CreateBookingPopup />}
                />
                <PrivateRoute exact path="/guestpopup" render={() => <GuestPopup />} />
                <PrivateRoute exact path="/booking" render={() => <Booking />} />
                <PrivateRoute exact path="/filter" render={() => <BookingFilter />} />
                <PrivateRoute
                  exact
                  path="/deletepopup"
                  render={() => <DeletePopup />}
                />
                <PrivateRoute exact path="/property" render={() => <Property />} />
                <PrivateRoute
                  exact
                  path="/addunittype"
                  render={() => <AddUnitType />}
                />
                <Route exact path="/forget" render={() => <Forget />} />
                <Route exact path="/reset" render={() => <Reset />} />
                <Route exact path="/thankyou" render={() => <Thankyou />} />
                <Route exact path="/services" render={() => <Services />} />
                <PrivateRoute exact path="/calendar" render={() => <Calendar />} />
                <PrivateRoute exact path="/popup" render={() => <Popup />} />
              </div>
            </main>
            <Footer />
          </Router>
        </React.Fragment>
      </div>
    </div>
  );
};

export default App;
