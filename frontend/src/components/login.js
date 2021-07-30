import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../redux/actions/auth';

export class Login extends Component {
  state = {
    username: '',
    password: '',
  };

  static propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const { username, password } = this.state;
    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Login</h2>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                onChange={this.onChange}
                value={username}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={this.onChange}
                value={password}
              />
            </div>
            <p className="errorText"> { this.props.errors.msg.detail } </p>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.errors,
});

export default connect(mapStateToProps, { login })(Login);

// import React, { Component } from "react";
// import axiosInstance from "../axiosApi";

// class Login extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {username: "", password: ""};

//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//         this.handleSubmitWThen = this.handleSubmitWThen.bind(this);
//     }

//     handleChange(event) {
//         this.setState({[event.target.name]: event.target.value});
//     }

//     handleSubmitWThen(event){
//         event.preventDefault();
//         axiosInstance.post('/token/obtain/', {
//                 username: this.state.username,
//                 password: this.state.password
//             }).then(
//                 result => {
//                     axiosInstance.defaults.headers['Authorization'] = "JWT " + result.data.access;
//                     localStorage.setItem('access_token', result.data.access);
//                     localStorage.setItem('refresh_token', result.data.refresh);
//                 }
//             ).catch (error => {
//                 throw error;
//             })
//     }

//     async handleSubmit(event) {
//         event.preventDefault();
//         try {
//             const response = await axiosInstance.post('/token/obtain/', {
//                 username: this.state.username,
//                 password: this.state.password
//             });
//             axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;
//             localStorage.setItem('access_token', response.data.access);
//             localStorage.setItem('refresh_token', response.data.refresh);
//             return response;
//         } catch (error) {
//             throw error;
//         }
//     }

//     render() {
//         return (
//             <div>
//                 Login
//                 <form onSubmit={this.handleSubmit}>
//                     <label>
//                         Username:
//                         <input name="username" type="text" value={this.state.username} onChange={this.handleChange}/>
//                     </label>
//                     <label>
//                         Password:
//                         <input name="password" type="password" value={this.state.password} onChange={this.handleChange}/>
//                     </label>
//                     <input type="submit" value="Submit"/>
//                 </form>
//             </div>
//         )
//     }
// }
// export default Login;