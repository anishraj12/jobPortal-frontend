import { Button, TextInput } from "@mantine/core";
import React, { useState } from "react";
import fields from "../Data/Profile";
import SelectInput from "./SelectInput";
import { MonthPickerInput } from "@mantine/dates";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotificationService";

function CertiInput(props: any) {
  const select = fields;
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);
  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      name: "",
      issuer: "",
      issueDate: new Date(),
      certificateId: "",
    },
    validate: {
      name: isNotEmpty("name is Required."),
      issuer: isNotEmpty("issuer is Required."),
      issueDate: isNotEmpty("issueDate is Required."),
      certificateId: isNotEmpty("certificateId is Required."),
    },
  });
  const handleSave = () => {
    form.validate();
    if (!form.isValid()) return;
    let certi = [...profile.certifications];
    certi.push(form.getValues());
    certi[certi.length - 1].issueDate =
      certi[certi.length - 1].issueDate.toISOString();
    let updatedProfile = { ...profile, certifications: certi };
    props.setEdit(false);
    dispatch(changeProfile(updatedProfile));
    successNotification("Success", `Certificate Added Successfully.`);
  };
  return (
    <div className="flex flex-col gap-3">
      <div className="text-lg font-semibold">Add Certificate</div>
      <div className="flex gap-10 [&>*]:w-1/2">
        <TextInput
          {...form.getInputProps("name")}
          label="Title"
          withAsterisk
          placeholder="Enter title.."
        ></TextInput>
        <SelectInput form={form} name="issuer" {...select[1]}></SelectInput>
      </div>
      <div className="flex gap-10 [&>*]:w-1/2">
        <MonthPickerInput
          {...form.getInputProps("issueDate")}
          withAsterisk
          maxDate={new Date()}
          label="Issue Date"
          placeholder="Pick Date"
        ></MonthPickerInput>
        <TextInput
          {...form.getInputProps("certificateId")}
          label="Certificate ID"
          withAsterisk
          placeholder="Enter certificate ID.."
        ></TextInput>
      </div>
      <div className="flex gap-5">
        <Button onClick={handleSave} color="green.8" variant="light">
          Save
        </Button>
        <Button
          onClick={() => props.setEdit(false)}
          color="red.8"
          variant="light"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default CertiInput;
