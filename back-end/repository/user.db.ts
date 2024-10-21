import { User } from '../model/user';
import { id } from 'date-fns/locale';

const users = [
    new User({
        id: 1,
        username: 'johndoe',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@ucll.be',
        password: 'johnd123',
        role: 'player',
    }),
    new User({
        id: 2,
        username: 'janetoe',
        firstName: 'Jane',
        lastName: 'Toe',
        email: 'jane.toe@ucll.be',
        password: 'janet123',
        role: 'player',
    }),
];

const getAllUsers = (): User[] => {
    return users;
};

export default {
    getAllUsers,
};