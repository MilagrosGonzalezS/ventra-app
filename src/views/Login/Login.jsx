// import React from 'react'
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data, event) => {
    event.preventDefault();

    try {
      console.log(data); // Log the form data
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border rounded-2xl bg-opacity p-8 w-1/3 mt-48 mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email" className="text-xs xl:text-base">
          Email
        </label>
        <br></br>
        <input
          className="bg-transparent p-2 border-lightblue border-2 rounded-xl mt-4 w-full mb-6"
          {...register("email", { required: true })}
          id="email"
          name="email"
          type="email"
        />
        {errors.email && (
          <span className="text-sm huge:text-base text-red-800 block text-right">
            Campo obligatorio
          </span>
        )}
        <br></br>
        <label htmlFor="password" className="text-xs xl:text-base">
          Contraseña
        </label>
        <br></br>
        <input
          className="bg-transparent p-2 border-lightblue border-2 rounded-xl mt-4 w-full mb-6"
          {...register("message", { required: true })}
          id="password"
          name="password"
          type="password"
        />
        {errors.message && (
          <span className="text-sm huge:text-base text-red-800 block text-right">
            Campo obligatorio
          </span>
        )}
        <br></br>

        <button
          className="transition hover:bg-hover block mx-auto mt-4 bg-lightblue text-white py-2 px-10 text-xs xl:text-base rounded-xl cursor-pointer"
          type="submit"
        >
          Ingresar
        </button>
        <Link
          to="/registrarse"
          className="mx-auto text-lightblue hover:text-light"
        >
          Registrarme
        </Link>
      </form>
    </div>
  );
}

export default Login;
