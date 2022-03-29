import Router from 'express';
import userController from '../controllers/userController.js';
import authHandler from '../middleware/authHandler.js'
import userHandler from '../middleware/userHandler.js';
import passwordHandler from '../middleware/passwordHandler.js'


const router = Router();

router.use((req, res, next) => {
    console.log('---> userRouter.js');
    next();
});

router.use(userHandler.validateUserEmail);

const addTimestamp = (req, res, next) => {
    console.log('---> userRouter:addTimestamp');
    req.body.timestamp = new Date();
    next();
}

// router.route('/:username')
//     .get(userController.returnUser);


router.route('/user')
    .put(userController.activateUser);

router.route('/grants')
    .put(userController.updateGrants)
    .post(userController.addGrants)
    .delete(userController.deleteGrants);

router.route('*')
    .delete(userController.deleteUser)

router.route('/register')
    .post(authHandler.encryptPassword)
    .post(addTimestamp)
    .post(passwordHandler.validatePassword)
    .post(userController.register);

router.route('/login')
    .post(userController.login);



export default router;