let tools = [
    { id: 1, name: "Hammer1" },
    { id: 2, name: "Hammer2" },
    { id: 3, name: "Hammer3" },
];

module.exports.getAllTools = (req, res, next) => {
    const { limit, page } = req.query;
    console.log(limit, page);
    res.json(tools.slice(0, limit));
}

module.exports.getToolDetails = (req, res, next) => {
    const { id } = req.params;
    const foundTool = tools.find(tool => tool.id === Number(id));
    res.send(foundTool);
    res.status(200).send({
        status: 1,
        // success: ture,
        message: "Success",
        data: foundTool
    });

    // res.status(500).send({
    //     success:false,
    //     error: "Internal server error."
    // })
}

module.exports.saveATool = (req, res, next) => {
    console.log(req.query);
    tools.push(req.body)
    res.send(tools);
    res.status(200).send({
        status: 1,
        // success: ture,
        message: "Success",
        data: foundTool
    });

    // res.status(500).send({
    //     success:false,
    //     error: "Internal server error."
    // })
}

module.exports.updateTool = (req, res, next) => {
    //const newData = req.body;
    const { id } = req.params;

    const newData = tools.find(tool => tool.id === Number(id));
    newData.id = id;
    newData.name = req.body.name;

    res.send(newData);
    res.status(200).send({
        status: 1,
        // success: ture,
        message: "Success",
        data: foundTool
    });

    // res.status(500).send({
    //     success:false,
    //     error: "Internal server error."
    // })
}

module.exports.deleteTool = (req, res, next) => {
    const { id } = req.params;
    const filter = { _id: id };

    tools = tools.filter(tool => tool.id !== Number(id));
    res.send(tools);

    res.status(200).send({
        status: 1,
        // success: ture,
        message: "Success",
        data: foundTool
    });

    // res.status(500).send({
    //     success:false,
    //     error: "Internal server error."
    // })
}