export class IllegalArgumentException extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'IllegalArgumentException'
    Object.setPrototypeOf(this, new.target.prototype)
  }
}
