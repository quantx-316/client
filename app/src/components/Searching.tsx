import React, {useState, useEffect} from 'react'; 
import { Select, ItemRenderer } from '@blueprintjs/select'
import { Button, MenuItem } from '@blueprintjs/core'
import { Classes, Popover2 } from "@blueprintjs/popover2";

type SearchingProps = {
    attrsMapping: any,
    attr: string,
    query: string,
    onQueryChange: any,
    onAttrChange: any,
    exclusive: boolean, 
    onExclusiveChange: any, 
    onSubmit: any, 
}

const Searching = (props: SearchingProps) => {
    const [attrsArr, setAttrsArr] = useState([]);

    useEffect(() => {
        //@ts-ignore
        setAttrsArr(Object.keys(props.attrsMapping ?? {}))
    }, [props.attrsMapping])

    const onAttrChange = (
        attr: any,
        event?: React.SyntheticEvent<HTMLElement, Event> | undefined
      ) => {
        props.onAttrChange(attr);
    }

    const onQueryChange = (
        e: any 
    ) => {
        props.onQueryChange(e.target.value);
    }

    const renderTimeInterval: ItemRenderer<string> = (
        attr,
        { handleClick, modifiers }
      ) => {
        if (!modifiers.matchesPredicate) {
          return null
        }
        return (
          <MenuItem
            active={modifiers.active}
            key={attr}
            onClick={handleClick}
            text={attr}
          />
        )
      }

    const onSubmit = (e: any) => {
        e.preventDefault();

        props.onSubmit();
    }

    const onKeyPress = (e: any) => {
        if (e.which === 13) {
            props.onSubmit();
        }
    }

    return (
        <div
            style={{
                display: "flex",
                gap: "10px",
            }}
        >
            <Select
                items={attrsArr}
                itemRenderer={renderTimeInterval}
                activeItem={props.attr}
                onItemSelect={onAttrChange}
                filterable={false}
                >
                <Button
                    text={props.attr ?? "Search On"}
                    outlined={true}
                />
            </Select>   

            <Popover2
                interactionKind="hover"
                placement="right"
                popoverClassName={Classes.POPOVER2_CONTENT_SIZING}
                autoFocus={false}
                enforceFocus={false}
                content={props.exclusive ? "Exclude query" : "Include query"}
            >
                <Button 
                    //@ts-ignore
                    icon={props.exclusive ? "filter-remove" : "filter-keep"}
                    onClick={() => props.onExclusiveChange()}
                />
            </Popover2>

            <div
                style={{
                    display: "flex",
                    gap: "10px",
                }}
            >
                <div className="bp3-input-group .modifier">
                    <span className="bp3-icon bp3-icon-search"></span>
                    <input 
                        type="text" 
                        className="bp3-input" 
                        placeholder="Search" 
                        value={props.query}
                        onChange={onQueryChange}
                        onKeyPress={onKeyPress}
                    />
                    <button className="bp3-button bp3-minimal bp3-intent-primary bp3-icon-arrow-right"
                        onClick={onSubmit}
                    ></button>
                </div>

            </div>

        </div>
    )
    
}

export default Searching;
