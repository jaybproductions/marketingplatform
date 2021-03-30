import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Checkbox, TextField } from "@material-ui/core";
import PackageContainer from "./PackageContainer";

//Gathering basic information about their domain and choosing a package for aws instance
const Step2 = ({ selectedPackage, setSelectedPackage }) => {
  const [checkedYes, setCheckedYes] = useState(false);
  const [checkedNo, setCheckedNo] = useState(false);
  const [checkError, setCheckError] = useState(false);

  useEffect(() => {
    checker();
  }, [checkedYes, checkedNo]);

  const checker = () => {
    if (checkedYes && checkedNo) {
      toast.error("Please only choose one option.");
      setCheckError(true);
      return;
    } else {
      setCheckError(false);
    }
  };

  return (
    <div className="step-2">
      Do you have a domain? Yes:{" "}
      <Checkbox
        checked={checkedYes}
        onChange={(e) => setCheckedYes(e.target.checked)}
        inputProps={{ "aria-label": "primary checkbox" }}
      />
      No:{" "}
      <Checkbox
        checked={checkedNo}
        onChange={(e) => setCheckedNo(e.target.checked)}
        inputProps={{ "aria-label": "primary checkbox" }}
      />
      {!checkError && checkedYes && (
        <>
          <div className="yes-option">
            <TextField
              id="outlined-basic"
              label="Domain Name"
              variant="outlined"
            />
            <div className="how-to">
              <p>
                Once your server is setup, all you need to do is change your DNS
                "A" record to the public IP address of the server.
              </p>
            </div>
          </div>
        </>
      )}
      {!checkError && checkedNo && (
        <>
          <div className="no-option">
            <div className="how-to">
              <p>
                If you do not have a domain, you will still be able to purchase
                a server, but you will need to purchase a domain from a
                registrar (e. Godaddy or Google Domains) once you are ready to
                take your site live. Please see FAQ's for information on how to
                point your domain to the server.
              </p>
            </div>
          </div>
        </>
      )}
      <div
        className="choose-package"
        style={{ paddingBottom: "20px", width: "100%" }}
      >
        {!checkError && checkedNo && (
          <>
            <PackageContainer
              selectedPackage={selectedPackage}
              setSelectedPackage={setSelectedPackage}
            />{" "}
          </>
        )}
        {!checkError && checkedYes && (
          <>
            <PackageContainer
              selectedPackage={selectedPackage}
              setSelectedPackage={setSelectedPackage}
            />{" "}
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Step2;
