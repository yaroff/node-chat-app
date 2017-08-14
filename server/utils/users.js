class Users  {

  constructor () {
    this.users = [];
  }

  addUser (id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }

  removeUser (id) {
    var removingUser = [];
    removingUser = this.users.filter((user) => user.id === id);
    if(removingUser.length > 0){
      var index = this.users.indexOf(removingUser[0]);
      if(index > -1){
        this.users.splice(index, 1);
        return removingUser[0];
      }
    }
    return undefined;
  }

  getUser (id) {
    var selectedUser = this.users.filter((user) => user.id === id);
    if(selectedUser.length > 0){
      return selectedUser[0];
    }
    return undefined;
  }

  getUserList (room) {
    var users = this.users.filter( (user) => user.room === room);
    var namesArray = users.map((user) => user.name);

    return namesArray;
  }

};

module.exports = {Users};
