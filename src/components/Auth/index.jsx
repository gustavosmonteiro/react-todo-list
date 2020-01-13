import React, {useState} from 'react';
import {authenticateAPI} from '../../api/APIUtils';


export default () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const validateFields = () => {
        return !(login && password);
    }

    const manageSubmit = (event) => {
        authenticateAPI(login, password).then(
            (response) => {
                console.log(response);
                const myToken = response.data.result.token;
                localStorage.setItem("myToken", myToken);
            }
        ).catch(console.error);

        event.preventDefault();
    }

    return (
        <div>
            <form onSubmit={manageSubmit}>
                <div>
                    <span>Login:</span>
                    <input type="text" name="login" onChange={event => setLogin(event.target.value)}/>
                </div>
                <div>
                    <span>Password:</span>
                    <input type="password" name="password" onChange={event => setPassword(event.target.value)}/>
                </div>
                
                <div>
                    <button type="submit" disabled={validateFields()}>Sign in!</button>
                </div>
            </form>
        </div>
    );
}
