import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';


const ProjectDetailsScreen = () => {
  // Sample project details
  const route = useRoute();

  const { projectId } = route.params; 
  const projectDetails = {
    name: 'Project A',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    startDate: 'January 1, 2023',
    endDate: 'December 31, 2023',
    client: 'Client X',
    status: 'In Progress',
    // Add more project details as needed
  };

  // Sample image gallery data
  const imageGallery = [
    { id: '1', source: require('../assets/image/aiidc-logo.png') },
    { id: '2', source: require('../assets/image/aiidc-logo.png') },
    { id: '3', source: require('../assets/image/aiidc-logo.png') },
    // Add more images as needed
  ];

  // Render each image in the gallery
  const renderImageItem = ({ item }) => (
    <Image source={item.source} style={styles.imageItem} resizeMode="cover" />
  );

  // Function to determine status text style based on project status
  const getStatusStyle = (status) => {
    switch (status) {
      case 'In Progress':
        return { color: 'orange' };
      case 'Completed':
        return { color: 'green' };
      case 'On Hold':
        return { color: 'red' };
      default:
        return {};
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.projectName}>{projectDetails.name} {projectId}</Text>
        <Text style={styles.projectDescription}>{projectDetails.description}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsLabel}>Start Date:</Text>
        <Text style={styles.detailsText}>{projectDetails.startDate}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsLabel}>End Date:</Text>
        <Text style={styles.detailsText}>{projectDetails.endDate}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsLabel}>Client:</Text>
        <Text style={styles.detailsText}>{projectDetails.client}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsLabel}>Status:</Text>
        <Text style={[styles.detailsText, getStatusStyle(projectDetails.status)]}>{projectDetails.status}</Text>
      </View>
      <View style={styles.imageGallery}>
        <FlatList
          data={imageGallery}
          renderItem={renderImageItem}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  header: {
    marginBottom: 20,
  },
  projectName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  projectDescription: {
    fontSize: 16,
    color: '#666666',
  },
  detailsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  detailsLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  detailsText: {
    fontSize: 16,
  },
  imageGallery: {
    marginTop: 20,
    marginBottom: 20,
  },
  imageItem: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginRight: 10,
  },
});

export default ProjectDetailsScreen;
