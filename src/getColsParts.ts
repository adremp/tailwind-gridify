import { replaceCol } from "./formatPart";

/* eslint-disable import/no-anonymous-default-export */
const colReg =
  /(?<value>[\#\w]+|\.{2})(?:(?:\*(?<count>\d+))|(?<filled>\*))?/gm;

export type Part = { value: string; count: number; filled: boolean };
export type RowPart = {
  parts: Part[];
  filledIdxs: number[];
  colsCount: number;
};

export default (rowsRaw: string[]) => {
  let maxColsCount = 0;
  const colsArrs = rowsRaw.map((row) => {
    const matches = [...row.matchAll(colReg)];
    let colsCount = 0;
    let filledIdxs: number[] = [];
    const ret = matches.map((el, i) => {
      const ret = el.groups as Record<keyof Part, string>;
      colsCount += +ret.count || 1;
      if (ret.filled || ret.value === "..") {
        filledIdxs.push(i);
      }
      return {
        value: replaceCol(ret.value),
        count: +ret.count || 1,
        filled: !!ret.filled,
      } satisfies Part;
    });
    maxColsCount = Math.max(maxColsCount, colsCount);
    return {
      parts: ret,
      colsCount,
      filledIdxs,
    } satisfies RowPart;
  });
  return { colsArrs, maxColsCount };
};

export const isFilled = (col: Part) => col.filled || col.value === "..";
