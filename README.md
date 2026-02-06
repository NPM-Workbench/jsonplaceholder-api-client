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
})
/* Returns the created album with a mock id. Changes are not persisted (JSONPlaceholder behavior) */
```
4. Update Album
```javascript
import { updateAlbum } from "jsonplaceholder-api-client";
const response = await updateAlbum({
  id: number,
  data: { id: number, title: string, userId: number }
})
/* All required fields should be provided. Changes are not persisted (JSONPlaceholder behavior). */
```
5. Partial Update Album
```javascript
import { updateAlbumPartial } from "jsonplaceholder-api-client";
const response = await updateAlbumPartial({
  id: number,
  data: { title?: string, userId?: number }
})
/* Need to give atleast 1 of the data fields. Changes are not persisted (JSONPlaceholder behavior). */
```
6. Delete Album
```javascript
import { deleteAlbum } from "jsonplaceholder-api-client";
const response = await deleteAlbum({ id: number });
/* Designed to reflect request success, not persistence. Changes are not persisted (JSONPlaceholder behavior). */
```
