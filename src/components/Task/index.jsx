import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { getTasks, updateTask, deleteTask } from "../../api/APIUtils";
import NewTask from "./create";
import TaskItem from "../ListItem";

const Task = props => {
  const [refreshList, setRefreshList] = useState(true);
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    if (refreshList) {
      getTasks(props.projectId)
        .then(response => {
          console.log(response);
          setTaskList(response.data.result);
          setRefreshList(false);
        })
        .catch(console.error);
    }

    return () => {
      if (refreshList) {
        setRefreshList(false);
      }
    };
  }, [refreshList, props.projectId]);

  const toggleUpdateTaskMode = id => {
    const taskIndex = taskList.findIndex(task => task._id === id);
    taskList[taskIndex].editing = !taskList[taskIndex].editing;
    setTaskList([...taskList]);
  };

  const saveTask = (id, name) => {
    const taskIndex = taskList.findIndex(task => task._id === id);
    taskList[taskIndex].name = name;
    setTaskList([...taskList]);
    updateTask(id, name)
      .then(() => {
        setRefreshList(true);
        toggleUpdateTaskMode(id);
      })
      .catch(console.error);
  };

  const manageDeleteTask = id => {
    deleteTask(id)
      .then(() => setRefreshList(true))
      .catch(console.error);
  };

  return (
    <div>
        <ul>
            {taskList.map(task => (
            <li key={task._id}>
                <TaskItem
                item={task}
                id="_id"
                value="description"
                toggleItemEditing={toggleUpdateTaskMode}
                saveItem={saveTask}
                deleteItem={manageDeleteTask}
                />
            </li>
            ))}
        </ul>
        <NewTask setRefreshList={setRefreshList} projectId={props.projectId} />
    </div>
  );
};

export default withRouter(Task);
