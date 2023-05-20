export const getNumberWithSpaces = (n: number): string =>
    n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

export const getNumberWithCommas = (n: number): string =>
    n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
