async function FileReading(image) {
    const readFile = new FileReader()
   await readFile.readAsDataURL(image)
    return new Promise((resolve, reject) => {
        readFile.onload = () => {
            return resolve(readFile.result)
        }
    })
}
export default FileReading;
