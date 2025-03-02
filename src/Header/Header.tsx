import { Avatar, Button, Indicator } from "@mantine/core";
import {
  IconBell,
  IconBriefcaseFilled,
  IconSettings,
} from "@tabler/icons-react";
import React, { useEffect } from "react";
import NavLinks from "./NavLinks";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../Services/ProfileService";
import { setProfile } from "../Slices/ProfileSlice";
import NotiMenu from "./NotiMenu";
import { jwtDecode } from "jwt-decode";
import { setUser } from "../Slices/UserSlice";
import { setupResponseInterceptor } from "../Interceptor/AxiosInterceptor";

function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const token = useSelector((state: any) => state.jwt);

  const navigate = useNavigate();
  useEffect(() => {
    setupResponseInterceptor(navigate);
  }, [navigate]);
  useEffect(() => {
    if (token != "") {
      const decoded = jwtDecode(localStorage.getItem("token") || "");
      dispatch(setUser({ ...decoded, email: decoded.sub }));
    }
    getProfile(user?.id)
      .then((data: any) => {
        dispatch(setProfile(data));
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, [token, navigate]);
  const location = useLocation();
  return location.pathname != "/signup" && location.pathname != "/login" ? (
    <div className="w-full flex justify-between items-center px-6 text-white bg-mine-shaft-950 h-20 font-poppins ">
      <div className="flex gap-2 items-center text-bright-sun-400">
        <IconBriefcaseFilled className="h-10 w-10" stroke={1.25} />
        <div className="text-3xl font-semibold">HIRED</div>{" "}
      </div>
      {NavLinks()}
      <div className="flex gap-3 items-center">
        {user ? (
          <ProfileMenu></ProfileMenu>
        ) : (
          <Link to="/login">
            <Button variant="subtle" color="brightSun.4">
              Login
            </Button>
          </Link>
        )}
        {/* <div className="bg-mine-shaft-900 p-1.5 rounded-full">
          <IconSettings stroke={1.5}></IconSettings>
        </div> */}
        {user ? <NotiMenu></NotiMenu> : <></>}
      </div>
    </div>
  ) : (
    <></>
  );
}

export default Header;
