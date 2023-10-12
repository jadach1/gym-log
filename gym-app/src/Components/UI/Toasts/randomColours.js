export function randomColours() {
    const array = ["info","warning","secondary","primary","light","dark"];
    const index = Math.floor(Math.random() * array.length);
    return array[index];
}