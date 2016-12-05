import ScheduleDB from '../db/scheduleDB';

export default class Schedule {
    constructor(info) {
        this.info = info;
    }

    static getNames(info){
        return ScheduleDB.getNames(info.email);
    }

    static get(info) {
        return ScheduleDB.get(info.email, info.name);
    }

    save() {
        return new Promise((resolve, reject) => {
            this._checkExist()
                .then(isExist => {
                    isExist ? resolve(false) : resolve(ScheduleDB.insert(this.info));
                })
                .catch(error => reject(error));
        });
    }

    delete() {
        return ScheduleDB.delete(this.info);
    }

    _checkExist() {
        return new Promise((resolve, reject) => {
            ScheduleDB.get(this.info.email, this.info.name)
                .then(schedule => {
                    console.log(schedule);
                    resolve(!!schedule);
                })
                .catch(error => reject(error));
        });
    }


}
