import React from 'react';
import {Calendar} from 'react-native-calendars';
import {StyleSheet} from 'react-native';

function CalendarView({markedDates, selectedDate, onSelectDate}) {
    
    const markedSelectedDate = {
        ...markedDates,
        [selectedDate] : {
            selected: true,
            marked: markedDates[selectedDate]?.marked
        },
    };

    return (
        <Calendar
            style={styles.calendar}
            markedDates={markedSelectedDate}
            theme={{
                selectedDayBackgroundColor: '#009688',
                arrowColor: '#009688',
                dotColor: '#009688',
                todayTextColor: '#009688',
            }}
            onDayPress={(day) => {
                onSelectDate(day.dateString);
                /*
                day 객체 구성
                {
                    "dateString" : "2023-03-09",
                    "day" : 9,
                    "month" : 3,
                    "timestamp" : 1678320000000,
                    "year" : 2023
                }
                */
            }}
        />
    )
}

const styles = StyleSheet.create({
    calendar: {
      borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0',
    },
});

export default CalendarView;