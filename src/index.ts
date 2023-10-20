/* eslint-disable import/no-anonymous-default-export */

import plugin from "tailwindcss/plugin";
import { space } from "./const";
import formatPart from "./formatPart";
import getColSizes from "./getColSizes";
import getColsParts from "./getColsParts";
import getRowsParts from "./getRowsParts";

export interface GridifyConfig {
  templatePrefix: string;
  areaPrefix: string;
  defaultUnit: string;
}

export const config: GridifyConfig = {
  areaPrefix: "ga",
  defaultUnit: "px",
  templatePrefix: "tmp",
};

export default (params: Partial<GridifyConfig>) => {
  Object.assign(config, params);
  return plugin(({ matchUtilities }) => {
    matchUtilities({
      [config.templatePrefix]: (valueRaw) => {
        const [rowsRaw, colSizesRaw] = valueRaw.split(space.HSIZES);
        const rows = getRowsParts(rowsRaw);
        const { colsArrs, maxColsCount } = getColsParts(
          rows.map((el) => el.colsRaw)
        );
        const colsFormated = colsArrs.map((el) => formatPart(el, maxColsCount));
        const colsRet = colsFormated
          .map((el, i) => `"${el}" ${rows[i].size}`)
          .join("\n");

        let colSizesRet = "";
        if (colSizesRaw) {
          const colSizes = getColSizes(colSizesRaw);
          colSizesRet = ` / ${formatPart(colSizes, maxColsCount)}`;
        }

        return {
          gridTemplate: `${colsRet}${colSizesRet}`,
        };
      },
      [config.areaPrefix]: (value) => ({
        gridArea: value,
      }),
    });
  });
};
