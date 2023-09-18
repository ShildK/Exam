const src = require('./fileService.js');

const jsonPath = './db/notes.json';


async function getUsersNotes(){
    return await src.readData(jsonPath);
}

async function saveUserNotes(userID, notes){
    let usersNotes = await getUsersNotes();
    usersNotes[userID] = notes;
    await src.writeData(jsonPath, usersNotes);
    return true
}

module.exports.getUserNotes = async(userID) => {
    let usersNotes = await getUsersNotes();
    return userID in usersNotes ? usersNotes[userID] : []
}

module.exports.addUserNote = async(userID, text) => {
    let userNotes = await this.getUserNotes(userID);
    let noteID = Date.now();
    userNotes.push({id: noteID, text: text});
    await saveUserNotes(userID, userNotes);
    return noteID
}

module.exports.deleteUserNote = async(userID, noteID) => {
    let userNotes = await this.getUserNotes(userID);
    userNotes = userNotes.filter((note) => note.id != noteID);
    await saveUserNotes(userID, userNotes);
    return true
}

module.exports.updateUserNote = async(userID, noteID, text) => {
    let userNotes = await this.getUserNotes(userID);
    userNotes.forEach(note => {
        if(note.id==noteID){
            note.text = text
        }
    });
    await saveUserNotes(userID, userNotes);
    return true
}