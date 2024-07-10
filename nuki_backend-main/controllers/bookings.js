
import db from '../db/bookings.js';


export const getMyBookings = async (req, res) => {

    let token = req.params['token'];

    try{

        let results = await db.getMyBookings(token);

        res.json(results);


    }catch (e){

        res.sendStatus(500);

    }



}
