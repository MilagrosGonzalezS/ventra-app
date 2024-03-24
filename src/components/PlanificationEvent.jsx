import { useState, useEffect } from "react";
import {
  getEventTodo,
  getCreateTodo,
  deleteTask,
  statusTask,
  editTask,
} from "../index.js";
function PlanificationEvent({ eventId, eventName }) {
  const [data, setData] = useState([]);
  const [taskValue, setTaskValue] = useState("");
  const [editMode, setEditMode] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getEventTodo(eventId);
        console.log(response.data);
        setData(response.data); // Actualiza el estado de las tareas con los datos de la respuesta
      } catch (error) {
        console.error("Error fetching event tasks:", error);
      }
    };

    fetchData(); // Llama a la función fetchData para obtener las tareas del evento
  }, [eventId]); // Agrega eventId como dependencia para que el efecto se vuelva a ejecutar cuando cambie

  const generateId = () => {
    return Math.floor(Math.random() * 90000) + 10000;
  };

  const handleNodeRemoval = async (nodeId) => {
    setData(data.filter((el) => el._id !== nodeId));
    try {
      await deleteTask(nodeId);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleSubmit = async (task) => {
    const _id = generateId().toString();
    const status = "false";
    setData([...data, { _id, task, status }]);
    setTaskValue("");
    try {
      await getCreateTodo(eventId, task);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleToggleComplete = async (nodeId) => {
    setData(
      data.map((item) => {
        if (item._id === nodeId) {
          return {
            ...item,
            status: item.status === true ? false : true,
          };
        }
        return item;
      })
    );
    try {
      await statusTask(nodeId);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleTodoEdit = (todo) => {
    setTaskValue(todo.task);
    setEditMode(todo.nodeId);
  };

  const handleChangeText = (taskValue) => {
    setTaskValue(taskValue);
  };

  const handleTodoUpdate = async (todo) => {
    const updatedTodos = data.map((item) => {
      if (item._id === todo._id) {
        return { ...item, task: todo.task };
      }
      return item;
    });
    setData(updatedTodos);

    setTaskValue("");
    setEditMode(0);
    try {
      await editTask(todo._id, todo.task);
    } catch (error) {
      console.log("Error updating task:", error);
    }
  };
  const finishedTasks = data.filter((task) => task.status === true);
  const unfinishedTasks = data.filter((task) => task.status === false);
  return (
    <div>
      <div className="w-full mt-28 grid grid-cols-12 gap-10">
        <div className="col-span-3 bg-dark rounded-3xl h-fit py-4 px-8">
          <p className="text-5xl mb-4">{data.length}</p>
          <p>Tareas</p>
        </div>
        <div className="col-span-3 bg-dark rounded-3xl h-fit py-4 px-8">
          <p className="text-5xl mb-4">{finishedTasks.length}</p>
          <p>Terminadas</p>
        </div>
        <div className="col-span-3 bg-dark rounded-3xl h-fit py-4 px-8">
          <p className="text-5xl mb-4">{unfinishedTasks.length}</p>
          <p>Sin terminar</p>
        </div>
      </div>
      <div className="bg-graydarker p-2 rounded-lg mt-4 w-full">
        <h1 className="text-3xl">{eventName}</h1>
        <h2 className="mb-2">Tareas a realizar</h2>
        <TodoList
          data={data}
          removeNode={handleNodeRemoval}
          toggleComplete={handleToggleComplete}
          updateClass={handleTodoEdit}
        />
        <TodoForm
          taskValue={taskValue}
          editMode={editMode}
          changeText={handleChangeText}
          onTaskUpdate={handleTodoUpdate}
          onTaskSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

function TodoList({ data, removeNode, toggleComplete, updateClass }) {
  return (
    <ul className="mb-2">
      {data.map((listItem) => (
        <TodoItem
          key={listItem._id}
          nodeId={listItem._id}
          task={listItem.task}
          status={listItem.status}
          removeNode={removeNode}
          toggleComplete={toggleComplete}
          updateClass={updateClass}
        />
      ))}
    </ul>
  );
}

function TodoItem({
  nodeId,
  task,
  status,
  removeNode,
  toggleComplete,
  updateClass,
}) {
  const handleToggleComplete = (e) => {
    e.preventDefault();
    toggleComplete(nodeId);
  };

  const handleRemoveNode = (e) => {
    e.preventDefault();
    removeNode(nodeId);
  };

  const handleUpdateClass = (e) => {
    e.preventDefault();
    updateClass({ nodeId, task });
  };

  return (
    <li className={`flex gap-4 mb-4  ${status === true ? "bg-lime-800" : ""}`}>
      <span onClick={handleUpdateClass}>{task}</span>
      <div role="group">
        <button
          type="button"
          className="mx-2 px-1 bg-lime-600 rounded-md"
          onClick={handleToggleComplete}
        >
          {status === true ? "-" : "\u2713"}
        </button>
        <button
          type="button"
          className="bg-graylighter px-2 rounded-md"
          onClick={handleUpdateClass}
        >
          Editar
        </button>
        <button
          type="button"
          className="mx-2 px-1 bg-red-700 rounded-md"
          onClick={handleRemoveNode}
        >
          &#xff38;
        </button>
      </div>
    </li>
  );
}

function TodoForm({
  taskValue,
  editMode,
  changeText,
  onTaskUpdate,
  onTaskSubmit,
}) {
  const doSubmit = (e) => {
    e.preventDefault();
    const task = taskValue.trim();
    if (!task) return;
    if (editMode) {
      onTaskUpdate({ _id: editMode, task });
    } else {
      onTaskSubmit(task);
    }
  };

  const onChange = (e) => {
    changeText(e.target.value);
  };

  return (
    <div className="">
      <hr />
      <div className="">
        <form className="mt-2" onSubmit={doSubmit}>
          <div className="">
            <label htmlFor="task" className="col-md-2 control-label">
              Creá tu tarea
            </label>
            <div className="col-md-8">
              <input
                type="text"
                onChange={onChange}
                value={taskValue}
                id="task"
                className="p-2 text-light"
                placeholder="¿Qué tenés que hacer?"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-8 col-md-offset-2 text-right">
              <input
                type="submit"
                value="Guardar"
                className="bg-orange p-2 rounded-md"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export { PlanificationEvent };
