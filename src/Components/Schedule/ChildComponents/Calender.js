import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import '../../../style/schedular/calender.css'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const calendar = () => {
    const [value, onChange] = useState(new Date());
    return (
        <>
            <div className="Sub-React-Calender">
                <Calendar onChange={onChange} value={value} />
            </div>
        </>

    );
};
export default calendar;
