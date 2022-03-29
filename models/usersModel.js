import users from '../data/user.js';

class User {

    createUser(user) {
        console.log(`---> userModel::createUser ${user.username}`);
        
        users.push(user);
        return users.find(element => element.username == user.username);


    }

    loginUser(user) {
        console.log(`---> userModel::loginUser ${user.username}`);

        return users.find(element => (element.username == user.username))
    }

    addGrants(user) {
        console.log(`---> userModel::addGrants ${user.username}`);

        users.push(user);
        return users.find(element => element.username == user.username);
    }

    deleteGrants(user, grants){
        let remove = users.find(element => (element.username == user));
        grants.forEach(element => {
            let index = remove.grants.indexOf(element);
            if (index !== -1) {
                remove.grants.splice(index, 1);
            }    
        });
        console.log(grants)
        return remove;
    }
    
    updateGrants(req){
        let user2 = users.find(element => (element.username == req.body.username))
        req.body.grants.forEach(element => {
            user2.grants.push(element);
        });
        return user2;
    }

    getUser(user) {

        return users.find(element => (element.username == user))
    }

    deleteUser(user){

        const remove2 = users.find(element => (element.username == user.username));
        if (remove2!=undefined){
            remove2.active = 0;
        }

        return remove2;
    }
    activateUser(user){
        const user3 = users.find(element => (element.username == user.username));

        if(user3 != undefined){
            user3.active = 1
        }

        return user3;
    }

}

export default new User();