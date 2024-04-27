export const truncate = (str, n) => {
    if (!str) return str;
    return (str.length > n) ? str.slice(0, n - 1) + '...' : str;
};