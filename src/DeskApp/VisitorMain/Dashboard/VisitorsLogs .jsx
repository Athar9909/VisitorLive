import React, { Suspense, useEffect, useState } from "react";
import DeskSidebar from "../../Common/DeskSidebar";
import { DeskHead } from "../../Common/DeskHead";
import { getVisitorsLog } from "../../apiServices/partnerHttpService/partnerLoginHttpService";
import ResponsivePaginationComponent from "react-responsive-pagination";

function VisitorLogs() {
  const [checkedIns, setCheckedIns] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getVisitorsData();
  }, [currentPage]);

  const getVisitorsData = async (search) => {
    const { data, error } = await getVisitorsLog({
      page: currentPage,
      search: search,
    });
    console.log(data);
    if (!error) {
      if (data) {
        setCheckedIns(data?.results?.visitors?.usersList);
        setTotalPages(data?.results?.totalPages);
      } else {
        console.log("Data is undefined.");
      }
    }
  };

  const handlePages = async (value) => {
    setCurrentPage(value);
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
                      type="text"
                      placeholder="Search"
                      onChange={(e) => getVisitorsData(e.target.value)}
                    />
                    <button>
                      <i className="fas fa-search mt-3" />
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
                          <th>Check-Out Time</th>
                          <th>Status</th>

                          <th>Company Name</th>
                          <th>Phone Number</th>
                        </tr>
                      </thead>
                      <tbody>
                        {checkedIns?.map((itm, id) => (
                          <tr>
                            <td> {(currentPage - 1) * 10 + id + 1}</td>
                            <td>{itm?.agent?.firstName}</td>
                            <td>
                              {itm?.entryDate?.slice(0, 10)} {itm?.entryTime}
                            </td>
                            {!itm?.checkedOut ? (
                              <td>Not Checked Out Yet</td>
                            ) : (
                              <td>
                                {itm?.exitDate?.slice(0, 10)} {itm?.exitTime}
                              </td>
                            )}
                                            <td>{itm?.checkoutType}</td>

                            <td>{itm?.user?.companyName}</td>

                            <td>{itm?.user?.phoneNumber}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="mb-2">
                      <ResponsivePaginationComponent
                        current={currentPage}
                        total={totalPages}
                        onPageChange={handlePages}
                        
                      />
                    </div>
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
