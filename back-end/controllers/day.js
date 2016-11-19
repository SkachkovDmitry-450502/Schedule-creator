import DayDB from '../db/dayDB';

export default class Day {

    static get(email, scheduleName) {
        return DayDB.get(email, scheduleName);
    }
}