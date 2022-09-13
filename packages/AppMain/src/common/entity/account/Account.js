export default class Account {
    constructor(phoneNumber = '', fullname = '', password = '', avatarURL = '') {
        this.phoneNumber = phoneNumber
        this.fullname = fullname
        this.password = password
        this.avatarURL = avatarURL
    }
}
