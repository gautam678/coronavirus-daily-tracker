export const capitalize = (text, delimiter = " ", joinCharacter = " ") => {
  return text
    .toLowerCase()
    .split(delimiter)
    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
    .join(joinCharacter);
};
