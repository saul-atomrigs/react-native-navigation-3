import { StyleSheet, Text, View } from 'react-native';
import { Calendar, Agenda } from 'react-native-calendars';
import React from 'react';

export default function Calendar2() {

  // CUSTOM TEXT BELOW DATE

  function CalendarDayComponent(props) {
    const { date, marking, state, onPress, calendarData, children } = props;
    const onPressed = () => {
      requestAnimationFrame(() => onPress(date));
    }
    let items = '';

    if (marking.marked) {
      items = calendarData[date.dateString].length
    }
    return (
      <View style={styles.container}>
        <Text onPress={onPressed} style={{ color: state === 'disabled' ? 'gray' : 'black' }}>
          {children}
        </Text>
        <Text style={styles.itemsCount}>
          {items}
        </Text>
      </View>
    )
  };
  const renderDayComponent = props => <CalendarDayComponent />;

  return (
    <>
      <Calendar
        // Specify style for calendar container element. Default = {}
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          height: 350
        }}
        // Specify theme properties to override specific styles for calendar parts. Default = {}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          textSectionTitleDisabledColor: '#d9e1e8',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#00adf5',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          dotColor: '#00adf5',
          selectedDotColor: '#ffffff',
          arrowColor: 'orange',
          disabledArrowColor: '#d9e1e8',
          monthTextColor: 'blue',
          indicatorColor: 'blue',
          textDayFontFamily: 'monospace',
          textMonthFontFamily: 'monospace',
          textDayHeaderFontFamily: 'monospace',
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '300',
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({});
