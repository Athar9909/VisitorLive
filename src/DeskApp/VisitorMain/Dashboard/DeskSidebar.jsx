/* eslint-disable jsx-a11y/role-supports-aria-props */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const DeskSidebar = () => {
  let navigate = useNavigate();

  return (
    <div className="admin_siderbarr">
      <a
        className={window.location.href.includes("dashboard") ? " active" : " "}
        onClick={() => navigate("/visitor/dashboard")}
      >
        <span>
          <i className="fas fa-home" />
        </span>{" "}
        Dashboard
      </a>
      <a
        className={
          window.location.href.includes("management") ? " active" : " "
        }
        onClick={() => navigate("/visitor/management")}
      >
        <span>
          <i className="fas fa-users" />
        </span>
        Visitor Management
      </a>
      <a
        className={
          window.location.href.includes("CheckedInOut") ? " active" : " "
        }
        onClick={() => navigate("/visitor/CheckedInOut")}
      >
        <span>
          <i className="fas fa-users" />
        </span>
        Checked Ins & Checked Outs
      </a>
      <a
        onClick={async () => {
          await localStorage.removeItem("token-visitor");
          navigate("/visitor/login");
        }}
      >
        <span>
          <i className="fas fa-sign-out-alt" />
        </span>{" "}
        Logout
      </a>
    </div>
  );
};

export default DeskSidebar;
