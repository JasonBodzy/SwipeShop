import express from "express";
import db from "../../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

router.post("/", async(req, res) => {
    let collection = await db.collection("users");
    let query = {email: req.body.email};
    let result = await collection.findOne(query);
    if(!result) {
        //TODO: Make account for user
        let newDocument = {
            email: req.body.email,
            password: req.body.password,
            saved_products: [],
            liked_products: [],
            disliked_products: [],
            statistics: []
        }
        let result2 = await collection.insertOne(newDocument);
        result2.found = false;
        res.send(result2).status(204);

    } else {
        res.send({found: true}).status(404);
    }
});

export default router;
