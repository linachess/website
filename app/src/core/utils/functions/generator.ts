const randomString = (length: number, characters: string) => {
    
    let result = ''
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
}

export const generateLicenseKey = () => {
    
    // a random string with 4 uppercase letters, a dash and 4 digits afterward
    return randomString(4, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') + '-' + randomString(4, '0123456789')
}

export const generateHash = () => {
        
    // a random string with 32 lowercase letters
    return randomString(32, 'abcdefghijklmnopqrstuvwxyz')
}