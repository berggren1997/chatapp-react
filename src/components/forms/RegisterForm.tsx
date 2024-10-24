import { useForm } from "react-hook-form";
import { RegisterType } from "../../types/auth/authTypes";
import { Link, useNavigate } from "react-router-dom";
import { registerRequest } from "../../api/auth/register";

const RegisterForm = () => {
  const navigate = useNavigate();
  const submitForm = async (formValues: RegisterType) => {
    try {
      const data = await registerRequest(formValues);
      if (data.success) {
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };
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
    <div className="flex flex-col p-10 bg-[#2b2b2b] w-[380px] rounded-md">
      <div className="flex flex-col gap-5">
        <h2 className="font-semibold text-sm">ChatLink</h2>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-extrabold">Register</h1>
          <span className="text-sm text-zinc-400">
            Please create an account to continue.
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
            placeholder="Email"
            autoComplete="off"
            autoFocus
            className="bg-[#1e1e1e] w-full py-3 px-3 focus:outline-none rounded-md text-sm"
            {...register("email", {
              required: "Email must be provided.",
              minLength: {
                value: 5,
                message: "Email must be at least 5 characters long.",
              },
            })}
          />
          {errors.username?.message && (
            <label className="text-red-400 text-xs">
              {errors.username?.message}
            </label>
          )}
        </div>
        <div className="w-full mb-4">
          <input
            type="text"
            placeholder="Username"
            autoComplete="off"
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
        <div className="w-full mb-4">
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
        <div className="w-full">
          <input
            type="password"
            placeholder="Confirm Password"
            className="bg-[#1e1e1e] w-full py-3 px-3 focus:outline-none rounded-md text-sm"
            {...register("confirmPassword", {
              required: "Confirm password is a required field.",
              minLength: {
                value: 5,
                message: "Confirm password must match the 'Password' field.",
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
              Register
            </button>
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-zinc-400">Already have an account?</span>
            <Link className="underline text-blue-600" to="/login">
              Sign in
            </Link>
          </div>
        </div>
      </form>
    </div>

    // <form
    //   onSubmit={handleSubmit(submitForm)}
    //   className="flex flex-col gap-6 items-center w-[450px] h-[350px]"
    // >
    //   <div className="h-[52px] w-full">
    //     <input
    //       type="email"
    //       autoComplete="off"
    //       placeholder="Email"
    //       className="bg-[#2b2b2b] h-[52px] w-full p-4 focus:outline-none rounded-md"
    //       {...register("email", {
    //         required: "Email is a required field.",
    //         minLength: {
    //           value: 15,
    //           message: "Must be a valid email",
    //         },
    //       })}
    //     />
    //     {errors.email?.message && (
    //       <label className="text-red-500">{errors.email?.message}</label>
    //     )}
    //   </div>
    //   <div className="w-full h-[52px]">
    //     <input
    //       type="text"
    //       autoComplete="off"
    //       placeholder="Username"
    //       className="bg-[#2b2b2b] h-[52px] w-full p-4 focus:outline-none rounded-md"
    //       {...register("username", {
    //         required: "Username is a required field",
    //         minLength: {
    //           value: 5,
    //           message: "Username must be at least 5 characters",
    //         },
    //       })}
    //     />
    //     {errors.username?.message && (
    //       <label className="text-red-500">{errors.username?.message}</label>
    //     )}
    //   </div>

    //   <div className="flex flex-row gap-2 h-[52px]">
    //     <input
    //       type="password"
    //       placeholder="Password"
    //       className="bg-[#2b2b2b] h-[52px] w-full p-4 focus:outline-none rounded-md"
    //       {...register("password", {
    //         required: "Password is a required field.",
    //         minLength: {
    //           value: 5,
    //           message: "Password must be at least 5 characters long.",
    //         },
    //       })}
    //     />

    //     <input
    //       type="password"
    //       placeholder="Confirm password"
    //       className="bg-[#2b2b2b] h-[52px] w-full p-4 focus:outline-none rounded-md"
    //       {...register("confirmPassword", {
    //         required: "Confirm password is a required field.",
    //         minLength: {
    //           value: 5,
    //           message: "Confirm password must match the 'Password' field.",
    //         },
    //       })}
    //     />
    //   </div>

    //   <div className="w-full h-[52px]">
    //     <button
    //       type="submit"
    //       className="bg-[#0000FF] hover:bg-[#1414ff] w-full rounded-md p-3"
    //     >
    //       Create my Account
    //     </button>
    //   </div>
    //   <div className="flex gap-3">
    //     <span className="text-zinc-400">Already have an account?</span>
    //     <Link className="underline text-blue-600" to="/login">
    //       Sign in
    //     </Link>
    //   </div>
    // </form>
  );
};

export default RegisterForm;
