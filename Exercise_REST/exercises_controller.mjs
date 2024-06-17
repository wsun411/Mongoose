import 'dotenv/config';
import express from 'express';
//import asyncHandler from 'express-async-handler';
import * as exercises from './exercises_model.mjs';

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

/**
 * Create a new exercise with the 5 properties provided in the body
 */
app.post('/exercises', (req, res) => {
    exercises.creatExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then( exercise => {
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({Error: 'Request failed'});
        });
});



/**
 * Retrive the exercise with given info 
 */
app.get('/exercises', (req, res) => {
    //create a filter from the request
    let list = {name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date};
    //if every thing is undifined return {}
    let filter =  JSON.parse(JSON.stringify(list))
    exercises.findExercise(filter)
        .then( exercises => {
            res.json(exercises);
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({Error: 'Request failed'});
        });
});


 /**
 * Retrive the exercise with given info 
 */
app.get('/exercises/:_id', (req, res) => {
    const exerciseID = req.params._id;
    exercises.findEByID(exerciseID)
        .then( exercise => {
            if (exercise !== null) {
            res.json(exercise)
        } else {
            res.status(404).json({ Error: "Resource not find" })
        }
    })
    .catch(error => {
        console.error(error);
        res.status(400).json({Error: 'Request failed'});
    });
});


/*
// Retrieve exercises. 
app.get('/exercises', (req, res) => {
    let fliter ={};
    if (req.body.name !== undefined){
        fliter = { name: req.body.name };
    }
    exercises.findExercise(fliter, '', 0)
    .then (exercises => {
        res.json(exercises);
    })
    .catch(error => {
        console.error(error);
        res.status(400).json({Error: 'Request failed'});
    });
});
*/


/**
 * Update the exercise whose ID is provided in the path parameter and set
 * its title, year and language to the values provided in the body.
 */
app.put('/exercises/:_id', (req, res) => {
    /*
    //Alternative
    let replace = req.body
    let count = Object.keys(replace).length
    //check for unit 
    let u = exercises.isUnitValid(req.body.unit)
    //check for date
    let d = exercises.isDateValid(req.body.date)
    console.log(exercises.isUnitValid(req.body.unit))
    console.log(exercises.isDateValid(req.body.date))
    //numUpdate ===  1 & u === true & d === true
    */
    exercises.replaceExercise(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(numUpdate => {
            if (numUpdate ===  1 ) {
                res.json({ _id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date });
            } else {
                res.status(404).json({Error: 'Request failed'})
            }

        })
        .catch(error => {
            console.error(error);
            res.status(400).json({Error: 'Request failed'});
        })
});



/**
 * Delete the movie whose id is provided in the query parameters
 */
/*
app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteByID(req.params._id)
        .then( deletCount => {
            if( deletCount === 1) {
                res.status(204).send();
                //res.status(204).json({deleteCount: deletCount});
            } else { 
                res.status(404).json({Error: 'Request not found'});
            }
        })
        .catch( error => {
            console.error(error);
            res.send({Error: 'Request failed'});
        });
});
*/

app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteById(req.params._id)
        .then(dCount => {
            if (dCount === 1) {
                res.status(204).send()
            } else {
                res.status(404).json({ Error: 'Resource not found' })
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request failed' });
        });
});





app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});

