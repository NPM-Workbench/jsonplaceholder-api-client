### 📗 Test Coverage

```
PASS src/todos/test/update-todo.test.ts
  updateTodo
    ✓ returns api-fail when global fetch is unavailable
    ✓ returns api-fail when fetch response is not ok
    ✓ returns updated false when response ok but todo is empty
    ✓ returns updated true when response ok and todo has data
    ✓ targets the todo update endpoint with body and headers

PASS src/users/test/get-all-users.test.ts
  getAllUsers
    ✓ returns api-fail when global fetch is unavailable
    ✓ returns api-fail when fetch response is not ok
    ✓ returns payload when response ok
    ✓ targets the users endpoint

PASS src/users/test/delete-user.test.ts
  deleteUser
    ✓ returns api-fail when global fetch is unavailable
    ✓ returns api-fail when fetch response is not ok
    ✓ returns api-ok when response ok
    ✓ targets the user delete endpoint

PASS src/users/test/update-user.test.ts
  updateUser
    ✓ returns api-fail when global fetch is unavailable
    ✓ returns api-fail when fetch response is not ok
    ✓ returns updated false when response ok but user is empty
    ✓ returns updated true when response ok and user has data
    ✓ targets the user update endpoint with body and headers

PASS src/users/test/update-user-partial.test.ts
  updateUserPartial
    ✓ returns api-fail when global fetch is unavailable
    ✓ returns api-fail when data is empty
    ✓ returns api-fail when fetch response is not ok
    ✓ returns patched false when response ok but user is empty
    ✓ returns patched true when response ok and user has data
    ✓ targets the user patch endpoint with body and headers

PASS src/users/test/create-new-user.test.ts
  createNewUser
    ✓ returns api-fail when global fetch is unavailable
    ✓ returns api-fail when fetch response is not ok
    ✓ returns created false when response ok but user is empty
    ✓ returns created true when response ok and user has data
    ✓ targets the users endpoint with POST body and headers

PASS src/todos/test/update-todo-partial.test.ts
  updateTodoPartial
    ✓ returns api-fail when global fetch is unavailable
    ✓ returns api-fail when data is empty
    ✓ returns api-fail when fetch response is not ok
    ✓ returns patched false when response ok but todo is empty
    ✓ returns patched true when response ok and todo has data
    ✓ targets the todo patch endpoint with body and headers

PASS src/users/test/get-user-by-id.test.ts
  getUserById
    ✓ returns api-fail when global fetch is unavailable
    ✓ returns api-fail when fetch response is not ok
    ✓ returns found false when response ok but user is empty
    ✓ returns found true when response ok and user has data
    ✓ targets the user by id endpoint

PASS src/posts/test/update-post-partial.test.ts
  updatePostPartial
    ✓ returns api-fail when global fetch is unavailable
    ✓ returns api-fail when data is empty
    ✓ returns api-fail when fetch response is not ok
    ✓ returns patched false when response ok but post is empty
    ✓ returns patched true when response ok and post has data
    ✓ targets the post patch endpoint with body and headers

PASS src/photos/test/create-new-photo.test.ts
  createNewPhoto
    ✓ returns api-fail when global fetch is unavailable
    ✓ returns api-fail when fetch response is not ok
    ✓ returns created false when response ok but photo is empty
    ✓ returns created true when response ok and photo has data
    ✓ targets the photos endpoint with POST body and headers

PASS src/albums/test/get-album-by-id.test.ts
  getAlbumById
    ✓ returns api-fail when global fetch is unavailable
    ✓ returns api-fail when fetch response is not ok
    ✓ returns found false when response ok but album is empty
    ✓ returns found true when response ok and album has data
    ✓ targets the album by id endpoint

PASS src/albums/test/update-album-partial.test.ts
  updateAlbumPartial
    ✓ returns api-fail when global fetch is unavailable
    ✓ returns api-fail when data is empty
    ✓ returns api-fail when fetch response is not ok
    ✓ returns patched false when response ok but album is empty
    ✓ returns patched true when response ok and album has data
    ✓ targets the album patch endpoint with body and headers

PASS src/shared/test/index.test.ts
  shared
    ✓ API_BASE_URL points to jsonplaceholder base

PASS src/albums/test/delete-album.test.ts
  deleteAlbum
    ✓ returns api-fail when global fetch is unavailable
    ✓ returns api-fail when fetch response is not ok
    ✓ returns api-ok when response ok
    ✓ targets the album delete endpoint

PASS src/comments/test/get-comment-by-id.test.ts
  getCommentById
    ✓ returns api-fail when global fetch is unavailable
    ✓ returns api-fail when fetch response is not ok
    ✓ returns found false when response ok but comment is empty
    ✓ returns found true when response ok and comment has data
    ✓ targets the comment by id endpoint

PASS src/albums/test/get-all-albums.test.ts
  getAllAlbums
    ✓ returns api-fail when global fetch is unavailable
    ✓ returns api-fail when fetch response is not ok
    ✓ returns payload when response ok
    ✓ targets the albums endpoint

PASS src/posts/test/update-post.test.ts
  updatePost
    ✓ returns api-fail when global fetch is unavailable
    ✓ returns api-fail when fetch response is not ok
    ✓ returns updated false when response ok but post is empty
    ✓ returns updated true when response ok and post has data
    ✓ targets the post update endpoint with body and headers

PASS src/todos/test/get-todo-by-id.test.ts
  getTodoById
    ✓ returns api-fail when global fetch is unavailable
    ✓ returns api-fail when fetch response is not ok
    ✓ returns found false when response ok but todo is empty
    ✓ returns found true when response ok and todo has data
    ✓ targets the todo by id endpoint

PASS src/comments/test/get-all-comments.test.ts
  getAllComments
    ✓ returns api-fail when global fetch is not ok
    ✓ returns api-fail when fetch response is not ok
    ✓ returns payload when response ok
    ✓ targets the comments endpoint

PASS src/todos/test/create-new-todo.test.ts
  createNewTodo
    ✓ returns api-fail when global fetch is unavailable
    ✓ returns api-fail when fetch response is not ok
    ✓ returns created false when response ok but todo is empty
    ✓ returns created true when response ok and todo has data
    ✓ targets the todos endpoint with POST body and headers

PASS src/posts/test/get-post-by-id.test.ts
  getPostById
    ✓ returns api-fail when global fetch is unavailable
    ✓ returns api-fail when fetch response is not ok
    ✓ returns found false when response ok but post is empty
    ✓ returns found true when response ok and post has data
    ✓ targets the post by id endpoint

PASS src/posts/test/delete-post.test.ts
  deletePost
    ✓ returns api-fail when global fetch is unavailable
    ✓ returns api-fail when fetch response is not ok
    ✓ returns api-ok when response ok
    ✓ targets the post delete endpoint

PASS src/comments/test/update-comment-partial.test.ts
  updateCommentPartial
    ✓ returns api-fail when global fetch is unavailable
    ✓ returns api-fail when data is empty
    ✓ returns api-fail when fetch response is not ok
    ✓ returns patched false when response ok but comment is empty
    ✓ returns patched true when response ok and comment has data
    ✓ targets the comment patch endpoint with body and headers

PASS src/posts/test/create-new-post.test.ts
  createNewPost
    ✓ returns api-fail when global fetch is unavailable
    ✓ returns api-fail when fetch response is not ok
    ✓ returns created false when response ok but post is empty
    ✓ returns created true when response ok and post has data
    ✓ targets the posts endpoint with POST body and headers

PASS src/albums/test/create-new-album.test.ts
  createNewAlbum
    ✓ returns api-fail when global fetch is unavailable
    ✓ returns api-fail when fetch response is not ok
    ✓ returns created false when response ok but album is empty
    ✓ returns created true when response ok and album has data
    ✓ targets the albums endpoint with POST body and headers

PASS src/posts/test/get-all-posts.test.ts
  getAllPosts
    ✓ returns api-fail when global fetch is unavailable
    ✓ returns api-fail when fetch response is not ok
    ✓ returns payload when response ok
    ✓ targets the posts endpoint

PASS src/comments/test/update-comment.test.ts
  updateComment
    ✓ returns api-fail when global fetch is unavailable
    ✓ returns api-fail when fetch response is not ok
    ✓ returns updated false when response ok but comment is empty
    ✓ returns updated true when response ok and comment has data
    ✓ targets the comment update endpoint with body and headers

PASS src/comments/test/create-new-comment.test.ts
  createNewComment
    ✓ returns api-fail when global fetch is unavailable
    ✓ returns api-fail when fetch response is not ok
    ✓ returns created false when response ok but comment is empty
    ✓ returns created true when response ok and comment has data
    ✓ targets the comments endpoint with POST body and headers

PASS src/photos/test/get-all-photos.test.ts
  getAllPhotos
    ✓ returns api-fail when global fetch is unavailable
    ✓ returns api-fail when fetch response is not ok
    ✓ returns payload when response ok
    ✓ targets the photos endpoint

PASS src/photos/test/get-photo-by-id.test.ts
  getPhotoById
    ✓ returns api-fail when global fetch is unavailable
    ✓ returns api-fail when fetch response is not ok
    ✓ returns found false when response ok but photo is empty
    ✓ returns found true when response ok and photo has data
    ✓ targets the photo by id endpoint

PASS src/photos/test/update-photo-partial.test.ts
  updatePhotoPartial
    ✓ returns api-fail when global fetch is unavailable
    ✓ returns api-fail when data is empty
    ✓ returns api-fail when fetch response is not ok
    ✓ returns patched false when response ok but photo is empty
    ✓ returns patched true when response ok and photo has data
    ✓ targets the photo patch endpoint with body and headers

PASS src/todos/test/get-all-todos.test.ts
  getAllTodos
    ✓ returns api-fail when global fetch is unavailable
    ✓ returns api-fail when fetch response is not ok
    ✓ returns payload when response ok
    ✓ targets the todos endpoint

PASS src/comments/test/delete-comment.test.ts
  deleteComment
    ✓ returns api-fail when global fetch is unavailable
    ✓ returns api-fail when fetch response is not ok
    ✓ returns api-ok when response ok
    ✓ targets the comment delete endpoint

PASS src/photos/test/update-photo.test.ts
  updatePhoto
    ✓ returns api-fail when global fetch is unavailable
    ✓ returns api-fail when fetch response is not ok
    ✓ returns updated false when response ok but photo is empty
    ✓ returns updated true when response ok and photo has data
    ✓ targets the photo update endpoint with body and headers

PASS src/albums/test/update-album.test.ts
  updateAlbum
    ✓ returns api-fail when global fetch is unavailable
    ✓ returns api-fail when fetch response is not ok
    ✓ returns updated false when response ok but album is empty
    ✓ returns updated true when response ok and album has data
    ✓ targets the album update endpoint with body and headers

PASS src/todos/test/delete-todo.test.ts
  deleteTodo
    ✓ returns api-fail when global fetch is unavailable
    ✓ returns api-fail when fetch response is not ok
    ✓ returns api-ok when response ok
    ✓ targets the todo delete endpoint

PASS src/photos/test/delete-photo.test.ts
  deletePhoto
    ✓ returns api-fail when global fetch is unavailable
    ✓ returns api-fail when fetch response is not ok
    ✓ returns api-ok when response ok
    ✓ targets the photo delete endpoint

----------------------------|---------|----------|---------|---------|-------------------
File                        | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------------------------|---------|----------|---------|---------|-------------------
All files                   |   99.68 |    97.77 |     100 |   99.68 |                   
 albums                     |   99.67 |    97.77 |     100 |   99.67 |                   
  create-new-album.ts       |     100 |      100 |     100 |     100 |                   
  delete-album.ts           |     100 |      100 |     100 |     100 |                   
  get-album-by-id.ts        |     100 |      100 |     100 |     100 |                   
  get-all-albums.ts         |     100 |      100 |     100 |     100 |                   
  update-album-partial.ts   |   98.36 |    88.88 |     100 |   98.36 | 23                
  update-album.ts           |     100 |      100 |     100 |     100 |                   
 comments                   |   99.67 |    97.77 |     100 |   99.67 |                   
  create-new-comment.ts     |     100 |      100 |     100 |     100 |                   
  delete-comment.ts         |     100 |      100 |     100 |     100 |                   
  get-all-comments.ts       |     100 |      100 |     100 |     100 |                   
  get-comment-by-id.ts      |     100 |      100 |     100 |     100 |                   
  update-comment-partial.ts |   98.36 |    88.88 |     100 |   98.36 | 23                
  update-comment.ts         |     100 |      100 |     100 |     100 |                   
 photos                     |   99.67 |    97.77 |     100 |   99.67 |                   
  create-new-photo.ts       |     100 |      100 |     100 |     100 |                   
  delete-photo.ts           |     100 |      100 |     100 |     100 |                   
  get-all-photos.ts         |     100 |      100 |     100 |     100 |                   
  get-photo-by-id.ts        |     100 |      100 |     100 |     100 |                   
  update-photo-partial.ts   |   98.36 |    88.88 |     100 |   98.36 | 23                
  update-photo.ts           |     100 |      100 |     100 |     100 |                   
 posts                      |   99.67 |    97.77 |     100 |   99.67 |                   
  create-new-post.ts        |     100 |      100 |     100 |     100 |                   
  delete-post.ts            |     100 |      100 |     100 |     100 |                   
  get-all-posts.ts          |     100 |      100 |     100 |     100 |                   
  get-post-by-id.ts         |     100 |      100 |     100 |     100 |                   
  update-post-partial.ts    |   98.36 |    88.88 |     100 |   98.36 | 23                
  update-post.ts            |     100 |      100 |     100 |     100 |                   
 shared                     |     100 |      100 |     100 |     100 |                   
  api-base-url.ts           |     100 |      100 |     100 |     100 |                   
 todos                      |   99.67 |    97.77 |     100 |   99.67 |                   
  create-new-todo.ts        |     100 |      100 |     100 |     100 |                   
  delete-todo.ts            |     100 |      100 |     100 |     100 |                   
  get-all-todos.ts          |     100 |      100 |     100 |     100 |                   
  get-todo-by-id.ts         |     100 |      100 |     100 |     100 |                   
  update-todo-partial.ts    |   98.36 |    88.88 |     100 |   98.36 | 23                
  update-todo.ts            |     100 |      100 |     100 |     100 |                   
 users                      |   99.71 |    97.77 |     100 |   99.71 |                   
  create-new-user.ts        |     100 |      100 |     100 |     100 |                   
  delete-user.ts            |     100 |      100 |     100 |     100 |                   
  get-all-users.ts          |     100 |      100 |     100 |     100 |                   
  get-user-by-id.ts         |     100 |      100 |     100 |     100 |                   
  update-user-partial.ts    |   98.78 |    88.88 |     100 |   98.78 | 44                
  update-user.ts            |     100 |      100 |     100 |     100 |                   
----------------------------|---------|----------|---------|---------|-------------------

=============================== Coverage summary ===============================
Statements   : 99.68% ( 1887/1893 )
Branches     : 97.77% ( 264/270 )
Functions    : 100% ( 36/36 )
Lines        : 99.68% ( 1887/1893 )
================================================================================
Test Suites: 37 passed, 37 total
Tests:       175 passed, 175 total
Snapshots:   0 total
Time:        28.802 s
Ran all test suites.
```
