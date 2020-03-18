import React from 'react';
import { Router, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Login from './components/login/login';

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
