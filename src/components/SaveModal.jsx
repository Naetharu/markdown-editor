import React from "react";

const SaveModal = ({ saveFunction, closeFunction }) => {
  return (
    <div className="h-[300px] w-[460px] bg-slate-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-between border-4 border-slate-700 rounded">
      <div className="w-full flex justify-end">
        <button
          className="p-1  text-slate-200 rounded font-semibold bg-slate-400 hover:bg-slate-500 active:bg-slate-600"
          onClick={closeFunction}
        >
          Close
        </button>
      </div>

      <form
        className="m-2 w-full grow flex flex-col justify-between items-center"
        onSubmit={saveFunction}
      >
        <label htmlFor="docNameInput" className="text-xl text-slate-300">
          New Document Name:
        </label>
        <input
          id="docNameInput"
          type="text"
          className="w-3/4 text-xl p-2 bg-slate-100 rounded"
        />
        <button
          type="submit"
          className="bg-slate-200 w-1/2 pt-4 pb-4 text-xl border-slate-400 border-2 rounded hover:bg-slate-500 active:bg-slate-600"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default SaveModal;
