import React from "react";

const ContactLayout = (props) => {
  return (
    <div className="contact">
      <div className="contact-page">
        <div>
          <h1>{props.page.title}</h1>
        </div>
        <div className="address">
          <h2>{props.page.contact_details.address}</h2>
          <h2>{props.page.contact_details.phone}</h2>
          <h2 className="email">
            <a href="#">{props.page.contact_details.email}</a>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ContactLayout;
