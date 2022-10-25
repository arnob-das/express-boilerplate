let count = 0;
const viewCount = (req, res, next) => {
    count++;
    console.log(count);
    //res.send("Tools Found");
    next();
};

module.exports = viewCount;
