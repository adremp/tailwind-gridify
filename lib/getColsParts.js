import { replaceCol } from "./formatPart";
const colReg = /(?<value>[\#\w]+|\.{2})(?:(?:\*(?<count>\d+))|(?<filled>\*))?/gm;
export default (rowsRaw) => {
    let maxColsCount = 0;
    const colsArrs = rowsRaw.map((row) => {
        const matches = [...row.matchAll(colReg)];
        let colsCount = 0;
        let filledIdxs = [];
        const ret = matches.map((el, i) => {
            const ret = el.groups;
            colsCount += +ret.count || 1;
            if (ret.filled || ret.value === "..") {
                filledIdxs.push(i);
            }
            return {
                value: replaceCol(ret.value),
                count: +ret.count || 1,
                filled: !!ret.filled,
            };
        });
        maxColsCount = Math.max(maxColsCount, colsCount);
        return {
            parts: ret,
            colsCount,
            filledIdxs,
        };
    });
    return { colsArrs, maxColsCount };
};
export const isFilled = (col) => col.filled || col.value === "..";
