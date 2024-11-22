// import { User } from '../../model/user';
// import { Role } from '../../types';

// test('given: missing first name, when: user is created, then: an error is thrown', () => {
//     // given

//     const invalidUser = {
//         firstName: '',
//         lastName: 'Doe',
//         email: 'john.doe@ucll.be',
//         password: 'johnd123',
//         role: Role.Player,
//     };

//     // when
//     const user = () => new User(invalidUser);

//     // then
//     expect(user).toThrow('First name is required');
// });

// test('given: missing last name, when: user is created, then: an error is thrown', () => {
//     // given

//     const invalidUser = {
//         firstName: 'John',
//         lastName: '',
//         email: 'john.doe@ucll.be',
//         password: 'johnd123',
//         role: Role.Player,
//     };

//     // when
//     const user = () => new User(invalidUser);

//     // then
//     expect(user).toThrow('Last name is required');
// });

// test('given: missing email, when: user is created, then: an error is thrown', () => {
//     // given

//     const invalidUser = {
//         firstName: 'John',
//         lastName: 'Doe',
//         email: '',
//         password: 'johnd123',
//         role: Role.Player,
//     };

//     // when
//     const user = () => new User(invalidUser);

//     // then
//     expect(user).toThrow('Email is required');
// });

// test('given: missing password, when: user is created, then: an error is thrown', () => {
//     // given

//     const invalidUser = {
//         firstName: 'John',
//         lastName: 'Doe',
//         email: 'john.doe@ucll.be',
//         password: '',
//         role: Role.Player,
//     };

//     // when
//     const user = () => new User(invalidUser);

//     // then
//     expect(user).toThrow('Password is required');
// });

// test('given: missing role, when: user is created, then: an error is thrown', () => {
//     // given

//     const invalidUser = {
//         firstName: 'John',
//         lastName: 'Doe',
//         email: 'john.doe@ucll.be',
//         password: 'johnd123',
//         role: null as any,
//     };

//     // when
//     const user = () => new User(invalidUser);

//     // then
//     expect(user).toThrow('Role is required');
// });

// test('given: valid values for user, when: user is created, then: an error is thrown', () => {
//     // given

//     const validUser = {
//         firstName: 'John',
//         lastName: 'Doe',
//         email: 'john.doe@ucll.be',
//         password: 'johnd123',
//         role: Role.Player,
//     };

//     // when
//     const user = new User(validUser);

//     // then
//     expect(user.getFirstName()).toEqual(validUser.firstName);
//     expect(user.getLastName()).toEqual(validUser.lastName);
//     expect(user.getEmail()).toEqual(validUser.email);
//     expect(user.getPassword()).toBe(validUser.password);
//     expect(user.getRole()).toBe(validUser.role);
// });
