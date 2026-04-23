
const router = require("express").Router();
const {createPoll,getPolls,votePoll,deletePoll} = require("../controllers/pollController");

router.get("/", getPolls);
router.post("/", createPoll);
router.post("/:id/vote", votePoll);
router.delete("/:id", deletePoll);

module.exports = router;
