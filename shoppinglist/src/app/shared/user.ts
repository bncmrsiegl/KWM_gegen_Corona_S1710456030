export class User {

    static empty(): User {
        return new User (null, '',  '',
            '', '', '', null);
    }

    constructor(
        public id: number,
        public firstname: string,
        public lastname: string,
        public address: string,
        public email: string,
        public password: string,
        public is_helper: boolean
    ){ }

}
