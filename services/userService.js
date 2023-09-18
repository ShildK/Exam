const src = require('./fileService.js');

const jsonPath = './db/users.json';

module.exports.getAllUsers = async () => {
    return await src.readData(jsonPath);
}

module.exports.getByLoginAndPasswod = async (login, password) => {
    let users = await this.getAllUsers();

    for (let [id, user] of Object.entries(users)) {
        if (user.email == login && user.password == password) {
            return {id: id, name: user.name};
        }
    }
    return undefined;
}

module.exports.checkEmail = async (email) => {
    let users = await this.getAllUsers();
    for (let [id, user] of Object.entries(users)) {
        if (user.email == email) {
            return false
        }
    }
    return true
}

module.exports.createUser = async (user) => {
    let users = await this.getAllUsers();

    let countUsers =  Object.keys(users).length;

    users[countUsers] = user;
    console.log(users);
    
    await src.writeData(jsonPath, users);
    return countUsers
}

module.exports.getUserByID = async (userID) => {
    let users = await this.getAllUsers();
    return userID in users ? userID : undefined
}