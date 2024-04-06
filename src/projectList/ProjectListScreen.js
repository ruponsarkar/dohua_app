import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const ProjectListScreen = () => {
  // Sample data for projects
  const projects = [
    { id: '1', name: 'Project A', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { id: '2', name: 'Project B', description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { id: '3', name: 'Project C', description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
    // Add more projects as needed
  ];

  // Render each project item
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.projectItem} onPress={() => handleProjectPress(item.id)}>
      <Text style={styles.projectName}>{item.name}</Text>
      <Text style={styles.projectDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  // Handle project press
  const handleProjectPress = (projectId) => {
    // Navigate to project details screen or perform any other action
    console.log('Project selected:', projectId);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={projects}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  projectItem: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  projectName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  projectDescription: {
    fontSize: 16,
    color: '#666666',
  },
});

export default ProjectListScreen;