import React, { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
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
} from "react-native";

export default function AddProject() {
  const [text, onChangeText] = React.useState("");
  const [number, onChangeNumber] = React.useState("");


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [selectedValue, setSelectedValue] = useState('');
  
  
  // const [date, setDate] = useState(new Date());
  // const onChange = (e, selectedDate) => {
  //   setDate(selectedDate);
  // };


  const handleSubmit = () => {
  // Handle form submission logic here
  console.log('Submitted:', { name, email, password });


  };

  return (
    // <View>
    //   <View>
    //     <SafeAreaView>
    //       <TextInput
    //         style={styles.input}
    //         onChangeText={onChangeText}
    //         placeholder="Project Title"
    //         value={text}
    //       />
    //       <TextInput
    //         style={styles.input}
    //         onChangeText={onChangeNumber}
    //         value={number}
    //         placeholder="useless placeholder"
    //         keyboardType="numeric"
    //       />
    //     </SafeAreaView>
    //   </View>
    // </View>

    <View style={styles.container}>
      <Text style={styles.label}>Project Title</Text>
      <TextInput
        style={styles.input}
        value={name}
        placeholderTextColor="gray"
        placeholder="Project Title"
        onChangeText={text => setName(text)}
      />

      <Text style={styles.label}>Contractor Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        placeholderTextColor="gray"
        placeholder="Contractor Name"
        onChangeText={text => setContractorName(text)}
      />

      <Text style={styles.label}>Contractor Phone</Text>
      <TextInput
        style={styles.input}
        value={number}
        placeholderTextColor="gray"
        keyboardType="numeric"
        placeholder="+ 91"
        onChangeText={text => setContractorPhone(text)}
      />

      <Text style={styles.label}>Work order No.</Text>
      <TextInput
        style={styles.input}
        value={name}
        placeholderTextColor="gray"
        placeholder="Work order No."
        onChangeText={text => setWoNo(text)}
      />
      
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
        value={name}
        placeholderTextColor="gray"
        placeholder="Work order amount"
        onChangeText={text => setWoAmnt(text)}
      />

      <Text>Project type</Text>
      <View style={styles.selectBox}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="" />
        <Picker.Item label="Construction" value="Construction" />
        <Picker.Item label="Land Development" value="Land Development" />
        <Picker.Item label="Industrial Shed" value="Industrial Shed" />
        <Picker.Item label="Road" value="Road" />
        <Picker.Item label="IT Hardware Work" value="IT Hardware Work" />
        <Picker.Item label="IT Software Work" value="IT Software Work" />
        <Picker.Item label="Assam Startup (Nest)" value="Assam Startup (Nest)" />
        <Picker.Item label="Others" value="Others" />
      </Picker>
      </View>

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  selectBox: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 0,
    marginBottom: 5,
    marginTop: 5,
    backgroundColor: 'white',
  },
});
