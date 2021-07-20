import React from "react";
import Layout from "./PageLayout";

const HomeLayout = (props) => {
  const herobanner = props.page.hero_banner.map((item, index) => (
    <div key={index}>
      <ul>
        <li>
          <img className="fullwidth" src={item.image.url} />
          <div className="banner-content">
            <h1>{item.title}</h1>
            <h3>{item.description}</h3>
          </div>
        </li>
      </ul>
    </div>
  ));
  const section_heading = props.page.portfolio_section.heading.map(
    (heading, index) => (
      <div key={index} className="portfolio-box clearfix">
        <div className="image">
          <i className={`fa ${heading.fontawesome_icon}`} aria-hidden="true" />
        </div>
        <div className="portfolio-desc">
          <h3>{heading.title}</h3>
          <p>{heading.description}</p>
        </div>
      </div>
    )
  );
  return (
    <Layout>
      <div className="wrapper">
        <div className="hero-banner" id="">
          {herobanner}
        </div>
        <div className="portfolio clearfix">
          <div className="container clearfix">
            <h2 className="portfolio-title">
              {props.page.portfolio_section.title}
            </h2>
            <h3 className="portfolio-desc">
              {props.page.portfolio_section.description}
            </h3>
            {section_heading}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomeLayout;
