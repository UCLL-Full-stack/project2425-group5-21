import { TypingTest as TypingTestPrisma } from '@prisma/client';

export class TypingTest {
    public id?: number;
    public wpm: number;
    public accuracy: number;
    public time: number;
    public type: string;
    public userId: number;
    public gameId?: number | null;

    constructor(typingTest: {
        id?: number;
        wpm: number;
        accuracy: number;
        time: number;
        type: string;
        userId: number;
        gameId?: number | null;
    }) {
        this.validate(typingTest);

        this.id = typingTest.id;
        this.wpm = typingTest.wpm;
        this.accuracy = typingTest.accuracy;
        this.time = typingTest.time;
        this.type = typingTest.type;
        this.userId = typingTest.userId;
        this.gameId = typingTest.gameId;
    }

    getId(): number | undefined {
        return this.id;
    }

    getWpm(): number {
        return this.wpm;
    }

    getAccuracy(): number {
        return this.accuracy;
    }

    getTime(): number {
        return this.time;
    }

    getType(): string {
        return this.type;
    }

    getUserId(): number {
        return this.userId;
    }

    getGameId(): number | undefined | null {
        return this.gameId;
    }

    setId(id: number): void {
        this.id = id;
    }

    setWpm(wpm: number): void {
        this.wpm = wpm;
    }

    setAccuracy(accuracy: number): void {
        this.accuracy = accuracy;
    }

    setTime(time: number): void {
        this.time = time;
    }

    setType(type: string): void {
        this.type = type;
    }

    setUserId(userId: number): void {
        this.userId = userId;
    }

    setGameId(gameId: number | undefined | null): void {
        this.gameId = gameId;
    }

    validate(typingTest: {
        wpm: number;
        accuracy: number;
        time: number;
        type: string;
        userId?: number;
        gameId?: number | null;
    }) {
        if (typingTest.wpm === undefined || typingTest.wpm === null) {
            throw new Error('WPM is required');
        }
        if (typingTest.wpm < 0) {
            throw new Error('WPM must be a positive value');
        }
        if (typingTest.accuracy === undefined || typingTest.accuracy === null) {
            throw new Error('Accuracy is required');
        }
        if (typingTest.accuracy < 0 || typingTest.accuracy > 100) {
            throw new Error('Accuracy must be between 0 and 100');
        }
        if (typingTest.time === undefined || typingTest.time === null) {
            throw new Error('Time is required');
        }
        if (typingTest.time < 0) {
            throw new Error('Time must be a positive value');
        }
        if (!typingTest.type?.trim()) {
            throw new Error('Type is required');
        }
        if (typingTest.type !== 'singleplayer' && typingTest.type !== 'multiplayer') {
            throw new Error('Type must be either "singleplayer" or "multiplayer"');
        }
        if (!typingTest.userId) {
            throw new Error('User ID is required');
        }
    }

    equals(typingTest: TypingTest): boolean {
        return (
            this.id === typingTest.getId() &&
            this.wpm === typingTest.getWpm() &&
            this.accuracy === typingTest.getAccuracy() &&
            this.time === typingTest.getTime() &&
            this.type === typingTest.getType() &&
            this.userId === typingTest.getUserId() &&
            this.gameId === typingTest.getGameId()
        );
    }

    static from({ id, wpm, accuracy, time, type, userId, gameId }: TypingTestPrisma): TypingTest {
        return new TypingTest({
            id,
            wpm,
            accuracy,
            time,
            type,
            userId,
            gameId,
        });
    }

    toPrisma() {
        return {
            wpm: this.wpm,
            accuracy: this.accuracy,
            time: this.time,
            type: this.type,
            userId: this.userId,
            gameId: this.gameId,
        };
    }
}
