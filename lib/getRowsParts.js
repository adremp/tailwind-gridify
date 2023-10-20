import { config } from "./index";
export const colsMinMaxReg = /(?:^|\|)(?<cols>[\w\.*\#]+)(?:@(?:(?:(?<min>[\w%]+)?\^(?<max>[\w%]+)?)|(?<size>[\w%]+)))?/gm;
export default (rowsRaw) => {
    const res = rowsRaw.matchAll(colsMinMaxReg);
    return [...res].map((el) => {
        const { cols, min, max, size } = el.groups;
        let sizeRet = "auto";
        if (size) {
            sizeRet = formatSize(size);
        }
        else if (min || max) {
            sizeRet = `minmax(${formatSize(min)}, ${formatSize(max)})`;
        }
        return { size: sizeRet, colsRaw: cols };
    });
};
export const formatSize = (str, defaultStr = "auto") => {
    if (str === "min" || str === "max") {
        return `${str}-content`;
    }
    return ((isNaN(Number(str)) ? str : `${str}${config.defaultUnit}`) || defaultStr);
};
