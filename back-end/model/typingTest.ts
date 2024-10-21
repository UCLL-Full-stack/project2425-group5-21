export class TypingTest {
    private id?: number;
    private wpm: number | null;
    private accuracy: number | null;
    private time: number | null;

    constructor(typingTest: {
        id?: number;
        wpm: number | null;
        accuracy: number | null;
        time: number | null;
    }) {
        this.validate(typingTest);

        this.id = typingTest.id;
        this.wpm = typingTest.wpm;
        this.accuracy = typingTest.accuracy;
        this.time = typingTest.time;
    }

    getId(): number | undefined {
        return this.id;
    }

    getWpm(): number | null {
        return this.wpm;
    }

    getAccuracy(): number | null {
        return this.accuracy;
    }

    getTime(): number | null {
        return this.time;
    }

    setId(id: number | undefined): void {
        this.id = id;
    }

    setWpm(wpm: number | null): void {
        this.wpm = wpm;
    }

    setAccuracy(accuracy: number | null): void {
        this.accuracy = accuracy;
    }

    setTime(time: number | null): void {
        this.time = time;
    }

    validate(typingTest: { wpm: number | null; accuracy: number | null; time: number | null }) {
        if (!typingTest.wpm) {
            throw new Error('WPM is required');
        }
        if (typingTest.wpm < 0) {
            throw new Error('WPM must be a positive value');
        }
        if (!typingTest.accuracy) {
            throw new Error('Accuracy is required');
        }
        if (typingTest.accuracy < 0 || typingTest.accuracy > 100) {
            throw new Error('Accuracy must be between 0 and 100');
        }
        if (!typingTest.time) {
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
}
