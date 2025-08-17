import { Authorization } from "@/feature/authorization";

export const LoginPage = () => {
  return (
    <div className="container">
      <h1>Welcome</h1>
      <div className="login__inner">
        <Authorization />
      </div>
    </div>
  );
};
