import React from "react";

const Header = (props) => {
  return (
    <header>
      <a className="logo" href="/">
        <span className="logo-text">
          <span className="logo-title">{props.header.logo_title}</span>
        </span>
      </a>
      <nav className="nav-menu">
        {props.header.nav_menu.link.map((item, index) => (
          <a href={item.href} key={index}>
            {item.title}
          </a>
        ))}
      </nav>
    </header>
  );
};

export default Header;
