import React, { useState } from "react";
// import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from "@react-native-picker/picker";
// import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import DatePicker from "../component/datpicker";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Button,
  TextInput,
  SafeAreaView,
  ScrollView,
} from "react-native";
import axios from "axios";

export default function AddProject() {
  // const [data, setData] = useState({
  //   title: '',
  // })
  // const [date, setDate] = useState(dayjs());
  const [data, setData] = useState({
    code: null,
    type: "",
    name: "",
    contractor_cs: "",
    contractor: "",
    contractorPhoneCs: "",
    contractorPhone: "",
    initial_amount: "",
    scheme: "",
    district: "",
    other_scheme: "",
    aa_status: "",
    tender_amount_cs: "",
    tender_amount: "",
    technical_approval: "",
    aa_amount: "",
    total_disbursed_amount: "",
    description: "",
    avatar: "",
    status: "Ongoing",
    wo_date_cs: "",
    wo_date: dayjs(),
    wo_number_cs: "",
    wo_number: "",
    wo_amount_cs: "",
    wo_amount: "",
    actual_start_cs: "",
    actual_start: "",
    actual_end_cs: "",
    actual_end: "",
    accessKeyword: "",
    avail_status: "1",
    descriptio: "",
    actual_stars: "",
  });

  const handleSubmit = () => {
    // Handle form submission logic here
    const abc = { requestObject: data };
    const requestObject = data;
    console.log(abc);

    axios
      .post("http://statedatacenterdispuraiidc.com:9000/api/createProject", abc)
      .then((res) => {
        console.log("add project", res);
      })
      .catch((err) => {
        console.log("error==>", err);
      });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.label}>Project Title</Text>
        <TextInput
          style={styles.input}
          value={data.name}
          placeholderTextColor="gray"
          placeholder="Project Title"
          onChangeText={(text) => setData({ ...data, name: text })}
        />

        <Text style={styles.label}>Contractor Name</Text>
        <TextInput
          style={styles.input}
          value={data.contractor}
          placeholderTextColor="gray"
          placeholder="Contractor Name"
          onChangeText={(text) => setData({ ...data, contractor: text })}
        />

        <Text style={styles.label}>Contractor Phone</Text>
        <TextInput
          style={styles.input}
          value={data.contractorPhone}
          placeholderTextColor="gray"
          keyboardType="numeric"
          placeholder="+ 91"
          onChangeText={(text) => setData({ ...data, contractorPhone: text })}
        />

        <Text style={styles.label}>Work order No.</Text>
        <TextInput
          style={styles.input}
          value={data.wo_number}
          placeholderTextColor="gray"
          placeholder="Work order No."
          onChangeText={(text) => setData({ ...data, wo_number: text })}
        />

        <View>
          <Text style={styles.label}>Work order Date</Text>
          <DatePicker handleOnChange={(e)=> setData({...data, wo_date: e})} value={data.wo_date}/>
        </View>

        {/* <DateTimePicker
        value={date}
        mode={"date"}
        is24Hour={true}
        onChange={onChange}
      />
      <Text>{date.toLocaleString()}</Text> */}

        <Text style={styles.label}>Work order amount</Text>
        <TextInput
          style={styles.input}
          value={data.wo_amount}
          placeholderTextColor="gray"
          placeholder="Work order amount"
          onChangeText={(text) => setData({ ...data, wo_amount: text })}
        />

        <Text>Project type</Text>
        <View style={styles.selectBox}>
          <Picker
            selectedValue={data.type}
            onValueChange={(text, itemIndex) =>
              setData({ ...data, type: text })
            }
          >
            <Picker.Item label="" />
            <Picker.Item label="Construction" value="Construction" />
            <Picker.Item label="Land Development" value="Land Development" />
            <Picker.Item label="Industrial Shed" value="Industrial Shed" />
            <Picker.Item label="Road" value="Road" />
            <Picker.Item label="IT Hardware Work" value="IT Hardware Work" />
            <Picker.Item label="IT Software Work" value="IT Software Work" />
            <Picker.Item
              label="Assam Startup (Nest)"
              value="Assam Startup (Nest)"
            />
            <Picker.Item label="Others" value="Others" />
          </Picker>
        </View>

        <Text>Project Status</Text>
        <View style={styles.selectBox}>
          <Picker
            selectedValue={data.status}
            onValueChange={(text, itemIndex) =>
              setData({ ...data, status: text })
            }
          >
            <Picker.Item label="" />
            <Picker.Item label="Ongoing" value="Ongoing" />
            <Picker.Item label="Completed" value="Completed" />
          </Picker>
        </View>

        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  label: {
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  selectBox: {
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    padding: 0,
    marginBottom: 5,
    marginTop: 5,
    backgroundColor: "white",
  },
});
