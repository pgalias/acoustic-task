export const isDate = (date: string): boolean => {
  return new Date(date).toString() !== 'Invalid Date' && isNaN(+date) && !isNaN(Date.parse(date));
};
