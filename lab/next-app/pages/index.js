import React from "react";
import Stack from "../services/contentstack";
import PageLayout from "../layouts/PageLayout";
import HomeLayout from "../layouts/HomeLayout";

export default function Home(props) {
  return (
    <PageLayout
      header={props.data.header[0]}
      footer={props.data.footer[0]}
      seo={props.data.result[0].seo}
    >
      <HomeLayout page={props.data.result[0]} />
    </PageLayout>
  );
}

export async function getStaticProps() {
  try {
    const result = await Stack.getEntry("home", "en-us");
    const header = await Stack.getEntry("header", "en-us");
    const footer = await Stack.getEntry("footer", "en-us");
    return {
      props: {
        data: { result, header, footer },
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        error,
      },
    };
  }
}
