module.exports = function (userRate, orgRate, orgRatingQuantity) {
    const sumOrgRate = orgRate * orgRatingQuantity
    const newRate = sumOrgRate + userRate
    const newRatingQuantity = orgRatingQuantity + 1
    //return the new rating with a number has one digit after the point
    return Math.round(newRate / newRatingQuantity * 10) / 10
}