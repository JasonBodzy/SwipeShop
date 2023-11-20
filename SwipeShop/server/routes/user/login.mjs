import express from "express";
import db from "../../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

router.post("/", async (req, res) => {
    let collection = await db.collection("users");
    let query = {email: req.body.email, password: req.body.password};
    let result = await collection.findOne(query);

    if (result) {
        result.found = true;
    }
  
    if (!result) res.send({found: false}).status(404);
    else res.send(result).status(200);
});

router.patch("/", async (req, res) => {
    let collection = await db.collection("users");
    let query = {email: req.body.email};
    let user = await collection.findOne(query);

    const updates = {
        $set: {
            categories: req.body.categories
        }
    }
    let result = await collection.updateOne(user, updates)
  
    if (!result) res.send({found: false}).status(404);
    else res.send({found: true}).status(200);
});

export default router;