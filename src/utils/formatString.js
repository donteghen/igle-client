

// Capitalize only first letter of string
export const capitalizeFirstLetter = (string) => {
    if (!string) {
        return ''
    }
    return string[0] + string.substring(1).toLowerCase()
}