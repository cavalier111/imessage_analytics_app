import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import Header from './layout/Header';
import Home from './home';
import Alerts from './layout/Alerts';
import Login from './Login';
import Register from './Register';
import PrivateRoute from './PrivateRoute';

import { Provider } from 'react-redux';
import store from "../redux/store/store";
// import { loadUser } from '../actions/auth';

// Alert Options
const alertOptions = {
  timeout: 3000,
  position: 'top center',
};

class App extends Component {
  // componentDidMount() {
  //   store.dispatch(loadUser());
  // //this.props.refreshToken();
  // }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              <Header />
              <Alerts />
              <div className="container">
                <Switch>
                  <PrivateRoute exact path="/" component={Home} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

export default App;


// import React, { Component} from "react";
// import { Switch, Route, Link } from "react-router-dom";
// import Login from "./login";
// import Signup from "./signup";
// import Hello from "./hello";
// import Home from "./home";

// import axiosInstance from "../axiosApi";


// class App extends Component {

//     constructor() {
//         super();
//         this.handleLogout = this.handleLogout.bind(this);
//     }

//     async handleLogout() {
//         try {
//             const response = await axiosInstance.post('/blacklist/', {
//                 "refresh_token": localStorage.getItem("refresh_token")
//             });
//             localStorage.removeItem('access_token');
//             localStorage.removeItem('refresh_token');
//             axiosInstance.defaults.headers['Authorization'] = null;
//             return response;
//         }
//         catch (e) {
//             console.log(e);
//         }
//     };

//     render() {
//         return (
//             <div className="site">
//                 <nav>
//                     <Link className={"nav-link"} to={"/"}>Home</Link>
//                     <Link className={"nav-link"} to={"/login/"}>Login</Link>
//                     <Link className={"nav-link"} to={"/signup/"}>Signup</Link>
//                     <Link className={"nav-link"} to={"/hello/"}>Hello</Link>
//                     <button onClick={this.handleLogout}>Logout</button>
//                 </nav>
//                 <main>
//                     <h1>Ahhh after 10,000 years I'm free. Time to conquer the Earth!</h1>

//                     <Switch>
//                         <Route exact path={"/login"} component={Login}/>
//                         <Route exact path={"/signup"} component={Signup}/>
//                         <PrivateRoute exact path="/" component={Home} />
//                         <PrivateRoute exact path="/hello" component={Hello} />
//                         {/*<Route exact path={"/hello/"} component={Hello}/>*/}
//                        {/*<Route path={"/"} render={() => <div>Home again</div>}/>*/}
//                     </Switch>
//                 </main>
//             </div>
//         );
//     }
// }

// export default App;