import { User } from '../../model/user';
import { UserInput } from '../../types';

test('given: missing username, when: user is created, then: an error is thrown', () => {
    // given

    const invalidUser: UserInput = {
        username: '',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@ucll.be',
        password: 'johnd123',
        role: 'player',
    };

    // when
    const user = () => new User(invalidUser);

    // then
    expect(user).toThrow('Username is required');
});

test('given: missing first name, when: user is created, then: an error is thrown', () => {
    // given

    const invalidUser: UserInput = {
        username: 'johndoe',
        firstName: '',
        lastName: 'Doe',
        email: 'john.doe@ucll.be',
        password: 'johnd123',
        role: 'player',
    };

    // when
    const user = () => new User(invalidUser);

    // then
    expect(user).toThrow('First name is required');
});

test('given: missing last name, when: user is created, then: an error is thrown', () => {
    // given

    const invalidUser: UserInput = {
        username: 'johndoe',
        firstName: 'John',
        lastName: '',
        email: 'john.doe@ucll.be',
        password: 'johnd123',
        role: 'player',
    };

    // when
    const user = () => new User(invalidUser);

    // then
    expect(user).toThrow('Last name is required');
});

test('given: missing email, when: user is created, then: an error is thrown', () => {
    // given

    const invalidUser: UserInput = {
        username: 'johndoe',
        firstName: 'John',
        lastName: 'Doe',
        email: '',
        password: 'johnd123',
        role: 'player',
    };

    // when
    const user = () => new User(invalidUser);

    // then
    expect(user).toThrow('Email is required');
});

test('given: missing password, when: user is created, then: an error is thrown', () => {
    // given

    const invalidUser: UserInput = {
        username: 'johndoe',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@ucll.be',
        password: '',
        role: 'player',
    };

    // when
    const user = () => new User(invalidUser);

    // then
    expect(user).toThrow('Password is required');
});

test('given: missing role, when: user is created, then: an error is thrown', () => {
    // given

    const invalidUser: UserInput = {
        username: 'johndoe',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@ucll.be',
        password: 'johnd123',
        role: null,
    };

    // when
    const user = () => new User(invalidUser);

    // then
    expect(user).toThrow('Role is required');
});

test('given: valid values for user, when: user is created, then: an error is thrown', () => {
    // given

    const validUser: UserInput = {
        username: 'johndoe',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@ucll.be',
        password: 'johnd123',
        role: 'player',
    };

    // when
    const user = new User(validUser);

    // then
    expect(user.getUsername()).toEqual(validUser.username);
    expect(user.getFirstName()).toEqual(validUser.firstName);
    expect(user.getLastName()).toEqual(validUser.lastName);
    expect(user.getEmail()).toEqual(validUser.email);
    expect(user.getPassword()).toBe(validUser.password);
    expect(user.getRole()).toBe(validUser.role);
});
