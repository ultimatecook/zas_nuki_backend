
import dotenv from "dotenv";
import { Op } from 'sequelize';


//Import Database Models
import ASSIGNLOCKS from "../models/assign_locks.js";


dotenv.config();

let assignments = {};

assignments.getAllAssignments = async() => {

    function getAllAssignments(){

        return new Promise((resolve, reject) => {
            ASSIGNLOCKS.findAll({
                raw: true

              })
                .then(result => {
                  return resolve(result);
                })
                .catch(error => {
                  console.log(error)
                  return reject(error);
                });
          });

    }

    let getAllAssignments_result = await getAllAssignments();

    return getAllAssignments_result;


}

assignments.getAssignment = async(resource_id) => {

    function getAssignment(){

        return new Promise((resolve, reject) => {
            ASSIGNLOCKS.findOne({
                where: { resource_id: resource_id },
                raw: true
                
              })
                .then(result => {
                  return resolve(result);
                })
                .catch(error => {
                  console.log(error)
                  return reject(error);
                });
          });

        

    }

    let getAssignment_result = await getAssignment();

    return getAssignment_result;


}

assignments.createAssignment = async(resource_id,lock_id,unlock_type,lock_name) => {


    function createAssignment(){

        return new Promise((resolve, reject) => {
            ASSIGNLOCKS.create({
                resource_id: resource_id,
                lock_id: lock_id,
                unlock_type: unlock_type,
                lock_name: lock_name
               
             
        
                       
              })
                .then(result => {
                  return resolve(result);
                })
                .catch(error => {      
                  console.log(error)
                  return reject(error);
                });
            });
    }


    let createAssignment_result = await createAssignment();

    let return_result = {
        "status" : "ok",
        "message" : "The lock was assigned."
    }

    return return_result;


}

assignments.updateAssignment = async(resource_id,lock_id,unlock_type,lock_name) => {

    function updateAssignment(){

        return new Promise((resolve, reject) => {
            ASSIGNLOCKS.update(
              {
                lock_id: lock_id,
                unlock_type: unlock_type,
                lock_name: lock_name
                
                

              },
              {
                where: {
                    resource_id: resource_id
                }
              }
            )
            .then(result => {
              return resolve(result);
            })
            .catch(error => {
              
              return reject(error);
            });
          })

       

    }


    let updateAssignment_result = await updateAssignment();

    let return_result = {
        "status" : "ok",
        "message" : "The assignment was updated."
    }

    return return_result;




}

assignments.deleteAssignment = async(resource_id) => {

    function deleteAssignment(){
        
        return new Promise((resolve, reject) => {
            ASSIGNLOCKS.destroy({
                where: { resource_id: resource_id },
                raw: true
              })
                .then(result => {
                  return resolve(result);
                })
                .catch(error => {
                  console.log(error)
                  return reject(error);
                });
          });

        
    }

    let deleteAssignment_result = await deleteAssignment();

    let return_result = {
        "status" : "ok",
        "message" : "The assignment was deleted."
    }

    return return_result;




}

export default assignments;