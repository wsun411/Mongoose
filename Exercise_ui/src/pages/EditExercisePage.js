import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

export const EditExercisePage = ({exerciseToEdit}) => {
    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);

    const history = useHistory();

    const editExercise = async () => {
        const editExcercise = {name, reps, weight, unit, date};
        const response = await fetch (`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(editExcercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            alert("Successfully updated the excercise!");
        } else {
            alert(`Failed to update excercise, status code = ${response.status}`);
        }
        history.push("/");
    };

    return (
        <div>
        <nav class="crumbs">
            <ol>
                <li class="crumb"><a href="/">All Exercise </a></li>
                <li class="crumb">EditExercisePage</li>
            </ol>
        </nav>

            <h1>Add a Exercise</h1>
            <table id="addexercises">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>reps</th>
                    <th>weight</th>
                    <th>unit</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)} />
                    </td>
                
                    <td>
                        <input
                            type="number"
                            value={reps}
                            onChange={e => setReps(e.target.value)} />
                    </td>
    
                    <td>
                        <input
                            type="number"
                            value={weight}
                            onChange={e => setWeight(e.target.value)} />
                    </td>
         
                    <td>
                        <select id="select" onChange={e => setUnit(e.target.value)}>
                            <option value="lbs">lbs</option>
                            <option value="kgs">kgs</option> 
                        </select> 
                    </td>
         
                    <td>
                        <input
                            type="text"
                            value={date}
                            onChange={e => setDate(e.target.value)} />
                    </td>
                </tr>
            </tbody>
            </table>
            <p>
                <button class="button" onClick = {editExercise} > Update </button>
            </p>
            <p>
                <Link class="link" to="/"> Discard </Link>
            </p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <footer>
                <p>Wentingyin Sun.&nbsp;&nbsp;
                <a href="sunwen@oregonstate.edu">sunwen@oregonstate.edu</a>
                &copy; Copyright 2022 CS 290 Oregon State University. All Rights Reserved.
                </p>
            </footer>
        </div>
    );
}

export default EditExercisePage;
