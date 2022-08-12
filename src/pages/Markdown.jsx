import React from "react";
import { useState, useEffect, useCallback } from "react";
import TopNav from "../components/TopNav";
import MarkDownViewer from "../components/MarkDownViewer";
import Sidebar from "../components/Sidebar";
import SaveModal from "../components/SaveModal";

// Media Imports
import eyeIcon from "../media/icon-show-preview.svg";

const MarkDown = () => {
  const [documentTitle, setDocumentTitle] = useState(null); // Title of the markdown document
  const [rawText, setRawText] = useState(""); // Raw text entered into the textarea
  const [showEditor, setShowEditor] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [savedDocTitles, setSavedDocTitles] = useState(null);
  const [showSaveModal, setShowSaveModal] = useState(false);

  // Function ================================================
  // =================================================================
  // Delete all existing text in document

  const toggleNewDocModal = () => {
    setShowSaveModal(!showSaveModal);
  };

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
  const saveDoc = useCallback(() => {
    // 1: Check to see if the doc has been named.
    // 2: Check to see if the name is a duplicate - if yes skip ahead and just update the body content.
    // 3: Check to see if there are already saved docs in local storage. If yes, append. Else make a new entry.
    // 4: If list of saved docs has changed, update local storage & sync app state.
    // 5: Update body in local storage.

    // 1:
    if (documentTitle) {
      let newDocs;

      // 2:
      if (savedDocTitles) {
        // 3:
        if (!savedDocTitles.includes(documentTitle)) {
          newDocs = [...savedDocTitles, documentTitle];
        }
      } else {
        newDocs = [documentTitle];
      }

      // 4:
      if (newDocs) {
        setSavedDocTitles(newDocs);
      }

      // Update the body of the document
      localStorage.setItem(documentTitle, rawText);

      // Pull the updated list of savedDocs from local storage to sync app state
    }
  }, [documentTitle, rawText, savedDocTitles]);

  // Update raw text ready for processing into array
  const updateRawText = (e) => {
    setRawText(e.target.value);
  };

  // Load document
  const loadDoc = (e) => {
    setDocumentTitle(e.target.innerText);
  };

  const newDocument = (e) => {
    e.preventDefault();

    while (true) {
      let newName = e.target.elements.docNameInput.value;

      if (savedDocTitles) {
        if (
          newName !== "" &&
          newName.length > 1 &&
          newName.length < 50 &&
          !savedDocTitles.includes(newName)
        ) {
          setDocumentTitle(newName);
          setSavedDocTitles(savedDocTitles);
          setRawText("");
          setShowSaveModal(false);
          return;
        } else {
          //
        }
      } else {
        if (newName !== "" && newName.length > 1 && newName.length < 20) {
          setDocumentTitle(newName);
          setRawText("");
          setSavedDocTitles(savedDocTitles);
          setShowSaveModal(false);
          return;
        } else {
          //
        }
      }
    }
  };

  // const newDocument = (e) => {
  //   e.preventDefault();
  //   console.dir(e.target.elements.docNameInput.value);
  // };

  // USE EFFECTS ====================================================
  // ================================================================
  // Sync savedDocuments state with local storage on first render.
  useEffect(() => {
    const startingDocTitles = JSON.parse(localStorage.getItem("savedDocs"));

    startingDocTitles
      ? setSavedDocTitles(startingDocTitles)
      : setSavedDocTitles(null);
  }, []);

  // Load raw text from local storage when document title is changed.
  useEffect(() => {
    if (localStorage.getItem(documentTitle)) {
      setRawText(localStorage.getItem(documentTitle));
    }
  }, [documentTitle]);

  // Save document when title changes (i.e. save when creating a new document, or when swapping to a new doc so no work is lost)
  useEffect(() => {
    if (documentTitle) saveDoc();
  }, [documentTitle, saveDoc]);

  // sync local storage any time list of saved docs is updated
  useEffect(() => {
    // skip if state is null
    if (savedDocTitles === null) return;

    // check if storage already contains docs
    localStorage.setItem("savedDocs", JSON.stringify(savedDocTitles));
  }, [savedDocTitles]);

  // RENDER ========================================================
  // ===============================================================
  if (showEditor) {
    return (
      <div className="flex">
        {showSaveModal ? <SaveModal saveFunction={newDocument} /> : <></>}
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
            newDocumentFunction={toggleNewDocModal}
          />
          <div
            id="textContainer"
            className="bg-zink-200 grow flex flex-row justify-evenly"
          >
            <div className="flex flex-col bg-red-500 w-1/2 max-w-1/2">
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
            <div className="flex flex-col justify-start max-w-1/2 w-1/2 items-stretch">
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
      <div className="flex flex-row">
        {showSaveModal ? <SaveModal saveFunction={newDocument} /> : <></>}
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
            newDocumentFunction={toggleNewDocModal}
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
