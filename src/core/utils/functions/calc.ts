export const getPromotedPrice = (price: number, discount?: { active: boolean, percentage: number }) => {

    if (!discount || discount.active === false) return undefined

    return (price - (price * discount.percentage / 100))
}