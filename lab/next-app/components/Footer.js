import React from "react";

const Footer = (props) => {
  return (
    <footer>
      <div className="copyright">
        <div>{props.footer.copyright}</div>
      </div>
    </footer>
  );
};

export default Footer;
