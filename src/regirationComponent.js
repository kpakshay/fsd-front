import React, { Component } from 'react';
import axios from 'axios';
import './registration.css';

class RegistrationComponent extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      name: '',
      phone:null,
      email: '',
      password:'',
      address: '',
      errors: {
        username: '',
        name: '',
        phone:null,
        email: '',
        password:'',
        address: '',
      },
    };
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    var errKeys = await Object.keys(this.state).filter((key) => {
      if (this.state[key] == '' && key !== 'errors') {
        return key;
      }
    });
    if (errKeys.length >= 1) console.warn('Please fill all fields');
    else console.log(this.state);

    try{
        var response = await axios.post(
        'https://fsd-bloodbank.herokuapp.com/register/registeruser', {
            username: this.state.username,
            name: this.state.name,
            phone:this.state.phone,
            email: this.state.email,
            password:this.state.password,
            address: this.state.address
        })
        if(response.data) {
            console.log("success");
            this.props.history.push('/');
        }
    } catch (err) {
        console.warn(err)
    }
  };
  handleChange = async (e) => {
    var errors = { ...this.state.errors };

    if (e.target.value === '') {
      errors[e.target.name] = 'Required';
    }else if(e.target.name==="phone"&&e.target.value.length!=10){
        errors[e.target.name]='Number must be length of 10';
    } else {
      errors[e.target.name] = '';
    }
    // if(e.target.name==="phone"&&e.target.value.length<10){

    // }

    await this.setState({ errors, [e.target.name]: e.target.value });
  };
  handleReset = () => {
    this.setState({
      username: '',
      name: '',
      phone:null,
      email: '',
      password: '',
      address: '',
    });
  };
  render() {
    return (
      <>
        <div className='form'>
          <h2>Register Here</h2>
          <div className='input-container'>
          <form id="ff" onSubmit={(e) => this.handleSubmit(e)}>
            <div>
              <label>User Name </label>
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={(e) => this.handleChange(e)}
              />{' '}
              <br />
              <span style={{ color: 'red' }}>
                {' '}
                {this.state.errors.username}{' '}
              </span>
            </div>
            <br />
            <div>
              <label> Name </label>
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={(e) => this.handleChange(e)}
              />
              <br />
              <span style={{ color: 'red' }}>
                {' '}
                {this.state.errors.name}{' '}
              </span>
            </div>
            <br />
            <div>
                <label>Phone no.</label>
                <input 
                type="number" 
                name="phone"
                value={this.state.phone}
                onChange={(e) => this.handleChange(e)}
                />
                <br />
              <span style={{ color: 'red' }}>
                {' '}
                {this.state.errors.phone}{' '}
              </span>
            </div>
            <br/>
            <div>
              <label> Email </label>
              <input
                type="email"
                name="email"
                value={this.state.email}
                onChange={(e) => this.handleChange(e)}
              />
              <br />
              <span style={{ color: 'red' }}> {this.state.errors.email} </span>
            </div>
            <br />
            <div>
              <label> Password </label>
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={(e) => this.handleChange(e)}
              />
              <br />
              <span style={{ color: 'red' }}>
                {' '}
                {this.state.errors.password}{' '}
              </span>
            </div>
            <br />
            
            
            <div>
              <br />
              <label> Your address </label>
              <textarea 
                name="address"
                value={this.state.address}
                onChange={(e) => this.handleChange(e)}
                />
                <span style={{ color: 'red' }}> {this.state.errors.address} </span>
            </div>
            <br />
            <button type="submit" > Register </button> &nbsp;
            <button type="button" onClick={this.handleReset}>
              {' '}
              Reset
            </button>
          </form>
          Are you a member!!? Go to <a href="/">login</a>
        </div>
        </div>
      </>
    );
  }
}

export default RegistrationComponent;
