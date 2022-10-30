const { ObjectID, ObjectId } = require("bson");
const { getDb } = require("../utils/dbConnect");

let tools = [
    { id: 1, name: "Hammer1" },
    { id: 2, name: "Hammer2" },
    { id: 3, name: "Hammer3" },
];

module.exports.getAllTools = async (req, res, next) => {
    try {
        const { limit, page } = req.query
        const db = getDb();
        // return cursor => toArray(), forEach()
        // const tool = await db.collection("tools").find({}).project({ _id: 0 }).skip(2).limit(1).toArray();
        // res.status(200).json({ success: true, data: tool })

        const tool = await db.collection("tools").find({}, {
            projection: { _id: 0 }
        }).skip(+page * limit).limit(+limit).toArray();
        res.status(200).json({ success: true, data: tool })
    } catch (error) {
        next(error);
    }
};

module.exports.getToolDetails = async (req, res, next) => {
    try {
        const { id } = req.params;

        // check if object id is valid or not
        if (!ObjectId.isValid(id)) {
            return res.status(404).json({ success: false, error: "Not a valid tool id!" })
        }

        const db = getDb();
        const tool = await db.collection("tools").findOne({ _id: ObjectID(id) })
        // if id is valid but not tools found with this id then,
        if (!tool) {
            return res.status(404).json({ success: false, error: "Could not find a tool with this id!" })
        }
        res.status(200).json({ success: true, data: tool })
    } catch (error) {
        next(error);
    }
};

module.exports.saveATool = async (req, res, next) => {
    try {
        const db = getDb();
        const tool = req.body;
        const result = await db.collection("tools").insertOne(tool);
        console.log(result);
        if (!result.insertedId) {
            return res
                .status(400)
                .send({ status: false, error: "Something went wrong!" });
        }
        res.send({ success: true, message: `Tool added with id: ${result.insertedId}` });
    } catch (err) {
        next(err);
    }

    // console.log(req.query);
    // tools.push(req.body)
    // res.send(tools);
    // res.status(200).send({
    //     status: 1,
    //     success: ture,
    //     message: "Success",
    //     data: foundTool
    // });

    // res.status(500).send({
    //     success:false,
    //     error: "Internal server error."
    // })
};


// update tools
module.exports.updateTool = async (req, res, next) => {
    try {
        const { id } = req.params;
        // check if object id is valid or not
        if (!ObjectId.isValid(id)) {
            return res.status(404).json({ success: false, error: "Not a valid tool id!" })
        }

        const db = getDb();
        const tool = await db.collection("tools").updateOne({ _id: ObjectID(id) }, { $set: req.body });

        // those who haven't the property of quantity,
        // set a default quantity value by this line of code;
        //const tool = await db.collection("tools").updateMany({ quantity: { $exists: false } }, { $set: { quantity: 5 } });

        // if id is valid but not tools found with this id then,
        if (!tool.modifiedCount) {
            return res.status(404).json({ success: false, error: "Could not update the tool with this id!" })
        }
        res.status(200).json({ success: true, message: "Successfully updated the tool with this id" })
    } catch (error) {
        next(error);
    }
};

module.exports.deleteTool = async (req, res, next) => {
    try {
        const { id } = req.params;

        // check if object id is valid or not
        if (!ObjectId.isValid(id)) {
            return res.status(404).json({ success: false, error: "Not a valid tool id!" })
        }

        const db = getDb();
        const tool = await db.collection("tools").deleteOne({ _id: ObjectID(id) })
        // if id is valid but not tools found with this id then,
        if (!tool.deletedCount) {
            return res.status(404).json({ success: false, error: "Could not delete the tool with this id!" })
        }
        res.status(200).json({ success: true, message: "Successfully deleted the tool" })
    } catch (error) {
        next(error);
    }
};

module.exports.test = async (req, res, next) => {
    for (let i = 0; i < 100000; i++) {
        const db = getDb();
        await db.collection("test").insertOne({ name: `test ${i}`, age: i });
    }
    res.send(200, { success: true, message:"Done"})
}

module.exports.testGet = async (req, res, next) => {
    const db = getDb();

    const result = await db.collection("test").find({ age: 99999 }).toArray();
    res.json(result);
}
