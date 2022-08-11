import React from "react";

const Sidebar = ({ titles, loadDocs }) => {
  return (
    <div className="min-w-[300px] w-1/6 flex flex-col justify-start items-start p-6 bg-slate-800 text-slate-400 font-bold">
      <h2 className="pb-4">My Documents</h2>
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
