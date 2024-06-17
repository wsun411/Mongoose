import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

export const AddExercisePage = () => {
    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');

    const history = useHistory();

    const addExercise = async () => {
        const newExcercise = {name, reps, weight, unit, date};
        const response = await fetch ('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExcercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201) {
            alert("Successfully added the excercise!");
        } else {
            alert(`Failed to add excercise, status code = ${response.status}`);
        }
        history.push("/");
    };

    return (
        <div>
        <nav class="crumbs">
            <ol>
                <li class="crumb"><a href="/">All Exercise </a></li>
                <li class="crumb">AddExercisePage</li>
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
                            placeholder="enter text"
                            value={name}
                            onChange={e => setName(e.target.value)} />
                    </td>
                
                    <td>
                        <input
                            type="number"
                            value={reps}
                            placeholder="enter a number"
                            onChange={e => setReps(e.target.value)} />
                    </td>
                
                    <td>
                        <input
                            type="number"
                            value={weight}
                            placeholder="enter a number"
                            onChange={e => setWeight(e.target.value)} />
                    </td>
                
                    <td>
                        <select id="select" value={unit} onChange={e => setUnit(e.target.value)}>
                            <option disabled selected value> -- select an option -- </option>
                            <option value="lbs">lbs</option>
                            <option value="kgs">kgs</option> 
                        </select> 
                    </td>
                
                    <td>
                        <input
                            type="test"
                            placeholder="MM-DD-YY"
                            value={date}
                            onChange={e => setDate(e.target.value)} />
                    </td>
                </tr>
            </tbody>
            </table>
            <p>
                <button class="button" onClick = {addExercise} > Add </button>
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

export default AddExercisePage;