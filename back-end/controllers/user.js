import UserDB from '../db/userDB';

export default class User {
    constructor(object) {
        this.email = object.email;
        this.password = object.password;
    }

    login() {
        return new Promise((resolve, reject) => {
            this._checkUserExist()
                .then(isExist => {
                    isExist ? resolve(this._checkPassword()) : resolve(false);
                })
                .catch(error => reject(error));
        });
    }

    save() {
        return new Promise((resolve, reject) => {
            this._checkUserExist()
                .then(isExist => {
                    isExist ? resolve(false) : resolve(UserDB.insert({email: this.email, password: this.password}));
                })
                .catch(error => reject(error));
        });
    }

    _checkUserExist() {
        return new Promise((resolve, reject) => {
            UserDB.get(this.email)
                .then(user => {
                    resolve(!!user);
                })
                .catch(error => reject(error));
        });
    };

    _checkPassword() {
        return new Promise((resolve, reject) => {
            UserDB.get(this.email)
                .then(user => {
                    resolve(this.password == user.password);
                })
                .catch(error => reject(error));
        });
    }
}