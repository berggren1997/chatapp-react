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
    <div className="flex flex-col p-10 bg-[#2b2b2b] w-[380px] rounded-md">
      <div className="flex flex-col gap-5">
        <h2 className="font-semibold text-sm">ChatLink</h2>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-extrabold">Sign in</h1>
          <span className="text-sm text-zinc-400">
            Please sign in to continue.
          </span>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(submitForm)}
        className="flex flex-col items-center mt-8"
      >
        <div className="w-full mb-4">
          <input
            type="text"
            placeholder="Username"
            autoComplete="off"
            autoFocus
            className="bg-[#1e1e1e] w-full py-3 px-3 focus:outline-none rounded-md text-sm"
            {...register("username", {
              required: "Username must be provided.",
              minLength: {
                value: 5,
                message: "Username must be at least 5 characters long.",
              },
            })}
          />
          {errors.username?.message && (
            <label className="text-red-400 text-xs">
              {errors.username?.message}
            </label>
          )}
        </div>
        <div className="w-full">
          <input
            type="password"
            placeholder="Password"
            className="bg-[#1e1e1e] w-full py-3 px-3 focus:outline-none rounded-md text-sm"
            {...register("password", {
              required: "Password must be provided.",
              minLength: {
                value: 5,
                message: "Password must be at least 5 characters long.",
              },
            })}
          />
          {errors.password?.message && (
            <label className="text-red-400 text-xs">
              {errors.password?.message}
            </label>
          )}
        </div>
        <div className="w-full mt-10 flex flex-col gap-4">
          <div className="w-full mt-1">
            <button
              type="submit"
              className="bg-[#0000FF] hover:bg-[#1414ff] w-full rounded-md py-2 font-semibold"
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-zinc-400">Don't have an account?</span>
            <Link className="underline text-blue-600" to="/register">
              Register
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
