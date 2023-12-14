
/**
 * Capitalize first letter in string
 * @param str string
 * @returns 
 */
function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export { capitalize };