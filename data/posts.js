import { USER } from './users'

export const POSTS = [
    {
        imageURI: '',
        user: USER[0].user,
        likes: 839,
        caption: 'MAMA 2021 Predictions Tournament',
        profilePicture: USER[0].image,
        comments: [
            {
                user: 'theqazman',
                comment: '안녕하세요',
            },
            {
                user: 'noosjdf',
                comment: '안녕하세요22222',
            },
        ]
    },
    {
        imageURI: '',
        user: USER[1].user,
        likes: 342,
        caption: 'caption 011',
        profilePicture: USER[1].image,
        comments: [
            {
                user: 'ammaandio2',
                comment: '2222',
            }
        ]

    },
]