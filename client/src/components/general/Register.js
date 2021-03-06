import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/userAuthActions';
import classnames from 'classnames';

import DashHeader from '../auth/dashboard/DashHeader';
import DashFooter from '../auth/dashboard/DashFooter';


class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      username: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    }
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { name, username, email, password, password2, errors } = this.state;

    return (
      <div>
        <DashHeader />
          <div className='form-page'>
        
            <div className='form-box'>
              <form className='signup-form' onSubmit={this.onSubmit}>

                <div>
                  <Link to='/'>
                      <i className='fa fa-arrow-circle-left'></i>
                      {" "}To Home
                  </Link>
                </div>

                <h3>Register</h3>
                
                <div className='form-group'>
                  <label>Display Name: </label>
                  <input type='text'
                    id='name'
                    placeholder='Name'
                    value={name}
                    error={errors.name}
                    onChange={this.onChange}
                    className={classnames('form-control', {
                      invalid: errors.name
                    })} />
                  <span className='red-text'>{errors.name}</span>

                </div>

                <div className='form-group'>
                <label>Username (cannot be changed): </label>
                  <input type='text'
                    id='username'
                    placeholder='Username'
                    value={username}
                    error={errors.username}
                    onChange={this.onChange}
                    className={classnames('form-control', {
                      invalid: errors.username
                    })} />
                  <span className='red-text'>{errors.username}</span>

                </div>

                <div className='form-group'>
                <label>Email: </label>
                  <input type='email'
                    id='email'
                    placeholder='Email Address'
                    value={email}
                    error={errors.email}
                    onChange={this.onChange}
                    className={classnames('form-control', {
                      invalid: errors.email
                    })} />
                  <span className='red-text'>{errors.email}</span>
                </div>

                <div className='form-group'>
                <label>Password: </label>
                  <input type='password'
                    id='password'
                    placeholder='Password'
                    value={password}
                    error={errors.password}
                    onChange={this.onChange}
                    className={classnames('form-control', {
                      invalid: errors.password
                    })} />
                  <span className='red-text'>{errors.password}</span>
                </div>

                <div className='form-group'>
                  <input type='password'
                    id='password2'
                    placeholder='Confirm Password'
                    value={password2}
                    error={errors.password}
                    onChange={this.onChange}
                    className={classnames('form-control', {
                      invalid: errors.password2
                    })} />
                  <span className='red-text'>{errors.password2}</span>
                </div>

                <div className='form-group'>
                  <button type='submit' className='btn btn-primary btn-block btn-lg'>Sign Up</button>
                </div>

                <div className='text-center'>Already have an account? <Link to='/login'>Login here</Link></div>
                
              </form>
            </div>

          </div>
        <DashFooter />
      </div>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));