import React, { useEffect, useState } from "react";
import { assets } from "../../assets/data";
import Navbar from "./Navbar";
import { Link, useLocation } from "react-router-dom";
import { useClerk, UserButton } from "@clerk/clerk-react";
import { useAppContext } from "../../context/AppContext";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openSignIn } = useClerk();
  const { navigate, user, getCartCount, isOwner } = useAppContext();
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpened((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMenuOpened(false);
      }
    };

    handleScroll();
    handleResize();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 glass-strong"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-padd-container flexBetween">
        {/* Logo */}
        <div className="flex flex-1">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-accent-dim/30 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img 
                src={assets.logoImg} 
                alt="NusaRasa" 
                className="h-10 w-10 relative z-10 transition-transform duration-500 group-hover:scale-110" 
              />
            </div>
            <div className="hidden sm:block">
              <span className="font-display font-bold text-xl tracking-tight text-accent">
                NUSA
              </span>
              <span className="font-display font-light text-xl tracking-tight text-accent-dim">
                RASA
              </span>
            </div>
          </Link>
        </div>

        {/* Navbar - Center */}
        <div className="hidden lg:flex flex-1 justify-center">
          <Navbar
            setMenuOpened={setMenuOpened}
            containerStyles="flex items-center gap-1 px-2 py-1 rounded-full glass"
          />
        </div>

        {/* Right Side Actions */}
        <div className="flex flex-1 items-center justify-end gap-4">
          {/* Dashboard Button (Owner only) */}
          {isOwner && (
            <button
              onClick={() => navigate("/owner")}
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-accent-soft hover:text-accent transition-colors duration-300"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                />
              </svg>
              Dashboard
            </button>
          )}

          {/* Cart */}
          <button
            onClick={() => navigate("/cart")}
            className="relative btn-icon group"
          >
            <svg
              className="w-5 h-5 text-accent-soft transition-transform duration-300 group-hover:scale-110 group-hover:text-accent"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            {getCartCount() > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-primary text-[10px] font-bold rounded-full flexCenter animate-scale-in">
                {getCartCount()}
              </span>
            )}
          </button>

          {/* User Profile */}
          <div>
            {user ? (
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: {
                      width: "40px",
                      height: "40px",
                      border: "2px solid rgba(180,180,180,0.2)",
                    },
                  },
                }}
              >
                <UserButton.MenuItems>
                  <UserButton.Action
                    label="My Orders"
                    labelIcon={
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                    }
                    onClick={() => navigate("/my-orders")}
                  />
                </UserButton.MenuItems>
              </UserButton>
            ) : (
              <button
                onClick={openSignIn}
                className="btn-primary corner-cut-sm flex items-center gap-2"
              >
                <span>Login</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="lg:hidden btn-icon"
            aria-label="Toggle menu"
          >
            <div className="w-5 h-5 relative flex flex-col justify-center items-center">
              <span
                className={`absolute w-5 h-0.5 bg-accent-soft transition-all duration-300 ${
                  menuOpened ? "rotate-45" : "-translate-y-1.5"
                }`}
              />
              <span
                className={`absolute w-5 h-0.5 bg-accent-soft transition-all duration-300 ${
                  menuOpened ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute w-5 h-0.5 bg-accent-soft transition-all duration-300 ${
                  menuOpened ? "-rotate-45" : "translate-y-1.5"
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 overflow-hidden transition-all duration-500 ${
          menuOpened ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="glass-strong mx-4 mt-2 rounded-2xl overflow-hidden">
          <Navbar
            setMenuOpened={setMenuOpened}
            containerStyles="flex flex-col p-4 gap-2"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
