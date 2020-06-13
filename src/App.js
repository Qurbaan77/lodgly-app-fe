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
                <Route exact path="/" component={() => <Login />} />
                <Route exact path="/register" component={() => <Register />} />
                <PrivateRoute exact path="/sidenav" component={() => <Sidenav />} />
                <PrivateRoute
                  exact
                  path="/addproperty"
                  component={() => <AddProperty />}
                />
                <PrivateRoute
                  exact
                  path="/propertylist"
                  component={() => <PropertyList />}
                />
                <PrivateRoute exact path="/unittype" component={() => <UnitType />} />
                <PrivateRoute exact path="/groups" component={() => <Groups />} />
                <PrivateRoute
                  exact
                  path="/cleaninggroup"
                  component={() => <CleaningGroup />}
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
                <PrivateRoute
                  exact
                  path="/createbookingpopup"
                  component={() => <CreateBookingPopup />}
                />
                <PrivateRoute exact path="/guestpopup" component={() => <GuestPopup />} />
                <PrivateRoute exact path="/booking" component={() => <Booking />} />
                <PrivateRoute exact path="/filter" component={() => <BookingFilter />} />
                <PrivateRoute
                  exact
                  path="/deletepopup"
                  component={() => <DeletePopup />}
                />
                <PrivateRoute exact path="/property" component={() => <Property />} />
                <PrivateRoute
                  exact
                  path="/addunittype"
                  component={() => <AddUnitType />}
                />
                <Route exact path="/forget" component={() => <Forget />} />
                <Route exact path="/reset" component={() => <Reset />} />
                <Route exact path="/thankyou" component={() => <Thankyou />} />
                <Route exact path="/services" component={() => <Services />} />
                <PrivateRoute exact path="/calendar" component={() => <Calendar />} />
                <PrivateRoute exact path="/popup" component={() => <Popup />} />
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
