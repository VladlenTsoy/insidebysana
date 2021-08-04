export const formatDiscount = (discount: number) => {
    const remainer = discount % 10

    if (remainer < 2.5) return discount - remainer
    else if (remainer >= 2.5 && remainer < 7.5) return discount - remainer + 5
    else if (remainer > 2.5 && remainer < 7.5) return discount - remainer + 5
    else if (remainer >= 7.5) return discount - remainer + 10
    return remainer
}