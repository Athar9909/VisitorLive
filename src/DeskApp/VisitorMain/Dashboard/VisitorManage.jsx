import React, { Suspense, useEffect, useState } from "react";
import DeskSidebar from "../../Common/DeskSidebar";
import { DeskHead } from "../../Common/DeskHead";
import { Link, useNavigate } from "react-router-dom";
import { getAgents } from "../../apiServices/partnerHttpService/partnerLoginHttpService";
import ResponsivePaginationComponent from "react-responsive-pagination";
function VisitorManage() {
  const [visitors, setVisitors] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getVisitorsData();
  }, [currentPage]);

  const getVisitorsData = async (search) => {
    const { data, error } = await getAgents({
      page: currentPage,
      search: search,
    });
    console.log(data);
    if (!error) {
      if (data) {
        setVisitors(data?.results?.agents?.agents);
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
                    <h2>Visitor Management</h2>
                  </div>
                  <div className="addpart_btn ms-2">
                    <a onClick={() => navigate("/visitor/create-visitor")}>
                      <i className="fas fa-plus" /> Create New Visitor
                    </a>
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
                          <th>Company Name</th>
                          <th>Phone Number</th>
                          <th>Address</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {visitors?.map((itm, id) => (
                          <tr>
                            <td> {(currentPage - 1) * 10 + id + 1}</td>
                            <td>{itm?.firstName}</td>
                            <td>{itm?.companyName}</td>
                            <td>{itm?.phoneNumber}</td>
                            <td>{itm?.address}</td>

                            <td>
                              <div className="d-flex justify-content-center">
                                <Link
                                  to={`/visitor/viewQr/${itm?._id}`}
                                  // onClick={() =>
                                  //   navigate(`/visitor/viewQr/${itm?._id}`)
                                  // }
                                  className="Table_btn"
                                  target="_blank"
                                >
                                  <i className="fa fa-qrcode" />
                                </Link>
                              </div>
                            </td>
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

export default VisitorManage;
