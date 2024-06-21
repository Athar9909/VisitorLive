import React, { Suspense, useEffect, useState } from "react";
import DeskSidebar from "../../Common/DeskSidebar";
import { DeskHead } from "../../Common/DeskHead";
import { getVisitorsLog } from "../../apiServices/partnerHttpService/partnerLoginHttpService";

function VisitorLogs() {
  const [checkedIns, setCheckedIns] = useState([]);

  useEffect(() => {
    getVisitorsData();
  }, []);

  const getVisitorsData = async () => {
    const { data, error } = await getVisitorsLog({ page: 1 });
    console.log(data);
    if (!error) {
      if (data) {
        setCheckedIns(data?.results?.visitors?.usersList);
      } else {
        console.log("Data is undefined.");
      }
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
              <div className="row align-items-center justify-content-between py-md-4 py-3 px-2">
                <div className="col-md-auto mb-md-0 mb-3 d-flex align-items-center">
                  <div className="headleft">
                    <h2>Checked Logs Management</h2>
                  </div>
                </div>
                <div className="col-md-4 d-flex align-items-center justify-content-end">
                  <div className="searchh_box position-relative">
                    <input
                      className="form-control"
                      type="search"
                      placeholder="Search"
                    />
                    <button>
                      <i className="fas fa-search" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="row comman_table pt-md-3 pb-md-4 pb-3 px-2">
                <div className="col-12">
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>S.No.</th>
                          <th>Visitor Name</th>
                          <th>Check-In Time</th>
                          <th>Company Name</th>
                          <th>Phone Number</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {checkedIns?.map((itm, id) => (
                          <tr>
                            <td>{id + 1}</td>
                            <td>{itm?.agent?.firstName}</td>
                            <td>
                              {itm?.entryDate?.slice(0, 10)} {itm?.entryTime}
                            </td>
                            <td>{itm?.user?.companyName}</td>

                            <td>{itm?.user?.phoneNumber}</td>
                            <td>
                              <div className="d-flex justify-content-center">
                                <a
                                  href="dashboard-checked-in.html"
                                  className="Table_btn"
                                >
                                  <i className="fa fa-eye" />
                                </a>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisitorLogs;
