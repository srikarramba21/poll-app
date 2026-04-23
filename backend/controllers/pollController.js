
const Poll = require("../models/Poll");

exports.createPoll = async (req, res) => {
  const { question, options } = req.body;
  const poll = await Poll.create({
    question,
    options: options.map(o => ({ text: o }))
  });
  res.json(poll);
};

exports.getPolls = async (req, res) => {
  const polls = await Poll.find();
  res.json(polls);
};

exports.votePoll = async (req, res) => {
  const poll = await Poll.findById(req.params.id);
  poll.options[req.body.optionIndex].votes++;
  await poll.save();
  res.json(poll);
};

exports.deletePoll = async (req, res) => {
  await Poll.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};
