import {
  Button,
  FileInput,
  LoadingOverlay,
  NumberInput,
  Textarea,
  TextInput,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconPaperclip } from "@tabler/icons-react";
import React, { useState } from "react";
import { getBase64 } from "../Services/Utilities";
import { applyJob } from "../Services/JobService";
import { useNavigate, useParams } from "react-router-dom";
import {
  errorNotification,
  successNotification,
} from "../Services/NotificationService";
import { useSelector } from "react-redux";

function ApplicationForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useSelector((state: any) => state.user);
  const [preview, setPreview] = useState(false);
  const [submit, setSubmit] = useState(false);

  const handlePreview = () => {
    form.validate();
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (!form.isValid()) return;
    setPreview(!preview);
  };
  const handleSubmit = async () => {
    setSubmit(true);
    let resume: any = await getBase64(form.getValues().resume);
    let applicant = {
      ...form.getValues(),
      applicantId: user.id,
      resume: resume.split(",")[1],
    };
    applyJob(id, applicant)
      .then((res) => {
        setSubmit(false);
        successNotification("Success", "Application Submitted Successfully");
        navigate("/job-history");
      })
      .catch((err) => {
        setSubmit(false);
        errorNotification("Error", err.response.data.errorMessage);
      });
  };
  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      name: "",
      email: "",
      phone: new Date(),
      website: "",
      resume: null,
      coverLetter: "",
    },
    validate: {
      name: isNotEmpty("name is Required."),
      email: isNotEmpty("email is Required."),
      phone: isNotEmpty("resume is Required."),
      website: isNotEmpty("website is Required."),
      resume: isNotEmpty("resume is Required."),
    },
  });
  return (
    <div>
      <LoadingOverlay
        className="!fixed "
        visible={submit}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "brightSun.4", type: "bars" }}
      ></LoadingOverlay>
      <div className="text-xl font-semibold mb-5">Submit Your Application</div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-10 [&>*]:w-1/2">
          <TextInput
            {...form.getInputProps("name")}
            label="Full Name"
            readOnly={preview}
            variant={preview ? "unstyled" : "default"}
            className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
            withAsterisk
            placeholder="Enter name"
          ></TextInput>

          <TextInput
            {...form.getInputProps("email")}
            readOnly={preview}
            variant={preview ? "unstyled" : "default"}
            className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
            label="Email"
            withAsterisk
            placeholder="Enter email"
          ></TextInput>
        </div>
        <div className="flex gap-10 [&>*]:w-1/2">
          <NumberInput
            {...form.getInputProps("phone")}
            readOnly={preview}
            variant={preview ? "unstyled" : "default"}
            className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
            label="Phone Number"
            withAsterisk
            placeholder="Enter phone number"
            hideControls
            min={0}
            max={9999999999}
            clampBehavior="strict"
          ></NumberInput>

          <TextInput
            {...form.getInputProps("website")}
            readOnly={preview}
            variant={preview ? "unstyled" : "default"}
            className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
            label="Personal Website"
            withAsterisk
            placeholder="Enter URL"
          ></TextInput>
        </div>
        <FileInput
          {...form.getInputProps("resume")}
          accept="application/pdf"
          readOnly={preview}
          variant={preview ? "unstyled" : "default"}
          className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
          withAsterisk
          leftSection={<IconPaperclip stroke={1.5}></IconPaperclip>}
          label="Attach your CV"
          placeholder="Your CV"
          leftSectionPointerEvents="none"
        ></FileInput>
        <Textarea
          {...form.getInputProps("coverLetter")}
          readOnly={preview}
          variant={preview ? "unstyled" : "default"}
          className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
          withAsterisk
          placeholder="Type something about yourself"
          label="Cover Letter"
          autosize
          minRows={4}
        ></Textarea>
        {!preview && (
          <Button onClick={handlePreview} color="brightSun.4" variant="light">
            Preview
          </Button>
        )}
        {preview && (
          <div className="flex gap-10 [&>*]:w-1/2">
            <Button
              fullWidth
              onClick={handlePreview}
              color="brightSun.4"
              variant="light"
            >
              Edit
            </Button>
            <Button
              fullWidth
              onClick={handleSubmit}
              color="brightSun.4"
              variant="light"
            >
              Submit
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ApplicationForm;
