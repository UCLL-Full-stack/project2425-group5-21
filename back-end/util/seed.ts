import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.profile.deleteMany();
    await prisma.user.deleteMany();
    await prisma.typingTest.deleteMany();

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
            bio: 'Typing enthusiast and tech aficionado.',
            avgWPM: 105.6,
            highestWPM: 125.0,
            startDate: new Date(2017, 10, 2),
            role: 'player',
        },
    });

    const profile5 = await prisma.profile.create({
        data: {
            username: 'chrisjohnson',
            bio: 'Admin by day, typist by night.',
            avgWPM: 110.8,
            highestWPM: 135.2,
            startDate: new Date(2022, 10, 2),
            role: 'admin',
        },
    });

    const user1 = await prisma.user.create({
        data: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@ucll.be',
            password: 'johnd123',
            role: 'player',
        },
    });

    const user2 = await prisma.user.create({
        data: {
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'jane.doe@ucll.be',
            password: 'janed123',
            role: 'player',
        },
    });

    const user3 = await prisma.user.create({
        data: {
            firstName: 'Michael',
            lastName: 'King',
            email: 'michael.king@ucll.be',
            password: 'michael123',
            role: 'player',
        },
    });

    const user4 = await prisma.user.create({
        data: {
            firstName: 'Linda',
            lastName: 'Walker',
            email: 'linda.walker@ucll.be',
            password: 'linda123',
            role: 'player',
        },
    });

    const user5 = await prisma.user.create({
        data: {
            firstName: 'Chris',
            lastName: 'Johnson',
            email: 'chris.johnson@ucll.be',
            password: 'chrisj123',
            role: 'admin',
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
