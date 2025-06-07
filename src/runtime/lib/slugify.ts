export const slugify = (text: string): string => {
  return (
    text
      .toString()
      .toLowerCase()
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
      .normalize('NFD') // Normalize to NFD form
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
  );
};
