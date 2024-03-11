export const getCurrentDate = () => new Date().toISOString().split('T')[0];

export const getIsDateValid = (date: string) => !Number.isNaN(new Date(date).getTime());

export const getNumberWithSpaces = (num: number | string) => {
  const [integerPart, fractionPart] = num.toString().split('.');
  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return [formattedIntegerPart, fractionPart].join('.');
};
