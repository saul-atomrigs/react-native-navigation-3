/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
          likesCount
          likesByUserArray
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getBlog = /* GraphQL */ `
  query GetBlog($id: ID!) {
    getBlog(id: $id) {
      id
      name
      posts {
        items {
          id
          title
          userPostId
          createdAt
          updatedAt
          likesCount
          likesByUserArray
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
export const listBlogs = /* GraphQL */ `
  query ListBlogs(
    $filter: ModelBlogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBlogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        posts {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
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
      likesCount
      likesByUserArray
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
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        likesCount
        likesByUserArray
        comments {
          nextToken
        }
        userPostsId
        blogPostsId
        owner
      }
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
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
        likesCount
        likesByUserArray
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
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        post {
          id
          title
          userPostId
          createdAt
          updatedAt
          likesCount
          likesByUserArray
          userPostsId
          blogPostsId
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
        postCommentsId
        userCommentsId
        content
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getCalendar = /* GraphQL */ `
  query GetCalendar($id: ID!) {
    getCalendar(id: $id) {
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
export const listCalendars = /* GraphQL */ `
  query ListCalendars(
    $filter: ModelCalendarFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCalendars(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        events {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getEvent = /* GraphQL */ `
  query GetEvent($id: ID!) {
    getEvent(id: $id) {
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
export const listEvents = /* GraphQL */ `
  query ListEvents(
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
