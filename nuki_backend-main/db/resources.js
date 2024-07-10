import dotenv from "dotenv";
import { Op } from 'sequelize';
import axios from 'axios';

import ASSIGNLOCKS from "../models/assign_locks.js";

dotenv.config();

let resources = {};

resources.getAllResources = async(resource) => {

  console.log ("get resources")

    let token = resource['token'];   


    let result = [];

    function getAllResources(){

        let data = JSON.stringify({
            query: `query resources {
            resources {
             data{
              resource_id
              name
              type{
                name
              }
              location{
                address
                postcode
                city
                contact_email
              }
            }
              
            }
          }`,
            variables: {}
        });
          
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api.optixapp.com/graphql',
            headers: { 
              'Content-Type': 'application/json', 
              'Authorization': 'Bearer ' + token
            },
            data : data
        };

        return new Promise((resolve, reject) => {

            axios.request(config)
            .then((response) => {
                return resolve (response.data)
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
        })
          

        

        

    }

    function getLockAssignment (resource_id){

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


    let getAllResources_result =  await getAllResources();

    let data = getAllResources_result['data']['resources']['data'];
 

    for(const val of data) {

      let resource_id = val['resource_id'];
      let name = val['name'];
      let type = val['type'];
      let address = val['location']['address'];
      let postcode = val['location']['postcode'];
      let city = val['location']['city'];
      let contact_email = val['location']['contact_email'];

      let has_lock = 0;
      let lock_id = "";
      let unlock_type = "";
      let lock_name = "";


      let getLockAssignment_result = await getLockAssignment(resource_id);

      if(getLockAssignment_result !== null){

        has_lock = 1;
        lock_id = getLockAssignment_result['lock_id'];
        unlock_type = getLockAssignment_result['unlock_type'];
        lock_name = getLockAssignment_result['lock_name'];

      }

      let resource = {
        "resource_id" : resource_id,
        "name" : name,
        "type" : type,
        "address" : address,
        "postcode" : postcode,
        "city" : city,
        "contact_email" : contact_email,
        "has_lock" : has_lock,
        "lock_id" : lock_id,
        "unlock_type" : unlock_type,
        "lock_name" : lock_name

      }


      result.push(resource);
           

     
  }
   
  

    console.log(result)

    return result;

}


resources.getResource = async(resource_id,resource) => {

    let token = resource['token'];

    function getResource(){

        let data = JSON.stringify({
            query: `query resources {
            resources(resource_id : ` + resource_id + `) {
             data{
              resource_id
              name
              type{
                name
              }
              location{
                address
                postcode
                city
                contact_email
              }
            }
              
            }
          }`,
            variables: {}
        });
          
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api.optixapp.com/graphql',
            headers: { 
              'Content-Type': 'application/json', 
              'Authorization': 'Bearer ' + token
            },
            data : data
        };

        return new Promise((resolve, reject) => {

            axios.request(config)
            .then((response) => {
                return resolve (response.data)
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
        })
          

        

        

    }


    


    let getResource_result =  await getResource();

   

    return getResource_result;

}


export default resources;