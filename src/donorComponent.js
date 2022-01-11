import React from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import {AppBar, Toolbar, Button, IconButton, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

class donorComponent extends React.Component {
    constructor(props) {
        super();
        this.state = {
            bloodgroup: '',
            quantity: '',
            name: '',
            phone: ''

        }
    }
    render() {
        const handleSubmit = async (e) => {
            e.preventDefault();
            const token = await localStorage.getItem('token');
            var decodedToken = jwt.decode(token);
            console.log(decodedToken);
            if(decodedToken.exp*1000 <= Date.now()){
                this.props.history.push('/');
            }else{
                try {
                    var response = await axios.post(
                        'http://localhost:3001/users/addblood', {
                            bloodgroup: this.state.bloodgroup,
                        quantity: this.state.quantity,
                        name: this.state.name,
                        phone: this.state.phone},
                        {
                            headers: {
                                'access-token':token
                            },
                        
                    })
                    if (response.data) {
                        this.props.history.push('/product');
                        console.log(response);
                    }
                } catch (err) {
                    console.warn(err)
                }
            }
        }
        const home = () => {
            this.props.history.push('/product');
        }
        const logout = () => {
            localStorage.removeItem('token');
            this.props.history.push('/')
        }
        return (
            <>
            <AppBar position="static">
                             <Toolbar>
                             
                             <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                 Blood - Management
                             </Typography>
                             <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                             <Button color="inherit" onClick={home}>Home</Button>
                             </Typography>
                             <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                             <Button color="inherit">Add Donor</Button>
                             </Typography>
                             
                             {/* <ShoppingCartIcon /> */}
                             {/* <h3>{cart} </h3> */}
                             <Button color="inherit" onClick={logout}>Logout</Button>
                             </Toolbar>
                         </AppBar>
                <div className='main' style={{ padding: '20px' }}>
                    <h3>Add blood donor details</h3>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div>
                            <label>Blood group</label> &nbsp;
                            <input type="text" name="bloodgroup" value={this.state.bloodgroup}
                                onChange={(e) => this.setState({ bloodgroup: e.target.value })}></input>
                        </div> <br />
                        <div>
                            <label>quantity</label>  &nbsp;
                            <input type="number" name="quantity" value={this.state.quantity}
                                onChange={(e) => this.setState({ quantity: e.target.value })}></input>
                        </div> <br />
                        <div>
                            <label>Name</label> &nbsp;
                            <input type="text" name="name" value={this.state.name}
                                onChange={(e) => this.setState({ name: e.target.value })}></input>
                        </div> <br />
                        <div>
                            <label>Phone no.</label> &nbsp;
                            <input type="number" name="phone" value={this.state.phone}
                                onChange={(e) => this.setState({ phone: e.target.value })}></input>
                        </div> <br />
                        {/* <button onClick={this.props.history.push('/product')}>goback</button> */}
                        <button type="submit">Submit</button> <br /><br />
                    </form>
                </div>


            </>

        )
    }
}
export default donorComponent;