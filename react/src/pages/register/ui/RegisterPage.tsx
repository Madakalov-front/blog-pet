import { RegisterUser } from "@/feature/registerUser";

export const RegisterPage = () => {
  return (
    <div className="container">
      <div className="register-page__inner">
        <h1>Регистрация</h1>
        <RegisterUser />
      </div>
    </div>
  );
};
