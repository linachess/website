export class InvalidDiscountCodeError extends Error {

    constructor() {
        super('The discount code is invalid')
    }
}