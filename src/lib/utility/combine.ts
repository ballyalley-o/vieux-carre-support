const _trim = (s: string) => s.replace(/^\/+|\/+$/g, '')

export const combine = (...parts: string[]) => '/' + parts.map(_trim).join('/')

export const combineUrl = (base: string, ...parts: string[]) => {
    [_trim(base), ...parts.map(_trim)].join('/')
}