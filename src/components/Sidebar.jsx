import React from "react";

const Sidebar = ({ titles, loadDocs }) => {
  return (
    <div className="flex flex-col min-w-[500px] w-[500px] h-full bg-slate-900 p-10 pt-16">
      <h2 className="pb-4 text-slate-400 font-bold text-xl">My Documents</h2>
      {titles ? (
        titles.map((document, index) => (
          <button
            key={index}
            className="text-white font-normal p-2 mt-2 mb-2 w-full flex justify-start items-center bg-slate-600 hover:bg-slate-700 active:bg-slate-900"
            onClick={loadDocs}
          >
            {document}
          </button>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default Sidebar;
