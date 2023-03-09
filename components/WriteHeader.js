import React, {useState, useReducer} from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import TransparentCircleButton from './TransparentCircleButton';
import { useNavigation } from '@react-navigation/native';
import {format} from 'date-fns';
import {ko} from 'date-fns/locale';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const initalState = {mode: 'date', visible: false};
function reducer(state, action) {
    switch (action.type) {
        case 'open':
            return {
                mode: action.mode,
                visible: true,
            }
        case 'close':
            return {
                ...state,
                visible: false,
            }
    
        default:
            throw new Error('Unhandled action type');
    }
}

function WriteHeader({onSave, onAskRemove, isEditing, date, onChangeDate}) {
    const navigation = useNavigation();
    const onGoBak = () => {
        navigation.pop();
    }

    // useState -> useReduver
    /*const [mode, setMode] = useState('date');
    const [visible, setVisible] = useState(false);
    const onPressDate = () => {
        setMode('date');
        setVisible(true);
    }

    const onPressTime = () => {
        setMode('time');
        setVisible(true);
    }*/

    // useReducer는 상태관리가 복잡할 때는 유용하나 지금처럼 간단할 때는 오히려 복잡하게 느껴질 수 있다
    // 이러한 상태 관리 방법도 있다라고 알아두면 좋을것 같다.
    const [state, dispatch] = useReducer(reducer, initalState);
    const open = (mode) => dispatch({type: 'open', mode});
    const close = (mode) => dispatch({type: 'close', mode});

    const onConfirm = (selectedDate) => {
        //setVisible(false);
        close();
        onChangeDate(selectedDate);
    }

    const onCancel = () => {
        setVisible(false);
    }

    return (
        <View style={styles.block}>
            <View style={styles.iconButton}>
                <TransparentCircleButton
                    onPress={onGoBak}
                    name="arrow-back"
                    color="#424242"
                />
            </View>

            <View style={styles.buttons}>
                {isEditing && ( // &&는 ?? 반대인 AND 문이다
                    <View style={[styles.iconButtonWrapper, styles.marginRight]}>
                        <TransparentCircleButton
                            name="delete-forever"
                            color="#ef5350"
                            hasMarginRight
                            onPress={onAskRemove}
                        />
                    </View>
                )}
                <View style={styles.iconButtonWrapper}>
                    <TransparentCircleButton
                        name="check"
                        color="#009688"
                        onPress={onSave}
                    />
                </View>
            </View>

            <View style={styles.center}>
                <Pressable
                    onPress={() => open('date') }
                    // onPressDate
                >
                    <Text>
                        {format(new Date(date), 'PPP', {
                            locale: ko,
                        })}
                    </Text>
                </Pressable>
                <View style={styles.separator} />
                <Pressable
                    onPress={() => open('time') }
                    // onPressTime
                >
                    <Text>{format(new Date(), 'p', {locale: ko})}</Text>
                </Pressable>
            </View>
            <DateTimePickerModal
                isVisible={state.visible}
                // visible
                mode={state.mode}
                // mode
                onConfirm={onConfirm}
                onCancel={onCancel}
                date={date}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
      height: 48,
      paddingHorizontal: 8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    buttons: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    center: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: -1,
        flexDirection: 'row',
    },
    separator: {
        width: 8,
    },
});
  
  export default WriteHeader;