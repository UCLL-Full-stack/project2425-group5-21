export class Challenge {
    private id?: number;
    private name: string;
    private description: string;
    private difficulty: string;

    constructor(challenge: { id?: number; name: string; description: string; difficulty: string }) {
        this.validate(challenge);

        this.id = challenge.id;
        this.name = challenge.name;
        this.description = challenge.description;
        this.difficulty = challenge.difficulty;
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getDescription(): string {
        return this.description;
    }

    getDifficulty(): string {
        return this.difficulty;
    }

    setId(id: number | undefined): void {
        this.id = id;
    }

    setName(name: string): void {
        this.name = name;
    }

    setDescription(description: string): void {
        this.description = description;
    }

    setDifficulty(difficulty: string): void {
        this.difficulty = difficulty;
    }

    validate(challenge: { name: string; description: string; difficulty: string }): void {
        if (!challenge.name?.trim()) {
            throw new Error('Challenge name is required');
        }
        if (!challenge.description?.trim()) {
            throw new Error('Description is required');
        }
        if (!challenge.difficulty?.trim()) {
            throw new Error('Difficulty is required');
        }
    }

    equals(challenge: Challenge): boolean {
        return (
            this.name === challenge.getName() &&
            this.description === challenge.getDescription() &&
            this.difficulty === challenge.getDifficulty()
        );
    }
}
