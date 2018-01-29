const accessToken = {
    before: null,
    now: null
}

export function getAccessToken() {
    return global.accessToken;
}

export function setAccessToken(token) {
    global.accessToken = token;
}