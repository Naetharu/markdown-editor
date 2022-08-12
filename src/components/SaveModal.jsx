import React from "react";

const SaveModal = ({ saveFunction }) => {
  return (
    <div className="h-[400px] w-[600px] bg-slate-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center border-8 border-slate-700 rounded-xl">
      <form
        className="m-14 w-full grow flex flex-col justify-between items-center"
        onSubmit={saveFunction}
      >
        <label htmlFor="docNameInput" className="text-3xl text-slate-300">
          New Document
        </label>
        <input
          id="docNameInput"
          type="text"
          className="w-3/4 text-3xl p-4 bg-slate-100 rounded-xl"
        />
        <button
          type="submit"
          className="bg-slate-200 w-1/2 pt-4 pb-4 text-xl border-slate-400 border-8 rounded-xl hover:bg-slate-500 active:bg-slate-600"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default SaveModal;
