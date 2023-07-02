import { useForm } from "react-hook-form";
import { LoginType } from "../../types/auth/authTypes";
import { Link } from "react-router-dom";
const LoginForm = () => {
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
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
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
          {...register("password")}
        />
      </div>

      <div className="w-full">
        <button
          type="submit"
          className="bg-[#0000FF] hover:bg-[#1414ff] w-full rounded-md p-3"
        >
          Login
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
