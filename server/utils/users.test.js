const expect = require('expect');

const { Users } = require('./users');

describe('Users', () => {
  let users;

  beforeEach(() => {
    users = new Users();
    users.users = [
      { id: 1, name: 'Mike', room: 'Cool Room' },
      { id: 2, name: 'Jen', room: 'Bad Room' },
      { id: 3, name: 'Vova', room: 'Cool Room' },
    ]
  });

  it('should add new user', () => {
    const users = new Users();
    const user = { id: 123, name: 'Vova', room: 'cool room' };
    const resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);

  });

  it('should return names in the room', () => {
    const userListCoolRoom = users.getUserList('Cool Room');
    const userListBadRoom = users.getUserList('Bad Room');
    
    expect(userListCoolRoom).toEqual(['Mike', 'Vova']);
    expect(userListBadRoom).toEqual(['Jen']);
  });

  it('should remove a user', () => {
    const u = users.removeUser(1);
    expect(u).toExist();
    expect(users.users.length).toBe(2);
    expect(users.users).toEqual([{ id: 2, name: 'Jen', room: 'Bad Room' }, { id: 3, name: 'Vova', room: 'Cool Room' }]);
  });

  it('should not remove a user', () => {
    const u = users.removeUser('1');
    expect(u).toNotExist();
    expect(users.users.length).toBe(3);
    expect(users.users).toEqual([{ id: 1, name: 'Mike', room: 'Cool Room' }, { id: 2, name: 'Jen', room: 'Bad Room' }, { id: 3, name: 'Vova', room: 'Cool Room' }]);
  });

  it('should find the user', () => {
    const user = users.getUser(1);
    expect(user).toEqual(users.users[0]);
  });

  it('should not find a user', () => {
    const user = users.getUser(5);
    expect(user).toNotExist();
  });

});