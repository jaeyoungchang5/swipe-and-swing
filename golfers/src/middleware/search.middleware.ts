import { ICourse, IProfile, ITeeTime } from '../interfaces';
import { server } from './server.middleware';

export function searchAllCourses() {
    let formData = new FormData();
    formData.append('searchString', '');

    return fetch(server + '/search/courses', {
        method: 'POST',
        headers: {'Content-Type': 'multipart/form-data'},
        body: formData
    })
    .then(res => {
        return res.json();
    })
    .then(res => {
        if (res.success == false) {
            return;
        }

        let courseInfo: ICourse[] = [];
        for (let i = 0; i < res.courses.length; i++) {
            let rawCourse = res.courses[i];
            let course: ICourse = {
                course_id: rawCourse.COURSE_ID,
                courseName: rawCourse.COURSE_NAME,
                courseDescription: rawCourse.COURSE_DESCRIPTION,
                website: rawCourse.WEBSITE,
                phoneNum: rawCourse.PHONE_NUM,
                latitude: Number(rawCourse.LATITUDE),
                longitude: Number(rawCourse.LONGITUDE),
                difficulty: rawCourse.DIFFICULTY,
            }
            courseInfo.push(course);
        }

        if (courseInfo.length == 0) return null;
        return courseInfo;
    })
}

export function searchAllGolfers() {
    let formData = new FormData();
    formData.append('searchString', '');

    return fetch(server + '/search/golfers', {
        method: 'POST',
        headers: {'Content-Type': 'multipart/form-data'},
        body: formData
    })
    .then(res => {
        return res.json();
    })
    .then(res => {
        if (res.success == false) {
            return;
        }

        let profileInfo: IProfile[] = [];
        for (let i = 0; i < res.golfers.length; i++) {
            let rawprofile = res.golfers[i];
            let profile: IProfile = {
                golfer_id: rawprofile.GOLFER_ID,
                firstName: rawprofile.FIRST_NAME,
                lastName: rawprofile.LAST_NAME,
                age: rawprofile.AGE,
                username: rawprofile.USERNAME,
                phoneNum: rawprofile.PHONE_NUM,
                handicap: rawprofile.HANDICAP,
                latitude: rawprofile.LATITUDE,
                longitude: rawprofile.LONGITUDE,
                profileStatus: 2,
            }
            profileInfo.push(profile);
        }

        if (profileInfo.length == 0) return null;
        return profileInfo;
    })
}

export function searchAllTeeTimes() {

    return fetch(server + '/teetime/getTeetimesAll', {
        method: 'POST',
        headers: {'Content-Type': 'multipart/form-data'},
    })
    .then(res => {
        return res.json();
    })
    .then(res => {
        if (res.success == false) {
            return;
        }

        let teetimeInfo: ITeeTime[] = [];
        for (let i = 0; i < res.teetimes.length; i++) {
            let rawteetime = res.teetimes[i];
            let teetime: ITeeTime = {
                teetime_id: rawteetime.TEETIME_ID,
                courseName: rawteetime.COURSE_NAME,
                courseDescription: rawteetime.COURSE_DESCRIPTION,
                courseWebsite: rawteetime.WEBSITE,
                coursePhoneNum: rawteetime.PHONE_NUM,
                time: rawteetime.TT_TIME,
                date: rawteetime.TT_DATE,
            }
            teetimeInfo.push(teetime);
        }

        if (teetimeInfo.length == 0) return null;
        return teetimeInfo;
    })
}

export function searchSpecGolfer(searchString: string) {
    let formData = new FormData();
    formData.append('searchString', searchString);

    return fetch(server + '/search/golfers', {
        method: 'POST',
        headers: {'Content-Type': 'multipart/form-data'},
        body: formData
    })
    .then(res => {
        return res.json();
    }).then(res => {
        if (res.success == false) {
            return;
        }
        let rawprofile = res.golfer;
        let profile: IProfile = {
            golfer_id: rawprofile.GOLFER_ID,
            firstName: rawprofile.FIRST_NAME,
            lastName: rawprofile.LAST_NAME,
            age: rawprofile.AGE,
            username: rawprofile.USERNAME,
            phoneNum: rawprofile.PHONE_NUM,
            handicap: rawprofile.HANDICAP,
            latitude: rawprofile.LATITUDE,
            longitude: rawprofile.LONGITUDE,
            profileStatus: 2,
        }

        return profile;
    })
}

export function searchSpecCourse(searchString: string) {
    let formData = new FormData();
    formData.append('searchString', searchString);

    return fetch(server + '/search/courses', {
        method: 'POST',
        headers: {'Content-Type': 'multipart/form-data'},
        body: formData
    })
    .then(res => {
        return res.json();
    })
    .then(res => {
        if (res.success == false) {
            return;
        }

        
        let rawCourse = res.course;
        let course: ICourse = {
            course_id: rawCourse.COURSE_ID,
            courseName: rawCourse.COURSE_NAME,
            courseDescription: rawCourse.COURSE_DESCRIPTION,
            website: rawCourse.WEBSITE,
            phoneNum: rawCourse.PHONE_NUM,
            latitude: Number(rawCourse.LATITUDE),
            longitude: Number(rawCourse.LONGITUDE),
            difficulty: rawCourse.DIFFICULTY,
        }

        return course;
    })
}