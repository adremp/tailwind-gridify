export const replaceCol = (str) => str === ".." || str === "#" ? "." : str;
export default (rowPart, maxLen) => {
    if (rowPart.filledIdxs.length === 0) {
        return rowPart.parts
            .map((el) => new Array(el.count).fill(el.value).join(" "))
            .join(" ");
    }
    const fixedPartsCount = rowPart.colsCount - rowPart.filledIdxs.length;
    const filledFreeLen = maxLen - fixedPartsCount;
    const elCountPopulate = Math.floor(filledFreeLen / rowPart.filledIdxs.length);
    const restCount = filledFreeLen % rowPart.filledIdxs.length;
    const rowParts = [...rowPart.parts];
    if (restCount === 0) {
        rowPart.filledIdxs.forEach((idx) => {
            rowParts[idx] = {
                ...rowParts[idx],
                count: elCountPopulate,
            };
        });
    }
    else {
        rowPart.filledIdxs.forEach((idx, i) => {
            rowParts[idx] = {
                ...rowParts[idx],
                count: i < restCount ? elCountPopulate + 1 : elCountPopulate,
            };
        });
    }
    return rowParts
        .map((el) => new Array(el.count).fill(el.value).join(" "))
        .join(" ");
};
