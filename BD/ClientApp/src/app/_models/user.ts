export class User {
    id: number;
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    token?: string;

    constructor(id: number, userName: string, password: string, firstName: string, lastName: string, email: string, token?: string) {
        this.id = id;
        this.userName = userName;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;        
        this.email = email;
        this.token = token;
    }

    public static mapFromServerObject(jsonObject: User): User {
        return new User(
            jsonObject.id, 
            jsonObject.userName,
            jsonObject.password,
            jsonObject.firstName,
            jsonObject.lastName,
            jsonObject.email,
            jsonObject.token,
        );
    }
}
