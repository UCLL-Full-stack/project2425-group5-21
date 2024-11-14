import { PrismaClient } from '@prisma/client';
import { set } from 'date-fns';
import { id } from 'date-fns/locale';
import { connect } from 'http2';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.profile.deleteMany();
    await prisma.user.deleteMany();
    await prisma.typingTest.deleteMany();
    await prisma.leaderboard.deleteMany();
    await prisma.game.deleteMany();

    const startDate = set(new Date(), { hours: 8, minutes: 30 });
    const endDate = set(new Date(), { hours: 10, minutes: 30 });

    const profile1 = await prisma.profile.create({
        data: {
            username: 'johndoe',
            bio: 'I love to program and to type fast.',
            avgWPM: 122.34,
            highestWPM: 140.34,
            startDate: new Date(2024, 10, 2),
            role: 'player',
        },
    });

    const profile2 = await prisma.profile.create({
        data: {
            username: 'janedoe',
            bio: 'I enjoy solving puzzles and achieving high typing speeds.',
            avgWPM: 98,
            highestWPM: 120.34,
            startDate: new Date(2024, 12, 2),
            role: 'player',
        },
    });

    const profile3 = await prisma.profile.create({
        data: {
            username: 'michaelking',
            bio: 'Competitive typist and coder.',
            avgWPM: 115.2,
            highestWPM: 130.5,
            startDate: new Date(2022, 10, 2),
            role: 'admin',
        },
    });

    const profile4 = await prisma.profile.create({
        data: {
            username: 'lindawalker',
            bio: 'Admin by day, typist by night.',
            avgWPM: 105.6,
            highestWPM: 125.0,
            startDate: new Date(2017, 10, 2),
            role: 'admin',
        },
    });

    const leaderboard1 = await prisma.leaderboard.create({
        data: {
            maxPlayers: 10,
            type: 15,
            profiles: {
                connect: [
                    { id: profile1.id },
                    { id: profile2.id },
                    { id: profile3.id },
                    { id: profile4.id },
                ],
            },
        },
    });

    const leaderboard2 = await prisma.leaderboard.create({
        data: {
            maxPlayers: 10,
            type: 30,
            profiles: {
                connect: [{ id: profile1.id }, { id: profile2.id }, { id: profile3.id }],
            },
        },
    });

    const leaderboard3 = await prisma.leaderboard.create({
        data: {
            maxPlayers: 10,
            type: 60,
            profiles: {
                connect: [{ id: profile1.id }, { id: profile2.id }],
            },
        },
    });

    const game1 = await prisma.game.create({
        data: {
            startDate: new Date(2017, 10, 2, 8, 30),
            endDate: new Date(2017, 10, 2, 8, 35),
            status: 'active',
        },
    });

    const game2 = await prisma.game.create({
        data: {
            startDate: new Date(2017, 10, 2, 21, 30),
            endDate: new Date(2017, 10, 2, 21, 35),
            status: 'inactive',
        },
    });

    const user1 = await prisma.user.create({
        data: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@ucll.be',
            password: 'johnd123',
            role: 'player',
            game: {
                connect: { id: game1.id },
            },
        },
    });

    const user2 = await prisma.user.create({
        data: {
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'jane.doe@ucll.be',
            password: 'janed123',
            role: 'player',
            game: {
                connect: { id: game1.id },
            },
        },
    });

    const user3 = await prisma.user.create({
        data: {
            firstName: 'Michael',
            lastName: 'King',
            email: 'michael.king@ucll.be',
            password: 'michael123',
            role: 'player',
            game: {
                connect: { id: game2.id },
            },
        },
    });

    const user4 = await prisma.user.create({
        data: {
            firstName: 'Linda',
            lastName: 'Walker',
            email: 'linda.walker@ucll.be',
            password: 'linda123',
            role: 'player',
            game: {
                connect: { id: game2.id },
            },
        },
    });

    const typingTest1 = await prisma.typingTest.create({
        data: {
            wpm: 120,
            accuracy: 98,
            time: 15,
        },
    });

    const typingTest2 = await prisma.typingTest.create({
        data: {
            wpm: 98,
            accuracy: 92,
            time: 30,
        },
    });

    const typingTest3 = await prisma.typingTest.create({
        data: {
            wpm: 75,
            accuracy: 87,
            time: 60,
        },
    });
};

(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();
