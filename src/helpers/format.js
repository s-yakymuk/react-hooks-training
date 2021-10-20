export const capitalize = (value) => {
  if (!value) {
    return "";
  }

  if (typeof value !== "string") {
    throw Error("Invalid arguments - expecting string");
  }

  const words = value.split(" ");

  return words
    .map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(" ");
}

export const formatPhone = (phone) =>
  `(${phone.slice(2, 5)}) ${phone.slice(5, 8)}-${phone.slice(8)}`;
