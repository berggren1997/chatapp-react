import { useForm } from "react-hook-form";
import { LoginType } from "../../types/auth/authTypes";
import { Link, useNavigate } from "react-router-dom";
import { loginRequest } from "../../api/auth/login";
import { useState } from "react";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const callToast = (message: any) => {
    toast.error(message, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
  };

  const submitForm = async (formValues: LoginType) => {
    setLoading(true);
    const data = await loginRequest(formValues);
    console.log(data);
    if (!data.success) {
      if (data.errorMessage) {
        callToast(data.errorMessage);
      } else if (data.errors) {
        Object.values(data.errors).map((item: any) => {
          console.log(item);
          callToast(item[0]);
        });
      }
      setLoading(false);
      return;
    }
    setLoading(false);
    navigate("/conversations");
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="flex flex-col gap-6 items-center w-[450px] h-[350px]"
    >
      <div className="h-[52px] w-full mb-4">
        <input
          type="text"
          placeholder="Username"
          autoComplete="off"
          className="bg-[#2b2b2b] w-full p-4 focus:outline-none rounded-md"
          {...register("username", {
            required: "Username must be provided.",
            minLength: {
              value: 5,
              message: "Username must be at least 5 characters long.",
            },
          })}
        />
        {errors.username?.message && (
          <label className="text-red-500">{errors.username?.message}</label>
        )}
      </div>
      <div className="h-[52px] w-full">
        <input
          type="password"
          placeholder="Password"
          className="bg-[#2b2b2b] h-[52px] w-full p-4 focus:outline-none rounded-md"
          {...register("password", {
            required: "Password must be provided.",
            minLength: {
              value: 5,
              message: "Password must be at least 5 characters long.",
            },
          })}
        />
        {errors.password?.message && (
          <label className="text-red-500">{errors.password?.message}</label>
        )}
      </div>
      <div className="w-full mt-1">
        <button
          type="submit"
          className="bg-[#0000FF] hover:bg-[#1414ff] w-full rounded-md p-3"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </div>
      <div className="flex gap-3">
        <span className="text-zinc-400">Don't have an account?</span>
        <Link className="underline text-blue-600" to="/register">
          Register
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
