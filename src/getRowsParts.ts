import { config } from "./index";

/* eslint-disable import/no-anonymous-default-export */
export const colsMinMaxReg =
  /(?:^|\|)(?<cols>[\w\.*\#]+)(?:@(?:(?:(?<min>[\w%]+)?\^(?<max>[\w%]+)?)|(?<size>[\w%]+)))?/gm;
export default (rowsRaw: string): { colsRaw: string; size: string }[] => {
  const res = rowsRaw.matchAll(colsMinMaxReg);
  return [...res].map((el) => {
    const { cols, min, max, size } = el.groups as any;
    let sizeRet = "auto";
    if (size) {
      sizeRet = formatSize(size);
    } else if (min || max) {
      sizeRet = `minmax(${formatSize(min)}, ${formatSize(max)})`;
    }
    return { size: sizeRet, colsRaw: cols };
  });
};

export const formatSize = (str: string, defaultStr = "auto") => {
  if (str === "min" || str === "max") {
    return `${str}-content`;
  }
  return (
    (isNaN(Number(str)) ? str : `${str}${config.defaultUnit}`) || defaultStr
  );
};
