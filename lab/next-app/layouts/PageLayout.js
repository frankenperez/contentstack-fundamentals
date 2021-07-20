import React from "react";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PageLayout = (props) => {
  const metaData = (seo) => {
    let metaArr = [];
    for (const key in seo) {
      metaArr.push(
        <meta name={key.split("meta_")[1]} content={seo[key]} key={key} />
      );
    }
    return metaArr;
  };
  return (
    <>
      <Head>
        <title>Next and Contentstack Project</title>
        <link
          type="text/css"
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
          crossorigin="anonymous"
        />
        {props.seo ? metaData(props.seo) : null}
      </Head>
      {props.header ? <Header header={props.header} /> : ""}
      <main>{props.children}</main>
      {props.footer ? <Footer footer={props.footer} /> : ""}
    </>
  );
};

export default PageLayout;
