export interface IProfile {
    golfer_id: number, // change to golfer_id
    firstName: string,
    lastName: string,
    age: number,
    username?: string,
    phoneNum: string,
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
    phoneNum: string,
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

export interface INewPostDefault {
    handicap: string,
    carting: boolean,
    walking: boolean,
    isDrinking: boolean,
    isBetting: boolean,
    isMusic: boolean,
    numPeople: string,
    numHoles: string,
    duration: string,
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

export interface ILoginCredentials {
    username: string,
    password: string,
}

export interface ISignupCredentials {
    firstName: string,
    lastName: string,
    age: number,
    phoneNum: string,
    username: string,
    password: string,
}

export interface IDefaults {
    handicap: string,
    carting: boolean,
    walking: boolean,
    isDrinking: boolean,
    isBetting: boolean,
    isMusic: boolean,
    numPeople: string,
    numHoles: string,
    date?: Date,
    
}

export interface IInitialCoordinates {
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number
}

export interface ICoordinates {
    latitude: number,
    longitude: number
}