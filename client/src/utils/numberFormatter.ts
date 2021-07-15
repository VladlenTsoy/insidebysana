const SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"]

export const numberFormatter = (num: number) => {
    // what tier? (determines SI symbol)
    const tier = (Math.log10(Math.abs(num)) / 3) | 0

    // if zero, we don't need a suffix
    if (tier === 0) return num

    // get suffix and determine scale
    const suffix = SI_SYMBOL[tier]
    const scale = Math.pow(10, tier * 3)

    // scale the number
    const scaled = num / scale

    // format number and add suffix
    return scaled.toFixed(0) + suffix
    // return Math.round(Number(scaled) * 100) / 100 + suffix
}

// TODO - доработать
export const calcMerge = (min: number, max: number, count: number) => {
    const rest = max - min
    const marks = {[min]: numberFormatter(min)}
    let intermediate = min
    for (let i = 1; i <= count; i++) {
        let tmp = Math.round((intermediate += rest / count))
        marks[tmp] = numberFormatter(tmp)
    }
    return marks
}
