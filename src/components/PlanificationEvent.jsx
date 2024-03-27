import { useState, useEffect } from "react";
import {
  getEventTodo,
  createTodo,
  deleteTask,
  statusTask,
  editTask,
  createDate,
  getDate,
  deleteDate,
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
  //States de fullcalendar
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dateTitle, setDateTitle] = useState("");
  const [dateDescription, setDateDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedColor, setSelectedColor] = useState("#003AB8");
  const [eventModalContent, setEventModalContent] = useState(null);
  const [eventToDelete, setEventToDelete] = useState("");
  const [editDate, setEditDate] = useState(false);

  const {
    isOpen: isEventModalOpen,
    onOpen: onEventModalOpen,
    onClose: onEventModalClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure();
  const calendarValidRange = {
    start: new Date(),
  };
  const fetchTask = async () => {
    try {
      const response = await getEventTodo(eventId);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching event tasks:", error);
    }
  };
  useEffect(() => {
    fetchTask();
  }, [eventId]);

  const handleSubmit = async (task) => {
    fetchTask();
    const _id = generateId().toString();
    const status = "false";
    setData([...data, { _id, task, status }]);
    setTaskValue("");
    try {
      await createTodo(eventId, task);
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

  //Funciones de fullcalendar
  //traer las fechas agendadas
  const fetchDate = async () => {
    try {
      const response = await getDate(eventId);
      const eventsWithId = response.data.map((date) => ({
        title: date.title,
        start: date.startDate,
        end: date.endDate,
        description: date.description,
        color: date.color,
        id: date._id,
      }));
      setCalendarEvents(eventsWithId);
    } catch (error) {
      console.error("Error al obtener las fechas:", error);
    }
  };
  useEffect(() => {
    fetchDate();
  }, [eventId]);

  const generateId = () => {
    return Math.floor(Math.random() * 90000) + 10000;
  };
  console.log("calendarEvents", calendarEvents);
  const handleNodeRemoval = async (nodeId) => {
    setData(data.filter((el) => el._id !== nodeId));
    try {
      await deleteTask(nodeId);
    } catch (error) {
      console.log(error.response.data);
    }
  };

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
  //Crear la dateCalendar
  const handleModalSubmit = async () => {
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
    const startDate = selectedDate + "T" + startTime;
    const endDate = selectedDate + "T" + endTime;
    const newEvent = {
      title: dateTitle,
      start: startDate,
      end: endDate,
      description: dateDescription,
      color: selectedColor, // Agregar el color seleccionado al evento
    };

    await createDate(
      eventId,
      dateTitle,
      dateDescription,
      selectedColor,
      startDate,
      endDate
    );
    fetchDate();
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
  //Abrir detalle date
  const handleEventClick = (info) => {
    const event = info.event;
    console.log(event);
    openEventModal(event);
  };

  const openEventModal = (event) => {
    setEventModalContent(event);
    onEventModalOpen();
  };

  //Eliminar Date
  const handleDeleteDate = async (id) => {
    onDeleteModalOpen(); // Abrir la modal de eliminación cuando se quiere eliminar un evento
    setEventToDelete(id);
  };
  //Confirmar eliminacion
  const handleDeleteConfirmation = async () => {
    deleteDate(eventToDelete);
    setCalendarEvents(
      calendarEvents.filter((event) => event.id !== eventToDelete)
    );
    onDeleteModalClose();
    onEventModalClose();
  };
  //Editar Date
  const handleCloseEventModal = () => {
    onEventModalClose(); // Cierra la modal de evento
    setEditDate(false); // Restablece editDate a false
  };
  //Modal de detalle del evento
  const EventModal = () => {
    return (
      <Modal isOpen={isEventModalOpen} onClose={handleCloseEventModal}>
        {!editDate ? (
          <ModalContent>
            <ModalHeader>Detalle:</ModalHeader>
            {eventModalContent && (
              <div className="p-4">
                <div className="flex flex-col w-11/12 my-2">
                  <p>Título:</p>
                  <p> {eventModalContent.title}</p>
                </div>
                <div className="flex flex-col w-11/12 my-2">
                  <p>Fecha:</p>
                  <p>
                    {" "}
                    {new Date(eventModalContent.start).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex flex-col w-11/12 my-2">
                  <p>Horario de Inicio:</p>
                  <p>
                    {" "}
                    {new Date(eventModalContent.start).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                <div className="flex flex-col w-11/12 my-2">
                  <p>Horario de Finalización:</p>
                  <p>
                    {" "}
                    {new Date(eventModalContent.end).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                <div className="flex flex-col w-11/12 my-2">
                  <p>Descripción:</p>
                  <p>{eventModalContent.extendedProps.description}</p>
                </div>
              </div>
            )}
            <ModalFooter>
              <Button
                className="bg-red-600"
                onClick={() =>
                  eventModalContent?.id &&
                  handleDeleteDate(eventModalContent.id)
                }
              >
                Eliminar
              </Button>
              <Button className="bg-orange" onClick={() => setEditDate(true)}>
                Editar
              </Button>
            </ModalFooter>
          </ModalContent>
        ) : (
          <ModalContent>
            <ModalHeader>Detalle:</ModalHeader>
            {eventModalContent && (
              <div className="p-4">
                <div className="flex flex-col w-11/12 my-2 gap-y-1">
                  <label>Título: </label>
                  <input
                    className="rounded-md p-1 border-1 border-gray-400"
                    type="text"
                    defaultValue={eventModalContent.title}
                  />
                </div>
                <div className="flex flex-col w-11/12 my-2 gap-y-1">
                  <label>Fecha: </label>
                  <input
                    className="rounded-md p-1 border-1 border-gray-400"
                    type="date"
                    defaultValue={new Date(eventModalContent.start)
                      .toISOString()
                      .slice(0, 10)}
                  />
                </div>
                <div className="flex flex-col w-11/12 my-2 gap-y-1">
                  <label htmlFor="">Horario de Inicio:</label>
                  <input
                    className="rounded-md p-1 border-1 border-gray-400"
                    type="time"
                    defaultValue={new Date(
                      eventModalContent.start
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  />
                </div>
                <div className="flex flex-col w-11/12 my-2 gap-y-1">
                  <label htmlFor="">Horario de Finalización:</label>
                  <input
                    className="rounded-md p-1 border-1 border-gray-400"
                    type="time"
                    defaultValue={new Date(
                      eventModalContent.end
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  />
                </div>
                <div className="flex flex-col w-11/12 my-2 gap-y-1">
                  <label htmlFor=""> Descripción:</label>
                  <input
                    className="rounded-md p-1 border-1 border-gray-400"
                    type="text"
                    defaultValue={eventModalContent.extendedProps.description}
                  />
                </div>
              </div>
            )}
            <ModalFooter>
              <Button className="bg-red-600" onClick={() => setEditDate(false)}>
                No editar
              </Button>
              <Button className="bg-orange" onClick={onEventModalClose}>
                Guardar Cambios
              </Button>
            </ModalFooter>
          </ModalContent>
        )}
      </Modal>
    );
  };

  //Modal para eliminar date
  const DeleteConfirmationModal = () => {
    return (
      <Modal isOpen={isDeleteModalOpen} onClose={onDeleteModalClose}>
        <ModalContent>
          <ModalHeader>Eliminar Evento</ModalHeader>
          <p>¿Estás seguro de que deseas eliminar este evento?</p>

          <ModalFooter>
            <Button className="bg-red-600" onClick={handleDeleteConfirmation}>
              Sí, eliminar
            </Button>
            <Button onClick={onDeleteModalClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
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
        validRange={calendarValidRange}
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
              className="w-full p-2 mb-4 rounded-md border-gray-400 border-2 mt-1"
              onChange={(e) => setDateTitle(e.target.value)}
            />
            <label htmlFor="">Descripción</label>
            <input
              type="text"
              name="dateDescription"
              value={dateDescription}
              placeholder="Descripción del evento"
              className="w-full p-2 mb-4 rounded-md border-gray-400 border-2 mt-1"
              onChange={(e) => setDateDescription(e.target.value)}
            />
            <label htmlFor="timeFrom">Hora desde</label>
            <input
              name="timeFrom"
              type="time"
              value={startTime}
              onChange={handleChangeTime}
              className="w-full p-2 mb-4 rounded-md border-gray-400 border-2 mt-1"
            />
            <label htmlFor="timeTo">Hora hasta</label>
            <input
              name="timeTo"
              type="time"
              value={endTime}
              onChange={handleChangeTime}
              className="w-full p-2 mb-4 rounded-md border-gray-400 border-2 mt-1"
            />
            <label htmlFor="">Elija un color de etiqueta</label>
            <select
              className="w-full p-2 mb-4 rounded-md border-gray-400 border-2 mt-1"
              name="dateColor"
              id="dateColor"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
            >
              <option value="#003AB8">Azul</option>
              <option value="#92FF04">Verde</option>
              <option value="#8906f4">Violeta</option>
              <option value="#FAF60B">Amarillo</option>
              <option value="#f9700b">Naranja</option>
              <option value="#D42424">Rojo</option>
            </select>

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
        {/* modal para confirmar eliminar evento decalendario */}
        <DeleteConfirmationModal />
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
