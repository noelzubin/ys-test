import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useFetch from "use-http";
import { UserContext } from "../../App";
import illustration from "./illustration.svg";
import s from "./index.module.sass";
import cx from "classnames";

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className={s.auth}>
      <div className={s.left}>
        <img src={illustration} alt="todo illustration" />
      </div>
      <div className={s.right}>
        <div className={s.headers}>
          <h3
            className={cx({ [s.active]: isLogin })}
            onClick={() => setIsLogin(true)}
          >
            Login
          </h3>
          <h3
            className={cx({ [s.active]: !isLogin })}
            onClick={() => setIsLogin(false)}
          >
            Signup
          </h3>
        </div>
        <div className={s.form}>{isLogin ? <LoginForm /> : <SignupForm />}</div>
      </div>
    </div>
  );
};

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const { post, response, loading, error } = useFetch("/login");

  const navigate = useNavigate();

  const [user, setUser] = useContext(UserContext);

  const onSubmit = async (data: LoginFormData) => {
    const res = await post(data);
    setUser(res);
    navigate("/app");
  };

  return (
    <div className={s.cont}>
      <div className={s.greet}>
        <h4>To continue</h4>
        <p>We need your Name & Email</p>
      </div>
      <div className={s.formCont}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            placeholder="Email"
            className={cx(s.input, { [s.error]: errors.email })}
            {...register("email", { required: true })}
          />
          {errors.email && <span>This field is required</span>}
          <input
            placeholder="Password"
            className={cx(s.input, { [s.error]: errors.password })}
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password && <span>This field is required</span>}
          <input className={s.btn} type="submit" value="Log In" />
        </form>
      </div>
    </div>
  );
};

interface SignupFormData {
  name: string;
  email: string;
  password: string;
}

const SignupForm: React.FC = () => {
  const { post, response, loading, error } = useFetch("/signup");

  const onSubmit = async (data: SignupFormData) => {
    const res = await post(data);
    console.log(res);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="Name"
        className={cx(s.input, { [s.error]: errors.name })}
        {...register("name", { required: true })}
      />
      {errors.name && <span>This field is required</span>}
      <input
        placeholder="Email"
        className={cx(s.input, { [s.error]: errors.email })}
        {...register("email", { required: true })}
      />
      {errors.email && <span>This field is required</span>}
      <input
        placeholder="Password"
        className={cx(s.input, { [s.error]: errors.password })}
        type="password"
        {...register("password", { required: true })}
      />
      {errors.password && <span>This field is required</span>}
      <input className={s.btn} type="submit" value="Sign up" />
    </form>
  );
};

export default Auth;
