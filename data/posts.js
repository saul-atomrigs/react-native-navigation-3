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
        user: USER[0].user,
        profilePicture: USER[0].image,
        comment: `comment1 caption: 'MAMA 2021 Predictions Tournament',`,
      },
      {
        user: USER[1].user,
        profilePicture: USER[1].image,
        comment: 'comment2',
      },
    ]
  },
  {
    imageURI: '',
    user: USER[0].user,
    likes: 342,
    caption: 'caption 011',
    profilePicture: USER[0].image,
    comments: [
      {
        user: USER[0].user,
        profilePicture: USER[0].image,
        comment: 'comment3',
      }
    ]

  },
]