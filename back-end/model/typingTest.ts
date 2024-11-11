import { TypingTest as TypingTestPrisma } from '@prisma/client';

export class TypingTest {
    private id?: number;
    private wpm: number;
    private accuracy: number;
    private time: number;

    constructor(typingTest: { id?: number; wpm: number; accuracy: number; time: number }) {
        this.validate(typingTest);

        this.id = typingTest.id;
        this.wpm = typingTest.wpm;
        this.accuracy = typingTest.accuracy;
        this.time = typingTest.time;
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

    setId(id: number | undefined): void {
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

    validate(typingTest: { wpm: number; accuracy: number; time: number }) {
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
    }

    equals(typingTest: TypingTest): boolean {
        return (
            this.id === typingTest.getId() &&
            this.wpm === typingTest.getWpm() &&
            this.accuracy === typingTest.getAccuracy() &&
            this.time === typingTest.getTime()
        );
    }

    static from({ id, wpm, accuracy, time }: TypingTestPrisma) {
        return new TypingTest({
            id,
            wpm,
            accuracy,
            time,
        });
    }
}
