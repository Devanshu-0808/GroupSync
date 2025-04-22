import { myAxios, myAxios2 } from "./helper";

//export for using in other files
export const signUp = (user) => {
    return myAxios.post('/register', user);
}

export const login = (user) => {
    return myAxios2.post('/login', user);
}

export const getdata = (data) => {
    console.log(data);
    return myAxios.post('/getdata', data);
}

export const sendRoomData = (data) => {
    console.log(data);
    return myAxios.post('/getRoomData', data);
}
export const check = (data) => {
    console.log(data);
    return myAxios.post('/check', data);
}