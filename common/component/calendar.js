import React from 'react';
import CalendarTimeLine from './calendarTimeLine';

const Calendar = ({
    dispatch,

    accessToken,
    dongshifu
}) => {
    const timeLineProps = {
        dispatch,
        accessToken,
        dongshifu
    }
    return (
        <div>
            <CalendarTimeLine {...timeLineProps}></CalendarTimeLine>
        </div>
    )
}

export default Calendar;