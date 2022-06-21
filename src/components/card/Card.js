import React, { useEffect, useRef, useState } from "react";
import {
  CardContainer,
  CardWrapper,
  TaskWrapper,
  TaskInput,
  TaskList,
  TaskNavigation,
  TaskNavigationLeft,
  TaskNavigationCenter,
  TaskNavigationRight,
  TaskItem,
} from "./CardElements";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import { KeyboardArrowUp } from "@mui/icons-material";

const Card = () => {
  const [currentState, setCurrentState] = useState("All");
  const [openTasks, setOpenTasks] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [activeTasks, setActiveTasks] = useState([]);
  const [finishedTasks, setFinishedTasks] = useState([]);
  const [editing, setEditing] = useState(false);
  const newTask = useRef("");
  const editedTask = useRef("");

  useEffect(() => {
    let finished = tasks.filter((task) => task.finished === true);
    setFinishedTasks(finished);
    let active = tasks.filter((task) => task.finished === false);
    setActiveTasks(active);
  }, [tasks, currentState, tasks.finished]);

  const addTask = (e) => {
    if (!openTasks) {
      setOpenTasks(true);
    }
    if (e.key === "Enter" && newTask.current.value.length > 1) {
      let task = {
        id: tasks.length + 1,
        text: newTask.current.value,
        finished: false,
      };
      setTasks((t) => [...t, task]);
      newTask.current.value = "";
    }
  };

  const changeState = (state) => {
    setCurrentState(state);
  };

  const checkTask = (task, index) => {
    console.log(index);
    task.finished = !task.finished;
    if (task.finished) {
      setFinishedTasks((t) => [...t, task]);
      setActiveTasks(activeTasks.filter((t) => t !== task));
    } else {
      setActiveTasks((t) => [...t, task]);
      setFinishedTasks(finishedTasks.filter((t) => t !== task));
    }
  };
  const editTask = (task) => {
    if (editedTask.current.value.length > 1) {
      task.text = editedTask.current.value;
    }
    setEditing(false);
  };

  const deleteTask = (task, index) => {
    tasks.splice(index, 1);
    if (task.finished) {
      setFinishedTasks(finishedTasks.filter((t) => t !== task));
    } else {
      setActiveTasks(activeTasks.filter((t) => t !== task));
    }
    setEditing(false);
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => task.finished === false));
  };
  return (
    <CardContainer>
      <TaskInput>
        {!openTasks ? (
          <KeyboardArrowDownIcon
            className="icon"
            onClick={() => setOpenTasks(true)}
          />
        ) : (
          <KeyboardArrowUp
            className="icon"
            onClick={() => setOpenTasks(false)}
          />
        )}
        <input
          type="text"
          required
          name="new task"
          placeholder="What needs to be done?"
          onKeyDown={(e) => addTask(e)}
          ref={newTask}
          data-testid="input"
        />
      </TaskInput>
      {openTasks && (
        <TaskList data-testid="taskList">
          {currentState === "All" ? (
            <>
              {" "}
              {tasks.length <= 0 ? (
                <TaskItem data-testid="no tasks">
                  <p>No tasks yet</p>
                </TaskItem>
              ) : (
                tasks.map((task, index) => (
                  <TaskItem key={task.id}>
                    <div className="taskItemLeft">
                      {task.finished ? (
                        <CheckCircleOutlineIcon
                          className="icon"
                          onClick={() => checkTask(task, index)}
                        />
                      ) : (
                        <RadioButtonUncheckedIcon
                          data-testid="check"
                          className="icon"
                          onClick={() => checkTask(task, index)}
                        />
                      )}
                      {editing === task ? (
                        <input
                          type="text"
                          placeholder={`${task.text}`}
                          ref={editedTask}
                        />
                      ) : (
                        <p
                          data-testid="todoItem"
                          className={task.finished ? "finished" : "task"}
                        >
                          {`${task.text}`}
                        </p>
                      )}
                    </div>
                    {editing === task ? (
                      <div>
                        <SaveIcon
                          data-testid="save"
                          className="icon"
                          onClick={() => editTask(task)}
                        />
                        <DeleteOutlineIcon
                          data-testid="delete"
                          className="icon"
                          onClick={() => deleteTask(task, index)}
                        />
                      </div>
                    ) : (
                      <EditIcon
                        data-testid="edit"
                        className="icon"
                        onClick={() => setEditing(task)}
                      />
                    )}
                  </TaskItem>
                ))
              )}
            </>
          ) : (
            <>
              {currentState === false && activeTasks.length <= 0 ? (
                <TaskItem data-testid="active">
                  <p>No active tasks</p>
                </TaskItem>
              ) : currentState === true && finishedTasks.length <= 0 ? (
                <TaskItem data-testid="completed">
                  <p>No completed tasks</p>
                </TaskItem>
              ) : (
                tasks
                  .filter((t) => t.finished === currentState)
                  .map((task, index) => (
                    <TaskItem key={task.id}>
                      <div className="taskItemLeft">
                        {task.finished ? (
                          <CheckCircleOutlineIcon
                            className="icon"
                            onClick={() => checkTask(task)}
                          />
                        ) : (
                          <RadioButtonUncheckedIcon
                            className="icon"
                            onClick={() => checkTask(task)}
                          />
                        )}
                        {editing === task ? (
                          <input
                            type="text"
                            placeholder={`${task.text}`}
                            ref={editedTask}
                          />
                        ) : (
                          <p className={task.finished && "finished"}>
                            {task.text}
                          </p>
                        )}
                      </div>
                      {editing === task ? (
                        <div>
                          <SaveIcon
                            className="icon"
                            onClick={() => editTask(task)}
                          />
                          <DeleteOutlineIcon
                            className="icon"
                            onClick={() => deleteTask(task, index)}
                          />
                        </div>
                      ) : (
                        <EditIcon
                          className="icon"
                          onClick={() => setEditing(task)}
                        />
                      )}
                    </TaskItem>
                  ))
              )}
            </>
          )}
        </TaskList>
      )}
      <TaskNavigation>
        <TaskNavigationLeft data-testid="tasksLeft">
          {activeTasks.length} {activeTasks.length === 1 ? "item" : "items"}{" "}
          left
        </TaskNavigationLeft>
        <TaskNavigationCenter>
          <button
            className={currentState === "All" ? "selected" : "button"}
            onClick={() => changeState("All")}
          >
            All
          </button>
          <button
            className={!currentState ? "selected" : "button"}
            onClick={() => changeState(false)}
          >
            Active
          </button>
          <button
            className={currentState === true ? "selected" : "button"}
            onClick={() => changeState(true)}
          >
            Completed
          </button>
        </TaskNavigationCenter>
        <TaskNavigationRight>
          <button data-testid="clear" onClick={() => clearCompleted()}>
            Clear completed
          </button>
        </TaskNavigationRight>
      </TaskNavigation>
    </CardContainer>
  );
};

export default Card;
