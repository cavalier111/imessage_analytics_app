
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../redux/actions/auth';
import { createMessage } from '../redux/actions/messages';

export class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    password2: '',
  };

  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, password2 } = this.state;
    if (password !== password2) {
      this.props.createMessage({ passwordNotMatch: 'Passwords do not match' });
    } else {
      const newUser = {
        username,
        password,
        email,
      };
      this.props.register(newUser);
    }
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const { username, email, password, password2 } = this.state;
    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Register</h2>
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
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={this.onChange}
                value={email}
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
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="password2"
                onChange={this.onChange}
                value={password2}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register, createMessage })(Register);


// import React, { Component } from "react";
// import axiosInstance from "../axiosApi";

// class Signup extends Component{
//     constructor(props){
//         super(props);
//         this.state = {
//             username: "",
//             password: "",
//             email:"",
//             errors:{}
//         };

//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     handleChange(event) {
//         this.setState({[event.target.name]: event.target.value});
//     }

//     async handleSubmit(event) {
//         event.preventDefault();
//         try {
//             const response = await axiosInstance.post('/user/create/', {
//                 username: this.state.username,
//                 email: this.state.email,
//                 password: this.state.password
//             });
//             return response;
//         } catch (error) {
//             console.log(error.stack);
//             this.setState({
//                 errors:error.response.data
//             });
//         }
//     }

//     render() {
//         return (
//             <div>
//                 Signup
//                 <form onSubmit={this.handleSubmit}>
//                     <label>
//                         Username:
//                         <input name="username" type="text" value={this.state.username} onChange={this.handleChange}/>
//                         { this.state.errors.username ? this.state.errors.username : null}
//                     </label>
//                     <label>
//                         Email:
//                         <input name="email" type="email" value={this.state.email} onChange={this.handleChange}/>
//                         { this.state.errors.email ? this.state.errors.email : null}
//                     </label>
//                     <label>
//                         Password:
//                         <input name="password" type="password" value={this.state.password} onChange={this.handleChange}/>
//                         { this.state.errors.password ? this.state.errors.password : null}
//                     </label>
//                     <input type="submit" value="Submit"/>
//                 </form>
//             </div>
//         )
//     }
// }

// export default Signup;
