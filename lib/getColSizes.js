import { formatSize } from "./getRowsParts";
const colSizesReg = /(?:(?:(?<min>[\w%]+)?\^(?<max>[\w%]+)?)|(?<size>[\w%]+))(?:(?:\*(?<count>\d+))|(?<filled>\*))?/g;
export default (sizesRaw) => {
    const matches = [...sizesRaw.matchAll(colSizesReg)];
    let partsCount = 0;
    let filledIdxs = [];
    const ret = matches.map((el, i) => {
        const { count, filled, max, min, size } = el.groups;
        partsCount += +count || 1;
        if (filled) {
            filledIdxs.push(i);
        }
        let sizeRet = "auto";
        if (size) {
            sizeRet = formatSize(size);
        }
        else if (min || max) {
            sizeRet = `minmax(${formatSize(min)}, ${formatSize(max)})`;
        }
        return {
            value: sizeRet,
            count: +count || 1,
            filled: !!filled,
        };
    });
    return {
        parts: ret,
        colsCount: partsCount,
        filledIdxs,
    };
};
