import React from "react";
import { useState, useEffect } from "react";
import TopNav from "../components/TopNav";
import MarkDownViewer from "../components/MarkDownViewer";
import Sidebar from "../components/Sidebar";

// Media Imports
import eyeIcon from "../media/icon-show-preview.svg";

const MarkDown = () => {
  const [documentTitle, setDocumentTitle] = useState(null); // Title of the markdown document
  const [rawText, setRawText] = useState(""); // Raw text entered into the textarea
  const [showEditor, setShowEditor] = useState(true);
  const [showSidebar, setShowSidebar] = useState(true);
  const [savedDocTitles, setSavedDocTitles] = useState(null);

  // USE EFFECTS ====================================================
  // ================================================================
  // Load list of saved documents into sidebar
  useEffect(() => {
    setSavedDocTitles(JSON.parse(localStorage.getItem("savedDocs")));
  }, []);

  // Take raw input text and convert it into an array with one entry per line of text
  useEffect(() => {
    if (localStorage.getItem(documentTitle)) {
      setRawText(localStorage.getItem(documentTitle));
    }
  }, [documentTitle]);

  // Check to see if there are exisitng saved docs, and if so populate our doc list with them on first load
  useEffect(() => {
    const startingDocTitles = JSON.parse(localStorage.getItem("savedDocs"));
    startingDocTitles
      ? setSavedDocTitles(startingDocTitles)
      : setSavedDocTitles(null);
  }, []);

  // OTHER FUNCTIONS ================================================
  // =================================================================
  // Delete all existing text in document
  const deleteDoc = () => {
    // Remove doc from local storage
    localStorage.removeItem(documentTitle);
    // Remove title from local storage

    let previousDocList = JSON.parse(localStorage.getItem("savedDocs"));
    const indexOfDoc = savedDocTitles
      ? previousDocList.indexOf(documentTitle)
      : 0;

    let newDocList;

    // Only check if at least one doc has been saved
    if (previousDocList) {
      if (previousDocList.length === 1) {
        newDocList = null;
      } else {
        previousDocList.splice(indexOfDoc, 1);
        newDocList = previousDocList;
      }
    }

    if (newDocList) {
      localStorage.setItem("savedDocs", JSON.stringify(newDocList));
      setSavedDocTitles(JSON.parse(localStorage.getItem("savedDocs")));
    } else {
      localStorage.removeItem("savedDocs");
      setSavedDocTitles(null);
    }

    setDocumentTitle(null);
    setRawText("");
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

    let newDocs;

    // Check if there are already some docs saved
    if (existingDocs) {
      // If this entry has not already been added, then add it. Do nothing if this is a duplication (i.e. we're just updating the body - not adding the doc)
      if (!existingDocs.includes(documentTitle)) {
        newDocs = [...existingDocs, documentTitle];
      }
    } else {
      // If this is the first document then simply add ths one as the first member of the savedDocs collection
      newDocs = [documentTitle];
    }

    // Update local storage with new saved doc title list if this is a new addtion
    if (newDocs) {
      localStorage.setItem("savedDocs", JSON.stringify(newDocs));
    }

    // Add body of new doc to local storage
    localStorage.setItem(documentTitle, rawText);

    // Update Document List
    setSavedDocTitles(JSON.parse(localStorage.getItem("savedDocs")));
  };

  // Update raw text ready for processing into array
  const updateRawText = (e) => {
    setRawText(e.target.value);
  };

  // Load document
  const loadDoc = (e) => {
    setDocumentTitle(e.target.innerText);
  };

  const newDocument = () => {
    let msg = "Please enter a document name";

    while (true) {
      let newName = prompt(msg);

      if (localStorage.getItem("savedDocs")) {
        if (
          newName !== "" &&
          newName.length > 1 &&
          newName.length < 20 &&
          !JSON.parse(localStorage.getItem("savedDocs")).includes(newName)
        ) {
          setDocumentTitle(newName);
          setSavedDocTitles(JSON.parse(localStorage.getItem("savedDocs")));
          setRawText("");
          return;
        } else {
          msg = "Please choose a different name.";
        }
      } else {
        if (newName !== "" && newName.length > 1 && newName.length < 20) {
          setDocumentTitle(newName);
          setRawText("");
          setSavedDocTitles(JSON.parse(localStorage.getItem("savedDocs")));
          return;
        } else {
          msg = "Please choose a different name.";
        }
      }
    }
  };

  // RENDER ========================================================
  // ===============================================================
  if (showEditor) {
    return (
      <div className="flex">
        {showSidebar ? (
          <Sidebar titles={savedDocTitles} loadDocs={loadDoc} />
        ) : (
          <></>
        )}
        <div className="bg-slate-600 min-h-screen flex flex-col justify-between grow">
          <TopNav
            docTitle={documentTitle}
            menuFunction={toggleSidebar}
            deleteFunction={deleteDoc}
            saveFunction={saveDoc}
            newDocumentFunction={newDocument}
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
          <Sidebar titles={savedDocTitles} loadDocs={loadDoc} />
        ) : (
          <></>
        )}
        <div className="bg-slate-600 min-h-screen grow flex flex-col justify-between">
          <TopNav
            docTitle={documentTitle}
            menuFunction={toggleSidebar}
            deleteFunction={deleteDoc}
            saveFunction={saveDoc}
            newDocumentFunction={newDocument}
          />
          <div id="textContainer" className="grow flex flex-col">
            <div className="flex flex-col grow justify-start items-center bg-white">
              <div className="flex flex-row w-full bg-slate-200 justify-between items-center placeholder:bg-slate-400">
                <h2 className="bg-slate-200 text-xl font-bold p-4">Reader</h2>
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
