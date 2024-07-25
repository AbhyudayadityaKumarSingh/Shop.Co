import React from "react";
import { FaLinkedinIn , FaTwitter} from "react-icons/fa";

import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title='About me '>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/20230309_100345.jpg"
            className="img-me"
            alt="contactus"
            style={{ width: "70%" }}
          />
        </div>
        <div className="col-md-4">
        <h1 className=" text-center py-5">ABOUT ME</h1>
          <p className="text-center mt-2">
            Hi , I am <strong>Abhyudayaditya Kumar Singh </strong>, a full stack developer. I have
            experience in developing web applications using MERN stack. I have
            worked on various projects and have experience in developing
            responsive web applications. I have also worked on various
            technologies like Node.js, Express.js, React.js, MongoDB, HTML, CSS,
            Bootstrap, JavaScript, etc. Feel free to connect with me .
          </p>
            <div >
                <h4 className="text-center">Connect with me on :
                </h4> 
                <a href="https://www.linkedin.com/in/abhyudayaditya-kumar-singh-4a0b3b1b7/" className="text-center">
                    <FaLinkedinIn size={25} />
                </a>
                <a href="https://twitter.com/Abhyudayaditya" className="text-center">
                    <FaTwitter size={25}  />
                </a>


            </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;