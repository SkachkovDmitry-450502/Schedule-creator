// export default class Factory {
//     register(name, constructor){
//         if(name instanceof Function){
//             constructor = name;
//             name = null;
//         }
//
//         if(!(constructor instanceof Function)){
//             throw {
//                 name: 'Error',
//                 message: 'constructor is not function'
//             }
//         }
//
//         this[name || constructor.name] = constructor;
//     }
// }


