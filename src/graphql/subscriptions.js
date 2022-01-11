/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($owner: String) {
    onCreateUser(owner: $owner) {
      id
      name
      nickname
      posts {
        items {
          id
          title
          userPostId
          createdAt
          updatedAt
          userPostsId
          blogPostsId
          owner
        }
        nextToken
      }
      comments {
        items {
          id
          postCommentsId
          userCommentsId
          content
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($owner: String) {
    onUpdateUser(owner: $owner) {
      id
      name
      nickname
      posts {
        items {
          id
          title
          userPostId
          createdAt
          updatedAt
          userPostsId
          blogPostsId
          owner
        }
        nextToken
      }
      comments {
        items {
          id
          postCommentsId
          userCommentsId
          content
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($owner: String) {
    onDeleteUser(owner: $owner) {
      id
      name
      nickname
      posts {
        items {
          id
          title
          userPostId
          createdAt
          updatedAt
          userPostsId
          blogPostsId
          owner
        }
        nextToken
      }
      comments {
        items {
          id
          postCommentsId
          userCommentsId
          content
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateBlog = /* GraphQL */ `
  subscription OnCreateBlog($owner: String) {
    onCreateBlog(owner: $owner) {
      id
      name
      posts {
        items {
          id
          title
          userPostId
          createdAt
          updatedAt
          userPostsId
          blogPostsId
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateBlog = /* GraphQL */ `
  subscription OnUpdateBlog($owner: String) {
    onUpdateBlog(owner: $owner) {
      id
      name
      posts {
        items {
          id
          title
          userPostId
          createdAt
          updatedAt
          userPostsId
          blogPostsId
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteBlog = /* GraphQL */ `
  subscription OnDeleteBlog($owner: String) {
    onDeleteBlog(owner: $owner) {
      id
      name
      posts {
        items {
          id
          title
          userPostId
          createdAt
          updatedAt
          userPostsId
          blogPostsId
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost($owner: String) {
    onCreatePost(owner: $owner) {
      blog {
        id
        name
        posts {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      user {
        id
        name
        nickname
        posts {
          nextToken
        }
        comments {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      id
      title
      userPostId
      createdAt
      updatedAt
      likes {
        items {
          id
          userId
          username
          createdAt
          updatedAt
          postLikesId
          owner
        }
        nextToken
      }
      comments {
        items {
          id
          postCommentsId
          userCommentsId
          content
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      userPostsId
      blogPostsId
      owner
    }
  }
`;
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost($owner: String) {
    onUpdatePost(owner: $owner) {
      blog {
        id
        name
        posts {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      user {
        id
        name
        nickname
        posts {
          nextToken
        }
        comments {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      id
      title
      userPostId
      createdAt
      updatedAt
      likes {
        items {
          id
          userId
          username
          createdAt
          updatedAt
          postLikesId
          owner
        }
        nextToken
      }
      comments {
        items {
          id
          postCommentsId
          userCommentsId
          content
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      userPostsId
      blogPostsId
      owner
    }
  }
`;
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost($owner: String) {
    onDeletePost(owner: $owner) {
      blog {
        id
        name
        posts {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      user {
        id
        name
        nickname
        posts {
          nextToken
        }
        comments {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      id
      title
      userPostId
      createdAt
      updatedAt
      likes {
        items {
          id
          userId
          username
          createdAt
          updatedAt
          postLikesId
          owner
        }
        nextToken
      }
      comments {
        items {
          id
          postCommentsId
          userCommentsId
          content
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      userPostsId
      blogPostsId
      owner
    }
  }
`;
export const onCreatePostLike = /* GraphQL */ `
  subscription OnCreatePostLike($owner: String) {
    onCreatePostLike(owner: $owner) {
      post {
        blog {
          id
          name
          createdAt
          updatedAt
          owner
        }
        user {
          id
          name
          nickname
          createdAt
          updatedAt
          owner
        }
        id
        title
        userPostId
        createdAt
        updatedAt
        likes {
          nextToken
        }
        comments {
          nextToken
        }
        userPostsId
        blogPostsId
        owner
      }
      id
      userId
      username
      createdAt
      updatedAt
      postLikesId
      owner
    }
  }
`;
export const onUpdatePostLike = /* GraphQL */ `
  subscription OnUpdatePostLike($owner: String) {
    onUpdatePostLike(owner: $owner) {
      post {
        blog {
          id
          name
          createdAt
          updatedAt
          owner
        }
        user {
          id
          name
          nickname
          createdAt
          updatedAt
          owner
        }
        id
        title
        userPostId
        createdAt
        updatedAt
        likes {
          nextToken
        }
        comments {
          nextToken
        }
        userPostsId
        blogPostsId
        owner
      }
      id
      userId
      username
      createdAt
      updatedAt
      postLikesId
      owner
    }
  }
`;
export const onDeletePostLike = /* GraphQL */ `
  subscription OnDeletePostLike($owner: String) {
    onDeletePostLike(owner: $owner) {
      post {
        blog {
          id
          name
          createdAt
          updatedAt
          owner
        }
        user {
          id
          name
          nickname
          createdAt
          updatedAt
          owner
        }
        id
        title
        userPostId
        createdAt
        updatedAt
        likes {
          nextToken
        }
        comments {
          nextToken
        }
        userPostsId
        blogPostsId
        owner
      }
      id
      userId
      username
      createdAt
      updatedAt
      postLikesId
      owner
    }
  }
`;
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment($owner: String) {
    onCreateComment(owner: $owner) {
      post {
        blog {
          id
          name
          createdAt
          updatedAt
          owner
        }
        user {
          id
          name
          nickname
          createdAt
          updatedAt
          owner
        }
        id
        title
        userPostId
        createdAt
        updatedAt
        likes {
          nextToken
        }
        comments {
          nextToken
        }
        userPostsId
        blogPostsId
        owner
      }
      user {
        id
        name
        nickname
        posts {
          nextToken
        }
        comments {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      id
      postCommentsId
      userCommentsId
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment($owner: String) {
    onUpdateComment(owner: $owner) {
      post {
        blog {
          id
          name
          createdAt
          updatedAt
          owner
        }
        user {
          id
          name
          nickname
          createdAt
          updatedAt
          owner
        }
        id
        title
        userPostId
        createdAt
        updatedAt
        likes {
          nextToken
        }
        comments {
          nextToken
        }
        userPostsId
        blogPostsId
        owner
      }
      user {
        id
        name
        nickname
        posts {
          nextToken
        }
        comments {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      id
      postCommentsId
      userCommentsId
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment($owner: String) {
    onDeleteComment(owner: $owner) {
      post {
        blog {
          id
          name
          createdAt
          updatedAt
          owner
        }
        user {
          id
          name
          nickname
          createdAt
          updatedAt
          owner
        }
        id
        title
        userPostId
        createdAt
        updatedAt
        likes {
          nextToken
        }
        comments {
          nextToken
        }
        userPostsId
        blogPostsId
        owner
      }
      user {
        id
        name
        nickname
        posts {
          nextToken
        }
        comments {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      id
      postCommentsId
      userCommentsId
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateCalendar = /* GraphQL */ `
  subscription OnCreateCalendar($owner: String) {
    onCreateCalendar(owner: $owner) {
      id
      name
      events {
        items {
          id
          event
          artist
          date
          createdAt
          updatedAt
          calendarEventsId
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateCalendar = /* GraphQL */ `
  subscription OnUpdateCalendar($owner: String) {
    onUpdateCalendar(owner: $owner) {
      id
      name
      events {
        items {
          id
          event
          artist
          date
          createdAt
          updatedAt
          calendarEventsId
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteCalendar = /* GraphQL */ `
  subscription OnDeleteCalendar($owner: String) {
    onDeleteCalendar(owner: $owner) {
      id
      name
      events {
        items {
          id
          event
          artist
          date
          createdAt
          updatedAt
          calendarEventsId
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateEvent = /* GraphQL */ `
  subscription OnCreateEvent($owner: String) {
    onCreateEvent(owner: $owner) {
      id
      event
      artist
      date
      createdAt
      updatedAt
      calendarEventsId
      owner
    }
  }
`;
export const onUpdateEvent = /* GraphQL */ `
  subscription OnUpdateEvent($owner: String) {
    onUpdateEvent(owner: $owner) {
      id
      event
      artist
      date
      createdAt
      updatedAt
      calendarEventsId
      owner
    }
  }
`;
export const onDeleteEvent = /* GraphQL */ `
  subscription OnDeleteEvent($owner: String) {
    onDeleteEvent(owner: $owner) {
      id
      event
      artist
      date
      createdAt
      updatedAt
      calendarEventsId
      owner
    }
  }
`;
