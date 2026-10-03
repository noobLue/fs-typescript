// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNumber = (arg: any): boolean => {
    return arg !== "" && !isNaN(Number(arg));
};


export default "this is default";