import React from "react";
import { useState, useEffect } from "react";

const MarkDownViewer = ({ text }) => {
  // Convert Raw Text into an array per line
  const mdData = text.split(/\r?\n/);
  const formatted = [];

  // destory all previous input...

  for (let i = 0; i < mdData.length; i++) {
    if (mdData[i].charAt(0) === "#") {
      // count how many # we have!
      let j = 0;
      while (mdData[i].charAt(j) === "#") {
        j++;
      }

      console.log("J", j);

      switch (j) {
        case 1:
          formatted.push(
            <h1 className="text-4xl font-bold text-black mb-6 mt-4" key={i}>
              {mdData[i].slice(j).toUpperCase()}
            </h1>
          );
          break;
        case 2:
          formatted.push(
            <h2 className="text-3xl font-bold text-black mb-6 mt-4" key={i}>
              {mdData[i].slice(j).toUpperCase()}
            </h2>
          );
          break;
        case 3:
          formatted.push(
            <h3 className="text-2xl font-bold text-black mb-6 mt-4" key={i}>
              {mdData[i].slice(j).toUpperCase()}
            </h3>
          );
          break;
        case 4:
          formatted.push(
            <h4 className="text-xl font-bold text-black mb-6 mt-4" key={i}>
              {mdData[i].slice(j).toUpperCase()}
            </h4>
          );
          break;
        default:
          formatted.push(
            <h4 className="text-xl font-bold text-black mb-6 mt-4" key={i}>
              {mdData[i].slice(j).toUpperCase()}
            </h4>
          );
      }
    } else if (mdData[i].charAt(0) === "-") {
      formatted.push(
        <div className="text-sm indent-6 text-zinc-700 font-semibold" key={i}>
          - {mdData[i].slice(1)}
        </div>
      );
    } else if (mdData[i].charAt(0) === ">") {
      formatted.push(
        <p
          key={i}
          className="p-6 bg-slate-400 border-l-4 border-red-500 rounded text-sm font-bold italic"
        >
          {mdData[i].slice(1)}
        </p>
      );
    } else {
      formatted.push(
        <p key={i} className="mb-4 mt-4 text-justify">
          {mdData[i]}
        </p>
      );
    }
  }

  const markdown = React.createElement("div", {}, formatted);

  return (
    <div className="bg-white w-full p-4 grow border-l-2 border-slate-200">
      {markdown}
    </div>
  );
};

export default MarkDownViewer;
