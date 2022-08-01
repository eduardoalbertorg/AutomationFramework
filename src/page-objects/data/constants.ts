import dotenv from 'dotenv'
dotenv.config()

export const URLS = {
    BASE_URL: 'https://www.todoist.com/'
}

export const CREDENTIALS = {
    VALID_USER: {
        USERNAME: process.env.VALID_USERNAME,
        PASSWORD: process.env.VALID_PASSWORD
    },

    INVALID_USER: {
        USERNAME: process.env.INVALID_USERNAME,
        PASSWORD: process.env.INVALID_PASSWORD,
    },

    EMPTY_USER: {
        USERNAME: process.env.EMPTY_USERNAME,
        PASSWORD: process.env.EMPTY_PASSWORD
    }

}

export const VALIDATONS = {
    MESSAGES: {
        ERROR: {
            PASSWORD_MUST_BE_AT_LEAST_8_CHARS_LONG: "Passwords must be at least 8 characters long.",
            WRONG_EMAIL_OR_PASSWORD: "Wrong email or password.",
            ENTER_VALID_EMAIL: "Please enter a valid email address."
        }
    }

}