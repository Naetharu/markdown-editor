import React from "react";
import { useState, useEffect } from "react";
import TopNav from "../components/TopNav";
import MarkDownViewer from "../components/MarkDownViewer";

// Media Imports
import eyeIcon from "../media/icon-show-preview.svg";

const MarkDown = () => {
  const [documentTitle, setDocumentTitle] = useState("documentName"); // Title of the markdown document
  const [rawText, setRawText] = useState(""); // Raw text entered into the textarea
  const [showEditor, setShowEditor] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [savedDocTitles, setSavedDocTitles] = useState(null);

  // USE EFFECTS ====================================================
  // ================================================================
  // Load list of saved documents into sidebar
  useEffect(() => {
    setSavedDocTitles(JSON.parse(localStorage.getItem("savedDocs")));
  }, []);

  // Take raw input text and convert it into an array with one entry per line of text
  useEffect(() => {
    const result = rawText.split(/\r?\n/);
    console.log(result);
  }, [rawText]);

  useEffect(() => {
    if (localStorage.getItem(documentTitle)) {
      setRawText(localStorage.getItem(documentTitle));
    }
  }, [documentTitle]);

  // OTHER FUNCTIONS ================================================
  // =================================================================
  // Delete all existing text in document
  const clearAll = () => {
    setRawText("");
    localStorage.removeItem(documentTitle);
  };

  // Swicth between editor and full screen reader mode
  const changeView = () => {
    setShowEditor(!showEditor);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  // Save document to local storage
  const saveDoc = () => {
    // Get the existing list of doc titles in local storage
    const existingDocs = JSON.parse(localStorage.getItem("savedDocs"));

    // Check if prior docs exist. If yes then spread them into new array.
    let newDocs;
    if (existingDocs) {
      newDocs = [...existingDocs, documentTitle];
    } else {
      newDocs = [documentTitle];
    }

    // Update local storage with new saved doc title list
    localStorage.setItem("savedDocs", JSON.stringify(newDocs));

    // Add body of new doc to local storage
    localStorage.setItem(documentTitle, rawText);
  };

  // Update raw text ready for processing into array
  const updateRawText = (e) => {
    setRawText(e.target.value);
  };

  // Load document
  const loadDoc = (e) => {
    console.log(e.target.innerText);
    setDocumentTitle(e.target.innerText);
  };

  // RENDER ========================================================
  // ===============================================================

  if (showEditor) {
    return (
      <div className="flex">
        {showSidebar ? (
          <div className="min-w-[300px] w-1/6 flex flex-col justify-start items-start p-6 bg-slate-800 text-slate-400 font-bold">
            <h2 className="pb-4">My Documents</h2>
            {savedDocTitles ? (
              savedDocTitles.map((document, index) => (
                <button
                  key={index}
                  className="text-white font-normal p-2 mt-2 mb-2 w-full flex justify-start items-center bg-slate-600 hover:bg-slate-700 active:bg-slate-900"
                  onClick={loadDoc}
                >
                  {document}
                </button>
              ))
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
        <div className="bg-slate-600 min-h-screen flex flex-col justify-between grow">
          <TopNav
            docTitle={documentTitle}
            menuFunction={toggleSidebar}
            deleteFunction={clearAll}
            saveFunction={saveDoc}
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
                  id="changeViewBtn"
                  className="p-4 mr-12 flex justify-center items-center rounded bg-slate-200 hover:bg-slate-500 active:bg-slate-600"
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
      </div>
    );
  } else {
    return (
      <div className="flex flex-row justify-between">
        {showSidebar ? (
          <div className="min-w-[300px] w-1/6 flex flex-col justify-start items-start p-6 bg-slate-800 text-slate-400 font-bold">
            <h2 className="pb-4">My Documents</h2>
            {savedDocTitles ? (
              savedDocTitles.map((document, index) => (
                <button
                  key={index}
                  className="text-white font-normal p-2 mt-2 mb-2 w-full flex justify-start items-center bg-slate-600 hover:bg-slate-700 active:bg-slate-900"
                  onClick={loadDoc}
                >
                  {document}
                </button>
              ))
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
        <div className="bg-slate-600 min-h-screen grow flex flex-col justify-between">
          <TopNav
            docTitle={documentTitle}
            menuFunction={toggleSidebar}
            deleteFunction={clearAll}
            saveFunction={saveDoc}
          />
          <div id="textContainer" className="grow flex flex-col">
            <div className="flex flex-col grow justify-start items-center bg-white">
              <div className="flex flex-row w-full bg-slate-200 justify-between items-center placeholder:bg-slate-400">
                <h2 className="bg-slate-200 text-xl font-bold p-4">Preview</h2>
                <button
                  className="p-4 mr-12 flex justify-center items-center rounded bg-slate-200 hover:bg-slate-500 active:bg-slate-600"
                  onClick={changeView}
                >
                  <img src={eyeIcon} alt="show preview icon" />
                </button>
              </div>

              <MarkDownViewer
                text={rawText}
                classes="bg-white w-1/2 p-4 grow"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default MarkDown;
