import { Indicator, Menu, Notification, rem } from "@mantine/core";
import { IconBell, IconCheck } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getNotifications, readNotification } from "../Services/NotiService";

function NotiMenu() {
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user);
  const [notifications, setNotifications] = useState<any>([]);
  const [opened, setOpened] = useState(false);
  const unread = (index: number) => {
    let notis = [...notifications];
    notis = notis.filter((noti: any, i: number) => i !== index);
    setNotifications(notis);
    readNotification(notifications[index].id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getNotifications(user.id)
      .then((res) => {
        setNotifications(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

  return (
    <Menu shadow="md" width={200} opened={opened} onChange={setOpened}>
      <Menu.Target>
        <div className="bg-mine-shaft-900 p-1.5 rounded-full cursor-pointer">
          <Indicator
            disabled={notifications.length <= 0}
            color="brightSun.4"
            offset={6}
            size={8}
            processing
          ></Indicator>
          <IconBell stroke={1.5}></IconBell>
        </div>
      </Menu.Target>

      <Menu.Dropdown onChange={() => setOpened(true)}>
        <div className="flex flex-col gap-1">
          {notifications.map((noti: any, index: number) => (
            <Notification
              onClick={() => {
                navigate(noti.route);
                unread(index);
                setOpened(false);
              }}
              key={index}
              color="teal"
              title={noti.action}
              onClose={() => unread(index)}
              mt="md"
              className="hover:bg-mine-shaft-900 cursor-pointer"
              icon={
                <IconCheck
                  style={{ width: rem(20), height: rem(20) }}
                ></IconCheck>
              }
            >
              {noti.message}
            </Notification>
          ))}
          {notifications.length == 0 && (
            <div className="text-center text-mine-shaft-300">
              No Notifications
            </div>
          )}
        </div>
      </Menu.Dropdown>
    </Menu>
  );
}

export default NotiMenu;
