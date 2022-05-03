import { INewPostDefault } from '../interfaces';
import { server } from './server.middleware';

export function uploadPost(appUserId: number, postInfo: INewPostDefault) {
    let formData = new FormData();
    formData.append('poster_id', appUserId.toString());
    formData.append('is_drinking', postInfo.isDrinking ? '1' : '0');
    formData.append('is_music', postInfo.isMusic ? '1' : '0');
    formData.append('is_betting', postInfo.isBetting ? '1' : '0');
    formData.append('transport', postInfo.carting && !postInfo.walking ? 'Carting' : 'Walking');
    formData.append('num_holes', postInfo.numHoles.toString());
    formData.append('num_people', postInfo.numPeople.toString());
    formData.append('duration', postInfo.duration.toString());
    return fetch(server + '/post/uploadPost', {
        method: 'POST',
        headers: {'Content-Type': 'multipart/form-data'},
        body: formData
    })
    .then(res => {
        return res.json();
    })
    .then(res => {
        return res;
    })

}