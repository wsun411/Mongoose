import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    {useNewUrlParser: true }
);

// validatetion keep doing it's job on update
mongoose.set('runValidators', true);

//Connect to to the database
const db = mongoose.connection;
// The open event is called when the database connection successfully opens
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

//Tell mongoose to create index which help with faster querying
//mongoose.set("userCreateIndex", true);

/* Define a schema */
const exerciseSchema = mongoose.Schema({
    name: {type: String, required: true},
    reps: {type: Number, required: true},
    weight: {type: Number, required: true},
    unit: {type: String, required: true, enum: ['lbs', 'kgs']},
    date:{type: String, 
        validate: {
            validator: function(v) {
                const format = /^\d{2}-\d{2}-\d{2}$/
                return format.test(v);
            },
        message: props => `${props.value} is not a valid date!`
    },
      required: [true, 'exercise date required']
    }
});
//*/

//Alternative date validators and not been used this time
/**
*
* @param {string} date
* Return true if the date format is MM-DD-YY where MM, DD and YY are 2 digit integers
*/
function isDateValid(date) {
    // Test using a regular expression. 
    // To learn about regular expressions see Chapter 6 of the text book
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}
/**
*
* @param {string} unit
* Return true if the date format is MM-DD-YY where MM, DD and YY are 2 digit integers
*/
function isUnitValid(unit) {
    // Test using a regular expression. 
    // To learn about regular expressions see Chapter 6 of the text book
    return /kgs|lbs/i.test(unit);
}


/* Compile the model from the schema. */
const Exercise = mongoose.model("Exercise", exerciseSchema);


/**
 * create the model form schema
 * @param {String} name
 * @param {Number} reps
 * @param {Number} weight
 * @param {String} unit
 * @param {String} date
 * @return Apromise. Resoleve to JavaScripe user for the document created by calling save
*/
const creatExercise = async(name, reps, weight, unit, date) => {
    const user = new Exercise({name: name, reps: reps, weight: weight, unit: unit, date: date});
    return user.save();
}

// not been used this time
/**
 * Retrieve exercise based on thr fliter, Project and limit parameters
 * @param {Object} fliter
 * @param {String} projection
 * @param {Number} limit
 * @returns
 */
const findExerciseOLD = async(filter, projection, limit) => {
    const query = Exercise.find(filter)
    .select(projection)
    .limit(limit)
    return query.exec();
}

const findExercise = async(filter)=> {
    const query = Exercise.find(filter)
    return query.exec();
}



/** 
* Find Exercise with the given ID
* @param {String} _id
* @returns 
*/
const findEByID = async (_id) => {
    const query = Exercise.findById(_id);
    return query.exec();
}

/**
 * Replace a exercise
 * @param {String} _id
 * @param {String} name
 * @param {Number} reps
 * @param {Number} weight
 * @param {String} unit
 * @param {String} date
 * @return Apromise. Resoleve to JavaScripe user for the document created by calling save
*/
const replaceExercise = async(_id, name, reps, weight, unit, date) => {
    const result = await Exercise.replaceOne({_id: _id}, { name:name, reps:reps, weight:weight, unit:unit, date:date})
    console.log(result.modifiedCount)
    return result.modifiedCount;
   
}


/**
 * Delete a exercise by ID
 * @param {String} _id
 * @return Apromise. Resoleve to JavaScripe user for the document created by calling save
*/
const deleteById = async(_id) => {
    const result = await Exercise.deleteOne({ _id: _id })
    console.log(result)
    return result.deletedCount;
    //result.deletedCount
}


const deletMore = async(filter) => {
    const result  = await Exercise.deleteMany(filter);
    return result.deletedCount;
}

// Create
export {creatExercise, findExercise, findEByID, replaceExercise, deleteById, deletMore, isUnitValid, isDateValid };

/*

// Delet
const deletExercise = async(filter) => {
    const result  = await Exercise.deleteMany(filter);
    return result.deletedCount;
}

*/