/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createBlog = /* GraphQL */ `
  mutation CreateBlog(
    $input: CreateBlogInput!
    $condition: ModelBlogConditionInput
  ) {
    createBlog(input: $input, condition: $condition) {
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
export const updateBlog = /* GraphQL */ `
  mutation UpdateBlog(
    $input: UpdateBlogInput!
    $condition: ModelBlogConditionInput
  ) {
    updateBlog(input: $input, condition: $condition) {
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
export const deleteBlog = /* GraphQL */ `
  mutation DeleteBlog(
    $input: DeleteBlogInput!
    $condition: ModelBlogConditionInput
  ) {
    deleteBlog(input: $input, condition: $condition) {
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
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
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
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
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
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
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
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
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
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
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
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
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
export const createCalendar = /* GraphQL */ `
  mutation CreateCalendar(
    $input: CreateCalendarInput!
    $condition: ModelCalendarConditionInput
  ) {
    createCalendar(input: $input, condition: $condition) {
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
export const updateCalendar = /* GraphQL */ `
  mutation UpdateCalendar(
    $input: UpdateCalendarInput!
    $condition: ModelCalendarConditionInput
  ) {
    updateCalendar(input: $input, condition: $condition) {
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
export const deleteCalendar = /* GraphQL */ `
  mutation DeleteCalendar(
    $input: DeleteCalendarInput!
    $condition: ModelCalendarConditionInput
  ) {
    deleteCalendar(input: $input, condition: $condition) {
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
export const createEvent = /* GraphQL */ `
  mutation CreateEvent(
    $input: CreateEventInput!
    $condition: ModelEventConditionInput
  ) {
    createEvent(input: $input, condition: $condition) {
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
export const updateEvent = /* GraphQL */ `
  mutation UpdateEvent(
    $input: UpdateEventInput!
    $condition: ModelEventConditionInput
  ) {
    updateEvent(input: $input, condition: $condition) {
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
export const deleteEvent = /* GraphQL */ `
  mutation DeleteEvent(
    $input: DeleteEventInput!
    $condition: ModelEventConditionInput
  ) {
    deleteEvent(input: $input, condition: $condition) {
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
