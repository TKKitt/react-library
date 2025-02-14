import React, { useState } from 'react';
import styles from './Navbar.module.scss';
import { Link, useLocation } from "react-router-dom";
import DefaultBrand from '../../../assets/images/DefaultBrand.png';
import { FaChevronDown } from 'react-icons/fa';

export interface NavbarProps {
    brandImage: string | React.ReactNode;
    dropDowns?: { label: string; links: {label: string; to: string; }[]}[];
    links: { label: string; to: string; }[];
    onLinkClick?: (to: string) => void;
    primaryColor?: string;
    textColor?: string;
}

const Navbar: React.FC<NavbarProps> = ({ brandImage, dropDowns, links, onLinkClick, primaryColor, textColor }) => {
    const [openDropdown, setOpenDropdown] = useState<number | null>(null);

    const navbarStyle = {
        '--primary-color': primaryColor || 'var(--primary-color)',
        '--text-color': textColor || 'var(--text-color)',
    } as React.CSSProperties;

    let isRouterAvailable = true;
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
                {brandImage ? (typeof brandImage === "string" ? <img src={brandImage} alt="Brand" /> : brandImage) : <img src={DefaultBrand} alt="Brand" />}
            </div>
            <ul className={styles.navLinks}>
                {dropDowns && dropDowns.map((dropdown, index) => (
                    <li key={index} className={`${styles.dropdown} ${openDropdown === index ? styles.open : ''}`}>
                        <span className={styles.dropdownLabel} onClick={() => handleDropdownClick(index)}>
                            {dropdown.label} <FaChevronDown />
                        </span>
                        <ul className={styles.dropdownMenu}>
                            {dropdown.links.map((link, subIndex) => (
                                <li key={subIndex}>
                                    {isRouterAvailable ? (
                                        <Link to={link.to} onClick={() => onLinkClick && onLinkClick(link.to)} className={styles.navLink}>{link.label}</Link>
                                    ) : (
                                        <a href={link.to} onClick={() => onLinkClick && onLinkClick(link.to)} className={styles.navLink}>{link.label}</a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
                {links.map((link, index) => (
                    <li key={index}>
                        {isRouterAvailable ? (
                            <Link to={link.to} onClick={() => onLinkClick && onLinkClick(link.to)} className={styles.navLink}>{link.label}</Link>
                        ) : (
                            <a href={link.to} onClick={() => onLinkClick && onLinkClick(link.to)} className={styles.navLink}>{link.label}</a>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;