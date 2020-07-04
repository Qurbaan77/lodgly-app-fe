import React, { useState, useEffect } from 'react';
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
import { PrivateRoute, LoginRoute} from './Routes/PrivateRoute';
import { SecureBooking, SecureCalendar, SecureProperty, SecureTeam } from './Routes/SecureRoute';

import Owner from './components/owner/owner';
import TeamListing from './components/team/teamlist';
import Team from './components/team/team';
import Profile from './components/profile/profile';
import BillingInformation from './components/profile/billinginformation';

import './responsive.css';

const history = createBrowserHistory();

const App = () => {
  const isSubUser = localStorage.getItem('isSubUser') || false;
  return (
    <div className="App">
      <div className="main-wrapper">
        <React.Fragment>
          <Router history={history}>
            <Header />
            <main>
              <div className="main_content">
                <LoginRoute exact path="/" component={() => <Login />} />
                <Route exact path="/register" component={() => <Register />} />
                <PrivateRoute
                  exact
                  path="/sidenav"
                  component={() => <Sidenav />}
                />
                {
                  isSubUser ? <SecureProperty exact path="/addproperty" component={() => <AddProperty />} /> : <PrivateRoute exact path="/addproperty" component={() => <AddProperty />} />
                }
                
                {
                  isSubUser ?  
                  <SecureProperty
                  exact
                  path="/propertylist"
                  component={() => <PropertyList />}
                /> : 
                 <PrivateRoute
                  exact
                  path="/propertylist"
                  component={() => <PropertyList />}
                />
                }
               
               {
                 isSubUser ?
                 <SecureProperty
                  exact
                  path="/unittype"
                  component={() => <UnitType />}
                /> :
                 <PrivateRoute
                  exact
                  path="/unittype"
                  component={() => <UnitType />}
                />
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
                  isSubUser ? 
                  <SecureBooking
                  exact
                  path="/createbookingpopup"
                  component={() => <CreateBookingPopup />}
                /> : 
                <PrivateRoute
                  exact
                  path="/createbookingpopup"
                  component={() => <CreateBookingPopup />}
                />
                }
                {
                  isSubUser ?
                  <SecureBooking
                  exact
                  path="/guestpopup"
                  component={() => <GuestPopup />}
                /> :
                <PrivateRoute
                  exact
                  path="/guestpopup"
                  component={() => <GuestPopup />}
                />
                }
                
                {
                  isSubUser ? 
                  <SecureBooking
                  exact
                  path="/booking"
                  component={() => <Booking />}
                /> : 
                <PrivateRoute
                  exact
                  path="/booking"
                  component={() => <Booking />}
                />
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
                  isSubUser ? 
                  <SecureProperty
                  exact
                  path="/property"
                  component={() => <Property />}
                /> :
                 <PrivateRoute
                  exact
                  path="/property"
                  component={() => <Property />}
                />
                }

               {
                isSubUser ? 
                <SecureProperty
                  exact
                  path="/addunittype"
                  component={() => <AddUnitType />}
                /> :
                 <PrivateRoute
                  exact
                  path="/addunittype"
                  component={() => <AddUnitType />}
                />
               }
               
                <Route exact path="/forget" component={() => <Forget />} />
                <Route exact path="/reset" component={() => <Reset />} />
                <Route exact path="/thankyou" component={() => <Thankyou />} />
                <Route exact path="/services" component={() => <Services />} />
                {
                  isSubUser ?  <SecureCalendar exact path="/calendar" component={() => <Calendar />} /> :  <PrivateRoute exact path="/calendar" component={() => <Calendar />}
                />
                }
               
                <PrivateRoute exact path="/popup" component={() => <Popup />} />

                <PrivateRoute exact path="/owner" component={() => <Owner />} />

                {/* Additional Work */}

                {
                  isSubUser ? <SecureTeam exact path="/team" component={() => <Team />}/> : <PrivateRoute exact path="/team" component={() => <Team />} />
                }
                {
                  isSubUser ?  <SecureTeam exact path="/teamlist" component={() => <TeamListing />}/> : <PrivateRoute exact path="/teamlist" component={() => <TeamListing />}/>
                }
               
                <Route exact path="/profile" component={() => <Profile />} />
                <Route
                  exact
                  path="/billinginformation"
                  component={() => <BillingInformation />}
                />
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
