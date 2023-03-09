import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import FeedListItem from './FeedListItem';

function FeedList({logs, onScrolledToBottom, ListHeaderComponent}) {
    const onScroll = (e) => {
        
        if(!onScrolledToBottom) {
            return;
        }

        const {contentSize, layoutMeasurement, contentOffset} = e.nativeEvent;
        const distanceFromBottom = contentSize.height - layoutMeasurement.height - contentOffset.y;

        if(distanceFromBottom < 72) {
            onScrolledToBottom(true);
        }else{
            onScrolledToBottom(false);
        }
    };

    return (
        <FlatList
            data={logs}
            style={styles.block}
            renderItem={({item}) => <FeedListItem log={item} />}
            keyExtractor={(log) => log.id }
            ItemSeparatorComponent = {() => <View style={styles.separator} />}
            onScroll={onScroll}
            ListHeaderComponent={ListHeaderComponent}
            // FlatList의 ListHeaderComponent Props를 사용하면 전달된 컴포넌트를 상단부에 전달된 컴포넌트를 보여줄 수 있다
        />
    )
}

const styles = StyleSheet.create({
    block: {flex: 1},
    separator: {
      backgroundColor: '#e0e0e0',
      height: 1,
      width: '100%',
    },
});

export default FeedList;