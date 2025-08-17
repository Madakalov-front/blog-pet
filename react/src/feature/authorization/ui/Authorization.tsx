import { useAuthUserMutation } from "@/app/reducers";
import { useAuthorizationForm } from "@/feature/authorization/model";
import type { FormDataAuthorization } from "@/feature/authorization/model/useAuthorizationForm";
import { Button, Input } from "@/shared";
import { Spinner } from "@/shared/ui";
import { SuccessForm } from "@/shared/ui/success-form/SuccessForm";
import { isFetchBaseQueryError, setFirstSymUpperCase } from "@/shared/utils";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router";

export const Authorization = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    setFocus,
  } = useAuthorizationForm();

  const navigate = useNavigate();

  const [authUser, { data }] = useAuthUserMutation();
  useEffect(() => {
    setFocus("login");
  }, [setFocus]);

  const onSubmitWrapper = async (data: FormDataAuthorization) => {
    try {
      await authUser(data).unwrap();
      const timeout = setTimeout(() => {
        navigate("/");
      }, 1000);
      return () => clearTimeout(timeout);
    } catch (err: unknown) {
      if (isFetchBaseQueryError(err)) {
        const errorData = err.data as {
          type: keyof FormDataAuthorization;
          error: string;
        };
        setError(errorData.type, {
          type: "manual",
          message: errorData.error,
        });
      } else {
        setError("login", {
          type: "manual",
          message: "Неизвестная ошибка авторизации",
        });
      }
    }
  };

  return (
    <form
      className="form"
      autoComplete="off"
      onSubmit={handleSubmit(onSubmitWrapper)}
    >
      <Input
        {...register("login")}
        name="login"
        placeholder="Введите логин"
        errorText={errors.login?.message}
      />
      <Input
        type="password"
        {...register("password")}
        name="password"
        placeholder="Введите пароль"
        errorText={errors.password?.message}
      />
      <Button
        name="войти"
        type="submit"
        disabled={false}
        variant="submit"
        size="normal"
      />
      <div className="create-acc">
        <span>Нет аккаунта? - </span>
        <Link to={"/register"}>создать</Link>
      </div>
      {isSubmitting && <Spinner />}
      {data && data.user && (
        <SuccessForm
          text={`${setFirstSymUpperCase(data.user.login)}, вы авторизованы!`}
        />
      )}
    </form>
  );
};
