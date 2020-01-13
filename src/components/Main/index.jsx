import React from 'react';
import Auth from '../Auth';
import Dashboard from '../Dashboard';

export default () => {

    let alreadyHasToken = localStorage.getItem("myToken");
    
    return (
        <div>
            {!alreadyHasToken && <Auth/>}
            {alreadyHasToken && <Dashboard/>}

        </div>
    );
}