import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
const Contact = () => {
  return (
    <Layout title='Contact us @ E-Commerce'>
      <div className="row contactus ">
        <div className="col-md-6 p-5">
          <img 
            src="/images/contact.jpeg"
            alt="contactus"
            style={{ width: "100%"  }}
          />
        </div>
        <div className="col-md-4">
          <h1 className=" text-center">CONTACT US</h1>
          <p className="text-justify  mt-2 p-3">
            If you have any queries or suggestions, feel free to contact us.
             We will try to reach you as soon as
            possible.
          </p>
          <p className="mt-3 ">
            <BiMailSend /> : abhyudayadityakumarsingh@gmail.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : +91-8840635108
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-0000-0000 (toll free)
          </p>
        </div>
      </div>
    </Layout>
  );
};



export default Contact;