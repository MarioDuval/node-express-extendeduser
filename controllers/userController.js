import HttpError from "http-errors";
import userModel from '../models/usersModel.js'
import bcrypt from 'bcrypt';
import messageapp from '../data/messages.js';

const register = (req, res, next) => {
    console.log(`---> userController::register`);

    try {
        const body = req.body;
        let result;

        if (!body.username || !body.password) {
            next(HttpError(400, { message: messageapp.parameter_not_especified }))
        } else {


            console.log(`---> userController::register ${body.password}`);
            const user = { username: body.username, password: body.password, timestamp: (body.timestamp || 0), active: body.active };

            result = userModel.loginUser(user);
            if (result != undefined) {
                next(HttpError(400, { message: messageapp.user_error_login }));

            } else {

                result = userModel.createUser(user);

                if (result < 0)
                    next(HttpError(400, { message: messageapp.user_error_register }))

                res.status(201).json(result);

            }

        }

    } catch (error) {
        next(error);
    }

};

const login = (req, res, next) => {
    console.log(`---> userController::login`);

    try {
        const body = req.body;

        if (!body.username || !body.password) {
            next(HttpError(400, {  message: messageapp.parameter_not_especified }))
        } else {

            const user = { username: body.username, password: body.password, timestamp: (body.timestamp || 0) };
            const result = userModel.loginUser(user);

            if (result === undefined) {
                next(HttpError(400, { message: messageapp.user_error_login }));
            } else {
                console.log(`---> userController::login ${result.password}`);
                console.log(`---> userController::login ${body.password}`);

                if (!bcrypt.compareSync(body.password, result.password))
                    next(HttpError(400, { message: messageapp.user_error_login  }));
                else
                    res.status(200).json(result);
            }
        }

    } catch (error) {
        next(error);
    }
};

const addGrants = (req, res, next) => {
    const grants = userModel.addGrants(req.body);
    res.status(200).json(grants);
}

const deleteGrants = (req, res, next)=>{
    const user = req.body.username;
    const grants = req.body.grants;
    const removed = userModel.deleteGrants(user, grants);
    res.status(200).json(removed);
}
const updateGrants = (req, res, next)=>{
    const user = userModel.updateGrants(req);
    res.status(200).json(user);
}
const deleteUser = (req, res, next)=>{
    const user = { username: req.body.username, password: req.body.password};
    const removed2 = userModel.deleteUser(user);
    console.log(removed2);
    res.status(200).json(removed2);
}

const activateUser = (req, res, next)=>{
    const user = { username: req.body.username, password: req.body.password, active: req.body.active};

    const activated = userModel.activateUser(user);

    res.status(200).json(activated);
}

const newPass= (req, res, next)=>{


}

const returnUser = (req, res, next)=>{
    // const result = userModel.getUser(req.params.username);
    // const userFound = JSON.parse(JSON.stringify(result));
    

}


export default {
    register,
    login,
    addGrants,
    deleteGrants,
    activateUser,
    updateGrants,
    deleteUser,

}