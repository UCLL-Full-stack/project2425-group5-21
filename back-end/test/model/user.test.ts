import { User } from '../../model/user';

const userTestData = {
    username: 'JohnDoe',
    email: 'john.doe@ucll.be',
    password: 'Johnd123!',
    creationDate: new Date(),
    role: 'player',
};

let user: User;

beforeEach(() => {
    user = new User(userTestData);
});

const { username, email, password, creationDate, role } = userTestData;

const createUser = (overrides = {}) => new User({ ...userTestData, ...overrides });

test('given: valid values for user, when: user is created, then: user is created with those values.', () => {
    expect(user.getUsername()).toEqual(username);
    expect(user.getEmail()).toEqual(email);
    expect(user.getPassword()).toEqual(password);
    expect(user.getCreationDate()).toEqual(creationDate);
    expect(user.getRole()).toEqual(role);
});

test('given: missing username, when: user is created, then: an error is thrown.', () => {
    expect(() => createUser({ username: '' })).toThrow('Username is required');
});

test('given: invalid username length, when: user is created, then: an error is thrown.', () => {
    expect(() => createUser({ username: 'Jo' })).toThrow(
        'The username must be between 3 and 50 characters.'
    );
});

test('given: invalid username length, when: user is created, then: an error is thrown.', () => {
    expect(() =>
        createUser({ username: 'Josfgdsrgsbebebbdbfdvgdfbfdbdfbdbdbdbfdbffbsddwerwer' })
    ).toThrow('The username must be between 3 and 50 characters.');
});

test('given: missing email, when: user is created, then: an error is thrown.', () => {
    expect(() => createUser({ email: '' })).toThrow('Email is required');
});

test('given: email without @, when: user is created, then: an error is thrown.', () => {
    expect(() => createUser({ email: 'johndoeucll.be' })).toThrow('The email format is invalid.');
});

test('given: email without domain extension, when: user is created, then: an error is thrown.', () => {
    expect(() => createUser({ email: 'john.doe@ucll' })).toThrow('The email format is invalid.');
});

test('given: email without dot in local part, when: user is created, then: an error is thrown.', () => {
    expect(() => createUser({ email: 'johndoe@ucll.be' })).toThrow('The email format is invalid.');
});

test('given: email with incomplete domain extension, when: user is created, then: an error is thrown.', () => {
    expect(() => createUser({ email: 'john.doe@ucll.b' })).toThrow('The email format is invalid.');
});

test('given: missing password, when: user is created, then: an error is thrown.', () => {
    expect(() => createUser({ password: '' })).toThrow('Password is required');
});

test('given: invalid password length, when: user is created, then: an error is thrown.', () => {
    expect(() => createUser({ password: 'Johnd1!' })).toThrow(
        'The password must be at least 5 characters long.'
    );
});

test('given: creation date in the future, when: user is created, then: an error is thrown.', () => {
    expect(() => createUser({ creationDate: new Date(new Date().getTime() + 10000) })).toThrow(
        'Creation date cannot be in the future.'
    );
});

test('given: missing role, when: user is created, then: an error is thrown.', () => {
    expect(() => createUser({ role: '' })).toThrow('Role is required');
});

test('given: invalid role, when: user is created, then: an error is thrown.', () => {
    expect(() => createUser({ role: 'invalidRole' })).toThrow(
        'The role is not valid. Allowed roles are: player, admin, guest.'
    );
});

test('given: valid data, when: user is created, then: user is created successfully.', () => {
    const validUser = {
        username: 'JaneDoe',
        email: 'jane.doe@ucll.be',
        password: 'JaneD123!',
        creationDate: new Date(),
        role: 'admin',
    };

    const user = new User(validUser);

    expect(user.getUsername()).toEqual(validUser.username);
    expect(user.getEmail()).toEqual(validUser.email);
    expect(user.getPassword()).toEqual(validUser.password);
    expect(user.getCreationDate()).toEqual(validUser.creationDate);
    expect(user.getRole()).toEqual(validUser.role);
});
