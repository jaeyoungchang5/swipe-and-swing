import { IMatch, IPostDefault, IProfile, ICourse } from './interfaces'

export const demoMatches: IMatch[] = [
	{
        match_id: 0,
		matchStatus: 4,
        golfer_id: 1,
        firstName: "Andy",
        lastName: "Rocks",
        age: 22,
        compatibility: 78,
        handicap: 19,
        transport: 'Carting',
        isDrinking: true,
        isBetting: true,
        isMusic: true,
        numHoles: 18,
        numPeople: 4,
        image: require('../assets/Andy.jpg'),
    },
	{
        match_id: 0,
		matchStatus: 4,
        golfer_id: 2,
        firstName: "Timmy",
        lastName: "Gallagher",
        age: 22,
        compatibility: 98,
        handicap: 20,
        transport: 'Walking',
        isDrinking: false,
        isBetting: false,
        isMusic: false,
        numHoles: 9,
        numPeople: 2,
        image: require('../assets/Timmy.jpg'),
    },
	{
        match_id: 0,
		matchStatus: 3,
        golfer_id: 3,
        firstName: "Jae",
        lastName: "Chang",
        age: 22,
        compatibility: 80,
        handicap: 21,
        transport: 'Walking',
        isDrinking: true,
        isBetting: false,
        isMusic: false,
        numHoles: 9,
        numPeople: 4,
        image: require('../assets/Jae.png'),
    },
]

export const demoAcceptedMatches: IMatch[] = [
	{
        match_id: 0,
		matchStatus: 4,
        golfer_id: 1,
        firstName: "Andy",
        lastName: "Rocks",
        age: 22,
        compatibility: 78,
        handicap: 19,
        transport: 'Carting',
        isDrinking: true,
        isBetting: true,
        isMusic: true,
        numHoles: 18,
        numPeople: 4,
        image: require('../assets/Andy.jpg'),
    },
	{
        match_id: 0,
		matchStatus: 4,
        golfer_id: 2,
        firstName: "Timmy",
        lastName: "Gallagher",
        age: 22,
        compatibility: 98,
        handicap: 20,
        transport: 'Walking',
        isDrinking: false,
        isBetting: false,
        isMusic: false,
        numHoles: 9,
        numPeople: 2,
        image: require('../assets/Timmy.jpg'),
    }
]

export const demoPendingMatches: IMatch[] = [
	{
        match_id: 0,
		matchStatus: 3,
        golfer_id: 3,
        firstName: "Jae",
        lastName: "Chang",
        age: 22,
        compatibility: 80,
        handicap: 21,
        transport: 'Walking',
        isDrinking: true,
        isBetting: false,
        isMusic: false,
        numHoles: 9,
        numPeople: 4,
        image: require('../assets/Jae.png'),
    },
]

export const demoProfiles: IProfile[] = [
	{
		golfer_id: 0,
		firstName: "Ramzi",
		lastName: "Bualuan",
		age: 35,
		handicap: 20,
		transport: "Carting",
		isDrinking: true,
		numHoles: 18,
		numPeople: 4,
		profileStatus: 0,
		image: require('../assets/Ramzi.jpeg'),
	},
    {
        golfer_id: 1,
        firstName: "Andy",
        lastName: "Rocks",
        matchStatus: 4,
        age: 22,
        compatibility: 78,
        handicap: 19,
        transport: 'Carting',
        isDrinking: true,
        numHoles: 18,
        numPeople: 4,
        profileStatus: 1,
        image: require('../assets/Andy.jpg'),
    },
	{
        golfer_id: 2,
        firstName: "Timmy",
        lastName: "Gallagher",
        matchStatus: 4,
        age: 22,
        compatibility: 98,
        handicap: 20,
        transport: 'Walking',
        isDrinking: false,
        numHoles: 9,
        numPeople: 2,
        profileStatus: 1,
        image: require('../assets/Timmy.jpg'),
    },
	{
        golfer_id: 3,
        firstName: "Jae",
        lastName: "Chang",
        matchStatus: 3, 
        age: 22,
        compatibility: 80,
        handicap: 21,
        transport: 'Walking',
        isDrinking: true,
        numHoles: 9,
        numPeople: 4,
        profileStatus: 1,
        image: require('../assets/Jae.png'),
    },
];

export const demoPostDefaults: IPostDefault = {
    handicap: 20,
    transport: 'Carting',
    isDrinking: true,
    isBetting: false,
    isMusic: false,
    numPeople: 4,
    numHoles: 18
}

export const demoCourses: ICourse[] = [
    {
        course_id: 0,
        courseName: 'Burke Golf Course',
        courseDescription: 'Designed as a regulation 18-hole course in 1929, the Burke Golf Course today consists of 9 holes in the picturesque setting of Notre Dame.',
        website: 'https://burkegolfcourse.nd.edu/',
        phoneNum: '(574) 631-6425',
        latitude: 41.6992406021,
        longitude: -86.2442565867,
        difficulty: 3,
    },
    {
        course_id: 1,
        courseName: 'Warren Golf Course',
        courseDescription: 'The Warren Golf Course at Notre Dame is one of the best public golf courses in Indiana and the Midwest.',
        website: 'https://warrengolfcourse.com/',
        phoneNum: '(574) 631-4653',
        latitude: 41.7094940875, 
        longitude: -86.2224572846,
        difficulty: 5,
    }
]