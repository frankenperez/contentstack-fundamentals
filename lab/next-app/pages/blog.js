import React from "react";
import Stack from "../services/contentstack";
import PageLayout from "../layouts/PageLayout";
import BlogLayout from "../layouts/BlogLayout";

export default function Blogs(props) {
  return (
    <PageLayout
      header={props.data.header[0]}
      footer={props.data.footer[0]}
      seo={props.data.blogs[0].seo}
    >
      <BlogLayout blogs={props.data.blogs[0]} allpost={props.data.allpost} />
    </PageLayout>
  );
}

export async function getStaticProps() {
  try {
    let result = await Stack.getEntry("blog_posts", "en-us", {
      refs: ["author"],
    });
    result = result.sort((prev, next) => prev.publish_date - next.publish_date);
    const blogs = await Stack.getEntry("blogs", "en-us");
    const header = await Stack.getEntry("header", "en-us");
    const footer = await Stack.getEntry("footer", "en-us");
    return {
      props: {
        data: {
          header,
          footer,
          blogs,
          allpost: result,
        },
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
