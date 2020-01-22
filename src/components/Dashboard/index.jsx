import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { getProjects, updateProject, deleteProject } from "../../api/APIUtils";
import NewProject from "./create";
import ProjectItem from "../ListItem";
import Task from "../Task";

const Dashboard = props => {
  const [refreshList, setRefreshList] = useState(true);
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    if (refreshList) {
      getProjects()
        .then(response => {
          console.log(response);
          setProjectList(response.data.result);
          setRefreshList(false);
        })
        .catch(console.error);
    }

    return () => {
      if (refreshList) {
        setRefreshList(false);
      }
    };
  }, [refreshList]);

  const toggleUpdateProjectMode = id => {
    const projectIndex = projectList.findIndex(project => project._id === id);
    projectList[projectIndex].editing = !projectList[projectIndex].editing;
    setProjectList([...projectList]);
  };

  const saveProject = (id, name) => {
    const projectIndex = projectList.findIndex(project => project._id === id);
    projectList[projectIndex].name = name;
    setProjectList([...projectList]);
    updateProject(id, name)
      .then(() => {
        setRefreshList(true);
        toggleUpdateProjectMode(id);
      })
      .catch(console.error);
  };

  const manageDeleteProject = id => {
    deleteProject(id)
      .then(() => setRefreshList(true))
      .catch(console.error);
  };

  const logout = () => {
    localStorage.removeItem("myToken");
    props.history.push("/");
  };

  return (
    <div>
      Dashboard Page
      <div>
        <ul>
          {projectList.map(project => (
            <li key={project._id}>
              <ProjectItem
                item={project}
                id="_id"
                value="name"
                toggleItemEditing={toggleUpdateProjectMode}
                saveItem={saveProject}
                deleteItem={manageDeleteProject}
                render={(projectId)=><Task projectId={projectId} setRefreshList={setRefreshList}/>}
              />
            </li>
          ))}
        </ul>
      </div>
      <button onClick={logout}>Logout</button>
      <NewProject setRefreshList={setRefreshList} />
    </div>
  );
};

export default withRouter(Dashboard);
