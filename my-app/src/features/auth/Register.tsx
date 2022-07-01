import { useForm } from "react-hook-form";
import useFetch from "use-http";

interface FormData {
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { post, response, loading, error } = useFetch(
    "http://localhost:8000/signup"
  );

  const onSubmit = async (data: FormData) => {
    const res = await post(data);
    console.log(res);
  };

  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email", { required: true })} />
        <input type="password" {...register("password", { required: true })} />
        {errors.email && <span>This field is required</span>}
        {errors.password && <span>This field is required</span>}
        <input type="submit" />
      </form>
    </div>
  );
};

export default Register;
