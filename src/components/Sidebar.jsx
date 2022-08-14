import React from "react";

const Sidebar = ({ titles, loadDocs }) => {
  return (
    <div className="flex flex-col w-screen lg:min-w-[500px] lg:w-[500px] sm:min-w-full sm:w-full min-h-screen bg-slate-900  p-10 pt-16">
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
