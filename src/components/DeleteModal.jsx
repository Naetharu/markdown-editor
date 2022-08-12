import React from "react";

const DeleteModal = () => {
  return (
    <div className="h-44 w-96 bg-slate-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center border-10 border-slate-800">
      WARNING: Delete cannot be reversed. This document will be removed.
      <button className="p-2 mt-2 text-slate-300 font-bold uppercase rounded bg-slate-700 hover:bg-slate-800 active:bg-slate-900">
        Save
      </button>
    </div>
  );
};

export default DeleteModal;
