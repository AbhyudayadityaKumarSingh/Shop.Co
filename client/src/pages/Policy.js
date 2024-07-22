import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout>
      <div className="row contactus ">
        <div className="col-md-6 p-5 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4 p-2">
          <h1 className=" text-center py-5">PRIVACY POLICY</h1>
           <ul>
           
            <li>When you use our services, you’re trusting us with your information. We understand this is a big responsibility and work hard to protect your information and put you in control.
            </li>
           </ul>
          
        </div>
      </div>
    </Layout>
  );
};

export default Policy;