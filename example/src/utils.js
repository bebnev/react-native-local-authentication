export function booleanToString(b) {
    if (b === undefined) {
        return '-';
    }

    return b ? 'YES' : 'NO';
}