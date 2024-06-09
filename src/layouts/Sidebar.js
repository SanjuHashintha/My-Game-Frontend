import React, { useEffect, useState } from "react";
import { Button, Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import user1 from "../assets/images/users/user4.jpg";
import probg from "../assets/images/bg/download.jpg";

const isAdmin = () => {
  return localStorage.getItem("role") === "admin";
};

const navigation = [
  {
    title: "Dashboard",
    href: "/starter",
    icon: "bi bi-speedometer2",
  },
  {
    title: "Alert",
    href: "/alerts",
    icon: "bi bi-bell",
  },
  {
    title: "Badges",
    href: "/badges",
    icon: "bi bi-patch-check",
  },
  {
    title: "Buttons",
    href: "/buttons",
    icon: "bi bi-hdd-stack",
    adminOnly: true,
  },
  {
    title: "Cards",
    href: "/cards",
    icon: "bi bi-card-text",
  },
  {
    title: "Grid",
    href: "/grid",
    icon: "bi bi-columns",
  },
  {
    title: "Table",
    href: "/table",
    icon: "bi bi-layout-split",
  },
  {
    title: "Forms",
    href: "/forms",
    icon: "bi bi-textarea-resize",
  },
  {
    title: "Breadcrumbs",
    href: "/breadcrumbs",
    icon: "bi bi-link",
  },
  {
    title: "About",
    href: "/about",
    icon: "bi bi-people",
  },
];

const Sidebar = () => {
  const [userData, setUserData] = useState(null);
  const [profilePic, setProfilePic] = useState(user1);
  let location = useLocation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId"); // Example user ID
        const token = localStorage.getItem("access_token"); // Get the token from local storage
        const headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        };
        const response = await axios.get(
          `http://localhost:8080/api/users?id=${userId}`,
          { headers }
        );
        setUserData(response.data.payload[0]);
        if (response.data.payload[0].profilePic) {
          setProfilePic(
            `http://localhost:8080${response.data.payload[0].profilePic}`
          );
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };

  return (
    <div>
      <div className="d-flex align-items-center"></div>
      <div
        className="profilebg"
        style={{ background: `url(${probg}) no-repeat` }}
      >
        <div className="p-3 d-flex">
          <img
            src={profilePic}
            alt="user"
            width="50"
            className="rounded-circle"
          />
          <Button
            color="white"
            className="ms-auto text-white d-lg-none"
            onClick={() => showMobilemenu()}
          >
            <i className="bi bi-x"></i>
          </Button>
        </div>
        <div className="bg-dark text-white p-2 opacity-75">
          {userData && userData.firstName + " " + userData.lastName}
        </div>
      </div>
      <div className="p-3 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation
            .filter((navi) => !navi.adminOnly || isAdmin())
            .map((navi, index) => (
              <NavItem key={index} className="sidenav-bg">
                <Link
                  to={navi.href}
                  className={
                    location.pathname === navi.href
                      ? "active nav-link py-3"
                      : "nav-link text-secondary py-3"
                  }
                >
                  <i className={navi.icon}></i>
                  <span className="ms-3 d-inline-block">{navi.title}</span>
                </Link>
              </NavItem>
            ))}
          <Button
            color="danger"
            tag="a"
            target="_blank"
            className="mt-3"
            href="https://wrappixel.com/templates/materialpro-react-admin/?ref=33"
          >
            Upgrade To Pro
          </Button>
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
