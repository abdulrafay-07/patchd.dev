export const changeTextCase = (text: string) => {
  return text
    .toLowerCase()
    .replaceAll("_", " ")
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
