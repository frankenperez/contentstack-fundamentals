import React from "react";
import Stack from "../../services/contentstack";
import PageLayout from "../../layouts/PageLayout";
import BlogPostLayout from "../../layouts/BlogpostLayout.js";

export default function BlogPosts(props) {
  return (
    <PageLayout
      header={props.data.header[0]}
      footer={props.data.footer[0]}
      seo={props.data.result.seo}
    >
      <BlogPostLayout page={props.data.result} />
    </PageLayout>
  );
}

export async function getServerSideProps({ params }) {
  const postLink = params.post;
  try {
    const result = await Stack.getEntry("blog_posts", "en-us", {
      url: `/blog/${postLink}`,
      refs: ["author"],
    });

    const header = await Stack.getEntry("header", "en-us");
    const footer = await Stack.getEntry("footer", "en-us");
    return {
      props: {
        data: {
          result: result[0],
          header,
          footer,
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
