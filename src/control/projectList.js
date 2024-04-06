import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TextInput } from "react-native";
import { Card, Divider, Badge, Button } from "@rneui/themed";
import CSS from "../assets/css";

import ModalView from "../component/modal";
import ChangeEMI from "./chnageEMI";
import ChangeRole from "./changeRole";
import Icon from "react-native-vector-icons/Feather";
import { browseGallery, handleOpenCamera } from "../home/camera";

const Projects = ({ navigation }) => {
  const [modal1, setModal1] = useState("");
  const [modal2, setModal2] = useState("");

  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "We opted to center the map on your current location when possible, using the html5 geolocation feature to find out the latitude and longitude of your location",
      work_date: "2024/01/02",
    },
    {
      id: 2,
      name: "You can name any place you bookmarked and make them available through our API.",
      work_date: "2024/01/02",
    },
    {
      id: 3,
      name: "You can create links to custom maps to share with your friends or customers.",
      work_date: "2024/01/02",
    },
    {
      id: 4,
      name: "This is especially useful if you look for specific places on a device like your desktop, in order to use them later on with your mobile or your tablet",
      work_date: "2024/01/02",
    },
    {
      id: 5,
      name: "To find the GPS coordinates of an address or a place, simply use our latitude and longitude finder.",
      work_date: "2024/01/02",
    },
    {
      id: 6,
      name: "Latitude and longitude to address: fill the decimal GPS coordinates and click on the corresponding",
      work_date: "2024/01/02",
    },
  ]);

  return (
    <ScrollView>
      <Card>
        <View>
          <Text style={[CSS.textCenter, CSS.fontBold]}>Manage Projects</Text>
        </View>
      </Card>


      <Card>
        {projects &&
          projects.map((p) => (
            <>
            <View
              style={{
                // flexDirection: "row",
                marginBottom: 5,
                alignItems: "center",
                
              }}
            >
              <Text style={{ width: "100%" }}>
                {p.name} <Text style={CSS.fontBold}>({p.work_date})</Text>
              </Text>

              <View>
                <Text>
                  <Button onPress={browseGallery}>
                    {" "}
                    Browse &nbsp;
                    <Icon
                      name="upload"
                      size={18}
                      color={"white"}
                      style={{ textAlign: "center" }}
                    />
                  </Button>
                  &nbsp;
                  <Button onPress={handleOpenCamera}>
                    {" "}
                    Camera &nbsp;
                    <Icon
                      name="camera"
                      size={18}
                      color={"white"}
                      style={{ textAlign: "center" }}
                    />
                  </Button>
                </Text>
              </View>
            </View>
              <Divider style={{ marginBottom: 10, }} />
            </>
          ))}
      </Card>

      <ModalView open={modal1} close={setModal1} data={<ChangeEMI />} />
      <ModalView open={modal2} close={setModal2} data={<ChangeRole />} />
    </ScrollView>
  );
};

export default Projects;
