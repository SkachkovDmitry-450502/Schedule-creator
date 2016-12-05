import DayDB from '../db/dayDB';

export default class Day {

    constructor(info){
        this.info = info;
    }

    static get(email, scheduleName) {
        return DayDB.get(email, scheduleName);
    }

    save(){
        return new Promise((resolve, reject) => {
            this._checkExist()
                .then(isExist => {
                    isExist ? resolve(false) : resolve(DayDB.insert(this.info));
                })
                .catch(error => reject(error));
        })
    }

    delete(){
        return DayDB.delete(this.info);
    }

    _checkExist(){
        return new Promise((resolve, reject) => {
            DayDB.getDay(this.info)
                .then(
                    day => resolve(!!day),
                    error => reject(error)
                )
        });
    }
}