import React, {useEffect, useState} from 'react';
import { Button, Icon, Card, H2, Classes, ButtonGroup, Elevation, H1, H5, Label, Slider, Switch } from "@blueprintjs/core";
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import Backtests from '../../components/Backtests';
import {
    getEligibleBacktests
} from '../../features/actions/comps';
import {getPagination} from '../../features/utils/pages';
import Modal, {ModalProps} from '../Modal';

type EligileBacktestsProps = {
    compID: number, 
} & ModalProps;

const EligibleBacktests = (props: EligileBacktestsProps) => {
    // your submission 

    // back tests

    const history = useHistory();

    //@ts-ignore 
    const user = useSelector(state=>state.auth.user);

    const [backtests, setBacktests] = useState([]);

    useEffect(() => {
        ezFetchSubmissions();
    }, [props.compID])

    const dispatch = useDispatch();

    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);

    const [pagination, setPagination] = useState(null);

    const attrsMapping = {
        "Score": "score",
        "Test Start": "test_start",
        "Test End": "test_end",
        "Created": "created",
    }
    const searchAttrsMapping = {
        "Code": "code_snapshot",
    }
    const [searchAttr, setSearchAttr] = useState("Code");
    const convertSearchAttr = (searchAttr: string) => {
        //@ts-ignore 
        return searchAttrsMapping[searchAttr];
    }
    const [searchQuery, setSearchQuery] = useState("");
    const [searchExclusive, setSearchExclusive] = useState(false);
    const onSearchAttrChange = (searchAttr: string) => {
        return;
    }
    const onSearchQueryChange = (searchQuery: string) => {
        setSearchQuery(searchQuery);
    }
    const onSearchExclusiveChange = () => {
        const newExcl = !searchExclusive;
        setSearchExclusive(newExcl);
        fetchBacktests(
            page, 
            size,
            attr, 
            dir, 
            searchAttr, 
            searchQuery, 
            newExcl,
        )
    }
    const [attr, setAttr] = useState("Created");
    const convertAttr = (attr: string) => {
        //@ts-ignore
        return attrsMapping[attr];
    }

    const refreshNodes = (
        page: number, 
        attr: string, 
        dir: string, 
    ) => {
        fetchBacktests(
            page, 
            size,
            attr, 
            dir, 
            searchAttr, 
            searchQuery, 
            searchExclusive,
        )
    }

    const onAttrChange = (newAttr: string) => {
        setAttr(newAttr);
        refreshNodes(page, newAttr, dir);
    }
    const [dir, setDir] = useState("desc");
    const onDirChange = (newDir: string) => {
        setDir(newDir);
        refreshNodes(page, attr, newDir);
    }
    const onPageChange = (e: any, page: number) => {
        setPage(page);
        refreshNodes(page, attr, dir);
    }
    const onRefreshClick = () => {
        onPageChange(null, page);
    }

    const ezFetchSubmissions = () => {
        fetchBacktests(
            page, 
            size,
            attr, 
            dir, 
            searchAttr, 
            searchQuery, 
            searchExclusive,
        )
    }

    const onFetch = (data: any) => {
        setBacktests(data.items);
        //@ts-ignore 
        setPagination(getPagination(data));
    }

    const fetchBacktests = (
        page: number, 
        backtestSize: number, 
        attr: string, 
        dir: string, 
        search_by: string,
        search_query: string,
        exclusive: boolean,
    ) => {

        if (props.compID > 0) {
            dispatch(getEligibleBacktests(
                props.compID, 
                page, 
                backtestSize, 
                convertAttr(attr), 
                dir, 
                convertSearchAttr(search_by),
                search_query,
                exclusive,
                onFetch
            )
            );
        }
    }

    return (

        <Modal
            {...props}
            //@ts-ignore 
            style={{
                minWidth: "550px",
                minHeight: "500px",
                maxHeight: "500px",
            }}
        >
            <div
                className="centered"
            >

                <Backtests 
                    title={"Eligible Backtests"}
                    backtests={backtests}
                    info={"Your eligible submissions"}
                    page={page}
                    onPageChange={onPageChange}
                    pagination={pagination}
                    attrsMapping={attrsMapping}
                    attr={attr}
                    onAttrChange={onAttrChange}
                    dir={dir}
                    onDirChange={onDirChange}
                    onRefresh={onRefreshClick}
                    showUser={true}
                
                    searchAttrsMapping={searchAttrsMapping}
                    searchAttr={searchAttr}
                    onSearchAttrChange={onSearchAttrChange}
                    searchQuery={searchQuery}
                    onSearchQueryChange={onSearchQueryChange}
                    searchExclusive={searchExclusive}
                    onExclusiveChange={onSearchExclusiveChange}
                    onSearchSubmit={ezFetchSubmissions}
                />

            </div>

        </Modal>
    )

}

export default EligibleBacktests;
