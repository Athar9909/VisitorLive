import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import { useParams } from "react-router-dom";
import axios from "axios";
import { viewAgent } from "../apiServices/partnerHttpService/partnerLoginHttpService";

const GeneratedQr = () => {
  let { id } = useParams();
  const [user, setUser] = useState([]);

  console.log(id);
  const getUser = async () => {
    const { data, error } = await viewAgent(id);
    if (!error) {
      if (!data.error) {
        setUser(data.results.agent);
        document.getElementById("qrImage").src = data?.results?.agent?.qrcode;
      }
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  let profileImage = "";

  const waitForImagesToLoad = (element) => {
    const imgElements = element.getElementsByTagName("img");
    const promises = [];

    for (let img of imgElements) {
      if (!img.complete) {
        promises.push(
          new Promise((resolve, reject) => {
            img.onload = () => {
              console.log(`Image loaded: ${img.src}`);
              resolve();
            };
            img.onerror = () => {
              console.error(`Failed to load image: ${img.src}`);
              reject(new Error(`Failed to load image: ${img.src}`));
            };
          })
        );
      } else {
        console.log(`Image already loaded: ${img.src}`);
      }
    }

    return Promise.all(promises);
  };

  const printDoc = async () => {
    const divToCapture = document.getElementById("qrDiv");
    try {
      await waitForImagesToLoad(divToCapture); // Wait for all images to load
      console.log("All images loaded");

      await html2canvas(divToCapture, { useCORS: true })
        .then((canvas) => {
          canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);

            // Print the image on the same screen
            const printContainer = document.createElement("div");
            printContainer.style.position = "fixed";
            printContainer.style.top = "0";
            printContainer.style.left = "0";
            printContainer.style.width = "100%";
            printContainer.style.height = "100%";
            printContainer.style.background = "white";
            printContainer.style.zIndex = "10000"; // Make sure it's on top
            printContainer.style.display = "flex";
            printContainer.style.alignItems = "center";
            printContainer.style.justifyContent = "center";

            const img = document.createElement("img");
            img.src = url;
            img.style.maxWidth = "100%";
            img.style.maxHeight = "100%";

            // Append the image and print container to the body
            printContainer.appendChild(img);
            document.body.appendChild(printContainer);

            // Wait until the image is fully loaded
            img.onload = () => {
              setTimeout(() => {
                window.print();
                printContainer.remove(); // Clean up after printing
                URL.revokeObjectURL(url); // Release the object URL
              }, 1000); // Wait for 1000ms to ensure the image is rendered
            };

            img.onerror = (error) => {
              console.error("Error loading captured image for print:", error);
            };
          });
        })
        .catch((error) => {
          console.error("Error capturing div:", error);
        });
    } catch (error) {
      console.error("Error waiting for images to load:", error);
    }
  };

  const captureDiv = async () => {
    const divToCapture = document.getElementById("qrDiv");
    await waitForImagesToLoad(divToCapture);

    await html2canvas(divToCapture, { useCORS: true }).then((canvas) => {
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.download = "divImage.png";
        link.href = url;
        document.body.appendChild(link);

        link.click();

        URL.revokeObjectURL(url); // Release the object URL
        document.body.removeChild(link); // Remove link from the DOM
      });
    });
  };

  return (
    <div
      className="mt-0"
      style={{
        padding: "20px 20px",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        overflow:"scroll"
      }}
    >
      <div>
        <div className="d-flex">
          <button
            className="comman_btn mb-2 print_btn w-50"
            onClick={() => captureDiv()}
          >
            Download
          </button>
          <button
            className="comman_btn mb-2 mx-2 print_btn w-50"
            onClick={() => printDoc()}
          >
            Print
          </button>
        </div>

        <div
          style={{
            borderRadius: "20px",
            width: "500px",
            border: "1px solid #3e4093",
          }}
          className=" h-100 px-2 py-1 bg-white"
          id="qrDiv"
        >
          <div className="text-center mt-4">
            <div>
              <img
                className=""
                onClick={() =>
                  (window.location.href = "https://www.starimporters.com/")
                }
                src="/imgs/logo.png"
                alt="Company Logo"
                style={{
                  width: "clamp(80px, 50%, 200px)",
                }}
              />
              <h2 className=" mt-2 fw-bold  fs-4 text-center text-dark headOrder">
                Star Importers & Wholesalers
              </h2>
            </div>
          </div>
          <div className=" py-1 px-3 mt-4" style={{ borderRadius: "20px" }}>
            <div className="row mt-3">
              <div className="col-6 mb-3">
                {profileImage?.length > 0 && (
                  <img
                    className=""
                    id="proImage"
                    src={profileImage}
                    style={{
                      width: "clamp(60px, 50%, 120px)",
                      borderRadius: "12px",
                      maxWidth: "100px",
                      maxHeight: "100px",
                      borderRadius: "80px",
                    }}
                  />
                )}
                <h1 className="fs-6 mt-1">{user?.firstName}</h1>
              </div>
              <div className="col-6 text-end mb-3 align-end">
                <label className="text-danger fw-bold">Status</label>
                <h1 className="fs-6">
                  {user?.status ? "Active" : "In-active"}
                </h1>
              </div>

              <div className="col-6 text-start mb-3">
                <label className="text-danger fw-bold">COMPANY NAME</label>
                <h1 className="fs-6">{user?.companyName}</h1>
              </div>

              <div className="col-6 text-end mb-3">
                <label className="text-danger fw-bold">ACCOUNT NUMBER</label>
                <h1 className="fs-6">{user?.accountNumber}</h1>
              </div>

              <div className="col-6 text-start mb-3">
                <label className="text-danger fw-bold">MEMBER'S NAME</label>
                <h1 className="fs-6">
                  {user?.firstName + " " + user?.lastName}
                </h1>
              </div>
              <div className="col-6 text-end mb-3">
                <label className="text-danger fw-bold">MEMBER'S CONTACT</label>
                <h1 className="fs-6">{user?.phoneNumber}</h1>
              </div>

              <div className="col-12 mb-3 mt-3  text-center">
                <img
                  className=""
                  onClick={() =>
                    (window.location.href = "https://www.starimporters.com/")
                  }
                  src={user?.qrCode}
                  alt="Qr"
                  id="qrImage"
                  width={140}
                />
              </div>
              <div className="col-12 text-center">
                <a href="https://www.starimporters.com">
                  www.starimporters.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratedQr;
