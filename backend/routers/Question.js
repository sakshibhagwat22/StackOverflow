const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
// const mongoose = require('mongoose')
const QuestionDB = require("../models/Question");

// router.post("/", async (req, res) => {
//   const questionData = new QuestionDB({
//     title: req.body.title,
//     body: req.body.body,
//     tags: req.body.tag,
//     user: req.body.user,
//   });

//   await questionData
//     .save()
//     .then((doc) => {
//       res.status(201).send(doc);
//     })
//     .catch((err) => {
//       res.status(400).send({
//         message: "Question not added successfully",
//       });
//     });
// });

// server.js (or your main server file)

router.post('/submit-question', (req, res) => {
  const { question } = req.body;
  const userSubscription = getUserSubscriptionStatus(req.user.id); // Retrieve the user's subscription status from the database

  // Check if the user has an active subscription
  if (userSubscription) {
    // Process the submitted question and save it to the database
    // ...

    res.status(200).json({ message: 'Question submitted successfully' });
  } else {
    // Redirect the user to the subscription plan selection page
    res.redirect('/subscription');
  }
});



router.get("/", async (req, res) => {
  const error = {
    message: "Error in retrieving questions",
    error: "Bad request",
  };

  QuestionDB.aggregate([
    {
      $lookup: {
        from: "comments",
        let: { question_id: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$question_id", "$$question_id"],
              },
            },
          },
          {
            $project: {
              _id: 1,
              // user_id: 1,
              comment: 1,
              created_at: 1,
              // question_id: 1,
            },
          },
        ],
        as: "comments",
      },
    },
    {
      $lookup: {
        from: "answers",
        let: { question_id: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$question_id", "$$question_id"],
              },
            },
          },
          {
            $project: {
              _id: 1,
              // user_id: 1,
              // answer: 1,
              // created_at: 1,
              // question_id: 1,
              // created_at: 1,
            },
          },
        ],
        as: "answerDetails",
      },
    },
    // {
    //   $unwind: {
    //     path: "$answerDetails",
    //     preserveNullAndEmptyArrays: true,
    //   },
    // },
    {
      $project: {
        __v: 0,
        // _id: "$_id",
        // answerDetails: { $first: "$answerDetails" },
      },
    },
  ])
    .exec()
    .then((questionDetails) => {
      res.status(200).send(questionDetails);
    })
    .catch((e) => {
      console.log("Error: ", e);
      res.status(400).send(error);
    });
});

router.get("/:id", async (req, res) => {
  try {
    
    QuestionDB.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(  req.params.id) },
      },
      {
        $lookup: {
          from: "answers",
          let: { question_id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$question_id", "$$question_id"],
                },
              },
            },
            {
              $project: {
                _id: 1,
                user: 1,
                answer: 1,
                // created_at: 1,
                question_id: 1,
                created_at: 1,
              },
            },
          ],
          as: "answerDetails",
        },
      },
      {
        $lookup: {
          from: "comments",
          let: { question_id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$question_id", "$$question_id"],
                },
              },
            },
            {
              $project: {
                _id: 1,
                question_id: 1,
                user: 1,
                comment: 1,
                // created_at: 1,
                // question_id: 1,
                created_at: 1,
              },
            },
          ],
          as: "comments",
        },
      },
      // {
      //   $unwind: {
      //     path: "$answerDetails",
      //     preserveNullAndEmptyArrays: true,
      //   },
      // },
      {
        $project: {
          __v: 0,
          // _id: "$_id",
          // answerDetails: { $first: "$answerDetails" },
        },
      },
    ])
      .exec()
      .then((questionDetails) => {
        res.status(200).send(questionDetails);
      })
      .catch((e) => {
        console.log("Error: ", e);
        res.status(400).send(error);
      });
  } catch (err) {
      console.log(err)
      res.status(400).send({
      message: "Question not found",
    });
  }
});

module.exports = router;