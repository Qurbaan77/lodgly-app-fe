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
