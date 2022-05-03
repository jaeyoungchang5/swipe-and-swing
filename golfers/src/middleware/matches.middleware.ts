import { IMatch } from '../interfaces';
import { server } from './server.middleware';
import { golferImageMapping } from './golfer.middleware';

export function getPotentialMatches(appUserId: number) {
    let formData = new FormData();
    formData.append('golfer_id', appUserId.toString());
    return fetch(server + '/match/getPotentialMatches', {
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
        let matchInfo: IMatch[] = [];
        for (let i = 0; i < res.potentialMatchGolferInfo.length; i++) {
            let rawmatch = res.potentialMatchGolferInfo[i];
            let match: IMatch = {
                match_id: rawmatch.MATCH_ID,
                matchStatus: 3,
                golfer_id:  rawmatch.GOLFER_ID,
                firstName: rawmatch.FIRST_NAME,
                lastName: rawmatch.LAST_NAME,
                age: rawmatch.AGE,
                phoneNum: rawmatch.PHONE_NUM,
                compatibility: 80,
                handicap: rawmatch.HANDICAP,
                transport: res.postInfo.TRANSPORT,
                isDrinking: res.postInfo.IS_DRINKING,
                isBetting: res.postInfo.IS_BETTING,
                isMusic: res.postInfo.IS_MUSIC,
                numHoles: res.postInfo.NUM_HOLES,
                numPeople: res.postInfo.NUM_PEOPLE,
                image: golferImageMapping[rawmatch.GOLFER_ID]
            }
            matchInfo.push(match);
        }
        if (matchInfo.length == 0) return null;
        return matchInfo;
    })
}

export function getAcceptedMatches(appUserId: number) {
    let formData = new FormData();
    formData.append('golfer_id', appUserId.toString());
    return fetch(server + '/match/getAcceptedMatches', {
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
        let matchInfo: IMatch[] = [];
        for (let i = 0; i < res.potentialMatchGolferInfo.length; i++) {
            let rawmatch = res.potentialMatchGolferInfo[i];
            let match: IMatch = {
                match_id: rawmatch.MATCH_ID,
                matchStatus: 4,
                golfer_id:  rawmatch.GOLFER_ID,
                firstName: rawmatch.FIRST_NAME,
                lastName: rawmatch.LAST_NAME,
                age: rawmatch.AGE,
                phoneNum: rawmatch.PHONE_NUM,
                compatibility: 80,
                handicap: rawmatch.HANDICAP,
                transport: res.postInfo.TRANSPORT,
                isDrinking: res.postInfo.IS_DRINKING,
                isBetting: res.postInfo.IS_BETTING,
                isMusic: res.postInfo.IS_MUSIC,
                numHoles: res.postInfo.NUM_HOLES,
                numPeople: res.postInfo.NUM_PEOPLE,
                image: golferImageMapping[rawmatch.GOLFER_ID]
            }
            matchInfo.push(match);
        }
        if (matchInfo.length == 0) return null;
        return matchInfo;
    })
}

export function acceptMatch(match_id: number) {
    let formData = new FormData();
    formData.append('match_id', match_id.toString());
    return fetch(server + '/match/acceptMatch', {
        method: 'POST',
        headers: {'Content-Type': 'multipart/form-data'},
        body: formData
    })
    .then(res => {
        return res.json();
    })
    .then(res => {
        if (res.success == true) return res;
        throw new Error('accept match failed');
    })
}

export function rejectMatch(match_id: number) {
    let formData = new FormData();
    formData.append('match_id', match_id.toString());
    return fetch(server + '/match/declineMatch', {
        method: 'POST',
        headers: {'Content-Type': 'multipart/form-data'},
        body: formData
    })
    .then(res => {
        return res.json();
    })
    .then(res => {
        if (res.success == true) return res;
        throw new Error('reject match failed');
    })
}