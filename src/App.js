import React,{useState} from 'react';
import { Router, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
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

const history = createBrowserHistory();


const App=()=> {
 


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
                      <Route exact path="/sidenav" render={() => <Sidenav />} />
                      <Route exact path="/addproperty" render={() => <AddProperty />} />
                      <Route exact path="/propertylist" render={() => <PropertyList />} />
                      <Route exact path="/unittype" render={() => <UnitType />} />  
                      <Route exact path="/groups" render={() => <Groups />} /> 
                      <Route exact path="/cleaninggroup" render={() => <CleaningGroup />} /> 
                      <Route exact path="/channelmanager" render={() => <ChannelManager />} /> 
                      <Route exact path="/admin" render={() => <AdminLogin />} />
                      <Route exact path="/adminsetting" render={() => <AdminSetting />} />
                      <Route exact path="/createbookingpopup" render={() => <CreateBookingPopup />} /> 
                      <Route exact path="/guestpopup" render={() => <GuestPopup />} />
                      <Route exact path="/booking" render={() => <Booking />} />
                      <Route exact path="/filter" render={() => <BookingFilter />} />                     
                  </div>
                </main>
              <Footer />
              </Router>
            </React.Fragment>
        </div>
    </div>
  );
}

export default App;
