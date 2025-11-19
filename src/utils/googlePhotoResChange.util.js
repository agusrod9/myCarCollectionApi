export function getHighResGooglePhoto(url, size = 512) {
    if (!url || typeof url != "string") return null;

    return url
        .replace(/=s\d+-c/, `=s${size}-c`)
        .replace(/=s\d+$/, `=s${size}`)
        .replace(/(\?|&)sz=\d+/, `$1sz=${size}`);
}