
export interface CompSubmit {
    title: string
    description: string 
    end_time: number  
    test_start: number 
    test_end: number 
}

export interface Comp extends CompSubmit {
    id: number 
    owner: number 
    created: number 
    edited_at: number 
}


// id: int 
// owner: int 
// created: datetime 
// edited_at: datetime 
