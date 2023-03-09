import {useNavigation} from '@react-navigation/native';
import React, {useState, useContext} from 'react';
import {StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import WriteHeader from '../components/WriteHeader';
import WriteEditor from '../components/WriteEditor';
import LogContext from '../contexts/LogContext';

function WriteScreen({route}) {
    const log = route.params?.log;
    // ?. 옵셔널 체이닝 문법으로 null or undefinded 일 수 있는 객체의 프로퍼티를 에러 없이 접근할 수 있다

    const [title, setTitle] = useState(log?.title ?? '');
    // ??는 OR 연산자이다
    const [body, setBody] = useState(log?.body ?? '');
    const navigation = useNavigation();
    const [date, setDate] = useState(log ? new Date(log.date) : new Date());

    const {onCreate, onModify, onRemove} = useContext(LogContext);
    const onSave = () => {
        if(log) {
            onModify({
                id: log.id,
                date: date.toISOString(),
                title,
                body,
            });
        } else {
            onCreate({
                title,
                body,
                // 날짜를 문자열로 변환
                date : date.toISOString(),
            });
        }
        navigation.pop();
    }
    const onAskRemove = () => [
        Alert.alert(
            '삭제',
            '정말로 삭제하시겠습니까?',
            [
                {text: '취소', style: 'cancel'},
                {
                    text: '삭제',
                    onPress: () => {
                        onRemove(log?.id);
                        navigation.pop();
                    },
                    style: 'destructive'
                },
            ],
            {
                cancelable: true,
            },
        )
    ];

    return (
        <SafeAreaView style={styles.block}>
            <KeyboardAvoidingView
                style={styles.avoidingView}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <WriteHeader
                    onSave={onSave}
                    onAskRemove={onAskRemove}
                    isEditing={!!log}
                    // !! 는 뒤에 있는 값이 유효한 값이면 true 아니면 false를 반환한다
                    // !은 NOT연산자로 Boolean타입은 반대로 치환하지만 Boolean타입이 아니면 우리가 원하지 않는 결과가 나타날 수 있다
                    // NOT 연산자를 두번 !! 사용할 경우 객체의 유효성을 판단할 수 있다
                    date={date}
                    onChangeDate={setDate}
                />
                <WriteEditor
                    title={title}
                    body={body}
                    onChnageTitle={setTitle}
                    onChnageBody={setBody}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    block: {
      flex: 1,
      backgroundColor: 'white',
    },
    avoidingView: {
      flex: 1,
    },
});

export default WriteScreen;