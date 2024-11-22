import { PrismaClient } from '@prisma/client';

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
            password: 'johndoe123',
            role: 'player',
        },
    });

    const user2 = await prisma.user.create({
        data: {
            username: 'janetoe',
            email: 'jane.toe@ucll.be',
            password: 'janetoe123',
            role: 'player',
        },
    });

    const user3 = await prisma.user.create({
        data: {
            username: 'michaelking',
            email: 'michael.king@ucll.be',
            password: 'michaelking123',
            role: 'player',
        },
    });

    const user4 = await prisma.user.create({
        data: {
            username: 'lindawalker',
            email: 'linda.walker@ucll.be',
            password: 'lindawalker123',
            role: 'admin',
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
            user: {
                connect: { id: user1.id },
            },
            game: {
                connect: { id: game1.id },
            },
        },
    });

    const typingTest2 = await prisma.typingTest.create({
        data: {
            wpm: 210,
            accuracy: 100,
            time: 15,
            user: {
                connect: { id: user1.id },
            },
            game: {
                connect: { id: game1.id },
            },
        },
    });

    const typingTest3 = await prisma.typingTest.create({
        data: {
            wpm: 45,
            accuracy: 67,
            time: 15,
            user: {
                connect: { id: user1.id },
            },
            game: {
                connect: { id: game2.id },
            },
        },
    });

    const typingTest4 = await prisma.typingTest.create({
        data: {
            wpm: 98,
            accuracy: 92,
            time: 30,
            user: {
                connect: { id: user2.id },
            },
            game: {
                connect: { id: game2.id },
            },
        },
    });

    const typingTest5 = await prisma.typingTest.create({
        data: {
            wpm: 123,
            accuracy: 100,
            time: 30,
            user: {
                connect: { id: user2.id },
            },
        },
    });

    const typingTest6 = await prisma.typingTest.create({
        data: {
            wpm: 75,
            accuracy: 87,
            time: 60,
            user: {
                connect: { id: user3.id },
            },
        },
    });

    const typingTest7 = await prisma.typingTest.create({
        data: {
            wpm: 50,
            accuracy: 98,
            time: 60,
            user: {
                connect: { id: user3.id },
            },
        },
    });

    const leaderboard1 = await prisma.leaderboard.create({
        data: {
            maxPlayers: 10,
            type: 15,
            scores: {
                connect: [{ id: typingTest1.id }, { id: typingTest2.id }, { id: typingTest3.id }],
            },
        },
    });

    const leaderboard2 = await prisma.leaderboard.create({
        data: {
            maxPlayers: 10,
            type: 30,
            scores: {
                connect: [{ id: typingTest4.id }, { id: typingTest5.id }],
            },
        },
    });

    const leaderboard3 = await prisma.leaderboard.create({
        data: {
            maxPlayers: 10,
            type: 60,
            scores: {
                connect: [{ id: typingTest6.id }, { id: typingTest7.id }],
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
