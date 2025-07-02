export const changeTextCase = (text: string) => {
  return text
    .toLowerCase()
    .replaceAll("_", " ")
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const makeUrl = (text: string) => {
  try {
    // Check if text is already a valid URL
    const url = new URL(text);
    return url.href;
  } catch {
    // If not, try to prepend 'https://'
    try {
      const url = new URL(`https://${text}`);
      return url.href;
    } catch {
      // If still invalid, prepend 'https://www.'
      return `https://www.${text.replace(/^(https?:\/\/)?(www\.)?/, '')}`;
    }
  }
};
