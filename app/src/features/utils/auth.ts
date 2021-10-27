export function authHeader() {

    const accessToken = localStorage.getItem('access') ?? '';
    let user;
    try {
        user = JSON.parse(accessToken);
        return {
            "Authorization": "Bearer " + user
        }
    } catch(error) {
        localStorage.removeItem('access');
        return {};
    }

}

export function authConfig() {
    return {
        headers: {
            ...authHeader()
        }
    }
}
