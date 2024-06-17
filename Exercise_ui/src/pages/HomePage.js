import React from 'react';
import { Link } from 'react-router-dom';
import ExerciseList from '../components/ExerciseList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function HomePage({setExerciseToEdit}) {
    const [exercises, setExercises] = useState([]);
    const history = useHistory();
    
    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`, {method: 'DELETE'});
        if(response.status === 204){
            setExercises(exercises.filter(e => e._id !== _id)); 
        } else {
            console.error(`Failed to delete exercise with _id = ${_id}, status code = ${response.status}`);
        }
        history.push("/");
    };


    const onEdit = exercise => {
        setExerciseToEdit(exercise)
        history.push("/edit-exercise");
    }

    /* 
    const onEdit = exercise => {
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify({ name:name, reps:reps, weight:weight, unit:unit,  date:date}),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 200){
            alert("Successfully edited the exercise!");
        } else {
            alert(`Failed to edit exercise, status code = ${response.status}`);
        }     history.push("/");
    };
    */

    const loadExercises = async() => {
        const response = await fetch('/exercises');
        const data =  await response.json();
        setExercises(data);
    }

    useEffect(() => {
        loadExercises();
    },[]);

    return (
        <>
            <h2>List of Exercises</h2>
            <ExerciseList exercises={exercises} onDelete={onDelete} onEdit={onEdit} ></ExerciseList>
            <Link class="link" to="/add-exercise">Add a exercise</Link>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <footer>
                <p>Wentingyin Sun.&nbsp;&nbsp;
                <a href="sunwen@oregonstate.edu">sunwen@oregonstate.edu</a>
                &copy; Copyright 2022 CS 290 Oregon State University. All Rights Reserved.
                </p>
            </footer>
        </>
    );
}

export default HomePage;

/*
useEffect(async() => {
    const response = await fetch('/exercise');
    const data =  await response.json();
    setExercises(data);
},[]);
*/