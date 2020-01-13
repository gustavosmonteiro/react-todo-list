import React from 'react';
import {withRouter} from 'react-router-dom';

const Dashboard = (props) => {

    const logout = () => {
        localStorage.removeItem("myToken");
        props.history.push('/');
    }

    return (
        <div>
            Dashboard Page

            <button onClick={logout}>Logout</button>

        </div>
    );
}

export default withRouter(Dashboard);