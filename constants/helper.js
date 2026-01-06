export const isValidString = (str) =>
  str.every(s => typeof s === "string" && s.trim().length > 0);