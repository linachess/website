export const getPromotedPrice = (price: number, discount?: CMS.Discount) => {

    if (!discount || discount.active === false) return undefined

    return (price - (price * discount.percentage / 100))
}

export const applyDiscountPercentage = (price: number, percentage: number) => {

    return (price - (price * percentage / 100))
}