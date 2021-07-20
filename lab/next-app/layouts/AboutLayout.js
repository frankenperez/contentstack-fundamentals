import React from "react";

const AboutLayout = (props) => {
  const aboutSec = props.page.about.about_content.map((aboutSec, index) => (
    <div className="thumbnail-box clearfix" key={index}>
      <div className="about-content--left">
        <img src={aboutSec.image.url} alt={aboutSec.image.filename} />
      </div>
      <ul className="about-content--right">
        <li>
          <h2>{aboutSec.title}</h2>
          <p>{aboutSec.description}</p>
          <a href={aboutSec.cta.href} className="cta-link">
            {aboutSec.cta.title}
          </a>
        </li>
      </ul>
    </div>
  ));
  return (
    <div className="about-page">
      <div id="" className="center head">
        <h1>{props.page.title}</h1>
      </div>
      <div className="thumbnail-content">
        <div className="">{aboutSec}</div>
        <div className="clearfix" />
      </div>
    </div>
  );
};

export default AboutLayout;
