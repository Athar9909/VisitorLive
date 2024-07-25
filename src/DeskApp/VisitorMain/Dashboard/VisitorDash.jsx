import React, { Suspense, useEffect, useRef, useState } from "react";
import DeskSidebar from "../../Common/DeskSidebar";
import { DeskHead } from "../../Common/DeskHead";
import {
  getVisitorsLog,
  scanQrEntry,
  scanQrExit,
  scanQrView,
  viewAgent,
} from "../../apiServices/partnerHttpService/partnerLoginHttpService";
import socket from "../../Common/socket";

function VisitorDash() {
  const [isScanned, setIsScanned] = useState(false);
  const [user, setUser] = useState([]);
  const [checkedIns, setCheckedIns] = useState([]);
  const [barcode, setBarcode] = useState("");
  const inputRef = useRef(null);
  const [focus, setFocus] = useState(false);
  const [checkList, setCheckList] = useState("CheckIn");
  const [logCounts, setLogCounts] = useState();
  const [htmlContent, setHtmlContent] = useState();
  // useEffect(() => {
  //   if (inputRef.current) {
  //     inputRef.current.focus();
  //   }
  // }, []);

  useEffect(() => {
    if (!focus) {
      setFocus(true);
    }
  }, [focus]);

  useEffect(() => {
    getVisitorsData();
  }, [isScanned]);

  useEffect(() => {
    if (focus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focus]);

  useEffect(() => {
    if (barcode?.length === 67) {
      scanQr();
    }
  }, [barcode]);

  useEffect(() => {
    if (!socket.connected) {
      socket.on("connect", (data) => {
        console.log("socket_id", socket.id, data);
      });
    }

    // socket.emit("partners", {
    //   partnerId: partnerId,
    //   search: "",
    // });

    socket.on("partnerChatList", (data) => {
      console.log(data);
    });

    // return () => {
    //   newSocket.disconnect();
    // };
  }, []);

  const scanQr = async () => {
    console.log(barcode?.slice(43));
    const { data, error } = await viewAgent(barcode?.slice(43));
    console.log(data);
    if (!error) {
      if (data) {
        console.log(data);
        setIsScanned(!isScanned);
        setUser(data?.results?.agent);
        setFocus(false);
        setHtmlContent(data);
      } else {
        console.log("Data is undefined.");
      }
    }
  };

  const CheckedIn = async () => {
    const { data, error } = await scanQrEntry(user?._id);
    console.log(data);
    if (!error) {
      if (data) {
        setIsScanned(!isScanned);
        setFocus(true);
        setBarcode("");
      } else {
        console.log("Data is undefined.");
      }
    }
  };

  const CheckedOut = async () => {
    const { data, error } = await scanQrExit(user?._id, user?.checkOutId);
    console.log(data);
    if (!error) {
      if (data) {
        setIsScanned(!isScanned);
        setFocus(true);
        setBarcode("");
      } else {
        console.log("Data is undefined.");
      }
    }
  };

  const Deny = async () => {
    setIsScanned(!isScanned);
    setUser([]);
    setFocus(true);
    setBarcode("");
  };

  const getVisitorsData = async () => {
    const { data, error } = await getVisitorsLog();
    console.log(data);
    if (!error) {
      if (data) {
        setCheckedIns(data?.results?.visitors?.usersList);
        setLogCounts(data?.results?.logCount);
      } else {
        console.log("Data is undefined.");
      }
    }
  };

  const handleInput = async (e) => {
    const value = e.target.value;
    await setBarcode(value);
  };

  console.log(barcode?.length);

  return (
    <div className=" ">
      <div class="">
        <DeskHead />
      </div>

      <input
        type="text"
        style={{ opacity: "1%" }}
        id="temp"
        autoComplete="off"
        placeholder="Enter text"
        ref={inputRef}
        value={barcode}
        onInput={handleInput}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
      <div className="admin_main">
        <DeskSidebar />
        <div className="admin_contentpart">
          <div className="row">
            <div className="col-7">
              <div className="row d-flex justify-content-between">
                <div className="col-md-6 mb-4">
                  <a href="javascript:;" className="staticss_box staticss_box1">
                    <span>Today Checked In</span>
                    <div className="static_data">
                      <strong>{logCounts?.checkedIn[0]?.count}</strong>
                    </div>
                  </a>
                </div>
                <div className="col-md-6 mb-4">
                  <a href="javascript:;" className="staticss_box">
                    <span>Live Checked In</span>
                    <div className="static_data">
                      <strong>{logCounts?.liveChecked[0]?.count}</strong>
                    </div>
                  </a>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="row">
                    <div className="col-12 comman_tabs">
                      <ul
                        className="nav nav-tabs border-0"
                        id="myTab"
                        role="tablist"
                      >
                        <li className="nav-item" role="presentation">
                          <button
                            className={
                              checkList === "CheckIn"
                                ? "nav-link shadow active"
                                : "nav-link shadow"
                            }
                            id="home-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#home"
                            type="button"
                            role="tab"
                            aria-controls="home"
                            aria-selected="true"
                            onClick={() => setCheckList("CheckIn")}
                          >
                            Recent Checked In{" "}
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className={
                              checkList === "CheckOut"
                                ? "nav-link shadow active"
                                : "nav-link shadow"
                            }
                            id="profile-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#profile"
                            type="button"
                            role="tab"
                            aria-controls="profile"
                            aria-selected="false"
                            onClick={() => setCheckList("CheckOut")}
                          >
                            Recent Checked Out
                          </button>
                        </li>
                      </ul>
                      <div className="tab-content" id="myTabContent">
                        {checkList === "CheckIn" ? (
                          <div
                            className="tab-pane  show active"
                            id="home"
                            role="tabpanel"
                            aria-labelledby="home-tab"
                          >
                            <div className="row comman_design mx-0">
                              <div className="col-12">
                                <div className="row align-items-center justify-content-between py-md-4 py-3 px-2">
                                  <div className="col-md-auto mb-md-0 mb-3">
                                    <div className="headleft">
                                      <h2>Recent Checked In</h2>
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
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {checkedIns?.map((itm, id) => (
                                            <tr>
                                              <td>{id + 1}</td>
                                              <td>{itm?.agent?.firstName}</td>
                                              <td>
                                                {itm?.entryDate?.slice(0, 10)}{" "}
                                                {itm?.entryTime}
                                              </td>
                                              <td>{itm?.user?.companyName}</td>

                                              <td>{itm?.user?.phoneNumber}</td>
                                              {/* <td>
                                                <div className="d-flex justify-content-center">
                                                  <a
                                                    href="dashboard-checked-in.html"
                                                    className="Table_btn"
                                                  >
                                                    <i className="fa fa-eye" />
                                                  </a>
                                                </div>
                                              </td> */}
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
                        ) : (
                          <div className="row comman_design mx-0">
                            <div className="col-12">
                              <div className="row align-items-center justify-content-between py-md-4 py-3 px-2">
                                <div className="col-md-auto mb-md-0 mb-3">
                                  <div className="headleft">
                                    <h2>Recent Checked Out</h2>
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
                                          <th>Check-Out Time</th>
                                          <th>Company Name</th>
                                          <th>Phone Number</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {checkedIns
                                          ?.filter(
                                            (val) => val?.exitDate !== ""
                                          )
                                          .map((itm, id) => (
                                            <tr>
                                              <td>{id + 1}</td>
                                              <td>{itm?.user?.firstName}</td>
                                              <td>
                                                {itm?.entryDate?.slice(0, 10)}{" "}
                                                {itm?.entryTime}
                                              </td>
                                              <td>{itm?.user?.companyName}</td>

                                              <td>{itm?.user?.phoneNumber}</td>
                                              {/* <td>
                                              <div className="d-flex justify-content-center">
                                                <a
                                                  href="dashboard-checked-in.html"
                                                  className="Table_btn"
                                                >
                                                  <i className="fa fa-eye" />
                                                </a>
                                              </div>
                                            </td> */}
                                            </tr>
                                          ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-5">
              <div className="row comman_design mx-0">
                <div className="col-12">
                  <div className="qr_imgs  ">
                    {/* <img src="assets/img/letter.png" alt="" /> */}
                    {isScanned ? (
                      <div className="d-flex justify-content-center">
                        <div
                          style={{
                            borderRadius: "12px",
                            width: "70%",
                            border: "1px solid #3e4093",
                            position: "relative",
                            top: "-40px",
                          }}
                          className=" h-100 px-2 py-1 bg-white shadow"
                          id="qrDiv"
                        >
                          <div className="text-center mt-4">
                            <div>
                              <img
                                className=""
                                onClick={() =>
                                  (window.location.href =
                                    "https://www.starimporters.com/")
                                }
                                src="/imgs/logo1.png"
                                alt="Company Logo"
                                style={{
                                  width: "clamp(80px, 50%, 200px)",
                                }}
                              />
                            </div>
                          </div>
                          <div
                            className=" py-1 px-3 mt-4"
                            style={{ borderRadius: "20px" }}
                          >
                            <div className="row mt-3">
                              <div className="col-7 mb-3">
                                <img
                                  className=""
                                  id="proImage"
                                  src={
                                    user?.image?.length > 5
                                      ? user?.image
                                      : "/imgs/profileDummy.png"
                                  }
                                  style={{
                                    width: "clamp(60px, 40%, 120px)",
                                    borderRadius: "12px",
                                    maxWidth: "100px",
                                    maxHeight: "100px",
                                    borderRadius: "80px",
                                  }}
                                />
                                <h1 className="comman_heads mt-1">
                                  {user?.firstName}
                                </h1>
                              </div>
                            

                              <div className="col-6 text-start mb-3">
                                <label className="text-danger fw-bold">
                                  STATUS
                                </label>
                                <h1 className="comman_heads">
                                  {user?.status ? "Active" : "In-active"}
                                </h1>
                              </div>

                              <div className="col-6 text-end mb-3">
                                <label className="text-danger fw-bold">
                                  ACCOUNT TYPE
                                </label>
                                <h1 className="comman_heads">
                                {user?.subUser
                                    ? "Sub-account"
                                    : "Main Account"}
                                </h1>
                              </div>

                              <div className="col-6 text-start mb-3">
                                <label className="text-danger fw-bold">
                                  COMPANY NAME
                                </label>
                                <h1 className="comman_heads">
                                  {user?.subUser
                                    ? user?.subUser?.companyName
                                    : user?.user?.companyName}
                                </h1>
                              </div>

                              <div className="col-6 text-end mb-3">
                                <label className="text-danger fw-bold">
                                  ACCOUNT NUMBER
                                </label>
                                <h1 className="comman_heads">
                                  {user?.subUser
                                    ? user?.subUser?.accountNumber
                                    : user?.user?.accountNumber ?? "Not Added"}
                                </h1>
                              </div>

                              <div className="col-6 text-start mb-3">
                                <label className="text-danger fw-bold">
                                  MEMBER'S NAME
                                </label>
                                <h1 className="comman_heads">
                                  {user?.firstName + " " + user?.lastName}
                                </h1>
                              </div>
                              <div className="col-6 text-end mb-3">
                                <label className="text-danger fw-bold">
                                  MEMBER'S CONTACT
                                </label>
                                <h1 className="comman_heads">
                                  {user?.phoneNumber}
                                </h1>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <a>
                        {focus ? (
                          <div className="text-center">
                            <div className="mb-3">
                              {" "}
                              Scan results will appear here..{" "}
                            </div>
                            <span class="loader"></span>
                          </div>
                        ) : (
                          <div>
                            <img
                              onClick={() => {
                                document.getElementById("temp").focus();
                              }}
                              className="scan_icon mb-4"
                              src="/imgs/scan-icon.png"
                              alt=""
                            />
                            <br />
                            <p className="text-center scan_icon">Scan QR</p>
                          </div>
                        )}
                      </a>
                    )}
                  </div>
                  {isScanned && (
                    <div
                      className=" col-12 d-flex justify-content-between px-4"
                      style={{ position: "relative", top: "-120px" }}
                    >
                      <button onClick={() => Deny()} className="comman_btn2">
                        Denied
                      </button>
                      {user?.isCheckedIn ? (
                        <button
                          onClick={() => CheckedOut()}
                          className="comman_btn w-50"
                        >
                          Check Out
                        </button>
                      ) : (
                        <button
                          onClick={() => CheckedIn()}
                          className="comman_btn w-50"
                        >
                          Check In
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisitorDash;
