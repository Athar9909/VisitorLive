import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// import { toast } from "react-toastify";

export const DeskHead = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="admin_header">
        <div className="row justify-content-between align-items-center">
          <div className="col-2 text-center">
            <a className="logo" href="dashboard.html">
              <img src="/imgs/logo.png" alt="" />
            </a>
          </div>
          <div className="col-auto">
            {/* <div class="col-auto d-flex align-items-center"> 
            <div class="dropdown Profile_dropdown">
               <button class="btn btn-secondary" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
               <img src="assets/img/user.png" alt="">
               </button>
               <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li><a class="dropdown-item" href="view-profile.html">View Profile</a></li>
                  <li><a class="dropdown-item" href="change-password.html">Change Password</a></li>
                  <li><a class="dropdown-item" href="login.html">Logout</a></li>
               </ul>
            </div>
            <div class="toggle_btns">
               <i class="fas fa-bars"></i>
            </div>
         </div> */}
          </div>
        </div>
      </div>
    </>
  );
};
