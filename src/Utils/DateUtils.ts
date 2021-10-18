
export const getCurrentDateUTC = () => {
    const now = new Date();
    return new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
};

export const getDateUTC = (date: Date) => {
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
}
