export const getPriceByQuantity = (priceTiers, quantity, basePrice) => {
  let unitPrice = basePrice

  // console.log('units', priceTiers, quantity, basePrice)
  for (let i = 0; i < priceTiers.length; i++) {
    if (quantity >= priceTiers[i].quantity && unitPrice > priceTiers[i].price) {
      unitPrice = priceTiers[i].price
    }
  }
  let toFormat = unitPrice * quantity
  return toFormat
}
