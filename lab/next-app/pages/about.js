import React from "react";
import Stack from "../services/contentstack";
import PageLayout from "../layouts/PageLayout";
import AboutLayout from "../layouts/AboutLayout";

export default function About(props) {
  return (
    <PageLayout
      header={props.data.header[0]}
      footer={props.data.footer[0]}
      seo={props.data.result[0].seo}
    >
      <AboutLayout page={props.data.result[0]} />
    </PageLayout>
  );
}

export async function getStaticProps() {
  try {
    const result = await Stack.getEntry("about", "en-us");

    const header = await Stack.getEntry("header", "en-us");
    const footer = await Stack.getEntry("footer", "en-us");
    return { props: { data: { result, header, footer } } };
  } catch (error) {
    console.error(error);
    return {
      props: {
        error,
      },
    };
  }
}
