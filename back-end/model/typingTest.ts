export class TypingTest {
    private id: number;
    private wpm: number;
    private accuracy: number;
    private date: Date;

    constructor(typingTest: { id: number; wpm: number; accuracy: number; date: Date }) {
        this.validate(typingTest);

        this.id = typingTest.id;
        this.wpm = typingTest.wpm;
        this.accuracy = typingTest.accuracy;
        this.date = typingTest.date;
    }

    getId(): number {
        return this.id;
    }

    getWpm(): number {
        return this.wpm;
    }

    getAccuracy(): number {
        return this.accuracy;
    }

    getDate(): Date {
        return this.date;
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

    setDate(date: Date): void {
        this.date = date;
    }

    validate(typingTest: { wpm: number; accuracy: number; date: Date }) {
        if (typingTest.wpm <= 0) {
            throw new Error('WPM must be a positive value');
        }
        if (typingTest.accuracy < 0 || typingTest.accuracy > 100) {
            throw new Error('Accuracy must be between 0 and 100');
        }
        if (!typingTest.date) {
            throw new Error('Date is required');
        }
    }

    equals(typingTest: TypingTest): boolean {
        return (
            this.id === typingTest.getId() &&
            this.wpm === typingTest.getWpm() &&
            this.accuracy === typingTest.getAccuracy() &&
            this.date.getTime() === typingTest.getDate().getTime()
        );
    }
}
