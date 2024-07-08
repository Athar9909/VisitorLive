import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { LoginVisitor } from "../apiServices/partnerHttpService/partnerLoginHttpService";

const VisitorLogin = () => {
  const [type, setType] = useState("password");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  let token = localStorage.getItem("token-visitor");
  useEffect(() => {
    if (token?.length > 5) {
      navigate("/visitor/dashboard");
    }
  }, [token]);

  console.log(loader);
  const onSubmit = async (info) => {
    setLoader(true);
    const alldata = {
      email: info?.email,
      password: info?.password,
    };
    console.log(alldata);
    const { data } = await LoginVisitor(alldata);
    if (!data?.error) {
      localStorage.setItem("visitorLoginData", data?.result);
      navigate("/visitor/dashboard");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setType("password");
    }, [1200]);
  }, [type]);

  const typeChange = () => {
    if (type === "password") setType("text");
    else {
      setType("password");
    }
  };

  const getPasswordValue = (value) => {
    console.log(value);
    setPassword(value);
  };

  return (
    <div className="login-container">
      <section className="image-section d-flex justify-content-center ">
        <img
          src="/imgs/loginImg.jpg"
          alt="Login illustration"
          className="login-image self-center"
        />
      </section>

      <section className="login-section">
        <div className="login-form">
          <img src="/imgs/logo1.png" alt="Login logo" className="login-logo " />
          <h2 className="login-title">Log in</h2>

          <form className="row form-design" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group col-12">
              <label htmlFor="email" className="input-label font-semibold">
                Email Id
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="User@gmail.com"
                name="email"
                id="email"
                {...register("email", {
                  required: "This field is required",
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Invalid email address",
                  },
                })}
              />

              {errors?.email && (
                <p className="form-error mt-1">*{errors.email.message}</p>
              )}
            </div>
            <div className="form-group col-12 position-relative">
              <label htmlFor="password" className="input-label font-semibold">
                Password
              </label>
              <input
                type={type}
                className="form-control"
                placeholder="**********"
                name="password"
                id="password"
                {...register("password", {
                  required: true,
                  onChange: (e) => {
                    getPasswordValue(e.target.value);
                  },
                })}
              />

              {password ? (
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/9d5751eee25fb1d439c21f9bd76c5334dd34662cc7f6c0bc917367167500fa93?apiKey=f2b9348e88a1433aa0e5aeee651ad63b&"
                  alt="Show password"
                  style={{ marginTop: "-10px" }}
                  className={`fa eyepassword2 fa-eye${
                    type === "password" ? "" : "-slash"
                  }`}
                  onClick={() => typeChange()}
                />
              ) : (
                ""
              )}

              {errors?.password && (
                <p className="form-error mt-1">This field is required</p>
              )}
            </div>

            <div className="form-group col-12">
              <button type="submit" className="comman_btn w-100">
                Login
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default VisitorLogin;
