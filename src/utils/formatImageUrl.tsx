export function formatImageUrl(path?: string, configuration?: any) {
    return path && configuration ? `${configuration?.images.base_url}w780${path}` : undefined
}