import { Part, RowPart } from "./getColsParts";
import { formatSize } from "./getRowsParts";
/* eslint-disable import/no-anonymous-default-export */
const colSizesReg =
  /(?:(?:(?<min>[\w%]+)?\^(?<max>[\w%]+)?)|(?<size>[\w%]+))(?:(?:\*(?<count>\d+))|(?<filled>\*))?/g;

type ColSize = {
  size?: string;
  count?: string;
  filled?: string;
  min?: string;
  max?: string;
};

export default (sizesRaw: string): RowPart => {
  const matches = [...sizesRaw.matchAll(colSizesReg)];
  let partsCount = 0;
  let filledIdxs: number[] = [];
  const ret = matches.map((el, i) => {
    const { count, filled, max, min, size } = el.groups as Record<
      keyof ColSize,
      string
    >;
    partsCount += +count || 1;
    if (filled) {
      filledIdxs.push(i);
    }
    let sizeRet = "auto";
    if (size) {
      sizeRet = formatSize(size);
    } else if (min || max) {
      sizeRet = `minmax(${formatSize(min)}, ${formatSize(max)})`;
    }

    return {
      value: sizeRet,
      count: +count || 1,
      filled: !!filled,
    } satisfies Part;
  });
  return {
    parts: ret,
    colsCount: partsCount,
    filledIdxs,
  } satisfies RowPart;
};
