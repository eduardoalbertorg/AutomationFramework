export class CommonUtils {
    public generateRandomString(): string {
        const randomString = (Math.random() + 1).toString(36).substring(2);
        return randomString;
    }
}