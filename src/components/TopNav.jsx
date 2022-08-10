import React from "react";

// Icon Imports
import menuIcon from "../media/icon-menu.svg";
import documentIcon from "../media/icon-document.svg";
import deleteIcon from "../media/icon-delete.svg";
import saveIcon from "../media/icon-save.svg";

const TopNav = ({ docTitle, menuFunction, deleteFunction }) => {
  return (
    <nav className="flex flex-row justify-between items-center">
      <button
        id="navSideBarBtn"
        className="flex justify-center items-center h-14 w-14 bg-slate-700 hover:bg-slate-800 active:bg-slate-900"
        onClick={menuFunction}
      >
        <img src={menuIcon} alt="menu icon" />
      </button>
      <div className="flex justify-start grow items-center">
        <img src={documentIcon} alt="document icon" className="p-4" />
        <p className="text-white">{docTitle}.md</p>
      </div>
      <button className="mr-2 ml-2 p-2 rounded bg-slate-600 hover:bg-slate-700 active:bg-slate-900">
        <img
          src={deleteIcon}
          alt="delete icon"
          className="h-full"
          onClick={deleteFunction}
        />
      </button>
      <button className="mr-2 ml-2 p-2 rounded bg-red-400 hover:bg-red-500 active:bg-red-900">
        <img src={saveIcon} alt="save icon" className="h-full" />
      </button>
    </nav>
  );
};

export default TopNav;
