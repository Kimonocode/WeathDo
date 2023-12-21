
/**
 * Capitalize first letter in string
 * @param str string
 * @returns 
 */
function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Truncate string
 */
function truncate(str:string, char:number): string {
    return str.slice(0, char);
}


export { capitalize, truncate };