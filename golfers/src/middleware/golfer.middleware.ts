import { ILoginCredentials, IProfile, ISignupCredentials } from '../interfaces';
const server: string = 'http://100.24.89.174:5000'

export function login(loginCredentials: ILoginCredentials) {
    let formData = new FormData();
    formData.append('username', loginCredentials.username);
    formData.append('password', loginCredentials.password);
    return fetch(server + '/auth/loginGolfer', {
        method: 'POST',
        headers: {'Content-Type': 'multipart/form-data'},
        body: formData
    })
    .then(res => {
        return res.json();
    })
    .then(res => {
        if (res.success == true) return res;
        throw new Error('Bad credentials!');
    })
}

export function signup(signupCredentials: ISignupCredentials) {

}

export function getGolferInfo(golfer_id: number, profileStatus: number) {
    let formData = new FormData();
    formData.append('golfer_id', golfer_id.toString());
    return fetch(server + '/profile/getInfo', {
        method: 'POST',
        headers: {'Content-Type': 'multipart/form-data'},
        body: formData
    })
    .then(res => {
        return res.json();
    })
    .then(res => {
        const golferInfo: IProfile = 
        {
            golfer_id: golfer_id,
            firstName: res.FIRST_NAME,
            lastName: res.LAST_NAME,
            username: res.USERNAME,
            latitude: res.LATITUDE,
            longitude: res.LONGITUDE,
            age: res.AGE,
            phoneNum: res.PHONE_NUM,
            compatibility: 80,
            handicap: res.HANDICAP,
            profileStatus: profileStatus,
            image: golferImageMapping[golfer_id],
        }
        return golferInfo;
    })
}

export const golferImageMapping = [
    require('../../assets/profile_images/default.png'), // 0
    require('../../assets/profile_images/Andy.jpg'), // 1
    require('../../assets/profile_images/Timmy.jpg'), // 2
    require('../../assets/profile_images/Jae.png'), // 3
    require('../../assets/profile_images/Ramzi.jpeg') //4
]