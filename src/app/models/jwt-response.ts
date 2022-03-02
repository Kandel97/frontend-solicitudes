export interface JwtResponseI {
    dataUser:{
        id: number,
        name:string,
        email:string,
        admin: boolean,
        accessToken: string,
        expiresIn: string
    }

}
