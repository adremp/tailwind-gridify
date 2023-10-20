
import getColsParts from "../dev/getColsParts";

test("getColsParts", () => {
	expect(getColsParts(["c1.c2.c3"])).toBe(`"c1 c2 c3"`)
	expect(getColsParts(["c1*2.c2.c3*3"])).toBe(`"c1 c1 c2 c3 c3 c3"`)
	expect(getColsParts(["c1.$.c2.c3*2"])).toBe(`"c1 . c2 c3 c3"`)
	expect(getColsParts(["c1.#*2.c2.c3*2"])).toBe(`"c1 . . c2 c3 c3"`)
	expect(getColsParts(["#*3"])).toBe(`". . ."`)
	expect(getColsParts(["#*3.#.c1*1"])).toBe(`". . . . c1"`)
});
