import {
  Anchor,
  Button,
  Checkbox,
  Group,
  LoadingOverlay,
  PasswordInput,
  Radio,
  rem,
  TextInput,
} from "@mantine/core";
import { IconAt, IconCheck, IconLock, IconX } from "@tabler/icons-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../Services/UserService";
import { signupValidation } from "../Services/FormValidation";
import { notifications } from "@mantine/notifications";

const form = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  accountType: "APPLICANT",
};

function SignUP() {
  const [data, setData] = useState<{ [key: string]: string }>(form);
  const [formError, setFormError] = useState<{ [key: string]: string }>(form);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleChange = (event: any) => {
    if (typeof event == "string") {
      setData({ ...data, accountType: event });
      return;
    }
    let name = event.target.name;
    let value = event.target.value;
    setData({ ...data, [name]: value });
    setFormError({ ...formError, [name]: signupValidation(name, value) });
    if (name === "password" && data.confirmPassword !== "") {
      let err = "";
      if (data.confirmPassword !== value) err = "Passwords do not match.";
      setFormError({
        ...formError,
        [name]: signupValidation(name, value),
        confirmPassword: err,
      });
    }
    if (name === "confirmPassword") {
      if (data.password !== value)
        setFormError({ ...formError, [name]: "Passwords do not match." });
    } else {
      setFormError({ ...formError, confirmPassword: "" });
    }
  };

  const handleSubmit = () => {
    let valid = true,
      newFormError: { [key: string]: string } = {};
    for (let key in data) {
      if (key === "accountType") continue;
      if (key != "confirmPassword")
        newFormError[key] = signupValidation(key, data[key]);
      else if (data[key] !== data["password"])
        newFormError[key] = "Password do not match.";
      if (newFormError[key]) valid = false;
    }
    setFormError(newFormError);
    if (valid) {
      setLoading(true);
      registerUser(data)
        .then((res) => {
          console.log(res);
          setData(form);
          notifications.show({
            title: "Registered Successfully",
            message: "Redirecting to Login Page....",
            withCloseButton: true,
            icon: (
              <IconCheck style={{ width: "90%", height: "90%" }}></IconCheck>
            ),
            color: "teal",
            withBorder: true,
            className: "!border-green-500",
          });
          setTimeout(() => {
            setLoading(false);
            navigate("/login");
          }, 4000);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          notifications.show({
            title: "Registration Failed",
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
      {" "}
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        className="translate-x-1/2"
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "brightSun.4", type: "bars" }}
      ></LoadingOverlay>
      <div className="w-1/2 px-20 flex flex-col justify-center">
        <div className="text-2xl font-semibold">Create Account</div>
        <TextInput
          withAsterisk
          value={data.name}
          error={formError.name}
          name="name"
          onChange={handleChange}
          label="Full Name"
          placeholder="Your name"
        ></TextInput>
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
        <PasswordInput
          withAsterisk
          leftSection={
            <IconLock style={{ width: rem(18), height: rem(18) }}></IconLock>
          }
          value={data.confirmPassword}
          error={formError.confirmPassword}
          name="confirmPassword"
          onChange={handleChange}
          label="Confirm Password"
          placeholder="confirm password"
        ></PasswordInput>
        <Radio.Group
          value={data.accountType}
          onChange={handleChange}
          label="You are?"
          description="This is anonymous"
          withAsterisk
        >
          <Group mt="xs">
            <Radio
              className="py-4 px-6 hover:bg-mine-shaft-900 has-[:checked]:bg-bright-sun-400/5 has-[:checked]:border-bright-sun-400 border border-mine-shaft-800 rounded-lg"
              autoContrast
              value="APPLICANT"
              label="Applicant"
            />
            <Radio
              className="py-4 px-6 hover:bg-mine-shaft-900 has-[:checked]:bg-bright-sun-400/5 has-[:checked]:border-bright-sun-400 border border-mine-shaft-800 rounded-lg"
              autoContrast
              value="EMPLOYER"
              label="Employer"
            />
          </Group>
        </Radio.Group>
        <Checkbox
          autoContrast
          label={
            <>
              I accept <Anchor>terms & conditions</Anchor>
            </>
          }
        ></Checkbox>
        <Button
          loading={loading}
          onClick={handleSubmit}
          autoContrast
          variant="filled"
        >
          Sign up
        </Button>
        <div className="mx-auto">
          Have an account?{" "}
          <span
            onClick={() => {
              navigate("/login");
              setFormError(form);
              setData(form);
            }}
            className="text-bright-sun-400 hover:underline cursor-pointer"
          >
            Login
          </span>
        </div>
      </div>
    </>
  );
}

export default SignUP;
