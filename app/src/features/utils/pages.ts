
export const getPagination = (data: any) => {

    return {
        total: data.total,
        page: data.page,
        size: data.size, 
    }

}
