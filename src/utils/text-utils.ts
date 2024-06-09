const SPECIAL_CHARS = [
    '\\', '_', '*', '[', ']', '(', ')', '~', '`', '>', '#', '+', '-', '=', '|', '{', '}', '.', '!'
]
const regex = new RegExp(`[${SPECIAL_CHARS.join('\\')}]`, 'ig')

export function escapeMarkdown(text) {
    return text.replace(regex, '\\$&')
}