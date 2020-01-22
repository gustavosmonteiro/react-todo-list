import React, {useState} from 'react';
import {createTask} from '../../api/APIUtils';

export default (props) => {

    const [name, setName] = useState("");

    const validateFields = () => {
        return !name;
    }

    const manageSubmit = (event) => {
        createTask(name, props.projectId).then(
            (response) => {
                console.log(response);
                
                //Lifting state up
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
                    <span>Create a new task:</span>
                    <input type="text" name="name" value={name} onChange={event => setName(event.target.value)}/>
                </div>
                <div>
                    <button type="submit" disabled={validateFields()}>Create task</button>
                </div>
            </form>
        </div>
    )

}