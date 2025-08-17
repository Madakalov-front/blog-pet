import { useRegisterForm } from "@/feature/registerUser/model";
import { Button, Input } from "@/shared";
import { Spinner } from "@/shared/ui";
import { useEffect, useState } from "react";
import type { FormDataRegister } from "@/feature/registerUser/model/useRegisterForm";
import { SuccessForm } from "@/shared/ui/success-form/SuccessForm";

import styles from "./RegisterUser.module.scss";
import { useRegisterUserMutation } from "@/app/reducers";

export const RegisterUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
    setFocus,
  } = useRegisterForm();

  const [successForm, setSuccessForm] = useState<boolean>(false);
  const [registerUser] = useRegisterUserMutation();
  useEffect(() => {
    setFocus("username");
    if (isSubmitSuccessful) {
      setSuccessForm(true);
      reset();
    }
  }, [isSubmitSuccessful, reset]);
  const onSubmitWrapper = async (data: FormDataRegister) => {
    try {
      await registerUser({ login: data.username, password: data.password });
    } catch (error) {
      console.error(error);
    }
  };
  // onSubmitCreateUser(data, setError, reset);

  return (
    <>
      <div className={styles["register-user"]}>
        <form
          onSubmit={handleSubmit(onSubmitWrapper)}
          className="form"
          autoComplete="off"
        >
          <Input
            {...register("username")}
            type="text"
            name="username"
            errorText={errors.username?.message}
            placeholder="Придумайте логин"
          />
          <Input
            {...register("password")}
            type="password"
            name="password"
            placeholder="Создайте пароль"
            errorText={errors.password?.message}
          />
          <Input
            {...register("confirmPassword")}
            type="password"
            name="confirmPassword"
            placeholder="Повторите пароль"
            errorText={errors.confirmPassword?.message}
          />
          <Button
            name="создать"
            type="submit"
            disabled={Object.keys(errors).length > 0 || isSubmitting}
            variant="submit"
            size="normal"
          />
          {isSubmitting && <Spinner />}
          {successForm && <SuccessForm text="Регистрация прошла успешно!" />}
        </form>
      </div>
    </>
  );
};
