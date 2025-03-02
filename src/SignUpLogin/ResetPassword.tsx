import {
  Button,
  Modal,
  PasswordInput,
  PinInput,
  rem,
  TextInput,
} from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { useState } from "react";
import { changePass, sendOtp, verifyOtp } from "../Services/UserService";
import { signupValidation } from "../Services/FormValidation";
import {
  errorNotification,
  successNotification,
} from "../Services/NotificationService";
import { useInterval } from "@mantine/hooks";

function ResetPassword(props: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passErr, setPassErr] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [verified, setVerified] = useState(false);
  const [resendLoader, setResendLoader] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const interval = useInterval(() => {
    if (seconds === 0) {
      setResendLoader(false);
      setSeconds(60);
      interval.stop();
    } else {
      setSeconds((s) => s - 1);
    }
  }, 1000);

  const handleSendOtp = () => {
    setOtpSending(true);
    sendOtp(email)
      .then((res) => {
        console.log(res);
        successNotification("OTP sent Successfully", "Enter OTP to reset.");
        setOtpSent(true);
        setOtpSending(false);
        setResendLoader(true);
        interval.start();
      })
      .catch((err) => {
        console.log(err);
        errorNotification("OTP Sending Failed", err.response.data.errorMessage);
        setOtpSending(false);
      });
  };

  const handleVerifyOTP = (otp: string) => {
    verifyOtp(email, otp)
      .then((res) => {
        console.log(res);
        successNotification("OTP Verified.", "Enter new Password.");
        setVerified(true);
      })
      .catch((err) => {
        console.log(err);
        errorNotification(
          "OTP Verification Failed",
          err.response.data.errorMessage
        );
      });
  };

  const reSendOtp = () => {
    if (resendLoader) return;
    handleSendOtp();
  };
  const changeEmail = () => {
    setOtpSent(false);
    setResendLoader(false);
    setSeconds(60);
    setVerified(false);
    interval.stop();
  };
  const handleResetPassword = () => {
    changePass(email, password)
      .then((res) => {
        console.log(res);
        successNotification("Password Changed", "Login with new Password.");
        props.close();
      })
      .catch((err) => {
        console.log(err);
        errorNotification(
          "Password Reset Failed.",
          err.response.data.errorMessage
        );
      });
  };

  return (
    <Modal opened={props.opened} onClose={props.close} title="Reset Password">
      <div className="flex flex-col gap-6">
        <TextInput
          withAsterisk
          leftSection={
            <IconAt style={{ width: rem(16), height: rem(16) }}></IconAt>
          }
          rightSection={
            <Button
              loading={otpSending && !otpSent}
              size="xs"
              className="mr-1"
              onClick={handleSendOtp}
              autoContrast
              disabled={email === "" || otpSent}
              variant="filled"
            >
              Login
            </Button>
          }
          rightSectionWidth="xl"
          value={email}
          name="email"
          size="md"
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          placeholder="Your email"
        ></TextInput>
        {otpSent && (
          <PinInput
            length={6}
            className="mx-auto"
            size="md"
            gap="lg"
            onComplete={handleVerifyOTP}
            type="number"
          ></PinInput>
        )}
        {otpSent && !verified && (
          <div className="flex gap-2">
            <Button
              color="brightSun.4"
              fullWidth
              loading={otpSending}
              onClick={reSendOtp}
              autoContrast
              variant="light"
            >
              {resendLoader ? seconds : "Resend"}
            </Button>
            <Button
              fullWidth
              onClick={changeEmail}
              autoContrast
              variant="filled"
            >
              Login
            </Button>
          </div>
        )}
        {verified && (
          <PasswordInput
            withAsterisk
            leftSection={
              <IconLock style={{ width: rem(18), height: rem(18) }}></IconLock>
            }
            value={password}
            error={passErr}
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
              setPassErr(signupValidation("password", e.target.value));
            }}
            label="Password"
            placeholder="password"
          ></PasswordInput>
        )}
        {verified && (
          <Button onClick={handleResetPassword} autoContrast variant="filled">
            Change Password
          </Button>
        )}
      </div>
    </Modal>
  );
}

export default ResetPassword;
