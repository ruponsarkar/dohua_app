import React, { useState } from "react";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import { View, Text } from "react-native";
import ModalView from "./modal";
import { Button } from "@rneui/themed";
import Icon from "react-native-vector-icons/Fontisto";

const DatePicker = ({handleOnChange, value}) => {
  const [date, setDate] = useState();
  const [open, setOpen] = useState(false);

  const handleClose = (data) => {
    setOpen(data);
  };

  const handleChange = (date) => {
    // console.log(dayjs(date).format("YYYY-MM-DD"));
    // setDate(date);
    handleOnChange(dayjs(date).format("YYYY-MM-DD"))
    handleClose(false);
  };

  const mainPicker = () => {
    return (
      <>
        <View>
          <DateTimePicker
            mode="single"
            date={value}
            onChange={(params) => handleChange(params.date)}
            // onChange={(params) => handleOnChange(params.date)}
          />
        </View>
      </>
    );
  };

  

  return (
    <View>
      <Button
        title={ value ? dayjs(value).format(" YYYY-MM-DD") : ' Date'}
        type="outline"
        buttonStyle={{
          borderColor: "black",
          justifyContent: "flex",
          paddingLet: 10
        }}
        titleStyle={{
          color: "gray",
        }}
        icon={<Icon name="date" size={15} />}
        iconContainerStyle={{margin: 10}}
        // iconRight={true}
        onPress={() => setOpen(true)}
      />

      <ModalView data={mainPicker()} open={open} close={handleClose} />
    </View>
  );
};

export default DatePicker;
