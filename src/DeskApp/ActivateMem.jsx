import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { activateMembership } from "./apiServices/partnerHttpService/partnerLoginHttpService";

const ActivateMem = () => {
  const [completed, setCompleted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (info) => {
    try {
      const alldata = {
        agentName: info?.firstname,
        email: info?.email,
        companyName: info?.company,
        accountNumber: info?.account,
        agentPhoneNumber: info?.number,
        userPhoneNumber: info?.number,
        address: info?.address,
      };
      const { data } = await activateMembership(alldata);
      if (!data.error) {
        setCompleted(true);

        setTimeout(() => {
          window.close();
        }, [8000]);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
    }
  };

  return (
    <div>
      <div className="row justify-content-center context">
        <div className="logo_activate">
          <a className="logo">
            <img src="/imgs/logo.png" alt="" />
          </a>
        </div>
        {!completed ? (
          <form onSubmit={handleSubmit(onSubmit)} className="form">
            <p className="title">Activate Authorised Membership Card </p>
            <p className="message">
              Fill this form now and we will contact you shortly!.{" "}
            </p>
            <div className="row">
              <div className="mb-2 col-6 col-sm-12 col-md-6 col-xs-12">
                <label>
                  <input
                    type="text"
                    className="input"
                    name="firstname"
                    id="name"
                    {...register("firstname", {
                      required: "First Name is Required*",
                      pattern: {
                        value: /^[^*|\":<>[\]{}`\\()';@&$]+$/,
                        message: "Special Character not allowed",
                      },

                      minLength: {
                        value: 2,
                        message: "Minimium 2 letters Should be in First Name", // JS only: <p>error message</p> TS only support string
                      },
                    })}
                  />

                  <span>First Name *</span>
                  {errors.firstname && (
                    <small className="errorText mx-1 fw-bold">
                      {errors.firstname?.message}
                    </small>
                  )}
                </label>
              </div>
              <div className="mb-2 col-6 col-sm-12 col-md-6 col-xs-12">
                <label>
                  <input
                    type="text"
                    className="input"
                    name="lastname"
                    id="name"
                    {...register("lastname", {
                      required: false,
                      pattern: {
                        value: /^[^*|\":<>[\]{}`\\()';@&$]+$/,
                        message: "Special Character not allowed",
                      },

                      minLength: {
                        value: 2,
                        message: "Minimium 2 letters Should be in Last Name", // JS only: <p>error message</p> TS only support string
                      },
                    })}
                  />

                  <span>Last name </span>
                  {errors.lastname && (
                    <small className="errorText mx-1 fw-bold">
                      {errors.lastname?.message}
                    </small>
                  )}
                </label>
              </div>
              <div className="mb-2 col-6 col-sm-12 col-md-6 col-xs-12">
                <label>
                  <input
                    type="email"
                    className="input"
                    name="email"
                    id="name"
                    {...register("email", {
                      required: "Email is Required*",
                      pattern: {
                        value:
                          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "Invalid email address",
                      },
                    })}
                  />

                  <span>Email Address*</span>
                  {errors.email && (
                    <small className="errorText mx-1 fw-bold">
                      {errors.email?.message}
                    </small>
                  )}
                </label>
              </div>

              <div className="mb-2 col-6 col-sm-12 col-md-6 col-xs-12">
                <label>
                  <input
                    type="number"
                    className="input"
                    name="number"
                    id="name"
                    {...register("number", {
                      required: false,
                      maxLength: {
                        value: 10,
                        message: "Maximum 10 letters Should be in Number", // JS only: <p>error message</p> TS only support string
                      },

                      minLength: {
                        value: 2,
                        message: "Minimium 2 letters Should be in Number", // JS only: <p>error message</p> TS only support string
                      },
                    })}
                  />

                  <span>Phone Number </span>
                  {errors.number && (
                    <small className="errorText mx-1 fw-bold">
                      {errors.number?.message}
                    </small>
                  )}
                </label>
              </div>

              <div className="mb-2 col-6 col-sm-12 col-md-6 col-xs-12">
                <label>
                  <input
                    type="text"
                    className="input"
                    name="company"
                    id="name"
                    {...register("company", {
                      required: false,
                      pattern: {
                        value: /^[^*|\":<>[\]{}`\\()';@&$]+$/,
                        message: "Special Character not allowed",
                      },

                      minLength: {
                        value: 2,
                        message: "Minimium 2 letters Should be in Company Name", // JS only: <p>error message</p> TS only support string
                      },
                    })}
                  />

                  <span>Copmany Name</span>
                  {errors.company && (
                    <small className="errorText mx-1 fw-bold">
                      {errors.company?.message}
                    </small>
                  )}
                </label>
              </div>

              <div className="mb-2 col-6 col-sm-12 col-md-6 col-xs-12">
                <label>
                  <input
                    type="number"
                    className="input"
                    name="account"
                    id="name"
                    {...register("account", {
                      required: false,

                      minLength: {
                        value: 2,
                        message: "Minimium 2 letters Should be in account", // JS only: <p>error message</p> TS only support string
                      },
                    })}
                  />

                  <span>Account Number </span>
                  {errors.account && (
                    <small className="errorText mx-1 fw-bold">
                      {errors.account?.message}
                    </small>
                  )}
                </label>
              </div>

              <div className="mb-2 col-12 col-sm-12 col-md-12 col-xs-12">
                <label>
                  <textarea
                    type="text"
                    className="input"
                    name="address"
                    id="name"
                    {...register("address", {
                      required: "Address is Required*",

                      minLength: {
                        value: 5,
                        message: "Minimium 5 letters Should be in Address", // JS only: <p>error message</p> TS only support string
                      },
                    })}
                  />

                  <span className="mt-3">Address*</span>
                  {errors.address && (
                    <small className="errorText mx-1 fw-bold">
                      {errors.address?.message}
                    </small>
                  )}
                </label>
              </div>
            </div>

            <button className="submit">Submit</button>
            <p className="signin">
              Your Information is Securely Encrypted with Star Importers &
              Wholesalers.For more Visit{" "}
              <Link
                to={"https://www.starimporters.com/app/home"}
                target="_blank"
              >
                www.starimporters.com
              </Link>
            </p>
          </form>
        ) : (
          <div className="card">
            <div className="header">
              <div className="div_image_v">
                <div className="image">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M20 7L9.00004 18L3.99994 13"
                        stroke="#000000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />{" "}
                    </g>
                  </svg>
                </div>
              </div>

              <div className="content">
                <span className="title">Form Submitted Successfully!</span>
                <p className="message">
                  Thank you for your co-operation.Your membership card will sent
                  to you on your registered emails.For more Visit{" "}
                  <Link
                    to={"https://www.starimporters.com/app/home"}
                    target="_blank"
                  >
                    www.starimporters.com
                  </Link>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div class="area">
        <ul class="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  );
};

export default ActivateMem;
