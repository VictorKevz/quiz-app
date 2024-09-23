import React, { useEffect, useState } from "react";
import schoolIcon from "../assets/images/school-icon.svg"
import Switch from "@mui/material/Switch";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import "../css/header.css";

function Header({ checked, setChecked }) {
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <header className={`header wrapper`}>
      <div className={`header-inner ${!checked && "card-bg-light"} container`}>
        <div className="logo-wrapper">
          <img src={schoolIcon} className="logo-icon" />
          <h1 className={`logo-text ${!checked && "heading-text-light"}`}>Quiz App</h1>
        </div>
        <div className="toggle-container">
        <LightModeIcon fontSize="large" className={`toggle-icon ${!checked && "header-icons-light"}`}/>
        <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
          <DarkModeIcon fontSize="large" className={`toggle-icon ${!checked && "header-icons-light"}`}/>
        </div>
      </div>
    </header>
  );
}

export default Header;
