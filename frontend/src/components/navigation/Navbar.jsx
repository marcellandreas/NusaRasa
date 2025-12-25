import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ containerStyles, setMenuOpened }) => {
  const navLinks = [
    { path: "/", title: "Home" },
    { path: "/menu", title: "Menu" },
    { path: "/blog", title: "Blog" },
    { path: "/contact", title: "Contact" },
  ];

  return (
    <nav className={containerStyles}>
      {navLinks.map((link, index) => (
        <NavLink
          onClick={() => setMenuOpened(false)}
          to={link.path}
          key={link.title}
          className={({ isActive }) =>
            `relative px-5 py-2.5 text-sm font-medium tracking-wide transition-all duration-300 rounded-full
            ${isActive 
              ? "text-accent bg-surface" 
              : "text-accent-dim hover:text-accent hover:bg-surface/50"
            }`
          }
          style={{ animationDelay: `${index * 50}ms` }}
        >
          {link.title}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;
