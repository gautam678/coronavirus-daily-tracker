export const capitalize = (text, delimiter = " ", joinCharacter = " ") => {
  if (text) {
    return text
      .toLowerCase()
      .split(delimiter)
      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
      .join(joinCharacter);
  }
};
