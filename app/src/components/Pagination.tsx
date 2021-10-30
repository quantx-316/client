import React, {useEffect, useState} from 'react';
import Pagination from '@mui/material/Pagination';
import {PageState} from '../features/types/pages';

type PaginationProps = {
    // total: number,
    // page: number, 
    // size: number,
    pagination: PageState,
    page: number, 
    onPageChange: any,
}

const PaginationComp = (props: PaginationProps) => {

    const [numPages, setNumPages] = useState(0);

    useEffect(() => {
        if (props.pagination) {
            const calcPages = Math.ceil(props.pagination.total / props.pagination.size);
            console.log("CALC PAGES");
            console.log(props.pagination.total);
            console.log(props.pagination.size);
            console.log(calcPages);
            setNumPages(calcPages);
        }

    }, [props.pagination])


    // we pass page in here because HOC reload may cause this to reload everytime

    return (
        <Pagination 
            count={numPages}
            onChange={props.onPageChange}
            page={props.page}
            size="small"
        />

    )

}

export default PaginationComp; 
