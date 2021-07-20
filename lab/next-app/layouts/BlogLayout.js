import React from "react";

const dateSetter = (params) => {
  const date = new Date(params);
  const yy = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
  const mm = new Intl.DateTimeFormat("en", { month: "short" }).format(date);
  const dd = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);
  return `${mm}-${dd}-${yy}`;
};

const BlogLayout = (props) => {
  const data = props.allpost;
  return (
    <div className="blog-list-page">
      <div className="hero-banner">
        <ul>
          <li>
            <img
              className="banner-image"
              src={props.blogs.hero_banner[0].banner_image.url}
              alt={props.blogs.hero_banner[0].banner_image.filename}
            />
            <div className="banner-content">
              <h1>Blog Lists</h1>
            </div>
          </li>
        </ul>
      </div>
      <div className="blog-list-container">
        {data.map((list, idx) =>
          idx % 2 === 0 ? (
            <div className="blog-list" key={idx}>
              <div className="left-section">
                <div>
                  <img
                    className="list-images"
                    src={list.hero_banner.banner_image.url}
                    alt={list.hero_banner.banner_image.filename}
                  />
                </div>
              </div>
              <div className="right-section">
                <h2>{list.title}</h2>
                <div>
                  <span className="timestamp">
                    {dateSetter(list.publish_date)}
                  </span>
                  ,<span className="post-author">{list.author[0].title}</span>
                </div>
                <p className="blog-post">
                  {`${list.blog_body[0].rich_text_editor.rich_text.slice(
                    3,
                    150
                  )}...`}
                </p>
                <a className="post-link" href={`${list.url}`}>
                  Read More
                </a>
              </div>
            </div>
          ) : (
            <div className="blog-list" key={idx}>
              <div className="left-section">
                <h2>{list.title}</h2>
                <div>
                  <span className="timestamp">
                    {dateSetter(list.publish_date)}
                  </span>
                  ,<span className="post-author">{list.author[0].title}</span>
                </div>
                <p className="blog-post">
                  {`${list.blog_body[0].rich_text_editor.rich_text.slice(
                    3,
                    150
                  )}...`}
                </p>
                <a className="postlink" href={`${list.url}`}>
                  Read More
                </a>
              </div>
              <div className="right-section">
                <div>
                  <img
                    className="list-images"
                    src={list.hero_banner.banner_image.url}
                    alt={list.hero_banner.banner_image.filename}
                  />
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default BlogLayout;
