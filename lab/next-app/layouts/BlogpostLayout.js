import React from "react";

function dateSetter(params) {
  const date = new Date(params);
  const yy = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
  const mm = new Intl.DateTimeFormat("en", { month: "short" }).format(date);
  const dd = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);
  return `${mm}-${dd}-${yy}`;
}

const BlogPostLayout = (props) => {
  const result = props.page;
  function createContent(data, idx) {
    return <div key={idx} dangerouslySetInnerHTML={{ __html: data }} />;
  }
  function createQuotes(data, idx) {
    return (
      <div className="blog-quotes" key={idx}>
        <h2 className="blog-quote-title"> Quotes</h2>
        <blockquote
          className="blog-blockquote"
          dangerouslySetInnerHTML={{ __html: data }}
        />
      </div>
    );
  }
  function createSocialNetwork(data, idx) {
    return (
      <div key={idx} className="social-network">
        <h2 className="social-title"> Social Network</h2>
        <div
          className="embeded-codes"
          dangerouslySetInnerHTML={{ __html: data }}
        />
      </div>
    );
  }
  return (
    <div className="blog-post-page">
      <div className="hero-banner">
        <ul>
          <li>
            <img
              className="banner-image"
              src={result.hero_banner.banner_image.url}
              alt={result.hero_banner.banner_image.filename}
              height="550px"
            />
            <div className="banner-content">
              <h1>{result.title}</h1>
              <div>
                <span className="blog-post-timestamp">
                  {dateSetter(result.publish_date)}
                </span>
                ,
                <span className="blog-post-author">
                  {result.author[0].title}
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="blog-content">
        {result.blog_body.map((post) =>
          Object.entries(post).map((data, idx) => {
            if (data[0] === "rich_text_editor" && data[1] !== null) {
              return createContent(data[1].rich_text, idx);
            }
            if (data[0] === "quotes" && data[1] !== null) {
              return createQuotes(data[1].quote, idx);
            }
            if (data[0] === "social_network_embed" && data[1] !== null) {
              return createSocialNetwork(data[1].embed_code, idx);
            }
          })
        )}
      </div>
    </div>
  );
};

export default BlogPostLayout;
