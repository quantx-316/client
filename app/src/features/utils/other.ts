

export const getErrorMsg = (error: any) => {
    let msg = (error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString();
    return msg;
}

