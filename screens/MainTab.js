import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedsScreen from './FeedsScreen';
import CalendarScreen from './CalendarScreen';
import SearchScreen from './SearchScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SearchHeader from '../components/SearchHeader';

const Tab = createBottomTabNavigator();

function MainTab() {
    return (
        <Tab.Navigator
            // tabBarOptions가 삭제되고 screenOptions가 생겼으며 기존 속성에서 tabBar을 맨앞에 명시해주면 동일하게 동작한다.
            screenOptions={{
                tabBarShowLabel : false, // 라벨 안보이게
                tabBarActiveTintColor : '#006988', // 활성화 되었을 때 색상
            }}
        >
            <Tab.Screen
                name="Feeds" // 메뉴 이름
                component={FeedsScreen} // 메뉴와 연결할 component
                options={{
                    tabBarIcon : ({color, size}) => ( // 아이콘 설정
                        <Icon name="view-stream" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Calendar"
                component={CalendarScreen}
                options={{
                    tabBarIcon : ({color, size}) => (
                        <Icon name="event" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Search"
                component={SearchScreen}
                options={{
                    tabBarIcon : ({color, size}) => (
                        <Icon name="search" size={size} color={color} />
                    ),
                    headerTitle: () => <SearchHeader/>,
                }}
            />
        </Tab.Navigator>
    )
}

export default MainTab;