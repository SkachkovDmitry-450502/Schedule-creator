import ScheduleDB from '../db/scheduleDB';

export default class Schedule {
    constructor(request) {
        this.email = request.email;
        this.name = request.name;
    }

    static get(info) {
        return new Promise((resolve, reject) => {
            let scheduleInfo = {};
            ScheduleDB.getNames(info.email)
                .then(names => {
                    scheduleInfo.names = names;
                    return ScheduleDB.get(info.email, names[0].name)
                })
                .then(schedule => {
                    scheduleInfo.schedule = schedule;
                    resolve(scheduleInfo);
                })
                .catch(error => reject(error));
        });
    }

    insert() {
        return new Promise((resolve, reject) => {
            databaseFactory.create('scheduleDB')
                .then(scheduleDB => {
                    scheduleDB.insert();
                })
                .catch(error => reject(error));
        });
    }

    delete(newInfo) {
        return new Promise((resolve, reject) => {
            databaseFactory.create('scheduleDB')
                .then(scheduleDB => {
                    scheduleDB.delete();
                })
                .catch(error => reject(error));
        })
    }
}
