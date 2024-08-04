// Take all the information

// If any field already matching with ANY socials in the database, update/append the same record/ _id

// const username = req.body.username;
// const userId = username.replace(/\s/g, "") + Math.floor(Math.random() * 100000);
// const socials = req.body.socials;
// const newFeedback = req.body.feedbacks;

// // Find the user by userId and update their feedbacks
// const user = await userModelMongo.findOneAndUpdate(
//     { userId: userId },
//     {
//         $push: { feedbacks: newFeedback },
//         $set: { socials: socials, username: username }
//     },
//     { new: true, upsert: true }
// );

// Increament the counter on the matching field

// OR

// Create a new record with the given information

const express = require("express");
const { userParser } = require("../../db/userTypes");
const { userModelMongo } = require("../../db/userModel");

const router = express.Router();

router.post("/", async (req, res) => {
    const { success } = userParser.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Please check your inputs. Refer doc for input guidelines",
        });
    }
    try {
        const username = req.body.username;
        const userId =
            username.replace(/\s/g, "") + Math.floor(Math.random() * 100000);
        const socials = {};
        for (let key in req.body.socials) {
            if (req.body.socials[key]) {
                socials[key] = [{ link: req.body.socials[key], count: 1 }];
            }

            // console.log(socials[key]);
        }
        const feedback = [req.body.feedback];

        // Check if any social handle matches an existing record
        const socialKeys = Object.keys(req.body.socials);
        let existingUser = null;

        for (let key of socialKeys) {
            const searchCriteria = {};
            searchCriteria[`socials.${key}.link`] = req.body.socials[key];

            existingUser = await userModelMongo.findOne(searchCriteria);

            if (existingUser) break;
        }

        if (existingUser) {
            // Update existing user record
            const updates = {};
            for (let key in req.body.socials) {
                const socialLink = req.body.socials[key];
                if (!socialLink) continue; // Skip empty social links
                
                const socialRecord = existingUser.socials[key].find(
                    (s) => s.link === socialLink
                );

                if (socialRecord) {
                    socialRecord.count += 1;
                } else {
                    existingUser.socials[key].push({
                        link: socialLink,
                        count: 1,
                    });
                }
            }

            existingUser.feedbacks.push(req.body.feedback);

            existingUser.username = username;

            await existingUser.save();

            res.status(200).json({
                message: "User updated successfully",
                user: existingUser,
            });
            return;
        } else {
            // Create a new user record
            const userId =
                username.replace(/\s/g, "") +
                Math.floor(Math.random() * 100000);

            const newUser = await userModelMongo.create({
                userId: userId,
                username: username,
                socials: socials,
                feedbacks: feedback,
            });

            res.status(201).json({
                message: "User created successfully",
                user: newUser,
            });
        }

        // If new entry, create a new record
        // const user = await userModelMongo.create({
        //     userId: userId,
        //     username: username,
        //     socials: socials,
        //     feedbacks: feedback,
        // });

        // res.status(201).json({
        //     message: "User created successfully"
        // })

        // If already present, append the information in the arrays
        // Cases- Any of the socials matches
        // Loop through the values of social handles,
        // Associate with the first handle it matches
    } catch (error) {
        res.status(500).json({
            msg: "Internal server error",
        });
        console.log("Exception at createReview: " + error);
    }
});

module.exports = router;
