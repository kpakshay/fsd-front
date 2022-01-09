import React from 'react';
import LoginComponent from './LoginComponent';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import ProductComponent from './ProductComponent';
import donorComponent from './donorComponent';
import RegistrationComponent from './regirationComponent';
function HomeComponent(props){
    return(
        <>
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={LoginComponent}></Route>
                        <Route exact path="/products" component={ProductComponent}></Route>
                        <Route exact path="/add" component={donorComponent}></Route>
                        <Route exact path="/register" component={RegistrationComponent}></Route>
                    </Switch>
                </BrowserRouter>
            </div>
        </>
    )
}

export default HomeComponent;