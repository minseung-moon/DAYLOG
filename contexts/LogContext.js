import React, { useEffect, useRef } from 'react';
import {createContext, useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import logsStorage from '../storages/logsStorage';

const LogContext = createContext();

export function LogContextProvider({children}) {
    /*const [logs, setLogs] = useState(
       Array.from({length: 30})
        .map((_, index) => ({
            id: uuidv4(),
            title: `Log ${index}`,
            body: `Log ${index}`,
            date: new Date().toISOString(),
        }))
        .reverse(),
    );*/
    const initialLogsRef = useRef(null);
    const [logs, setLogs] = useState([]);

    const onCreate = ({title, body, date}) => {
        const log = {
            id : uuidv4(),
            title,
            body,
            date,
        }
        setLogs([log, ...logs]);
    }

    useEffect(() => {
        // useEffect 내에서 async 함수를 만들고 바로 호출
        //IIFE 패턴
        (async () => {
            const savedLogs = await logsStorage.get();
            if (savedLogs) {
                initialLogsRef.current = savedLogs;
                setLogs(savedLogs);
            }
        })();
    }, []);

    useEffect(() => {
        if (logs === initialLogsRef.current) {
            return;
        }
        logsStorage.set(logs);
    }, [logs]);

    const onModify = (modified) => {
        // logs 배여를 순환해 id가 일치하면 log를 교체하고 그렇지 않으면 유지
        // 배열 안의 원소를 다른 형태로 변환할 때 사용, 새로운 배열 반환
        const nextLogs = logs.map((log) => log.id === modified.id ? modified : log);
        setLogs(nextLogs);
    }

    const onRemove = (id) => {
        // 특정 조건을 만족하는 원소를 찾아서 배열로 반환
        const nextLogs = logs.filter((log) => log.id !== id);
        setLogs(nextLogs);
    }

    return (
        <LogContext.Provider value={{logs, onCreate, onModify, onRemove}}>
            {children}
        </LogContext.Provider>
    );
}

export default LogContext;