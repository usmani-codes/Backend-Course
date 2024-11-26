import mongoose from "mongoose";

const genralSchema = mongoose.schema({
    name: String,
    binary: Buffer,
    living: Boolean,
    updated: { type: Date, default: Date.now() },
    age: { type: Number, min: 18, max: 65, required: true },
    mixed: mongoose.Schema.Types.Mixed,
    _someId: mongoose.Schema.Types.ObjectId,
    array: [],
    ofString: [String], // You can also have an array of each of the other types too.
    nested: { stuff: { type: String, lowercase: true, trim: true } },
})


// Strings have:
// enum : specifies the set of allowed values for the field.
// match : specifies a regular expression that the string must match.
// maxLength and minLength for the string.

const breakfastSchema = mongoose.schema({
    eggs: {
        type: Number,
        min: [6, "Too few eggs"],
        max: 12,
        required: [true, "Why no eggs?"],
    },
    drink: {
        type: String,
        enum: ["Coffee", "Tea", "Water"],
    },
});



//  Query APIs, such as find() , return a variable of type Query . You can use a
// query object to build up a query in parts before executing it with the exec()
// method.exec() executes the query and returns a promise that you can await on
// for the result.


// const query = Athlete.find({ sport: "Tennis" }).select("name field -_id") // - will exclude the field
const query = Athlete.find({ sport: "Tennis" })
// selecting the 'name' and 'age' fields
query.select("name age");
// limit our results to 5 items
query.limit(5);
// sort by age
query.sort({ age: -1 });


// Above we've defined the query conditions in the find() method. We can also
// do this using a where() function, and we can chain all the parts of our query
// together using the dot operator (.) rather than adding them separately.The code
// fragment below is the same as our query above, with an additional condition for
// the age.

Athlete.find()
    .where("sport")
    .equals("Tennis")
    .where("age")
    .gt(17)
    .lt(50) // Additional where query
    .limit(5)
    .sort({ age: -1 })
    .select("name age")
    .exec();


// The find() method gets all matching records, want to get one match ? use any of the following query methods for a single record:
// findByIdAndDelete(), findByIdAndUpdate(), findOneAndUpdate()

//one to Many realation and many to one relation
// Each author can have multiple stories, which we represent as an array of ObjectId
// Each story can have a single author.The ref property tells the schema which model can be assigned to this field.
const authorSchema = mongoose.Schema({
    name: String,
    stories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Story" }],
});
const storySchema = mongoose.schema({
    author: { type: mongoose.Types.ObjectId, ref: "Author" },
    title: String,
});
const Story = mongoose.model("Story", storySchema);
const Author = mongoose.model("Author", authorSchema);



// giving back the updated obj rather the old one
const category = await Category.findOneAndUpdate({ _id: id }, { name, icon, color }, { new: true })

const orders = await Order.find({}).populate('user', "name email") //user -> id  name email -> just the two fields from user

// orderItem has product ids so we have to populate product -> product has id of category so populating the category .
// read as orderItems mai product ko populate kro orr product mai category ko orr vise versa
const order = await Order.findOne({ _id: id }).populate("user").populate({ path: "orderItems", populate: { path: "product", populate: { path: "category", populate: 'anotherone' } } })


