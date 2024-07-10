
import db from '../db/resources.js';


export const getAllResources = async (req, res) => {

    let resource = req.body;


    try{

        let results = await db.getAllResources(resource);

        res.json(results);


    }catch (e){

        res.sendStatus(500);

    }



}

export const getResource = async (req, res) => {

    let resource_id = req.params['resource_id'];
    let resource = req.body;


    try{

        let results = await db.getResource(resource_id,resource);

        res.json(results);


    }catch (e){

        res.sendStatus(500);

    }



}


