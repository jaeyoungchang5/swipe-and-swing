import { ILoginCredentials, IProfile, ISignupCredentials } from '../interfaces';
import { server } from './server.middleware';

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
    let formData = new FormData();
    formData.append('username', signupCredentials.username);
    formData.append('password', signupCredentials.password);
    formData.append('first_name', signupCredentials.firstName);
    formData.append('last_name', signupCredentials.lastName);
    formData.append('age', signupCredentials.age.toString());
    formData.append('phone_num', signupCredentials.phoneNum);

    return fetch(server + '/auth/registerGolfer', {
        method: 'POST',
        headers: {'Content-Type': 'multipart/form-data'},
        body: formData
    })
    .then(res => {
        return res.json();
    })
    .then(res => {
        if (res.success) {
            return res;
        }
        throw new Error('Username already taken');
    })
}

export function editGolferInfo(golferInfo: IProfile) {
    let formData = new FormData();
    formData.append('golfer_id', golferInfo.golfer_id.toString());
    formData.append('first_name', golferInfo.firstName);
    formData.append('last_name', golferInfo.lastName);
    formData.append('age', golferInfo.age.toString());
    formData.append('phone_num', golferInfo.phoneNum);
    formData.append('handicap', golferInfo.handicap.toString());
    formData.append('rating', '10');
    formData.append('latitude', golferInfo.latitude ? golferInfo.latitude.toString() : "41.70305557912704");
    formData.append('longitude', golferInfo.longitude ? golferInfo.longitude.toString() : "-86.23898580997654");

    return fetch(server + '/profile/editInfo', {
        method: 'POST',
        headers: {'Content-Type': 'multipart/form-data'},
        body: formData
    })
    .then(res => {
        return res.json();
    })
    .then(res => {
        return res;
    });
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

export function getGolferImage(golfer_id: number) {
    const golferImageMapping = [
        require('../../assets/profile_images/default.png'), // 0
        require('../../assets/profile_images/Andy.jpg'), // 1
        require('../../assets/profile_images/Timmy.jpg'), // 2
        require('../../assets/profile_images/Jae.png'), // 3
        require('../../assets/profile_images/Ramzi.jpeg') //4
    ]

    if (golfer_id > golferImageMapping.length) return golferImageMapping[0];
    return golferImageMapping[golfer_id];
}

export const golferImageMapping = [
        require('../../assets/profile_images/default.png'), // 0
        require('../../assets/profile_images/Andy.jpg'), // 1
        require('../../assets/profile_images/Timmy.jpg'), // 2
        require('../../assets/profile_images/Jae.png'), // 3
        require('../../assets/profile_images/Ramzi.jpeg'), // 4
        require('../../assets/profile_images/Charlie.jpeg'), // 5
        require('../../assets/profile_images/Terrance.jpg'), // 6
        require('../../assets/profile_images/Ross.jpeg'), // 7
        require('../../assets/profile_images/Tommy.jpg'), // 8
        require('../../assets/profile_images/Maureen.jpeg'), // 9
        require('../../assets/profile_images/Dave.jpeg'), // 10
        require('../../assets/profile_images/Jack.jpeg'), // 11
        require('../../assets/profile_images/JM.png'), // 12
        require('../../assets/profile_images/Leo.jpeg'), // 13
        require('../../assets/profile_images/Stew.jpeg'), // 14
        require('../../assets/profile_images/Meghan.png'), // 15
    ]