import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {getProjects, deleteProject} from '../../api/APIUtils';
import NewProject from './create';

const Dashboard = (props) => {

    const [refreshList, setRefreshList] = useState(true);
    const [projectList, setProjectList] = useState([]);

    useEffect(() => {
        console.log("TCL: Dashboard -> refreshList", "useEffect");
        if (refreshList) {
            console.log("TCL: Dashboard -> refreshList", refreshList);
            //get Project from API
            getProjects().then(
                (response) => {
                    console.log(response);
                    setProjectList(response.data.result);
                    setRefreshList(false);
                }
            ).catch(console.error);
        }

        return () => {
            if (refreshList) {
                console.log("TCL: Dashboard -> refreshList", false);
                setRefreshList(false);
            }
        };
    }, [refreshList]);

    const manageUpdateProject = (id) => {
        //update
    }

    const manageDeleteProject = (id) => {
        deleteProject(id)
        .then(response => setRefreshList(true))
        .catch(console.error);
    }

    const logout = () => {
        localStorage.removeItem("myToken");
        props.history.push('/');
    }

    return (
        <div>
            Dashboard Page
            <div>
                <ul>
                    {projectList.map(project => (
                        <li key={project._id}>
                            {project.name}
                            <button onClick={()=> manageUpdateProject(project._id)}>edit</button>
                            <button onClick={()=> manageDeleteProject(project._id)}>x</button>
                        </li>
                    ))}
                </ul>
            </div>

            <button onClick={logout}>Logout</button>

            <NewProject setRefreshList={setRefreshList}/>

        </div>
    );
}

export default withRouter(Dashboard);