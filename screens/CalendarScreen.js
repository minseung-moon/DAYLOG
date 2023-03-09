import React, {useContext, useState, useMemo} from 'react';
import CalendarView from '../components/CalendarView';
import LogContext from '../contexts/LogContext';
import {format} from 'date-fns';
import FeedList from '../components/FeedList';

function CalendarScreen() {
    const {logs} = useContext(LogContext);
    const [selectedDate, setSelectedDate] = useState(
        format(new Date(), 'yyyy-MM-dd'),
    )

    const markedDates = useMemo(
        () => 
            logs.reduce((acc, current) => {
                const formattedDate = format(new Date(current.date), 'yyyy-MM-dd');
                acc[formattedDate] = {marked: true};
                return acc;
            }, {}),
            // reduce 배열 안 값을 연산해 하나의 결괏값을 도출해낼 때 사용
            // acc 누적되는 값, current는 원소
            // 그 외에 index는 원소의 index, array는 배열 자신도 추가할 수 있다
            // {}는 acc의 초깃값이다
        [logs],
    );
    // useMemo를 사용하여 값을 memoization해 최적화할 수 있습니다.
    // memoization이란 계산을 반복해야 할 때 불필요한 연산을 제거하기 위해 이전에 계산한 값을 재사용해 처리를 최적화 하는것을 말합니다.
    // 위와 같이 작업을 해주면 logs 배열이 바뀔때만 logs.reduce 함수가 실행 됩니다.

    

    const filteredLogs = logs.filter(
        (log) => format(new Date(log.date), 'yyyy-MM-dd') === selectedDate
    );
    // 여기에도 useMemo를 사용할 수 있겠지만 리렌더링되는 시점이 selectedDate가 바뀌거나 logs가 바뀔 때인데
    // 어차피 매번 필터링을 다시 해야 하기 때문에 불필요합니다.

    return (
        <FeedList
            logs={filteredLogs}
            ListHeaderComponent={
                <CalendarView
                    markedDates={markedDates}
                    selectedDate={selectedDate}
                    onSelectDate={setSelectedDate}
                />
            }
        />
    )
}

export default CalendarScreen;