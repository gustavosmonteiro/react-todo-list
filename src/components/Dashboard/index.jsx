import React from 'react';

export default () => {

    const logout = () => {
        localStorage.removeItem("myToken");
        window.location.reload();
    }

    return (
        <div>
            Dashboard Page

            <button onClick={logout} >Logout</button>

        </div>
    );
}