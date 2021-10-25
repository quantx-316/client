export function authHeader() {

    const accessToken = localStorage.getItem('user') ?? '{}';
    let user;
    try {
        user = JSON.parse(accessToken);
        return {
            "Authorization": "Bearer " + user
        }
    } catch(error) {
        localStorage.setItem('user', '{}');
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
