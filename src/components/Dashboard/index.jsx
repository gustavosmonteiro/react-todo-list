import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {getProjects, updateProject, deleteProject} from '../../api/APIUtils';
import NewProject from './create';

const Dashboard = (props) => {

    const [refreshList, setRefreshList] = useState(true);
    const [projectList, setProjectList] = useState([]);
    const [projectName, setProjectName] = useState("");

    useEffect(() => {
        if (refreshList) {
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
                setRefreshList(false);
            }
        };
    }, [refreshList]);

    const toggleUpdateProjectMode = (id) => {
        const projectIndex = projectList.findIndex(project => project._id === id);
        setProjectName(projectList[projectIndex].name);
        projectList[projectIndex].editing = !projectList[projectIndex].editing;
        setProjectList([...projectList]);
    }

    const saveProject = (id, name) => {
        const projectIndex = projectList.findIndex(project => project._id === id);
        projectList[projectIndex].name = name;
        setProjectList([...projectList]);
        updateProject(id, name)
        .then(
            () => {
                setRefreshList(true);
                toggleUpdateProjectMode(id);
            }
        )
        .catch(console.error);
    }

    const manageDeleteProject = (id) => {
        deleteProject(id)
        .then(() => setRefreshList(true))
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
                            {(!project.editing && (
                                <div>
                                    {project.name}
                                    <button onClick={()=> toggleUpdateProjectMode(project._id)}>edit</button>
                                    <button onClick={()=> manageDeleteProject(project._id)}>x</button>
                                </div>
                            )) || (
                                <div>
                                    <input type="text" value = {projectName} onChange={event => setProjectName(event.target.value)}/>
                                    <button onClick={()=> saveProject(project._id, projectName)}>Save</button>
                                    <button onClick={()=> toggleUpdateProjectMode(project._id)}>Cancel</button>
                                </div>
                                )
                            }
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