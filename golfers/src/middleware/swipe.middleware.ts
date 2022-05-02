import { ILoginCredentials, IMatch, IProfile, ISignupCredentials } from '../interfaces';
const server: string = 'http://100.24.89.174:5000'
import { golferImageMapping } from './golfer.middleware';

export function getMatches(appUserId: number) {
    let formData = new FormData();
    formData.append('golfer_id', appUserId.toString());
    return fetch(server + '/swipe/getMatches', {
        method: 'POST',
        headers: {'Content-Type': 'multipart/form-data'},
        body: formData
    })
    .then(res => {
        return res.json();
    })
    .then(res => {
        let matchInfo: IMatch[] = [];
        for (let i = 0; i < res.matches.length; i++) {
            let match: IMatch = {
                match_id: res.matches[i].MATCH_ID,
                matchStatus: res.matches[i].STATUS,
                golfer_id:  res.matches[i].GOLFER_ID,
                firstName: res.matches[i].FIRST_NAME,
                lastName: res.matches[i].LAST_NAME,
                age: res.matches[i].AGE,
                phoneNum: res.matches[i].PHONE_NUM,
                compatibility: 80,
                handicap: res.matches[i].HANDICAP,
                transport: res.matches[i].TRANSPORT,
                isDrinking: res.matches[i].IS_DRINKING,
                isBetting: res.matches[i].IS_BETTING,
                isMusic: res.matches[i].IS_MUSIC,
                numHoles: res.matches[i].NUM_HOLES,
                numPeople: res.matches[i].NUM_PEOPLE,
                image: golferImageMapping[res.matches[i].GOLFER_ID]
            }
            matchInfo.push(match);
        }
        return matchInfo;
    })
}