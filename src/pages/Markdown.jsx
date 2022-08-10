import React from "react";
import { useState, useEffect, useRef } from "react";
import TopNav from "../components/TopNav";
import MarkDownViewer from "../components/MarkDownViewer";

// Media Imports
import menuIcon from "../media/icon-menu.svg";
import documentIcon from "../media/icon-document.svg";
import deleteIcon from "../media/icon-delete.svg";
import saveIcon from "../media/icon-save.svg";
import eyeIcon from "../media/icon-show-preview.svg";
import { toHaveAccessibleName } from "@testing-library/jest-dom/dist/matchers";

const MarkDown = () => {
  const testFunction = () => {
    console.log("Test");
  };

  const [documentTitle, setDocumentTitle] = useState("Information"); // Title of the markdown document
  const [rawText, setRawText] = useState(""); // Raw text entered into the textarea
  const [showEditor, setShowEditor] = useState(false);

  // Delete all existing text in document
  const clearAll = () => {
    setRawText("");
  };

  const changeView = () => {
    setShowEditor(!showEditor);
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

  if (showEditor) {
    return (
      <div className="bg-slate-600 min-h-screen flex flex-col justify-between">
        <TopNav
          docTitle="title"
          menuFunction={testFunction}
          deleteFunction={clearAll}
        />
        <div
          id="textContainer"
          className="bg-zink-200 grow flex flex-row justify-evenly"
        >
          <div className="flex flex-col bg-red-500 w-1/2">
            <h2 className="bg-slate-200 text-xl font-bold p-4 border-r-2 border-slate-300">
              Markdown
            </h2>
            <textarea
              id="textAreaMKD"
              onChange={updateRawText}
              className="bg-zink-200 resize-none p-4 text-xl w-full focus:outline-none border-r-2 border-slate-200 grow"
              value={rawText}
            />
          </div>
          <div className="flex flex-col justify-start w-1/2 items-stretch">
            <div className="flex flex-row bg-slate-200 justify-between items-center placeholder:bg-slate-400">
              <h2 className="bg-slate-200 text-xl font-bold p-4 border-l-2 border-slate-300">
                Preview
              </h2>
              <button
                className="p-4 mr-10 flex justify-center items-center rounded bg-slate-200 hover:bg-slate-500 active:bg-slate-600"
                onClick={changeView}
              >
                <img src={eyeIcon} alt="show preview icon" />
              </button>
            </div>

            <MarkDownViewer
              classes="bg-white w-full p-4 grow border-l-2 border-slate-200"
              text={rawText}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="bg-slate-600 min-h-screen flex flex-col justify-between">
        <TopNav
          docTitle="title"
          menuFunction={testFunction}
          deleteFunction={clearAll}
        />
        <div id="textContainer" className="w-full grow flex flex-col">
          <div className="flex flex-col grow justify-start w-full items-center bg-white">
            <div className="flex flex-row w-screen bg-slate-200 justify-between items-center placeholder:bg-slate-400">
              <h2 className="bg-slate-200 text-xl font-bold p-4">Preview</h2>
              <button
                className="p-4 mr-10 flex justify-center items-center rounded bg-slate-200 hover:bg-slate-500 active:bg-slate-600"
                onClick={changeView}
              >
                <img src={eyeIcon} alt="show preview icon" />
              </button>
            </div>

            <MarkDownViewer text={rawText} classes="bg-white w-1/2 p-4 grow" />
          </div>
        </div>
      </div>
    );
  }
};

export default MarkDown;
