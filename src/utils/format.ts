export function formatNumber(value: number | string): string {
    if (!value) return "";
    const num = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(num)) return "";
    return num.toLocaleString("id-ID"); // Uses dots for thousands
}

export function parseNumber(value: string): string {
    return value.replace(/\./g, "").replace(/,/g, "."); // Remove dots, replace comma with dot (if any)
}
