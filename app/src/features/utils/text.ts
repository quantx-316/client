export function truncateWithEllipses(text: string, max: number) {
    return text.substr(0,max)+(text.length>max?'...':''); 
}

export function truncateTitle(text: string) {
    return truncateWithEllipses(text, 50);
}

export function truncateDesc(text: string) {
    return truncateWithEllipses(text, 50);
}

export function truncateUsername(text: string) {
    return truncateWithEllipses(text, 10);
}

export function truncateName(text: string) {
    return truncateWithEllipses(text, 20);
}
