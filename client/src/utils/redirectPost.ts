export const redirectPost = (url: string, data: any, method: string) => {
    let form = document.createElement("form")
    document.body.appendChild(form)
    form.method = method
    form.action = url
    for (let name in data) {
        let input = document.createElement("input")
        input.type = "hidden"
        input.name = name
        input.value = data[name]
        form.appendChild(input)
    }
    form.submit()
}