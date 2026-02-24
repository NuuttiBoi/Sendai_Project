import { NavLink } from 'react-router-dom'
import ColorThemes from './Colorthemes'
import React from "react";

/**
 * Class that defines the footer for the application.
 */

const Footer = () => {
    return (
        <footer className="main-footer">
            <ColorThemes />
            <p>Icon by: <a href="https://www.flaticon.com/free-animated-icons/calendar" title="calendar animated icons">Calendar
                animated icons created by Freepik - Flaticon</a></p>
        </footer>
    )
}

export default Footer