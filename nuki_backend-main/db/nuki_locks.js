import dotenv from "dotenv";
import { Op } from 'sequelize';
import axios from 'axios';


dotenv.config();

let locks = {};

locks.getAllLocks = async() => {

    function getAllLocks(){

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://api.nuki.io/smartlock',
            headers: { 
              'Authorization': 'Bearer ' + process.env.NUKI_TOKEN
            }
          };

        return new Promise((resolve, reject) => {

            axios.request(config)
                .then((response) => {
                    return resolve (response.data)
                        console.log(JSON.stringify(response.data));
                })
                .catch((error) => {
                    return reject (error)
                        console.log(error);
                });



        })

    }


    let getAllLocks_result =  await getAllLocks();

    return getAllLocks_result;

}

locks.getLock = async(lock_id) => {

    function getLock(){

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://api.nuki.io/smartlock/' + lock_id,
            headers: { 
              'Authorization': 'Bearer ' + process.env.NUKI_TOKEN
            }
          };

        return new Promise((resolve, reject) => {

            axios.request(config)
                .then((response) => {
                    
                    return resolve (response.data)
                        console.log(JSON.stringify(response.data));
                })
                .catch((error) => {
                    return reject (error)
                        console.log(error);
                });



        })

    }


    let getLock_result =  await getLock();

    return getLock_result;

}


locks.closeLock = async(lock_id) => {


    function closeLock(){

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api.nuki.io/smartlock/' + lock_id + '/action/lock',
            headers: { 
              'Authorization': 'Bearer ' + process.env.NUKI_TOKEN
            }
          };

        return new Promise((resolve, reject) => {

            axios.request(config)
                .then((response) => {
                   
                    return resolve (response)
                        
                })
                .catch((error) => {
                    //console.log(error);
                    return resolve (error)
                        
                });



        })

    }

    let closeLock_result = await closeLock();


    let status = closeLock_result['status'];
    let statusText = closeLock_result['statusText'];

    let return_result = {
        "status" : "Lock: " + status,
        "statusText" : statusText,
    }

    return return_result;


}

locks.openLock = async(lock_id) => {

    console.log("opne lock")

    function openLock(){

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api.nuki.io/smartlock/' + lock_id + '/action/unlock',
            headers: { 
              'Authorization': 'Bearer ' + process.env.NUKI_TOKEN
            }
          };

        return new Promise((resolve, reject) => {

            axios.request(config)
                .then((response) => {
                    return resolve (response)
                      
                })
                .catch((error) => {
                   
                    return resolve (error)
                        
                });



        })

    }

    let openLock_result = await openLock();

    let status = openLock_result['status'];
    let statusText = openLock_result['statusText'];

    let return_result = {
        "status" : "Unlock: " + status,
        "statusText" : statusText,
    }

    return return_result;


}


locks.unlatchLock = async(lock_id,action) => {

    let data = {'action' : action};

    function unlatchLock(){

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            data: data,
            url: 'https://api.nuki.io/smartlock/' + lock_id + '/action',
            headers: { 
              'Authorization': 'Bearer ' + process.env.NUKI_TOKEN
            }
          };

        return new Promise((resolve, reject) => {


            axios.request(config)
                .then((response) => {
                    return resolve (response)
                      
                })
                .catch((error) => {
                    
                    return resolve (error)
                        
                });



        })

     

    }



    let unlatchLock_result = await unlatchLock();

    let status = unlatchLock_result['status'];
    let statusText = unlatchLock_result['statusText'];

    let return_result = {
        "status" : "Unlatch: " + status,
        "statusText" : statusText,
    }

    console.log(return_result);


    return return_result;




}



export default locks;