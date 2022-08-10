import React from "react";
import { useState, useEffect, useRef } from "react";
import TopNav from "../components/TopNav";
import MarkDownViewer from "../components/MarkDownViewer";

// Media Imports
import menuIcon from "../media/icon-menu.svg";
import documentIcon from "../media/icon-document.svg";
import deleteIcon from "../media/icon-delete.svg";
import saveIcon from "../media/icon-save.svg";

const MarkDown = () => {
  const testFunction = () => {
    console.log("Test");
  };

  const [documentTitle, setDocumentTitle] = useState("Information"); // Title of the markdown document
  const [rawText, setRawText] = useState(""); // Raw text entered into the textarea

  // Delete all existing text in document
  const clearAll = () => {
    setRawText("");
  };

  // Take raw input text and convert it into an array with one entry per line of text
  useEffect(() => {
    const result = rawText.split(/\r?\n/);
    console.log(result);
  }, [rawText]);

  // Update raw text ready for processing into array
  const updateRawText = (e) => {
    setRawText(e.target.value);
  };

  return (
    <div className="bg-slate-600 min-h-screen flex flex-col justify-between">
      <TopNav
        docTitle="title"
        menuFunction={testFunction}
        deleteFunction={clearAll}
      />

      <div clasName="flex flex-col grow">
        <h2 className>Markdown</h2>
        <div
          id="textContainer"
          className="bg-zink-200 grow flex flex-row justify-evenly"
        ></div>
      </div>
      <textarea
        id="textAreaMKD"
        onChange={updateRawText}
        className="bg-zink-200 resize-none p-4 text-xl w-1/2 focus:outline-none border-r-2 border-grey-400"
      />
      <MarkDownViewer className="" text={rawText} />
    </div>
  );
};

export default MarkDown;
