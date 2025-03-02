import { Avatar, Button, Divider, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconCalendar,
  IconCalendarMonth,
  IconHeart,
  IconMapPin,
} from "@tabler/icons-react";
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DateInput, TimeInput } from "@mantine/dates";
import { getProfile } from "../Services/ProfileService";
import { changeAppStatus } from "../Services/JobService";
import {
  errorNotification,
  successNotification,
} from "../Services/NotificationService";
import { formatInterviewTime, openBase64 } from "../Services/Utilities";
import { useDispatch } from "react-redux";

function TalentCard(props: any) {
  const dispatch = useDispatch();

  const { id } = useParams();
  const [app, { open: openApp, close: closeApp }] = useDisclosure(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<any>(null);
  const ref = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = useState<any>({});
  useEffect(() => {
    if (props.applicantId) {
      getProfile(props.applicantId)
        .then((res) => {
          setProfile(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setProfile(props);
    }
  }, [props]);
  const handleOffer = (status: string) => {
    let interview: any = {
      id,
      applicantId: profile?.id,
      applicationStatus: status,
    };
    if (status == "INTERVIEWING") {
      const [hours, minutes] = time.split(":").map(Number);
      date?.setHours(hours, minutes);
      interview = { ...interview, interviewTime: date };
    }

    changeAppStatus(interview)
      .then((res) => {
        if (status == "INTERVIEWING")
          successNotification(
            "Interview Scheduled",
            "Interview Scheduled Successfully."
          );
        else if (status == "OFFERED")
          successNotification("Offered", "Offer had been sent Successfully.");
        else successNotification("Rejected", "Applicant had been Rejected");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        errorNotification("Error", err.response.data.errorMessage);
      });
  };
  return (
    <div className="bg-mine-shaft-900 p-4 w-96 flex flex-col gap-3 rounded-xl hover:shadow-[0_0_5px_1px_yellow] !shadow-bright-sun-400">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-800 rounded-md">
            <Avatar
              className="rounded-full"
              size="lg"
              src={
                profile.picture
                  ? `data:image/jpeg;base64,${profile.picture}`
                  : "/avatar.png"
              }
            ></Avatar>
          </div>
          <div>
            <div className="font-semibold text-lg">{props.name}</div>
            <div className="text-sm text-mine-shaft-300 ">
              {profile?.jobTitle} &bull; {profile?.company}
            </div>
          </div>
        </div>
        <div>
          <IconHeart className="text-mine-shaft-300 cursor-pointer"></IconHeart>
        </div>
      </div>
      <div className="flex gap-2 [&>div]:px-2 [&>div]:bg-mine-shaft-800 [&>div]:text-bright-sun-400 [&>div]:rounded-lg text-xs">
        {profile.skills?.map(
          (skill: any, index: any) =>
            index < 4 && (
              <div
                key={index}
                className="p-2 py-1 bg-mine-shaft-800 text-bright-sun-400 rounded-lg text-xs"
              >
                {skill}
              </div>
            )
        )}
      </div>
      <Text
        className="!text-xs text-justify !text-mine-shaft-300"
        lineClamp={3}
      >
        {profile.about}
      </Text>
      <Divider size="xs" color="mineShaft.7"></Divider>
      {props.invited ? (
        <div className="flex gap-1 text-mine-shaft-200 text-sm items-center">
          <IconCalendarMonth stroke={1.5}></IconCalendarMonth>Interview:
          {formatInterviewTime(props.interviewTime)}
        </div>
      ) : (
        <div className="flex justify-between">
          <div className=" text-mine-shaft-300">
            EXP: {props.totalExp ? props.totalExp : 1} Years
          </div>
          <div className="flex gap-1 items-center text-xs text-mine-shaft-200">
            <IconMapPin className="h-5 w-5" stroke={1.5}></IconMapPin>{" "}
            {profile?.location}
          </div>
        </div>
      )}

      <Divider size="xs" color="mineShaft.7"></Divider>
      <div className="flex [&>*]:w-1/2 [&>*]:p-1">
        {!props.invited && (
          <>
            <Link to={`/talent-profile/${profile?.id}`}>
              <Button color="brightSun.4" fullWidth variant="outline">
                Profile
              </Button>
            </Link>
            <div>
              {props.posted ? (
                <Button
                  onClick={open}
                  rightSection={
                    <IconCalendar className="w-5 h-5"></IconCalendar>
                  }
                  color="brightSun.4"
                  fullWidth
                  variant="light"
                >
                  Schedule
                </Button>
              ) : (
                <Button color="brightSun.4" fullWidth variant="light">
                  Message
                </Button>
              )}
            </div>
          </>
        )}
        {props.invited && (
          <>
            <div>
              <Button
                onClick={() => handleOffer("OFFERED")}
                color="brightSun.4"
                fullWidth
                variant="outline"
              >
                Accept
              </Button>
            </div>
            <div>
              <Button
                onClick={() => handleOffer("REJECTED")}
                color="brightSun.4"
                fullWidth
                variant="light"
              >
                Reject
              </Button>
            </div>
          </>
        )}
      </div>
      {(props.invited || props.posted) && (
        <Button
          onClick={openApp}
          color="brightSun.4"
          variant="filled"
          autoContrast
          fullWidth
        >
          View Application
        </Button>
      )}
      <Modal opened={app} onClose={closeApp} title="Application" centered>
        <div className="flex flex-col gap-4">
          <div>
            Email: &emsp:
            <a
              className="text-bright-sun-400 hover:underline cursor-pointer text-center"
              href={`mailto:${props.email}`}
            >
              {props.email}
            </a>
          </div>
          <div>
            Website: &emsp:
            <a
              className="text-bright-sun-400 hover:underline cursor-pointer text-center"
              href={props.website}
              target="_blank"
            >
              {props.website}
            </a>
          </div>
          <div>
            Resume: &emsp:
            <span
              className="text-bright-sun-400 hover:underline cursor-pointer text-center"
              onClick={() => openBase64(props.resume)}
            >
              {props.name}
            </span>
          </div>
          <div>
            Cover Letter: &emsp:
            <div>{props.coverLetter}</div>
          </div>
        </div>
      </Modal>
      <Modal
        opened={opened}
        onClose={close}
        title="Schedule Interview"
        centered
      >
        <div className="flex flex-col gap-4">
          <DateInput
            minDate={new Date()}
            value={date}
            onChange={setDate}
            label="Date"
            placeholder="Enter date"
          ></DateInput>
          <TimeInput
            onChange={(event) => setTime(event.currentTarget.value)}
            label="Time"
            value={time}
            onClick={() => ref.current?.showPicker()}
            ref={ref}
          />
          <Button
            onClick={() => handleOffer("INTERVIEWING")}
            color="brightSun.4"
            fullWidth
            variant="light"
          >
            Schedule
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default TalentCard;
