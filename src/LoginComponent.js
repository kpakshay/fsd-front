import React from 'react';
import axios from 'axios';
import './login.css';

class LoginComponent extends React.Component{
    constructor(props){
        super();
        this.state = {
            email: '',
            password: ''
        }
    }
    render(){
        const handleSubmit = async (e) => {
            e.preventDefault();
            try{
                var response = await axios.post(
                'https://fsd-bloodbank.herokuapp.com/register/login', {
                    password: this.state.password,
                    email: this.state.email
                })
                if(response.data) {
                    await localStorage.setItem('token', response.data);
                    this.props.history.push('/products');
                    console.log(response);
                }
            } catch (err) {
                console.warn(err)
            }
        }
        return(
            <div className="form">
                 <h2>Welcome!!</h2>
                <div style={{padding:'20px'}} className="input-container">
                   
                    <form id="ff">
                        <div>
                            <label>Email</label> &nbsp;
                            <input type="email" name="email" value={this.state.email} 
                            onChange={(e)=> this.setState({email: e.target.value})}></input>
                        </div> <br/>
                        <div>
                            <label>Password</label>  &nbsp;
                            <input type="password" name="password" value={this.state.password} 
                            onChange={(e)=> this.setState({password: e.target.value})}></input>
                        </div> <br/>
                        <div className="button-container">
                        <button type="submit" onClick={(e)=>handleSubmit(e)}>LOG IN</button> <br/>
                        </div>
                    </form>
                    NOt a member!!? Register <a href="/register">here</a>
                </div>
            </div>

    // <div>
    //             <div style={{padding:'20px'}}>
    //                 <h3>Login Component</h3>
    //                 <form onSubmit={(e)=>handleSubmit(e)}>
    //                     <div>
    //                         <label>Email</label> &nbsp;
    //                         <input type="email" name="email" value={this.state.email} 
    //                         onChange={(e)=> this.setState({email: e.target.value})}></input>
    //                     </div> <br/>
    //                     <div>
    //                         <label>Password</label>  &nbsp;
    //                         <input type="password" name="password" value={this.state.password} 
    //                         onChange={(e)=> this.setState({password: e.target.value})}></input>
    //                     </div> <br/>
    //                     <button type="submit">LOG IN</button> <br/>
    //                 </form>
    //                 NOt a member!!? Register <a href="/register">here</a>
    //             </div>
    //         </div>

        )
    }
}

export default LoginComponent;