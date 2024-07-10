import dotenv from "dotenv";
import { Op } from 'sequelize';
import axios from 'axios';
import {DateTime} from 'luxon'

import ASSIGNLOCKS from "../models/assign_locks.js";

dotenv.config();

let bookings = {};

bookings.getMyBookings = async(token) => {


    let access_list = [];


   function getMyBookings(){

    let data = JSON.stringify({
        query: `query me {
            me {
                user {
                    is_admin      
                    user_id      
                    name      
                    email
                bookings{data {
                        end_timestamp
                        start_timestamp
                        booking_id
                        location{
                            name
                            address
          
                        }
                        resource{
                            name
                            resource_id
                        }
        
                }
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
            //console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
            console.log(error);
        });


    })


   }  

   function addMinutes(date, minutes) {
    return DateTime.fromJSDate(date).plus({minutes}).toJSDate()
   }

   function removeMinutes(date, minutes) {
    return DateTime.fromJSDate(date).minus({minutes}).toJSDate()
   }


   function get_lock_id(resource_id){

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

   function get_lock_status (lock_id){

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



   let getMyBookings_result = await getMyBookings();

   console.log(getMyBookings_result['data']['me']['user'])


   for(const val of getMyBookings_result['data']['me']['user']['bookings']['data']) {

    let start_timestamp = val['start_timestamp'];
    let end_timestamp = val['end_timestamp'];
    let booking_id = val['booking_id'];
    let resource_name = val['resource']['name'];
    let resource_id = val['resource']['resource_id'];

    let time_now_epoch = Date.now();

    // en-US


    const start_date = new Date(start_timestamp * 1000).toLocaleString('en-US', { timeZone: 'Europe/Madrid',hour12: false });
    const end_date = new Date(end_timestamp * 1000).toLocaleString('en-US', { timeZone: 'Europe/Madrid',hour12: false });
    const time_now = new Date(time_now_epoch).toLocaleString('en-US', { timeZone: 'Europe/Madrid',hour12: false });

    let end_date_plus_10 = await addMinutes(new Date(end_timestamp * 1000), 10)
    end_date_plus_10 = new Date(end_date_plus_10).toLocaleString('en-US', { timeZone: 'Europe/Madrid',hour12: false });

    let start_date_minus_10 = await removeMinutes(new Date(start_timestamp * 1000), 10)
    start_date_minus_10 = new Date(start_date_minus_10).toLocaleString('en-US', { timeZone: 'Europe/Madrid',hour12: false });

    if(Date.parse(time_now) < Date.parse(end_date_plus_10)){


        let can_toggle = 0;


        
        console.log(start_date)
        console.log(start_date_minus_10)
        console.log(end_date)
        console.log(end_date_plus_10)
        console.log(time_now)   
        console.log(resource_name)
        console.log(resource_id)



        if (time_now > start_date_minus_10 && time_now < end_date_plus_10) {

            console.log("can toggle")

            can_toggle = 1;


        }else{

            can_toggle = 0;

        }

        // get respective lock_id
        let get_lock_id_result = await get_lock_id(resource_id);
        let lock_id = get_lock_id_result['lock_id'];

        // get lock_status

        let get_lock_status_result = await get_lock_status(lock_id);

        let lock_state = get_lock_status_result['state']['state'];
        let lock_mode = get_lock_status_result['state']['mode'];
        let lock_trigger = get_lock_status_result['state']['trigger'];
        let lock_lastAction = get_lock_status_result['state']['lastAction'];
        let lock_batteryCritical = get_lock_status_result['state']['batteryCritical'];
        let lock_batteryCharging = get_lock_status_result['state']['batteryCharging'];
        let lock_batteryCharge = get_lock_status_result['state']['batteryCharge'];
        let lock_keypadBatteryCritical = get_lock_status_result['state']['keypadBatteryCritical'];
        let lock_doorsensorBatteryCritical = get_lock_status_result['state']['doorsensorBatteryCritical'];
        let lock_doorState = get_lock_status_result['state']['doorState'];
        let lock_ringToOpenTimer = get_lock_status_result['state']['ringToOpenTimer'];
        let lock_nightMode = get_lock_status_result['state']['nightMode'];


        console.log(get_lock_status_result)

        let access_item = {
            "resource_name" :  resource_name,
            "resource_id" :  resource_id,
            "start_date" :  start_date,
            "start_date_minus_10" :  start_date_minus_10,
            "end_date" :  end_date,
            "end_date_plus_10" :  end_date_plus_10,
            "can_toggle" : can_toggle,
            "lock_id" :  lock_id,
            "lock_state" :  lock_state,
            "lock_mode" :  lock_mode,
            "lock_trigger" :  lock_trigger,
            "lock_lastAction" :  lock_lastAction,
            "lock_batteryCritical" :  lock_batteryCritical,
            "lock_batteryCharge" :  lock_batteryCharge,
            "lock_keypadBatteryCritical" :  lock_keypadBatteryCritical,
            "lock_doorsensorBatteryCritical" :  lock_doorsensorBatteryCritical,
            "lock_doorState" :  lock_doorState,
            "lock_ringToOpenTimer" :  lock_ringToOpenTimer,
            "lock_nightMode" :  lock_nightMode
            

        }


        access_list.push(access_item);

       

        
    }



   }

   var sortBy = (function () {
    var toString = Object.prototype.toString,
      
        parse = function (x) { return x; },
        
        getItem = function (x) {
          var isObject = x != null && typeof x === "object";
          var isProp = isObject && this.prop in x;
          return this.parser(isProp ? x[this.prop] : x);
        };
        
    /**
     * Sorts an array of elements.
     *
     * @param {Array} array: the collection to sort
     * @param {Object} cfg: the configuration options
     * @property {String}   cfg.prop: property name (if it is an Array of objects)
     * @property {Boolean}  cfg.desc: determines whether the sort is descending
     * @property {Function} cfg.parser: function to parse the items to expected type
     * @return {Array}
     */
    return function sortby (array, cfg) {
      if (!(array instanceof Array && array.length)) return [];
      if (toString.call(cfg) !== "[object Object]") cfg = {};
      if (typeof cfg.parser !== "function") cfg.parser = parse;
      cfg.desc = !!cfg.desc ? -1 : 1;
      return array.sort(function (a, b) {
        a = getItem.call(cfg, a);
        b = getItem.call(cfg, b);
        return cfg.desc * (a < b ? -1 : +(a > b));
      });
    };
    
    }());

    sortBy(access_list, { prop: "start_date" });

   return access_list;

    

}


export default bookings;