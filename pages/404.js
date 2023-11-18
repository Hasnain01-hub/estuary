import Link from "next/link";
import React from "react";

const ErrorPage = () => {
  return (
    <>
      <div className="error-page-content d-flex align-items-center justify-content-center">
        <div>
          <div className="row">
            <div className="col-xxl-6 col-lg-7 m-auto">
              <h2>Opps! you’r on the wrong place.</h2>
              <p className="me-xxl-5 ms-xxl-5">
                Can not find what you need? Take a moment and do a search below
                or start from our Homepage.
              </p>
              <a href="/" className="btn-eight">
                Back to home
              </a>
            </div>
          </div>
          <img src="/assets/notfound.svg" alt="" className="m-auto" />
        </div>
        <img
          src="images/shape/shape_49.svg"
          alt=""
          className="shapes shape-one w-100"
        />
      </div>
    </>
  );
};

export default ErrorPage;
