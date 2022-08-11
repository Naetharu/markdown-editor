import React from "react";

const MarkDownViewer = ({ text, classes }) => {
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

      switch (j) {
        case 1:
          formatted.push(
            <h1 className="text-4xl font-bold text-black mb-12 mt-12" key={i}>
              {mdData[i].slice(j).toUpperCase()}
            </h1>
          );
          break;
        case 2:
          formatted.push(
            <h2 className="text-3xl font-bold text-black mb-12 mt-12" key={i}>
              {mdData[i].slice(j).toUpperCase()}
            </h2>
          );
          break;
        case 3:
          formatted.push(
            <h3 className="text-2xl font-bold text-black mb-12 mt-12" key={i}>
              {mdData[i].slice(j).toUpperCase()}
            </h3>
          );
          break;
        case 4:
          formatted.push(
            <h4 className="text-xl font-bold text-black mb-12 mt-12" key={i}>
              {mdData[i].slice(j).toUpperCase()}
            </h4>
          );
          break;
        case 5:
          formatted.push(
            <h5 className="text-l font-bold text-black mb-12 mt-12" key={i}>
              {mdData[i].slice(j).toUpperCase()}
            </h5>
          );
          break;
        case 6:
          formatted.push(
            <h6
              className="text-md font-semibold text-orange-700 mb-12 mt-12"
              key={i}
            >
              {mdData[i].slice(j).toUpperCase()}
            </h6>
          );
          break;
        default:
          formatted.push(
            <h6
              className="text-md font-semibold text-orange-700 mb-12 mt-12"
              key={i}
            >
              {mdData[i].slice(j).toUpperCase()}
            </h6>
          );
      }
    } else if (mdData[i].charAt(0) === "-") {
      formatted.push(
        <div
          className="text-sm indent-6 text-zinc-700 font-semibold flex items-center"
          key={i}
        >
          <div className="w-2 h-2 bg-orange-700 rounded-full ml-6"></div>
          {mdData[i].slice(1)}
        </div>
      );
    } else if (!isNaN(parseInt(mdData[i].charAt(0)))) {
      formatted.push(
        <div
          className="text-sm indent-6 text-zinc-700 font-semibold flex items-center"
          key={i}
        >
          <div className="font-semibold text-orange-700">
            {mdData[i].charAt(0)}:
          </div>{" "}
          <div className="">{mdData[i].slice(1)}</div>
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
    } else if (mdData[i].charAt(0) === "!") {
      formatted.push(
        <div className="w-full flex justify-center items-center">
          <img
            className="border-2 border-orange-700 w-fit mt-10 mb-10"
            src={mdData[i].slice(1)}
            alt=""
          />
        </div>
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

  return <div className={classes}>{markdown}</div>;
};

export default MarkDownViewer;
