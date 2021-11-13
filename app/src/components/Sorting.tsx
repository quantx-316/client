import React, {useState, useEffect} from 'react'; 
import { Select, ItemRenderer } from '@blueprintjs/select'
import { Button, MenuItem } from '@blueprintjs/core'
import { Classes, Popover2 } from "@blueprintjs/popover2";

type SortingProps = {
    attrsMapping: any,
    attr: string,
    onAttrChange: any,
    dir: string, 
    onDirChange: any,
}

const Sorting = (props: SortingProps) => {

    const dirToIcon = {
        'asc': 'chevron-up',
        'desc': 'chevron-down',
    }

    const [attrsArr, setAttrsArr] = useState([]);

    useEffect(() => {
        //@ts-ignore
        setAttrsArr(Object.keys(props.attrsMapping ?? {}))
    }, [props.attrsMapping])

    const onDirChange = () => {
        if (!props.dir) return;
        const nextDir = props.dir === "asc" ? "desc" : "asc";
        props.onDirChange(nextDir);
    }

    const onAttrChange = (
        attr: any,
        event?: React.SyntheticEvent<HTMLElement, Event> | undefined
      ) => {
        props.onAttrChange(attr);
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
                    text={props.attr ?? "Sort By"}
                    outlined={true}
                />
            </Select>   

            <Popover2
                interactionKind="hover"
                placement="top"
                popoverClassName={Classes.POPOVER2_CONTENT_SIZING}
                autoFocus={false}
                enforceFocus={false}
                content={props.dir === "asc" ? "Ascending" : "Descending"}
            >

                <Button 
                    //@ts-ignore
                    icon={props.dir in dirToIcon ? dirToIcon[props.dir] : null}
                    onClick={() => onDirChange()}
                />
            
            </Popover2>

        </div>
    )
    
}

export default Sorting;
