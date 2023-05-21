import React, { useState, useEffect } from 'react';//hooks used for managing state and side ffect in functional components
import { TextField, Button, Grid, List, ListItem, ListItemText } from '@material-ui/core';//specific componets
import { useForm, Controller } from 'react-hook-form';//Function from reacthookfrom
import { yupResolver } from '@hookform/resolvers/yup';//used for integrate yup validation
import * as yup from 'yup';//defining validating schemas
import { IconButton } from '@material-ui/core';
import { DeleteOutline, Edit, StarBorder, Star } from '@material-ui/icons';
import ConfirmationDialog from './ConfirmationDialog';

const schema = yup.object().shape({//Defines yup schema using yup.object().shape method validation rules for the form fields
  taskName: yup
    .string()
    .required('Please enter the task')
    .test('taskExists', 'Task already exists', function (value) {
      const { tasks } = this.options.context;
      return !tasks.some(task => task.name === value.trim());
    }),
  recordCount: yup
    .number()
    .test('minimumRecords', 'At least two records are required', function () {
      const { tasks } = this.options.context;
      return tasks.length >= 2;
    }),
});
//Functional componet accept four props
const TaskList = ({ tasks, onDelete, onToggleImportant, onEdit }) => {
  const { handleSubmit, control, reset, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),//intialize the form state and validation
    context: { tasks }, // Pass tasks array as context to Yup validation
  });
  const [editedTaskId, setEditedTaskId] = useState(null);//uses usestate hook to create a state variable and setter function intialize state with null
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);
  //state varaible and  setter function to initalize for my understanding

//This is an effect hook executed when the component is mounts 
//and whenever reset tasks value changes .it reset the form to reflect the latest data
  useEffect(() => {
    reset();
  }, [reset, tasks]);
//filter the tasks based on search query update the filteredtasks
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter(task =>
        task.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTasks(filtered);
    }
  }, [searchQuery, tasks]);
//Receive the form data as parameter perform the action based on whenter 
//edittaskid is set or not onedit functionsor adds new 'tasks'array
  const handleFormSubmit = (data) => {
    const taskName = data.taskName.trim();

    if (editedTaskId) {
      onEdit(editedTaskId, taskName);
      setEditedTaskId(null);
    } else {
      const newTask = {
        id: tasks.length + 1,
        name: taskName,
      };
      tasks.push(newTask);
      reset();
    }
  };
//function cancel the editing of task
  const handleCancelEdit = () => {
    setEditedTaskId(null);
    reset();
  };
//his function is called when the "Edit" button for a specific task
// is clicked. It sets the editedTaskId state to the selected task's 
//ID and populates the form with the task's name using 
//the setValue function.
  const handleEdit = (taskId) => {
    setEditedTaskId(taskId);
    const editedTask = tasks.find((task) => task.id === taskId);
    setValue('taskName', editedTask.name);
  };
  // This function is called when the "Delete" button for 
  // a specific task is clicked. It checks if the task is important
  //  and opens the delete confirmation dialog if it is. 
  //  If the task is not important or there are only two tasks left, 
  //  it doesn't delete the task.
  const handleDeleteTask = (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    if (task.isImportant) {
      setDeleteTaskId(taskId);
      setDeleteConfirmationOpen(true);
    } else {
      // Check if there are only two records left
      if (tasks.length === 2) {
        return; // Do not delete the task
      }
      onDelete(taskId);
    }
  };
  // This function is called when 
  // the delete confirmation is confirmed. 
  // It calls the onDelete function to delete the task, 
  // closes the delete confirmation dialog, 
  // and resets the deleteTaskId state.
  const handleConfirmDelete = () => {
    onDelete(deleteTaskId);
    setDeleteConfirmationOpen(false);
    setDeleteTaskId(null);
  };

  const handleCancelDelete = () => {
    setDeleteConfirmationOpen(false);
    setDeleteTaskId(null);
  };
  // This function is called when the search query input field value 
  // changes. It updates the searchQuery state with the new value.
  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      {tasks.length === 2 && (
        <p>You should have at least two records.</p>
      )}
      <TextField
        value={searchQuery}
        onChange={handleSearchQueryChange}
        fullWidth
        variant="outlined"
        label="Search"
      />
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <Controller
              name="taskName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  variant="outlined"
                  label="Task Name"
                  error={Boolean(errors.taskName)}
                  helperText={errors.taskName?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {editedTaskId ? 'Update Task' : 'Add Task'}
            </Button>
            {editedTaskId && (
              <Button onClick={handleCancelEdit} variant="contained" color="secondary" fullWidth>
                Cancel
              </Button>
            )}
          </Grid>
        </Grid>
      </form>
      <List>
        {filteredTasks.map((task) => (
          <ListItem key={task.id}>
            <ListItemText primary={task.name} />
            <IconButton onClick={() => onToggleImportant(task.id)}>
              {task.isImportant ? <Star /> : <StarBorder />}
            </IconButton>
            <IconButton onClick={() => handleDeleteTask(task.id)} disabled={tasks.length === 2}>
              <DeleteOutline />
            </IconButton>
            <IconButton onClick={() => handleEdit(task.id)}>
              <Edit />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <ConfirmationDialog
        open={deleteConfirmationOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        task={tasks.find((task) => task.id === deleteTaskId)}
        disableDelete={tasks.length === 2} // Disable the delete button when there are only two records left
      />
    </>
  );
};

export default TaskList;
