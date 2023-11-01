// import React from 'react'

function CreateEvent() {
  return (
    <>
      <div>Create Event</div>
      <div className="bg-opacity text-light p-8 rounded-3xl m-8">
        <form
          action="#"
          /*  @submit.prevent="handleSubmit" */
          className="flex flex-col lg:flex-row lg:items-center lg:justify-evenly"
        >
          <div>
            <label htmlFor="name">Nombre</label>
            <br />
            <input
              className="lg:w-auto"
              type="text"
              name="name"
              id="name"

              /*   v-model="form.name" */
            />
          </div>
          <div>
            <label htmlFor="description">Descripción</label>
            <br />
            <textarea
              className="bg-transparent border-solid border-b-2 border-t-0 border-l-0 border-r-0 border-lightblue mb-8 rounded-md w-full lg:w-auto"
              name="description"
              id="description"
              /*  v-model="form.description" */
            ></textarea>
          </div>
          <div>
            <label htmlFor="price">Precio</label>
            <br />
            <input
              className="lg:w-auto"
              type="number"
              name="price"
              id="price"

              /* v-model="form.price" */
            />
          </div>
          <div>
            <label htmlFor="date">Fecha del evento</label>
            <br />
            <input
              className="lg:w-auto"
              type="date"
              name="date"
              id="date"

              /*  v-model="form.date" */
            />
          </div>
          <but>Crear</but>
        </form>
        {/*     <p class="text-red-600">{{ errorAllRequired }}</p> */}
      </div>
    </>
  );
}

export default CreateEvent;
