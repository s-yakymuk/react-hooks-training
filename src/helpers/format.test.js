import { capitalize, formatPhone } from "./format";

// good enough

describe("Capitalize tests", () => {
  test("One word", () => {
    expect(capitalize("tom")).toBe("Tom");
  });

  test("Multi word", () => {
    expect(capitalize("tom hanks")).toBe("Tom Hanks");
  });

  test("Empty input", () => {
    expect(capitalize("")).toBe("");
  });

  test("Null input", () => {
    expect(capitalize(null)).toBe("");
  });

  test("Undefined input", () => {
    expect(capitalize()).toBe("");
  });

  test("Number input", () => {
    expect(() => capitalize(23435)).toThrowError();
  });

  test("Many words", () => {
    expect(capitalize("one two three")).toBe("One Two Three");
  });
});

describe("FormatPhone tests", () => {
  test("Some phone", () => {
    expect(formatPhone("+11234567890")).toBe("(123) 456-7890");
  });
});
