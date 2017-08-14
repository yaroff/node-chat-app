const expect = require('expect');

var {Users} = require('./users.js');

describe('Users', () => {
  var users;

  beforeEach( () => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'User1',
      room: 'Room1'
    },
    {
      id: '2',
      name: 'User2',
      room: 'Room2'
    },
    {
      id: '3',
      name: 'User3',
      room: 'Room1'
    }];
  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '182dda',
      name: 'Test1',
      room: 'Test room'
    };

    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should return list of names', () => {
    var userList = users.getUserList('Room1');

    expect(userList).toEqual(['User1', 'User3']);
  });

  it('should remove user', () => {
    var user = users.removeUser('1');

    expect(users.users.length).toBe(2);
    expect(user.id).toBe('1');
  });

  it('should not remove user', () => {
    var user = users.removeUser('4');

    expect(users.users.length).toBe(3);
    expect(user).toNotExist();
  });

  it('should get user', () => {
    var user = users.getUser('1');

    expect(user).toEqual(users.users[0]);
  });

  if('should not get user', () => {
    var user = users.getUser('4');

    expect(user).toNotExist();
  });

});
