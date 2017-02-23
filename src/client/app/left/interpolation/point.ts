export class Point {
    constructor(public readonly x: number, public readonly y: number) {}

    public distanceTo(point: Point): number {
        return Math.sqrt(Math.pow(this.x - point.x, 2) + Math.pow(this.y - point.y, 2));
    }

    public equals(point: Point): boolean {
        return this.x === point.x && this.y === point.y;
    }

    public toString(): string {
        return `(${this.x}, ${this.y})`;
    }
}
