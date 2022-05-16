export const getTodayDate = () => new Date().toISOString().split('T')[0];

export const formatMoney = (amount: number) => new Intl.NumberFormat().format(amount);
