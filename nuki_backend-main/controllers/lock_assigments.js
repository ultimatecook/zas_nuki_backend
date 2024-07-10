import db from '../db/lock_assigments.js';


export const getAllAssignments = async (req, res) => {

 
    
    try{

        let results = await db.getAllAssignments();

        res.json(results);


    }catch (e){

        res.sendStatus(500);

    }



}

export const getAssignment = async (req, res) => {
    
    let resource_id = req.params['resource_id'];
  
 
    
    try{

        let results = await db.getAssignment(resource_id);

        res.json(results);


    }catch (e){

        res.sendStatus(500);

    }



}

export const createAssignment = async (req, res) => {

    let resource_id = req.params['resource_id'];
    let lock_id = req.body['lock_id'];
    let unlock_type = req.body['unlock_type'];
    let lock_name = req.body['lock_name'];
  
    
    try{

        let results = await db.createAssignment(resource_id,lock_id,unlock_type,lock_name);

        res.json(results);


    }catch (e){

        res.sendStatus(500);

    }



}

export const updateAssignment = async (req, res) => {

    let resource_id = req.params['resource_id'];
    let lock_id = req.body['lock_id'];
    let unlock_type = req.body['unlock_type'];
    let lock_name = req.body['lock_name'];

   
    
    try{

        let results = await db.updateAssignment(resource_id,lock_id,unlock_type,lock_name);

        res.json(results);


    }catch (e){

        res.sendStatus(500);

    }



}

export const deleteAssignment = async (req, res) => {

    let resource_id = req.params['resource_id'];
    
    try{

        let results = await db.deleteAssignment(resource_id);

        res.json(results);


    }catch (e){

        res.sendStatus(500);

    }



}
