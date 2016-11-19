import ParameterDB from '../db/parameterDB';

export default class Parameter {
    static get(info){
        return ParameterDB.get(info.email, info.name);
    }
}