[![Codacy Badge](https://app.codacy.com/project/badge/Grade/f210ffd1e43245f292828387de3b5a32)](https://www.codacy.com/gh/Nessiahs/file-exchange-backend/dashboard?utm_source=github.com&utm_medium=referral&utm_content=Nessiahs/file-exchange-backend&utm_campaign=Badge_Grade)

# file-exchange-backend

Backend for the [File-Exchange Frontend](https://github.com/Nessiahs/file-exchange-ui)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`JWT_EXPIRE` Expire time for the jwt-token, default 1h

`JWT_ALGORITH` Allowed: HS256, HS384 , HS512, RS256, RS384, RS512, ES256, ES384, ES512, PS256, PS384, PS512, default: HS512

`JWT_KEY`: Optional hardcoded key for the token, if not given, every restart a new key will generated

## API Reference

### /admin

For all subroutes must be type in jwt-token `admin`

### Diskspace info

```http
    GET /disk-space/
```

response:

```typescript
    {
        size: number,
        free: number
    }

```

### Disk chart data

```http
    GET /disk-chart/
```

```typescript
[
  {
    size: number,
    color: string,
  },
];
```

### Login state and user info

```http
    GET /status/
```

response:

```typescript
{
    id: number,
    isAdmin: 0 | 1
}

```

### Download file

```http
    GET /download/:folder/:file/
```

| Parameter | Type     | Description                            |
| :-------- | :------- | :------------------------------------- |
| `folder`  | `string` | **Required** token from table jobs     |
| `file`    | `string` | **Required** hashname from table files |

response:

Enrypted file

### Job list

```http
    GET /jobs/:jobType/
```

| Parameter | Type     | Description                     |
| :-------- | :------- | :------------------------------ |
| `jobType` | `string` | **Required** download or upload |

response:

```typescript
[
  {
    created: string, // YYYY-MM-DD HH:mm:ss
    expires: string, // YYYY-MM-DD
    files: number,
    jobName: string,
    jobType: upload | download,
    secret: string,
    token: string,
  },
];
```

### Create a job

```http
    POST /create/
```

| Parameter    | Type      | Description                          |
| :----------- | :-------- | :----------------------------------- |
| `jobType`    | `string`  | **Required** download or upload      |
| `jobName`    | `string`  | **Required** name of the job in list |
| `expires`    | `number`  | **Required**                         |
| `privateJon` | `boolean` | **Required**                         |

### Job info

```http
    GET /info/:token/:jobType
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `token`   | `string` | **Required** token from table jobs |
| `jobType` | `string` | **Required** download or upload    |

response:

```typescript
{
  "files": [{
    created: string, // YYYY-MM-DD HH:mm:ss
    downloads: number,
    filename: string,
    hashname: string,
    id: number,
    size: number,
    token: number,
  ],
  "info": {
    created: string, // YYYY-MM-DD HH:mm:ss
    createdBy: number,
    expires: string, // YYYY-MM-DD
    jobName: string,
    jobType: string,
    secret: string,
    token: string,
  }
}
```

### File upload

```http
    POST /upload/file/:token
```

### File delete

```http
    DELETE /file/:id
```

| Parameter | Type     | Description                      |
| :-------- | :------- | :------------------------------- |
| `id`      | `number` | **Required** id from table files |

### Delete job

```http
    DELETE /job/:id
```

| Parameter | Type     | Description                     |
| :-------- | :------- | :------------------------------ |
| `id`      | `number` | **Required** id from table jobs |

## Next routes are only for admins

To access this routes isAdmin must be `1` in jwt-token

## Get all users

```http
    GET /users/
```

reposne

```typescript
[{
    created: string, // YYYY-MM-DD HH:mm:ss
    email: string,
    id: number
    isAdmin: 0 | 1
    lastLogin: string, // YYYY-MM-DD HH:mm:ss
}]
```

## Get settings by key

```http
    GET /setting/:type/
```

| Parameter | Type     | Description                                |
| :-------- | :------- | :----------------------------------------- |
| `type`    | `string` | **Required** table settings row type value |

response:

```typescript
{
  setting: string; // JSON encoded
}
```

### Update setting

```http
    PUT /settings/:type
```

| Parameter | Type     | Description                                |
| :-------- | :------- | :----------------------------------------- |
| `type`    | `string` | **Required** table settings row type value |
| `data`    | `string` | **Required** JSON encoded values           |

### Delete user

```http
    DELETE /user/:id/
```

| Parameter | Type     | Description                     |
| :-------- | :------- | :------------------------------ |
| `id`      | `number` | **Required** id from table user |

### Verify email is not used in table user

```http
 POST /verify-email/
```

respone:

```typescript
{
    allowed: boolean,
}
```

### Add a user

```http
    POST: /add-user/
```

| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `email`    | `string` | **Required** |
| `isAdmin`  | `number` | **Required** |
| `password` | `string` | **Required** |

## Authors

- [@Nessiahs](https://www.github.com/Nessiahs)

## License

[MIT](./LICENSE)
