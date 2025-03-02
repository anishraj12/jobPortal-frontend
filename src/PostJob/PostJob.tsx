import React, { useEffect, useState } from "react";
import SelectInput from "./SelectInput";
import { content, fields } from "../Data/PostJob";
import { Button, NumberInput, TagsInput, Textarea } from "@mantine/core";
import TextEditor from "./TextEditor";
import { isNotEmpty, useForm } from "@mantine/form";
import { getJob, postJob } from "../Services/JobService";
import {
  errorNotification,
  successNotification,
} from "../Services/NotificationService";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function PostJob() {
  const { id } = useParams();
  const [editorData, setEditorData] = useState(content);
  const user = useSelector((state: any) => state.user);
  const navigate = useNavigate();
  const select = fields;
  useEffect(() => {
    window.scrollTo(0, 0);
    if (id !== "0") {
      getJob(id)
        .then((res) => {
          form.setValues(res);
          setEditorData(res.description);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      form.reset();
      setEditorData(content);
    }
  }, [id]);
  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      jobTitle: "",
      company: "",
      experience: "",
      jobType: "",
      location: "",
      packageOffered: "",
      skillsRequired: [],
      about: "",
      description: content,
    },
    validate: {
      jobTitle: isNotEmpty("job title is required"),
      company: isNotEmpty("company is required"),
      experience: isNotEmpty("experience is required"),
      jobType: isNotEmpty("jobType is required"),
      location: isNotEmpty("location is required"),
      packageOffered: isNotEmpty("packageOffered is required"),
      skillsRequired: isNotEmpty("skills is required"),
      about: isNotEmpty("about is required"),
      description: isNotEmpty("description is required"),
    },
  });
  const handlePost = () => {
    form.validate();
    if (!form.isValid()) return;
    postJob({ ...form.getValues(), postedBy: user.id, jobStatus: "ACTIVE" })
      .then((res) => {
        successNotification("Success", "Job Posted Successfully.");
        navigate(`/posted-jobs/${res.id}`);
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          errorNotification(
            "Error",
            err.response.data.errorMessage || "Something went wrong"
          );
        } else {
          // If no response, it means the error doesn't have the expected structure
          errorNotification("Error", "An unexpected error occurred");
        }
      });
  };
  const handleDraft = () => {
    postJob({
      ...form.getValues(),
      id,
      postedBy: user.id,
      jobStatus: "DRAFT",
    })
      .then((res) => {
        successNotification("Success", "Job DRAFTED Successfully.");
        navigate(`/posted-jobs/${res.id}`);
      })
      .catch((err) => {
        console.log(err);
        errorNotification("Error", err.response.data.errorMessage);
      });
  };
  return (
    <div className="w-4/5 mx-auto">
      <div className="text-2xl font-semibold">Post a Job</div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-10 [&>*]:w-1/2">
          <SelectInput form={form} name="jobTitle" {...select[0]}></SelectInput>
          <SelectInput form={form} name="company" {...select[1]}></SelectInput>
        </div>
        <div className="flex gap-10 [&>*]:w-1/2">
          <SelectInput
            form={form}
            name="experience"
            {...select[2]}
          ></SelectInput>
          <SelectInput form={form} name="jobType" {...select[3]}></SelectInput>
        </div>
        <div className="flex gap-10 [&>*]:w-1/2">
          <SelectInput form={form} name="location" {...select[4]}></SelectInput>
          <NumberInput
            {...form.getInputProps("packageOffered")}
            label="Salary"
            placeholder="Enter Salary"
            withAsterisk
            min={1}
            max={300}
            clampBehavior="strict"
            hideControls
          ></NumberInput>
        </div>
        <TagsInput
          {...form.getInputProps("skillsRequired")}
          withAsterisk
          label="Skills"
          clearable
          placeholder="Enter skills"
          splitChars={[",", " ", "|"]}
        />
        <Textarea
          {...form.getInputProps("about")}
          withAsterisk
          label="About Job"
          placeholder="Enter about job.."
          autosize
          minRows={3}
        ></Textarea>
      </div>
      <div className="[&_button[data-active='true']]:!text-bright-sun-400 [&_button[data-active='true']]:!bg-bright-sun-400/20 ">
        <div className="text-sm font-medium mt-4">
          Job Description <span className="text-red-500">*</span>
        </div>
        <TextEditor form={form} data={editorData}></TextEditor>
      </div>
      <div className="flex gap-4 mt-4">
        <Button onClick={handlePost} color="brightSun.4" variant="light">
          Publish Job
        </Button>
        <Button onClick={handleDraft} color="brightSun.4" variant="outline">
          Save as Draft
        </Button>
      </div>
    </div>
  );
}

export default PostJob;
