export const bytesToSize = (bytes: number) => {
    var sizes = ["байт", "кб", "мб", "гб", "тб"]
    if (bytes === 0) return "0 Byte"
    var i = Number(Math.floor(Math.log(bytes) / Math.log(1024)))
    return Math.round(bytes / Math.pow(1024, i)) + " " + sizes[i]
}
