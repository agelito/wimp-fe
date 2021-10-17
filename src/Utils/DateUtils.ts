
export const getCurrentDateUTC = () => {
    const now = new Date();
    return new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
};
