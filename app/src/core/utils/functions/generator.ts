const randomString = (length: number, characters: string) => {
    
    let result = ''
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
}

export const generateHash = () => {
        
    // a random string with 32 lowercase letters
    return randomString(32, 'abcdefghijklmnopqrstuvwxyz')
}