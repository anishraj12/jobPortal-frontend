import {
  Button,
  LoadingOverlay,
  PasswordInput,
  rem,
  TextInput,
} from "@mantine/core";
import { IconAt, IconCheck, IconLock, IconX } from "@tabler/icons-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginValidation } from "../Services/FormValidation";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import ResetPassword from "./ResetPassword";
import { useDispatch } from "react-redux";
import { setUser } from "../Slices/UserSlice";
import { setJwt } from "../Slices/JwtSlice";
import { loginUser } from "../Services/AuthService";
import { jwtDecode } from "jwt-decode";

function Login() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const form = {
    email: "",
    password: "",
  };

  const [data, setData] = useState<{ [key: string]: string }>(form);
  const [formError, setFormError] = useState<{ [key: string]: string }>(form);
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const handleChange = (event: any) => {
    setFormError({ ...formError, [event.target.name]: "" });
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    let valid = true,
      newFormError: { [key: string]: string } = {};
    for (let key in data) {
      newFormError[key] = loginValidation(key, data[key]);
      if (newFormError[key]) valid = false;
    }
    setFormError(newFormError);
    if (valid === true) {
      setLoading(true);
      loginUser(data)
        .then((res) => {
          console.log(res);
          notifications.show({
            title: "Login Successfull",
            message: "Redirecting to Home Page....",
            withCloseButton: true,
            icon: (
              <IconCheck style={{ width: "90%", height: "90%" }}></IconCheck>
            ),
            color: "teal",
            withBorder: true,
            className: "!border-green-500",
          });
          dispatch(setJwt(res.jwt));
          const decoded = jwtDecode(res.jwt);
          dispatch(setUser({ ...decoded, email: decoded.sub }));

          setTimeout(() => {
            // setLoading(false);

            navigate("/");
          }, 4000);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          notifications.show({
            title: "Login Failed",
            message: err.response.data.errorMessage,
            withCloseButton: true,
            icon: <IconX style={{ width: "90%", height: "90%" }}></IconX>,
            color: "red",
            withBorder: true,
            className: "!border-red-500",
          });
        });
    }
  };
  return (
    <>
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "brightSun.4", type: "bars" }}
      ></LoadingOverlay>
      <div className="w-1/2 px-20 flex flex-col justify-center">
        <div className="text-2xl font-semibold">Create Account</div>

        <TextInput
          withAsterisk
          leftSection={
            <IconAt style={{ width: rem(16), height: rem(16) }}></IconAt>
          }
          value={data.email}
          error={formError.email}
          name="email"
          onChange={handleChange}
          label="Email"
          placeholder="Your email"
        ></TextInput>
        <PasswordInput
          withAsterisk
          leftSection={
            <IconLock style={{ width: rem(18), height: rem(18) }}></IconLock>
          }
          value={data.password}
          error={formError.password}
          name="password"
          onChange={handleChange}
          label="Password"
          placeholder="password"
        ></PasswordInput>
        <Button
          loading={loading}
          onClick={handleSubmit}
          autoContrast
          variant="filled"
        >
          Login
        </Button>
        <div className="mx-auto">
          Don't have an account?{" "}
          <span
            onClick={() => {
              navigate("/signup");
              setFormError(form);
              setData(form);
            }}
            className="text-bright-sun-400 hover:underline cursor-pointer"
          >
            SignUp
          </span>
        </div>
        <div
          onClick={open}
          className="text-bright-sun-400 hover:underline cursor-pointer text-center"
        >
          Forget Password?
        </div>
      </div>
      <ResetPassword opened={opened} close={close}></ResetPassword>
    </>
  );
}

export default Login;
