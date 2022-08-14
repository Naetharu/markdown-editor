import React from "react";
import { useState, useEffect, useCallback } from "react";
import TopNav from "../components/TopNav";
import MarkDownViewer from "../components/MarkDownViewer";
import Sidebar from "../components/Sidebar";
import SaveModal from "../components/SaveModal";
import db from "../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";

// Media Imports
import eyeIcon from "../media/icon-show-preview.svg";

const MarkDown = () => {
  // State for data
  const [documentTitle, setDocumentTitle] = useState(null); // Title of the active markdown document
  const [savedDocTitles, setSavedDocTitles] = useState(null); // Titles of all saved documents
  const [rawText, setRawText] = useState(""); // Raw text of the active document

  // State to toggle views
  const [showEditor, setShowEditor] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);

  // UI View Toggle Functions
  const toggleSideBar = () => {
    setShowSidebar(!showSidebar);
  };

  const toggleEditor = () => {
    setShowEditor(!showEditor);
  };

  const toggleSaveModal = () => {
    setShowSaveModal(!showSaveModal);
  };

  // Data Functions
  const loadTitles = async () => {
    //Go to Firebase and get a list of all the existing docs
    let docTitleList = [];

    const snapshot = await getDocs(collection(db, "markdownFiles"));
    snapshot.forEach((doc) => {
      docTitleList.push(doc.data().title);
    });

    setSavedDocTitles(docTitleList);
  };

  const loadFile = useCallback(() => {
    if (!documentTitle) return;

    let docRef = null;

    const lf = async () => {
      docRef = doc(db, "markdownFiles", documentTitle);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setRawText(docSnap.data().body);
      }
    };

    lf();
  }, [documentTitle]);

  const saveFile = async () => {
    if (!documentTitle) return;

    await setDoc(doc(db, "markdownFiles", documentTitle), {
      title: documentTitle,
      body: rawText,
    });

    loadTitles();
  };

  const updateFileTitle = (e) => {
    setDocumentTitle(e.target.innerText);
  };

  const addNewFile = (e) => {
    e.preventDefault();
    setDocumentTitle(e.target.elements.docNameInput.value.trim());
    setRawText("");
    toggleSaveModal();
  };

  const updateRawText = (e) => {
    setRawText(e.target.value);
  };

  const deleteFile = async () => {
    await deleteDoc(doc(db, "markdownFiles", documentTitle));
    setDocumentTitle(null);
    setRawText("");
    loadTitles();
  };

  // Use Effects
  useEffect(() => {
    loadTitles();
  }, [documentTitle]);

  useEffect(() => {
    loadFile();
  }, [documentTitle, loadFile]);

  // RENDER ========================================================
  // ===============================================================
  if (showEditor) {
    return (
      <div className="flex">
        {showSaveModal ? (
          <SaveModal
            saveFunction={addNewFile}
            closeFunction={toggleSaveModal}
          />
        ) : (
          <></>
        )}
        {showSidebar ? (
          <Sidebar titles={savedDocTitles} loadDocs={updateFileTitle} />
        ) : (
          <></>
        )}
        <div className="bg-slate-600 min-h-screen flex flex-col justify-between grow">
          <TopNav
            docTitle={documentTitle}
            menuFunction={toggleSideBar}
            deleteFunction={deleteFile}
            saveFunction={saveFile}
            newDocumentFunction={toggleSaveModal}
          />
          <div
            id="textContainer"
            className="bg-zink-200 grow flex flex-row justify-evenly"
          >
            <div className="flex flex-col bg-red-500 w-full lg:w-1/2 max-w-1/2">
              <div className="flex">
                <h2 className="bg-slate-200 text-xl font-bold p-4 lg:border-r-2 border-slate-300 grow">
                  Markdown
                </h2>
                <button
                  id="editorViewBtn"
                  className="lg:hidden flex justify-center items-center w-14 bg-slate-200 border-none"
                  onClick={toggleEditor}
                >
                  <img src={eyeIcon} alt="show preview icon" />
                </button>
              </div>

              <textarea
                id="textAreaMKD"
                onChange={updateRawText}
                className="bg-zink-200 resize-none p-4 text-xl w-full focus:outline-none border-r-2 border-slate-200 grow"
                value={rawText}
              />
            </div>
            <div className="hidden lg:flex flex-col justify-start w-none lg:w-1/2 items-stretch">
              <div className="flex flex-row bg-slate-200 justify-between items-center placeholder:bg-slate-400">
                <h2 className="bg-slate-200 text-xl font-bold p-4 border-l-2 border-slate-300">
                  Preview
                </h2>
                <button
                  id="editorViewBtn"
                  className="p-4 mr-12 flex justify-center items-center rounded bg-slate-200 hover:bg-slate-500 active:bg-slate-600"
                  onClick={toggleEditor}
                >
                  <img src={eyeIcon} alt="show preview icon" />
                </button>
              </div>
              <MarkDownViewer
                classes="hidden lg:flex bg-white w-none lg:w-full p-4 grow border-l-2 border-slate-200"
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
        {showSaveModal ? (
          <SaveModal
            saveFunction={addNewFile}
            closeFunction={toggleSaveModal}
          />
        ) : (
          <></>
        )}
        {showSidebar ? (
          <Sidebar titles={savedDocTitles} loadDocs={updateFileTitle} />
        ) : (
          <></>
        )}
        <div className="bg-slate-600 min-h-screen grow flex flex-col justify-between">
          <TopNav
            docTitle={documentTitle}
            menuFunction={toggleSideBar}
            deleteFunction={deleteFile}
            saveFunction={saveFile}
            newDocumentFunction={toggleSaveModal}
          />
          <div id="textContainer" className="grow flex flex-col">
            <div className="flex flex-col grow justify-start items-center bg-white">
              <div className="flex flex-row w-full bg-slate-200 justify-between items-center placeholder:bg-slate-400">
                <h2 className="bg-slate-200 text-xl font-bold p-4">Reader</h2>
                <button
                  id="editorViewBtn"
                  className="p-4 mr-12 flex justify-center items-center rounded bg-slate-200 hover:bg-slate-500 active:bg-slate-600"
                  onClick={toggleEditor}
                >
                  <img src={eyeIcon} alt="show preview icon" />
                </button>
              </div>

              <MarkDownViewer
                text={rawText}
                classes="bg-white w-full lg:w-1/2 p-4 grow"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default MarkDown;
