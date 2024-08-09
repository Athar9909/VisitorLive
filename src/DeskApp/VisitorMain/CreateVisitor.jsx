import React, { useState } from "react";
import { DeskHead } from "../Common/DeskHead";
import DeskSidebar from "../Common/DeskSidebar";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createNewVisitor } from "../apiServices/partnerHttpService/partnerLoginHttpService";

const CreateVisitor = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [loader, setLoader] = useState(false);
  const onSubmit = async (info) => {
    setLoader(true);
    try {
      const alldata = {
        firstName: info?.name,
        companyName: info?.company,
        visitPurpose: info?.visitPurpose,
        phoneNumber: info?.phone,
        address: info?.address,
        createdBy: ["VisitorPanel"],
      };
      const { data } = await createNewVisitor(alldata);
      if (!data.error) {
        navigate("/visitor/management");
        setLoader(false);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setLoader(false);
    } finally {
      setLoader(false);

    }

  };

  return (
    <div className=" ">
      <div class="">
        <DeskHead />
      </div>

      <div className="admin_main">
        <DeskSidebar />
        <div className="admin_contentpart">
          <div className="row comman_design mx-0">
            <div className="col-12">
              <div className="row align-items-center justify-content-between py-md-4 py-3 px-md-3 px-2">
                <div className="col-md-auto">
                  <div className="headleft">
                    <h2>Visitor Details</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="row pt-md-3 pb-md-4 pb-3 px-md-3 px-2">
                <div className="col-12">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="row form-design"
                    action=""
                  >
                    <div className="form-group col-md-4">
                      <label htmlFor="">Company Name</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue=""
                        name="company"
                        {...register("company", {
                          required: false,
                        })}
                      />
                    </div>

                    <div className="form-group col-md-4">
                      <label htmlFor="">Visitor First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue=""
                        name="name"
                        {...register("name", {
                          required: false,
                        })}
                      />
                    </div>

                    <div className="form-group col-md-4">
                      <label htmlFor="">Phone Number</label>
                      <input
                        type="number"
                        className="form-control"
                        defaultValue=""
                        name="phone"
                        {...register("phone", {
                          required: false,
                        })}
                      />
                    </div>

                    <div className="form-group col-md-8">
                      <label htmlFor="">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue=""
                        name="address"
                        {...register("address", {
                          required: false,
                        })}
                      />
                    </div>

                    <div className="form-group col-md-4">
                      <label htmlFor="">Purpose of Visit</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue=""
                        name="visit"
                        {...register("visit", {
                          required: false,
                        })}
                      />
                    </div>

                    <div className="form-group col-md-12 mt-md-3 mt-1 mb-0 text-md-start text-center">
                      {loader ? (
                        <button className="form_commanbtn" disabled>
                          Saving...
                        </button>
                      ) : (
                        <button className="form_commanbtn" type="submit">
                          Create Visitor
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateVisitor;
