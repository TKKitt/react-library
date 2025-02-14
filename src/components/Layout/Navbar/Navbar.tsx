// React
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

// Styles & Default Assets
import styles from "./Navbar.module.scss";
import DefaultBrand from "../../../assets/images/DefaultBrand.png";

// Icons
import { FaChevronDown } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";

export interface NavbarProps {
  brandImage: string | React.ReactNode;
  dropdowns?: { label: string; links: { label: string; to: string }[] }[];
  links: { label: string; to: string }[];
  specialLinks?: { label: string; to: string }[];
  cart?: string;
  profile?: string;
  onLinkClick?: (to: string) => void;
  primaryColor?: string;
  textColor?: string;
  hoverColor?: string;
}

const Navbar: React.FC<NavbarProps> = ({
  brandImage,
  dropdowns,
  links,
  specialLinks,
  cart,
  profile,
  onLinkClick,
  primaryColor,
  textColor,
  hoverColor,
}) => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const navbarStyle = {
    // If colors are provided, use them. Otherwise use global defaults.
    "--primary-color": primaryColor || "var(--default-color-background)",
    "--text-color": textColor || "var(--default-color-text)",
    "--hover-color": hoverColor || "var(--default-color-hover)",
  } as React.CSSProperties;

  let isRouterAvailable = true; // If router is available, use <Link to>, otherwise use <a href>
  try {
    useLocation();
  } catch (e) {
    isRouterAvailable = false;
  }

  const handleDropdownClick = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <nav className={styles.navbar} style={navbarStyle}>
      <div className={styles.brand}>
        {brandImage ? (
          typeof brandImage === "string" ? (
            <img src={brandImage} alt="Brand" />
          ) : (
            brandImage
          )
        ) : (
          <img src={DefaultBrand} alt="Brand" />
        )}
      </div>
      <ul className={styles.navLinks}>
        {dropdowns &&
          dropdowns.map((dropdown, index) => (
            <li
              key={index}
              className={`${styles.dropdown} ${
                openDropdown === index ? styles.open : ""
              }`}
            >
              <span
                className={styles.dropdownLabel}
                onClick={() => handleDropdownClick(index)}
              >
                {dropdown.label} <FaChevronDown />
              </span>
              <ul className={styles.dropdownMenu}>
                {dropdown.links.map((link, subIndex) => (
                  <li key={subIndex}>
                    {isRouterAvailable ? (
                      <Link
                        to={link.to}
                        onClick={() => onLinkClick && onLinkClick(link.to)}
                        className={styles.navLink}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.to}
                        onClick={() => onLinkClick && onLinkClick(link.to)}
                        className={styles.navLink}
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        {links.map((link, index) => (
          <li key={index}>
            {isRouterAvailable ? (
              <Link
                to={link.to}
                onClick={() => onLinkClick && onLinkClick(link.to)}
                className={styles.navLink}
              >
                {link.label}
              </Link>
            ) : (
              <a
                href={link.to}
                onClick={() => onLinkClick && onLinkClick(link.to)}
                className={styles.navLink}
              >
                {link.label}
              </a>
            )}
          </li>
        ))}
        {(specialLinks || cart || profile) && (
          <li className={styles.divider}></li>
        )}
        {specialLinks && (
          <>
            {specialLinks.map((specialLink, index) => (
              <li key={index}>
                {isRouterAvailable ? (
                  <Link
                    to={specialLink.to}
                    onClick={() => onLinkClick && onLinkClick(specialLink.to)}
                    className={styles.navLink}
                  >
                    {specialLink.label}
                  </Link>
                ) : (
                  <a
                    href={specialLink.to}
                    onClick={() => onLinkClick && onLinkClick(specialLink.to)}
                    className={styles.navLink}
                  >
                    {specialLink.label}
                  </a>
                )}
              </li>
            ))}
          </>
        )}
        {cart && (
          <>
            <li>
              <FontAwesomeIcon
                icon={faShoppingCart}
                className={styles.icon}
                href={cart}
              />
            </li>
          </>
        )}
        {profile && (
          <>
            <li>
              <FontAwesomeIcon
                icon={faUser}
                className={styles.icon}
                href={profile}
              />
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
