import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";

import { Button } from "@rneui/themed";

const ModalView = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.open}
        // visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          props.close(!props.open);
        }}
      >
        <View style={styles.centeredView}>
          {props.data}

          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => props.close(!props.open)}
          >
            <Text style={styles.textStyle}>Close</Text>
          </Pressable>
        </View>
        {/* <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        {props.data}

                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => props.close(!props.open)}>
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View> */}
      </Modal>

      {/* <View>
                <Button size='sm' title={props.buttonTitle} onPress={() => setModalVisible(true)}/>
            </View> */}

      {/* <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}>
                <Text>Show Modal</Text>
            </Pressable> */}
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    // width: '100%',
    // height: '10%',
    backgroundColor: "white",
  },
  modalView: {
    width: 500,
    // margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    // padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default ModalView;
