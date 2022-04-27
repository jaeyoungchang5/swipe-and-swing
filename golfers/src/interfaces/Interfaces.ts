export interface IProfile {
    golfer_id: number, // change to golfer_id
    firstName: string,
    lastName: string,
    age: number,
    // username: string,
    handicap: number,
    // location: string,
    transport: string,
    isDrinking: boolean,
    numHoles: number,
    numPeople: number,
    profileStatus: number, // 0 - app user, 1 - potential match, 2 - random find
    compatibility?: number,
    matchStatus?: number,
    image: any,
}

export interface IMatch {
    match_id: number,
    matchStatus: number, // 0 - loaded for user, 1 - seen by user, 2 - rejected, 3 - swiped right, 4 - accepted by poster
    // post_id: number,
    golfer_id: number,
    firstName: string,
    lastName: string,
    age: number,
    compatibility: number,
    handicap: number,
    transport: string,
    isDrinking: boolean,
    isBetting: boolean,
    isMusic: boolean,
    numHoles: number,
    numPeople: number,
    image: any,
}

export interface IPostDefault {
    handicap: number,
    transport: string,
    isDrinking: boolean,
    isBetting: boolean,
    isMusic: boolean,
    numPeople: number,
    numHoles: number
}

export interface ICourse {
    course_id: number,
    courseName: string,
    courseDescription: string,
    website: string,
    phoneNum: string,
    longitude: number,
    latitude: number,
    difficulty: number,
}