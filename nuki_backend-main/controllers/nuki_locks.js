
import db from '../db/nuki_locks.js';


export const getAllLocks = async (req, res) => {

 
    
    try{

        let results = await db.getAllLocks();

        res.json(results);


    }catch (e){

        res.sendStatus(500);

    }



}

export const getLock = async (req, res) => {
    
    let lock_id = req.params['lock_id'];
 
    
    try{

        let results = await db.getLock(lock_id);

        res.json(results);


    }catch (e){

        res.sendStatus(500);

    }



}

export const closeLock = async (req, res) => {

    let lock_id = req.params['lock_id'];
    
    try{

        let results = await db.closeLock(lock_id);

        res.json(results);


    }catch (e){

        res.sendStatus(500);

    }



}

export const openLock = async (req, res) => {

    let lock_id = req.params['lock_id'];
    
    try{

        let results = await db.openLock(lock_id);

        res.json(results);


    }catch (e){

        res.sendStatus(500);

    }



}

export const unlatchLock = async (req, res) => {

    let lock_id = req.params['lock_id'];
    let action = req.body['action'];
   
    
    try{

        let results = await db.unlatchLock(lock_id,action);

        res.json(results);


    }catch (e){

        res.sendStatus(500);

    }

}

