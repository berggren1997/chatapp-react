import { useForm } from "react-hook-form";
import { RegisterType } from "../../types/auth/authTypes";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>({
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
      className="flex flex-col gap-6 items-center w-[450px] h-[350px]"
    >
      <div className="h-[52px] w-full">
        <input
          type="email"
          autoComplete="off"
          placeholder="Email"
          className="bg-[#2b2b2b] h-[52px] w-full p-4 focus:outline-none rounded-md"
          {...register("email", {
            required: "Email is a required field.",
            minLength: {
              value: 15,
              message: "Must be a valid email",
            },
          })}
        />
        {errors.email?.message && (
          <label className="text-red-500">{errors.email?.message}</label>
        )}
      </div>
      <div className="w-full h-[52px]">
        <input
          type="text"
          autoComplete="off"
          placeholder="Username"
          className="bg-[#2b2b2b] h-[52px] w-full p-4 focus:outline-none rounded-md"
          {...register("username", {
            required: "Username is a required field",
            minLength: {
              value: 5,
              message: "Username must be at least 5 characters",
            },
          })}
        />
        {errors.username?.message && (
          <label className="text-red-500">{errors.username?.message}</label>
        )}
      </div>

      <div className="flex flex-row gap-2 h-[52px]">
        <input
          type="password"
          placeholder="Password"
          className="bg-[#2b2b2b] h-[52px] w-full p-4 focus:outline-none rounded-md"
          {...register("password", {
            required: "Password is a required field.",
            minLength: {
              value: 5,
              message: "Password must be at least 5 characters long.",
            },
          })}
        />

        <input
          type="password"
          placeholder="Confirm password"
          className="bg-[#2b2b2b] h-[52px] w-full p-4 focus:outline-none rounded-md"
          {...register("confirmPassword", {
            required: "Confirm password is a required field.",
            minLength: {
              value: 5,
              message: "Confirm password must match the 'Password' field.",
            },
          })}
        />
      </div>

      <div className="w-full h-[52px]">
        <button
          type="submit"
          className="bg-[#0000FF] hover:bg-[#1414ff] w-full rounded-md p-3"
        >
          Create my Account
        </button>
      </div>
      <div className="flex gap-3">
        <span className="text-zinc-400">Already have an account?</span>
        <Link className="underline text-blue-600" to="/login">
          Sign in
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
