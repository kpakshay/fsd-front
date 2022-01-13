import React, {useEffect, useState} from 'react';
import {AppBar, Box, Toolbar, Button, IconButton, Typography, Grid, Card, CardContent } from '@mui/material';
import './product.css'
import axios from 'axios';
import jwt from 'jsonwebtoken';
function ProductComponent(props){
    const [productList, setProductList] = useState([]);
    // const [cart, setCart] = useState(0);
    useEffect(async () => {
        const token = await localStorage.getItem('token');
        var decodedToken = jwt.decode(token);
        console.log(decodedToken);
        if(decodedToken.exp*1000 <= Date.now()){
            props.history.push('/')
        } else {console.log("hii");
            var response = await axios.get('https://fsd-bloodbank.herokuapp.com/users/getblood', 
            {
                
                headers: {
                    'access-token':token
                }
            })
            console.log(response);
            setProductList(response.data);
        }
    }, [])
    const logout = () => {
            localStorage.removeItem('token');
            props.history.push('/')
        }
        const add = () => {
            props.history.push('/add')
        }
    return(
                 <Box sx={{ flexGrow: 1 }}>
                         <AppBar position="static">
                             <Toolbar>
                             
                             <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
                                 Blood Bank
                             </Typography>
                             <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                 Home
                             </Typography>
                             <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                             <Button color="inherit" onClick={add}>Add Donor</Button>
                             </Typography>
                             
                             
                             <Button color="inherit" onClick={logout}>Logout</Button>
                             </Toolbar>
                         </AppBar>
                             
                             <div className='main' style={{padding: '25px'}}>
                                 <h2>AVAILABLE DONORS</h2>
                             <Grid container spacing={2}>
                                 {productList.map(row=> (
                                     <Grid item key={row._id}>
                                         <Card sx={{ width: 200 }}>
                                             <CardContent>
                                                 <Typography gutterBottom>
                                                 {row.bloodgroup}
                                                 </Typography>
                                                 <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                 Available Quantity: {row.quantity} unit
                                                 </Typography>
                                                 <Typography >
                                                 Name: {row.name}
                                                 </Typography>
                                                 <Typography variant="body2">
                                                 phone:{row.phone}
                                                 </Typography>
                                             </CardContent>
                                             
                                         </Card>
                                     </Grid>
                                 ))}
                             </Grid>
                             </div>
                         </Box>

    )}
    export default ProductComponent;
    

