export interface Page {
    page: number
    size: number
}

export interface Search {
    search_by: string 
    search_query: string 
    search_exclusive?: boolean 
}

export interface Sort {
    attr: string
    dir: string 
}

export interface SearchSort extends Search, Sort {}

export interface PageSearchSort extends Page, Search, Sort {}
