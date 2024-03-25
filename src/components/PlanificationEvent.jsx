import { useState, useEffect } from "react";
import {
  getEventTodo,
  getCreateTodo,
  deleteTask,
  statusTask,
  editTask,
} from "../index.js";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure,
  Button,
} from "@nextui-org/react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import { format } from "date-fns";

function PlanificationEvent({ eventId, eventName }) {
  const [data, setData] = useState([]);
  const [taskValue, setTaskValue] = useState("");
  const [editMode, setEditMode] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dateTitle, setDateTitle] = useState("");
  const [dateDescription, setDateDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [eventModalContent, setEventModalContent] = useState(null);
  const {
    isOpen: isEventModalOpen,
    onOpen: onEventModalOpen,
    onClose: onEventModalClose,
  } = useDisclosure();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getEventTodo(eventId);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching event tasks:", error);
      }
    };
    fetchData();
  }, [eventId]);

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
            status: !item.status,
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

  const finishedTasks = data.filter((task) => task.status);
  const unfinishedTasks = data.filter((task) => !task.status);

  const handleDateSelection = (info) => {
    setSelectedDate(info.startStr);
    onOpen();
  };

  const handleModalClose = () => {
    onClose();
    setSelectedDate("");
    setDateTitle("");
    setDateDescription("");
    setStartTime("");
    setEndTime("");
  };

  const handleModalSubmit = () => {
    if (
      !selectedDate ||
      !dateTitle ||
      !dateDescription ||
      !startTime ||
      !endTime
    ) {
      console.error("Debe completar todos los campos para guardar el evento.");
      return;
    }

    const newEvent = {
      title: dateTitle,
      start: selectedDate + "T" + startTime,
      end: selectedDate + "T" + endTime,
      description: dateDescription,
    };

    setCalendarEvents([...calendarEvents, newEvent]);

    handleModalClose();
  };

  const handleChangeTime = (e) => {
    const { name, value } = e.target;
    if (name === "timeFrom") {
      setStartTime(value);
    } else if (name === "timeTo") {
      setEndTime(value);
    }
  };

  const formatDate = (date) => {
    if (!date) return "";
    return format(new Date(date), "dd-MM-yyyy");
  };

  const handleEventClick = (info) => {
    const event = info.event;
    console.log("Título:", event.title);
    console.log("Descripción:", event.extendedProps.description);
    console.log("Hora de inicio:", event.start);
    console.log("Hora final:", event.end);
    console.log("Fecha:", event.startStr);

    openEventModal(event);
  };

  const openEventModal = (event) => {
    setEventModalContent(event);
    onEventModalOpen();
  };

  const EventModal = () => {
    return (
      <Modal isOpen={isEventModalOpen} onClose={onEventModalClose}>
        <ModalContent>
          <ModalHeader>Detalle:</ModalHeader>
          {eventModalContent && (
            <div className="p-4">
              <p>Título: {eventModalContent.title}</p>
              <p>
                Fecha: {new Date(eventModalContent.start).toLocaleDateString()}
              </p>
              <p>
                Horario de Inicio:{" "}
                {new Date(eventModalContent.start).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p>
                Horario de Finalización:{" "}
                {new Date(eventModalContent.end).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>

              <p>Descripción: {eventModalContent.extendedProps.description}</p>
              {/* Agrega más detalles del evento según tus necesidades */}
            </div>
          )}
        </ModalContent>
        <ModalFooter>
          <Button onClick={onEventModalClose}>Cerrar</Button>
        </ModalFooter>
      </Modal>
    );
  };

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
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        firstDay={1}
        locales={[esLocale]}
        selectable={true}
        select={(info) => handleDateSelection(info)}
        events={calendarEvents}
        headerToolbar={{
          left: "",
          center: "title",
          right: "prev,next today",
        }}
        eventClick={handleEventClick}
        titleFormat={{
          year: "numeric",
          month: "long", // Esto mostrará el nombre del mes con la inicial en mayúscula
        }}
      />

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
        {/* Modal para agregar evento */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalContent className="px-4">
            <ModalHeader>Agendar Evento</ModalHeader>
            <p>Fecha seleccionada: {formatDate(selectedDate)}</p>
            <label htmlFor="dateTitle">Título</label>
            <input
              type="text"
              name="dateTitle"
              value={dateTitle}
              placeholder="Título del evento"
              className="w-full p-2 mb-4 rounded-md border-gray-400 border-2"
              onChange={(e) => setDateTitle(e.target.value)}
            />
            <label htmlFor="">Descripción</label>
            <input
              type="text"
              name="dateDescription"
              value={dateDescription}
              placeholder="Descripción del evento"
              className="w-full p-2 mb-4 rounded-md border-gray-400 border-2"
              onChange={(e) => setDateDescription(e.target.value)}
            />
            <label htmlFor="timeFrom">Hora desde</label>
            <input
              name="timeFrom"
              type="time"
              value={startTime}
              onChange={handleChangeTime}
              className="w-full p-2 mb-4 rounded-md border-gray-400 border-2"
            />
            <label htmlFor="timeTo">Hora hasta</label>
            <input
              name="timeTo"
              type="time"
              value={endTime}
              onChange={handleChangeTime}
              className="w-full p-2 mb-4 rounded-md border-gray-400 border-2"
            />

            <ModalFooter>
              <button
                onClick={onClose}
                className="text-light bg-graylighter px-4 py-2 rounded-md mr-2"
              >
                Cancelar
              </button>
              <button
                onClick={handleModalSubmit}
                className="text-light bg-lightblue px-4 py-2 rounded-md"
              >
                Agendar
              </button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        {/* modal para mostrar evento de calendario */}
        <EventModal />
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
