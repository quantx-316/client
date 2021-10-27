import React, {useState} from 'react';
import { DatePicker, TimePrecision } from "@blueprintjs/datetime";
import { Classes, H5, Switch } from "@blueprintjs/core";

export type TimeSelectProps = {
    onDateChange: any,
    minDate: any,
    maxDate: any,
}

const TimeSelect = ({onDateChange, minDate, maxDate, ...props} : TimeSelectProps) => {

    // const [date, setDate] = useState<Date | null>(null);

    // const onDateChange = (date: Date) => {
    //     setDate(date);
    // }

    return (
        <DatePicker
            onChange={onDateChange}
            timePickerProps={{
                showArrowButtons: true,
            }}
            minDate={minDate}
            maxDate={maxDate}
            timePrecision={TimePrecision.MINUTE}
            {...props}
        />
    )

}

export default TimeSelect;
