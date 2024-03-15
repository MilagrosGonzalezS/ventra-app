import { useState, useEffect } from "react";
import { getEventTodo, getCreateTodo, deleteTask } from "../index.js";
function PlanificationEvent({ eventId }) {
  const [data, setData] = useState([]);
  const [taskValue, setTaskValue] = useState("");
  const [editMode, setEditMode] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getEventTodo(eventId);
        setData(response.data); // Actualiza el estado de las tareas con los datos de la respuesta
        console.log(data);
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
    setData(data.filter((el) => el.id !== nodeId));
    try {
      await deleteTask(eventId, task);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleSubmit = async (task) => {
    const id = generateId().toString();
    const complete = "false";
    setData([...data, { id, task, complete }]);
    setTaskValue("");
    try {
      await getCreateTodo(eventId, task);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleToggleComplete = (nodeId) => {
    setData(
      data.map((item) => {
        if (item.id === nodeId) {
          return {
            ...item,
            complete: item.complete === "true" ? "false" : "true",
          };
        }
        return item;
      })
    );
  };

  const handleTodoEdit = (todo) => {
    setTaskValue(todo.task);
    setEditMode(todo.nodeId);
  };

  const handleChangeText = (taskValue) => {
    setTaskValue(taskValue);
  };

  const handleTodoUpdate = (todo) => {
    const updatedTodos = data.map((item) => {
      if (item.id === todo.id) {
        return { ...item, task: todo.task };
      }
      return item;
    });
    setData(updatedTodos);
    setTaskValue("");
    setEditMode(0);
  };

  return (
    <div className="bg-graydarker p-2 rounded-lg mt-36 w-full">
      <h1 className="mb-2">Tareas a realizar</h1>
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
  );
}

function TodoList({ data, removeNode, toggleComplete, updateClass }) {
  return (
    <ul className="mb-2">
      {data.map((listItem) => (
        <TodoItem
          key={listItem.id}
          nodeId={listItem.id}
          task={listItem.task}
          complete={listItem.complete}
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
  complete,
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
    <li
      className={`flex gap-4 mb-4 ${complete === "true" ? "bg-green-100" : ""}`}
    >
      <span onClick={handleUpdateClass}>{task}</span>
      <div role="group">
        <button
          type="button"
          className="mx-2 px-1 bg-lime-600 rounded-md"
          onClick={handleToggleComplete}
        >
          &#x2713;
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
      onTaskUpdate({ id: editMode, task });
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
