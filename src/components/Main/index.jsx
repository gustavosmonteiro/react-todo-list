import React from 'react';
import Auth from '../Auth';
import Dashboard from '../Dashboard';
import {isAuthenticated} from '../../api/APIUtils';
import {
    BrowserRouter as Router,
    Redirect,
    Route
} from "react-router-dom";

export default () => {
    return (
        <Router>
            <Route path="/login">
                <Auth/>
            </Route>
            <Route path="/" render={()=> (isAuthenticated() && <Dashboard/>) || <Redirect to="/login" />}/>
        </Router>
    );
}