
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

function noPluriel(str: string): string {
    const last = str.substring(str.length -1);
    if(last === 's'){
        str = str.replace(last, '');
    }
    return str;
}


export { capitalize, truncate, noPluriel };