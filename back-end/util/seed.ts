import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.typingTest.deleteMany();
    await prisma.user.deleteMany();
    await prisma.game.deleteMany();
    await prisma.leaderboard.deleteMany();

    const user1 = await prisma.user.create({
        data: {
            username: 'johndoe',
            email: 'john.doe@ucll.be',
            password: await bcrypt.hash('johndoe123', 12),
            role: 'player',
        },
    });

    const user2 = await prisma.user.create({
        data: {
            username: 'janetoe',
            email: 'jane.toe@ucll.be',
            password: await bcrypt.hash('janetoe123', 12),
            role: 'player',
        },
    });

    const user3 = await prisma.user.create({
        data: {
            username: 'michaelking',
            email: 'michael.king@ucll.be',
            password: await bcrypt.hash('michaelking123', 12),
            role: 'player',
        },
    });

    const user4 = await prisma.user.create({
        data: {
            username: 'lukasvandilken',
            email: 'lukas.vandilken@ucll.be',
            password: await bcrypt.hash('lukasvandilken123', 12),
            role: 'player',
        },
    });

    const user5 = await prisma.user.create({
        data: {
            username: 'lindawalker',
            email: 'linda.walker@ucll.be',
            password: await bcrypt.hash('lindawalker123', 12),
            role: 'admin',
        },
    });

    const user6 = await prisma.user.create({
        data: {
            username: 'guest1235455',
            email: 'guest1235455@mrtyper.be',
            password: await bcrypt.hash('guest1235455', 12),
            role: 'guest',
        },
    });

    const game1 = await prisma.game.create({
        data: {
            startDate: new Date(2017, 10, 2, 8, 30),
            endDate: new Date(2017, 10, 2, 8, 35),
            users: {
                connect: [{ id: user1.id }, { id: user2.id }],
            },
        },
    });

    const game2 = await prisma.game.create({
        data: {
            startDate: new Date(2017, 10, 2, 21, 30),
            endDate: new Date(2017, 10, 2, 21, 35),
            users: {
                connect: [{ id: user3.id }, { id: user4.id }],
            },
        },
    });

    const typingTest1 = await prisma.typingTest.create({
        data: {
            wpm: 120,
            accuracy: 98,
            time: 15,
            type: 'singleplayer',
            user: {
                connect: { id: user1.id },
            },
        },
    });

    const typingTest2 = await prisma.typingTest.create({
        data: {
            wpm: 210,
            accuracy: 100,
            time: 15,
            type: 'singleplayer',
            user: {
                connect: { id: user1.id },
            },
        },
    });

    const typingTest3 = await prisma.typingTest.create({
        data: {
            wpm: 45,
            accuracy: 67,
            time: 30,
            type: 'singleplayer',
            user: {
                connect: { id: user1.id },
            },
        },
    });

    const typingTest4 = await prisma.typingTest.create({
        data: {
            wpm: 98,
            accuracy: 92,
            time: 30,
            type: 'singleplayer',
            user: {
                connect: { id: user1.id },
            },
        },
    });

    const typingTest5 = await prisma.typingTest.create({
        data: {
            wpm: 123,
            accuracy: 100,
            time: 60,
            type: 'singleplayer',
            user: {
                connect: { id: user1.id },
            },
        },
    });

    const typingTest6 = await prisma.typingTest.create({
        data: {
            wpm: 75,
            accuracy: 87,
            time: 15,
            type: 'singleplayer',
            user: {
                connect: { id: user2.id },
            },
        },
    });

    const typingTest7 = await prisma.typingTest.create({
        data: {
            wpm: 50,
            accuracy: 98,
            time: 15,
            type: 'singleplayer',
            user: {
                connect: { id: user2.id },
            },
        },
    });

    const typingTest8 = await prisma.typingTest.create({
        data: {
            wpm: 130,
            accuracy: 95,
            time: 30,
            type: 'singleplayer',
            user: {
                connect: { id: user2.id },
            },
        },
    });

    const typingTest9 = await prisma.typingTest.create({
        data: {
            wpm: 140,
            accuracy: 97,
            time: 30,
            type: 'singleplayer',
            user: {
                connect: { id: user2.id },
            },
        },
    });

    const typingTest10 = await prisma.typingTest.create({
        data: {
            wpm: 150,
            accuracy: 99,
            time: 60,
            type: 'singleplayer',
            user: {
                connect: { id: user2.id },
            },
        },
    });

    const typingTest11 = await prisma.typingTest.create({
        data: {
            wpm: 110,
            accuracy: 90,
            time: 15,
            type: 'singleplayer',
            user: {
                connect: { id: user3.id },
            },
        },
    });

    const typingTest12 = await prisma.typingTest.create({
        data: {
            wpm: 115,
            accuracy: 93,
            time: 15,
            type: 'singleplayer',
            user: {
                connect: { id: user3.id },
            },
        },
    });

    const typingTest13 = await prisma.typingTest.create({
        data: {
            wpm: 120,
            accuracy: 96,
            time: 30,
            type: 'singleplayer',
            user: {
                connect: { id: user3.id },
            },
        },
    });

    const typingTest14 = await prisma.typingTest.create({
        data: {
            wpm: 80,
            accuracy: 85,
            time: 30,
            type: 'singleplayer',
            user: {
                connect: { id: user3.id },
            },
        },
    });

    const typingTest15 = await prisma.typingTest.create({
        data: {
            wpm: 85,
            accuracy: 88,
            time: 60,
            type: 'singleplayer',
            user: {
                connect: { id: user3.id },
            },
        },
    });

    const typingTest16 = await prisma.typingTest.create({
        data: {
            wpm: 90,
            accuracy: 90,
            time: 15,
            type: 'singleplayer',
            user: {
                connect: { id: user4.id },
            },
        },
    });

    const typingTest17 = await prisma.typingTest.create({
        data: {
            wpm: 95,
            accuracy: 92,
            time: 15,
            type: 'singleplayer',
            user: {
                connect: { id: user4.id },
            },
        },
    });

    const typingTest18 = await prisma.typingTest.create({
        data: {
            wpm: 100,
            accuracy: 94,
            time: 30,
            type: 'singleplayer',
            user: {
                connect: { id: user4.id },
            },
        },
    });

    const typingTest19 = await prisma.typingTest.create({
        data: {
            wpm: 105,
            accuracy: 96,
            time: 30,
            type: 'singleplayer',
            user: {
                connect: { id: user4.id },
            },
        },
    });

    const typingTest20 = await prisma.typingTest.create({
        data: {
            wpm: 110,
            accuracy: 98,
            time: 60,
            type: 'singleplayer',
            user: {
                connect: { id: user4.id },
            },
        },
    });

    const typingTest21 = await prisma.typingTest.create({
        data: {
            wpm: 150,
            accuracy: 95,
            time: 15,
            type: 'multiplayer',
            user: {
                connect: { id: user1.id },
            },
            game: {
                connect: { id: game1.id },
            },
        },
    });

    const typingTest22 = await prisma.typingTest.create({
        data: {
            wpm: 160,
            accuracy: 97,
            time: 15,
            type: 'multiplayer',
            user: {
                connect: { id: user2.id },
            },
            game: {
                connect: { id: game1.id },
            },
        },
    });

    const typingTest23 = await prisma.typingTest.create({
        data: {
            wpm: 170,
            accuracy: 98,
            time: 30,
            type: 'multiplayer',
            user: {
                connect: { id: user3.id },
            },
            game: {
                connect: { id: game2.id },
            },
        },
    });

    const typingTest24 = await prisma.typingTest.create({
        data: {
            wpm: 180,
            accuracy: 99,
            time: 30,
            type: 'multiplayer',
            user: {
                connect: { id: user4.id },
            },
            game: {
                connect: { id: game2.id },
            },
        },
    });

    const leaderboard1 = await prisma.leaderboard.create({
        data: {
            maxScores: 10,
            type: 15,
            scores: {
                connect: [
                    { id: typingTest1.id },
                    { id: typingTest2.id },
                    { id: typingTest6.id },
                    { id: typingTest7.id },
                    { id: typingTest11.id },
                    { id: typingTest12.id },
                    { id: typingTest16.id },
                    { id: typingTest17.id },
                ],
            },
        },
    });

    const leaderboard2 = await prisma.leaderboard.create({
        data: {
            maxScores: 10,
            type: 30,
            scores: {
                connect: [
                    { id: typingTest3.id },
                    { id: typingTest4.id },
                    { id: typingTest8.id },
                    { id: typingTest9.id },
                    { id: typingTest13.id },
                    { id: typingTest14.id },
                    { id: typingTest18.id },
                    { id: typingTest19.id },
                ],
            },
        },
    });

    const leaderboard3 = await prisma.leaderboard.create({
        data: {
            maxScores: 10,
            type: 60,
            scores: {
                connect: [
                    { id: typingTest5.id },
                    { id: typingTest10.id },
                    { id: typingTest15.id },
                    { id: typingTest20.id },
                ],
            },
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
