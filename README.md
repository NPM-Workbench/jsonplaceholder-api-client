![json-placeholder-api-client-banner](https://github.com/user-attachments/assets/a26a1bfd-58d1-4e7b-b83e-b003d774cd40)
# jsonplaceholder-API-client
This package is a TypeScript-first wrapper around the [JSONPlaceholder](https://jsonplaceholder.typicode.com/) fake REST API. It provides clean, predictable helper functions for working with common resources such as posts, comments, albums, photos, todos, and users, covering the full CRUD surface ```(GET, POST, PUT, PATCH, DELETE)```.
<br/><br/>
🌱 The goal of this library is not to replace JSONPlaceholder itself, but to offer a __Developer-Friendly SDK__ with consistent response shapes, sensible defaults, and strong TypeScript typing — making it useful for learning, prototyping, demos, and testing frontend or SDK patterns.

### 📦 Installation
```console
npm install --save jsonplaceholder-api-client
```

### 🎲 Features
1. Built with strong TypeScript typings from the ground up.
2. Full REST surface for common JSONPlaceholder resources: ```GET, POST, PUT, PATCH and DELETE```.
3. Uniform response structures to simplify error handling and data access.
4. ID-based fetches normalize empty API responses, making missing resources easy to handle.
5. Clean, intention-revealing functions.
6. Uses the native fetch API without adding unnecessary runtime dependencies.
7. Designed for demos, tutorials, SDK experiments and frontend testing.

### 📖 What is JSONPlaceholder?
JSONPlaceholder is a free, public fake REST API that provides realistic but non-persistent data for common resources such as posts, comments, users, albums, photos, and todos. This is widely used by developers to practice working with REST APIs.

### 💡 Why This Exists?
JSONPlaceholder is an excellent fake REST API, but using it directly often means repeating the same boilerplate: manual fetch calls, ad-hoc response handling, loose typing, and inconsistent patterns across resources.<br/>
This package exists to solve that by providing:
1. **Strong TypeScript typings** for all resources and operations
2. **Consistent, predictable response shapes** across every endpoint
3. **Clear, intention-revealing helper functions** instead of raw HTTP calls
<br/>
The goal is not abstraction for abstraction’s sake, but to make working with JSONPlaceholder feel more structured, expressive, and developer-friendly — especially for learning, prototyping, demos, and SDK experimentation.

### 💻 Usage
📁 Resource Name: Albums<br/>
1. Get All Albums
```javascript
import { getAllAlbums } from "jsonplaceholder-api-client";
const response = await getAllAlbums();
/* Returns an array of album objects */
```
2. Get Album By ID
```javascript
import { getAlbumById } from "jsonplaceholder-api-client";
const response = await getAlbumById({ id: number });
/* If the album does not exist, album is returned as null */
```
3. Create Album
```javascript
import { createAlbum } from "jsonplaceholder-api-client";
const response = await createAlbum({
  title: string,
  userId: number,
});
/* All required fields. Changes not persisted (JSONPlaceholder behavior) */
```
4. Update Album
```javascript
import { updateAlbum } from "jsonplaceholder-api-client";
const response = await updateAlbum({
  id: number,
  data: { id: number, title: string, userId: number }
});
/* All required fields. Changes not persisted (JSONPlaceholder behavior) */
```
5. Partial Update Album
```javascript
import { updateAlbumPartial } from "jsonplaceholder-api-client";
const response = await updateAlbumPartial({
  id: number,
  data: { title?: string, userId?: number }
});
/* Need to give atleast 1 of the data fields. */
/* Changes are not persisted (JSONPlaceholder behavior). */
```
6. Delete Album
```javascript
import { deleteAlbum } from "jsonplaceholder-api-client";
const response = await deleteAlbum({ id: number });
/* Mock delete endpoint. Changes are not persisted (JSONPlaceholder behavior). */
```
<br/>📁 Resource Name: Comments<br/>
1. Get All Comments
```javascript
import { getAllComments } from "jsonplaceholder-api-client";
const response = await getAllComments();
/* Returns an array of comment objects */
```
2. Get Comment By ID
```javascript
import { getCommentById } from "jsonplaceholder-api-client";
const response = await getCommentById({ id: number });
/* If the comment does not exist, comment is returned as null */
```
3. Create Comment
```javascript
import { createNewComment } from "jsonplaceholder-api-client";
const response = await createNewComment({
  postId: number,
  name: string,
  email: string,
  body: string
});
/* All required fields. Changes not persisted (JSONPlaceholder behavior) */
```
4. Update Comment
```javascript
import { updateComment } from "jsonplaceholder-api-client";
const response = await updateComment({
  id: number,
  data: {id: number, postId: number, name: string, email: string, body: string}
});
/* All required fields. Changes not persisted (JSONPlaceholder behavior) */
```
5. Partial Update Comment
```javascript
import { updateCommentPartial } from "jsonplaceholder-api-client";
const response = await updateCommentPartial({
  id: number,
  data: {postId?: number, name?: string, email?: string, body?: string}
});
/* Need to give atleast 1 of the data fields. */
/* Changes are not persisted (JSONPlaceholder behavior). */
```
6. Delete Comment
```javascript
import { deleteComment } from "jsonplaceholder-api-client";
const response = await deleteComment({ id: number });
/* Mock delete endpoint. Changes are not persisted (JSONPlaceholder behavior). */
```

<br/>📁 Resource Name: Photos<br/>
1. Get All Photos
```javascript
import { getAllPhotos } from "jsonplaceholder-api-client";
const response = await getAllPhotos();
/* Returns an array of photo objects */
```
2. Get Photo By ID
```javascript
import { getPhotoById } from "jsonplaceholder-api-client";
const response = await getPhotoById({ id: number });
/* If the photo does not exist, photo is returned as null */
```
3. Create Photo
```javascript
import { createNewPhoto } from "jsonplaceholder-api-client";
const response = await createNewPhoto({
  albumId: number,
  title: string,
  url: string,
  thumbnailUrl: string
});
/* All required fields. Changes not persisted (JSONPlaceholder behavior) */
```
4. Update Photo
```javascript
import { updatePhoto } from "jsonplaceholder-api-client";
const response = await updatePhoto({
  id: number,
  data: { id: number, albumId: number, title: string, url: string, thumbnailUrl: string }
});
/* All required fields. Changes not persisted (JSONPlaceholder behavior) */
```
5. Partial Update Photo
```javascript
import { updatePhotoPartial } from "jsonplaceholder-api-client";
const response = await updatePhotoPartial({
  id: number,
  data: { albumId?: number, title?: string, url?: string, thumbnailUrl?: string }
});
/* Need to give atleast 1 of the data fields. */
/* Changes are not persisted (JSONPlaceholder behavior). */
```
6. Delete Photo
```javascript
import { deletePhoto } from "jsonplaceholder-api-client";
const response = await deletePhoto({ id: number });
/* Mock delete endpoint. Changes are not persisted (JSONPlaceholder behavior). */
```

<br/>📁 Resource Name: Posts<br/>
1. Get All Posts
```javascript
import { getAllPosts } from "jsonplaceholder-api-client";
const response = await getAllPosts();
/* Returns an array of post objects */
```
2. Get Post By ID
```javascript
import { getPostById } from "jsonplaceholder-api-client";
const response = await getPostById({ id: number });
/* If the post does not exist, post is returned as null */
```
3. Create Post
```javascript
import { createNewPost } from "jsonplaceholder-api-client";
const response = await createNewPost({
  userId: number,
  title: string,
  body: string,
});
/* All required fields. Changes not persisted (JSONPlaceholder behavior) */
```
4. Update Post
```javascript
import { updatePost } from "jsonplaceholder-api-client";
const response = await updatePost({
  id: number,
  data: { id: number, userId: number, title: string, body: string }te
});
/* All required fields. Changes not persisted (JSONPlaceholder behavior) */
```
5. Partial Update Post
```javascript
import { updatePostPartial } from "jsonplaceholder-api-client";
const response = await updatePostPartial({
  id: number,
  data: { userId?: number, title?: string, body?: string }
});
/* Need to give atleast 1 of the data fields. */
/* Changes are not persisted (JSONPlaceholder behavior). */
```
6. Delete Post
```javascript
import { deletePost } from "jsonplaceholder-api-client";
const response = await deletePost({ id: number });
/* Mock delete endpoint. Changes are not persisted (JSONPlaceholder behavior). */
```

<br/>📁 Resource Name: Todos<br/>
1. Get All Todos
```javascript
import { getAllTodos } from "jsonplaceholder-api-client";
const response = await getAllTodos();
/* Returns an array of todo objects */
```
2. Get Todo By ID
```javascript
import { getTodoById } from "jsonplaceholder-api-client";
const response = await getTodoById({ id: number });
/* If the todo does not exist, todo is returned as null */
```
3. Create Todo
```javascript
import { createNewTodo } from "jsonplaceholder-api-client";
const response = await createNewTodo({
  userId: number,
  title: string,
  completed: boolean,
});
/* All required fields. Changes not persisted (JSONPlaceholder behavior) */
```
4. Update Todo
```javascript
import { updateTodo } from "jsonplaceholder-api-client";
const response = await updatePost({
  id: number,
  data: { id: number, userId: number, title: string, completed: boolean }
});
/* All required fields. Changes not persisted (JSONPlaceholder behavior) */
```
5. Partial Update Todo
```javascript
import { updateTodoPartial } from "jsonplaceholder-api-client";
const response = await updateTodoPartial({
  id: number,
  data: { userId?: number, title?: string, completed?: boolean }
});
/* Need to give atleast 1 of the data fields. */
/* Changes are not persisted (JSONPlaceholder behavior). */
```
6. Delete Todo
```javascript
import { deleteTodo } from "jsonplaceholder-api-client";
const response = await deleteTodo({ id: number });
/* Mock delete endpoint. Changes are not persisted (JSONPlaceholder behavior). */
```

<br/>📁 Resource Name: Users<br/>
1. Get All Users
```javascript
import { getAllUsers } from "jsonplaceholder-api-client";
const response = await getAllUsers();
/* Returns an array of user objects */
```
2. Get User By ID
```javascript
import { getUserById } from "jsonplaceholder-api-client";
const response = await getUserById({ id: number });
/* If the user does not exist, user is returned as null */
```
3. Create User
```javascript
import { createNewUser } from "jsonplaceholder-api-client";
const response = await createNewUser({
  name: string,
  username: string,
  email: string
});
/* All required fields. Changes not persisted (JSONPlaceholder behavior) */
```
4. Update User
```javascript
import { updateUser } from "jsonplaceholder-api-client";
const response = await updateUser({
  id: number,
  data: {
    id: number
    name: string
    username: string
    email: string
    address: {
      street: string
      suite: string
      city: string
      zipcode: string
      geo: {
        lat: string
        lng: string
      }
    }
    phone: string
    website: string
    company: {
      name: string
      catchPhrase: string
      bs: string
    }
  }
});
/* All required fields. Changes not persisted (JSONPlaceholder behavior) */
```
5. Partial Update User
```javascript
import { updateUserPartial } from "jsonplaceholder-api-client";
const response = await updateUserPartial({
  id: number,
  data: {
    name?: string
    username?: string
    email?: string
    address?: {
      street?: string
      suite?: string
      city?: string
      zipcode?: string
      geo?: {
        lat?: string
        lng?: string
      }
    }
    phone?: string
    website?: string
    company?: {
      name?: string
      catchPhrase?: string
      bs?: string
    }
  }
});
/* Need to give atleast 1 of the data fields. */
/* Changes are not persisted (JSONPlaceholder behavior). */
```
6. Delete User
```javascript
import { deleteUser } from "jsonplaceholder-api-client";
const response = await deleteUser({ id: number });
/* Mock delete endpoint. Changes are not persisted (JSONPlaceholder behavior). */
```

### 📘 Contributing
Contributions, suggestions, and improvements are welcome.<br/>
Feel free to open issues or pull requests.

### ❤️ Support
Like this project? Support it with a github star, it would mean a lot to me! Cheers and Happy Coding.
