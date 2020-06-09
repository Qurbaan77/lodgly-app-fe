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

const Route = ({ component: Component, ...rest }) => (
  <PrivateRoute
    {...rest}
    render={(props) =>
      /token/.test(document.cookie) ? (
        <Component {...props} {...rest} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

const App = () => {
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
                <Route exact path="/sidenav" component={Sidenav} />
                <Route
                  exact
                  path="/addproperty"
                  component={AddProperty}
                />
                <Route
                  exact
                  path="/propertylist"
                  component={PropertyList}
                />
                <Route exact path="/unittype" component={UnitType} />
                <Route exact path="/groups" component={Groups} />
                <Route
                  exact
                  path="/cleaninggroup"
                  component={CleaningGroup}
                />
                <Route
                  exact
                  path="/channelmanager"
                  component={ChannelManager}
                />
                <Route exact path="/admin" component={AdminLogin} />
                <Route
                  exact
                  path="/adminsetting"
                  component={AdminSetting}
                />
                <Route
                  exact
                  path="/createbookingpopup"
                  component={CreateBookingPopup}
                />
                <Route exact path="/guestpopup" component={GuestPopup} />
                <Route exact path="/booking" component={Booking} />
                <Route exact path="/filter" component={BookingFilter} />
                <Route
                  exact
                  path="/deletepopup"
                  component={DeletePopup}
                />
                <Route exact path="/property" component={Property} />
                <Route
                  exact
                  path="/addunittype"
                  component={AddUnitType}
                />
                <Route exact path="/forget" component={Forget} />
                <Route exact path="/reset" component={Reset} />
                <Route exact path="/thankyou" component={Thankyou} />
                <Route exact path="/services" component={Services} />
                <Route exact path="/calendar" component={Calendar} /> 
                <Route exact path="/popup" component={Popup} /> 
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
