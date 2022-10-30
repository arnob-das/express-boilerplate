const express = require('express');
const toolsController = require('../../controllers/tools.controller');
const limiter = require('../../middleware/limiter');
const viewCount = require('../../middleware/viewCount');

const router = express.Router();

// router.get("/", (req, res) => {
//     res.send("Tools found!");
//     res.end();
// })

// router.get("/:id", (req, res) => {
//     res.send("Tools found with id!");
//     res.end();
// })

// router.post("/", (req, res) => {
//     res.send("Tool added!");
//     res.end();
// })



router.route("/")
    /**
     * @api {get} /tools All tools
     * @apiDescription Get all the tools
     * @apiPermission admin
     * 
     * @apiHeader {String} Authorization  User's access token
     * 
     * @apiParam {Number{1-}}       [Page=1]    List page
     * @apiParam {Number{1-100}}    [Limit=10]  Users per page
     * 
     * @apiSuccess {Object[]} all the tools.
     * 
     * @apiError (Unauthorized 401)  Unauthorized   Only authenticated users can access the data
     * @apiError (Forbidden 403)     Forbidden      Only admins can access the data
     * 
     */
    .get(toolsController.getAllTools)
    /**
 * @api {Post} /tools       save a tool
 * @apiDescription Post     save all the tools
 * @apiPermission admin
 * 
 * @apiHeader {String} Authorization  User's access token
 * 
 * @apiParam {Number{1-}}       [Page=1]    List page
 * @apiParam {Number{1-100}}    [Limit=10]  Users per page
 * 
 * @apiSuccess {Object[]} all the tools.
 * 
 * @apiError (Unauthorized 401)  Unauthorized   Only authenticated users can access the data
 * @apiError (Forbidden 403)     Forbidden      Only admins can access the data
 * 
 */
    .post(toolsController.saveATool)


router
    .route("/test")
    .post(toolsController.test)
    .get(toolsController.testGet);

router
    .route("/:id")
    .get(viewCount, limiter, toolsController.getToolDetails)
    .patch(toolsController.updateTool)
    .delete(toolsController.deleteTool)

module.exports = router;