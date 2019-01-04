// TimePickerMenu.js
// Time Picker popup

import React, { Component } from "react";
import { Text, View, Modal, StyleSheet } from "react-native";
import PickerButton from "../timepicker/PickerButton";
import * as colors from "../timepicker/colors";
import { WheelPicker } from 'react-native-wheel-picker-android';
import TimerMixin from "react-timer-mixin";

function parseMillisecondsIntoReadableTime(milliseconds){
  var hours = milliseconds / (1000*60*60);
  var absoluteHours = Math.floor(hours);
	
  var minutes = (hours - absoluteHours) * 60;
  var absoluteMinutes = Math.floor(minutes);

  if(absoluteHours == 1) {
    hTxt = " hour";
  } else {
    hTxt = " hours";
  };

  if(absoluteMinutes == 1) {
    mTxt = " minute";
  } else {
    mTxt = " minutes";
  };

  if(absoluteHours == 0) {
    return absoluteMinutes + mTxt;
  } else {
    return absoluteHours + hTxt + ' and ' + absoluteMinutes + mTxt;
  }; 
}

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const hoursData = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
const minutesData = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'];

class TimePickerMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedHours: 9,
      selectedMinutes: 0,
      setHour: '',
      setMinute: '',
      nextAlarm: '',
    };
  }

  componentDidMount() {
    TimerMixin.setInterval(() => { // refreshes remaining time
      this.getTime();
    }, 10);
  }

  getTime() {
    var date, curHour, curMinutes, fullTime;
    date = new Date();
    curHour = date.getHours(); 
    curMinutes = date.getMinutes();

    selTimeInMS = ((this.state.selectedHours * HOUR) + (this.state.selectedMinutes * MINUTE));
    curTimeInMS =  ((curHour * HOUR) + (curMinutes * MINUTE));

    if(selTimeInMS > curTimeInMS) {
      math = selTimeInMS - curTimeInMS;
    } else {
      math = ((DAY - curTimeInMS) + selTimeInMS);
    };

    var convertTime = parseMillisecondsIntoReadableTime(math);

    this.setState({ nextAlarm: convertTime });
    this.setState({ setHour: Number(this.state.selectedHours) });
    this.setState({ setMinute: Number(this.state.selectedMinutes) });
  }
  
   render() {
    return (
      <Modal
        animationType={"fade"}
        transparent={true}
        onRequestClose={() =>
          this.props.onClose(this.state.selectedHours, this.state.selectedMinutes)}
        visible={this.props.visible}
      >
		<View style={styles.modalBackground}>
			<View style={styles.modalInnerContainer}>
        <View style={styles.nextAlarm}>
          <Text style={styles.modalText}>Alarm in {(this.state.nextAlarm)}</Text>
        </View>
        <View style={styles.rowPicker}>
        <WheelPicker
           onItemSelected={ (event)=> this.setState({ index: event.position, selectedHours: event.data }) }
           isCurved
           isCyclic
           renderIndicator
           selectedItemPosition={this.state.setHour}
           indicatorColor={colors.black}
           selectedItemTextColor={colors.black}
           data={hoursData}
           style={styles.wheelPicker}
        />
        <WheelPicker
           onItemSelected={ (event)=> this.setState({ index: event.position, selectedMinutes: event.data }) }
           isCurved
           isCyclic
           renderIndicator
           selectedItemPosition={this.state.setMinute}
           indicatorColor={colors.black}
           selectedItemTextColor={colors.black}
           data={minutesData}
           style={styles.wheelPicker}
        />
        </View>
				<View style={styles.buttonContainer}>
          <PickerButton fontSize={25} onPress={() =>this.props.onClose(this.state.selectedHours, this.state.selectedMinutes)}>
            Ok
          </PickerButton>
				</View>
			</View>
		</View>
	</Modal>
    );
  }
}

export default (TimePickerMenu);

const styles = StyleSheet.create(
  {
    modalBackground: {
      flex: 1,
      justifyContent: "center",
      alignItems: "stretch",
      paddingLeft: 40,
      paddingRight: 40,
      paddingTop: 150,
      paddingBottom: 180,
    },

    modalText: {
      fontFamily: "OpenSans-Regular",
      fontSize: 14,
      color: colors.white
    },

    modalInnerContainer: {
      flex: 1,
      alignItems: "stretch",
      backgroundColor: "white",
      paddingLeft: 30,
      paddingRight: 30,
      paddingTop: 20,
      paddingBottom: 10,
    },

    modal: {
      flex: 0.25,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white"
    },

    buttonContainer: {
      marginTop: 10,
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    },

    rowPicker: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center"
    },

    wheelPicker: {
      width: 100,
      height: 150
    },

    nextAlarm: {
      alignSelf: 'stretch',
      alignItems: "center",
      marginBottom: 10,
      backgroundColor: colors.skyBlue
    },
  },
);
