// Importing necessary modules and components.
import React, { useState, useEffect, Fragment } from 'react';
import './styles.css';
import axios from 'axios'; // For making HTTP requests.
import { Header, List, Button, Container } from 'semantic-ui-react'; // UI components from Semantic UI.
import { Activity } from '../models/activity'; // Activity model for type definitions.
import NavBar from './NavBar'; // Navigation bar component.
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard'; // Activity dashboard component

// Main App component.
function App() {
  // State for holding the list of activities
  const [activities, setActivities] = useState<Activity[]>([]);

  // State for holding the selected activity
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);

  // State for holding the edit mode
  const [editMode, setEditMode] = useState(false);

  // UseEffect hook for fetching the list of activities from the API when the component mounts.
  useEffect(() => {
    // Axios HTTP GET request to the API.
    axios.get<Activity[]>('http://localhost:5000/api/activities')
      .then(response => {
        setActivities(response.data); // Set the state of activities to the response data.
      })
  }, []) // Empty array as second argument to prevent infinite loop.

  // Function to set the selected acitivity based on the id.
  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find(x => x.id === id));
  }

  // Function to clear the selected activity.
  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }

  // Function to handle the open form event.
  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }
  
  // Function to handle the close form event.
  function handleFormClose() {
    setEditMode(false);
  }

  // Component's render logic.
  return (
    <Fragment>
     <NavBar openForm={handleFormOpen} />
     <Container style={{marginTop: '7em'}}>
      <ActivityDashboard 
        activities={activities} // Pass the activities state to the ActivityDashboard component.
        selectedActivity={selectedActivity} // Pass the selectedActivity state to the ActivityDashboard component.
        selectActivity={handleSelectActivity}  // Pass the handleSelectActivity function to the ActivityDashboard component.
        cancelSelectActivity={handleCancelSelectActivity} // Pass the handleCancelSelectActivity function to the ActivityDashboard component.
        editMode={editMode} // Pass the editMode state to the ActivityDashboard component.
        openForm={handleFormOpen} // Pass the handleFormOpen function to the ActivityDashboard component.
        closeForm={handleFormClose} // Pass the handleFormClose function to the ActivityDashboard component.
      />
     </Container>
    
    </Fragment>
  );
}

// Export the App component.
export default App;
