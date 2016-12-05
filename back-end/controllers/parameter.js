import ParameterDB from '../db/parameterDB';

export default class Parameter {

    constructor(info) {
        this.info = info;
    }

    static get(info) {
        return ParameterDB.get(info.email, info.name);
    }

    save() {
        return new Promise((resolve, reject) => {
            this._checkExist()
                .then(isExist => {
                    isExist ? resolve(false) : resolve(ParameterDB.insert(this.info));
                })
                .catch(error => reject(error));
        });
    }

    _checkExist() {
        return new Promise((resolve, reject) => {
            ParameterDB.getByName(this.info)
                .then(
                    parameter => resolve(!!parameter),
                    error => reject(error));
        });
    }

    delete() {
        return ParameterDB.delete(this.info);
    }

    update(newInfo) {
        return ParameterDB.update(this.info, newInfo);
    }
}