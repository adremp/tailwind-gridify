export type Part = {
    value: string;
    count: number;
    filled: boolean;
};
export type RowPart = {
    parts: Part[];
    filledIdxs: number[];
    colsCount: number;
};
declare const _default: (rowsRaw: string[]) => {
    colsArrs: {
        parts: {
            value: string;
            count: number;
            filled: boolean;
        }[];
        colsCount: number;
        filledIdxs: number[];
    }[];
    maxColsCount: number;
};
export default _default;
export declare const isFilled: (col: Part) => boolean;
//# sourceMappingURL=getColsParts.d.ts.map