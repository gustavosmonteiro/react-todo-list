import React, {useState} from 'react';
import {createProject} from '../../api/APIUtils';

export default (props) => {

    const [name, setName] = useState("");

    const validateFields = () => {
        return !name;
    }

    const manageSubmit = (event) => {
        createProject(name).then(
            (response) => {
                console.log(response);
                props.setRefreshList(true);
                setName("");
            }
        ).catch(console.error);

        event.preventDefault();
    }
    return (
        <div>
            <form onSubmit={manageSubmit}>
                <div>
                    <span>Create a new project:</span>
                    <input type="text" name="name" value={name} onChange={event => setName(event.target.value)}/>
                </div>
                <div>
                    <button type="submit" disabled={validateFields()}>Create project</button>
                </div>
            </form>
        </div>
    )

}