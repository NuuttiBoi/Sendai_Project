import { NavLink } from 'react-router-dom'
// import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap' sori tää import crashas koko apin :'D
import {useState} from "react";
import {useEffect} from "react"
import React from 'react';
import Hamburger from "./img/Hamburger";

const Navigation = () => {
    const [darkMode, setDarkMode] = useState(true);

    const [theme, setTheme] = useState('light');
    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };
    useEffect(() => {
        document.body.className = theme;
    }, [theme]);


    const toggleMenu = (event) => {
        event.preventDefault()
        document.getElementById('main-nav-links').classList.toggle('hideOnMobile')
    }


    return (
        <nav className="main-nav">
            <div className="nav-wrapper">
                <div className="nav-header">
                    <button id="mobileMenu" className="mobileMenu" onClick={toggleMenu}><Hamburger /></button>
                </div>
                <ul id="main-nav-links" className="hideOnMobile">
                    <li>
                        <div className={`App ${theme}`}>
                            <button id="darkmodeBtn" onClick={toggleTheme} className="navlink">
                                Darkmode</button>
                        </div>
                    </li>
                    <li>

                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navigation