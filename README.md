# Zenow middleware
The middleware for Graphook

## Install
```bash
npm install
```

## Development
```bash
npm run dev
```

## Deploy
```bash
npm run start
```
## Routes

### GET /v1/auth
parameters:
 - response_type
   - code
   - token
 - client_id: The client id of the application making the request
 - redirect_uri: The uri to which we should redirect after successful authentication (if the uri is not included among the client's allowed uris this will error)
 - joint_user[]: a collection of user ids that will be logged in joint with this application. If you don't want a warning to be shown on the log-in page, ensure that the client is among the user ids.
 - Provide the following parameters to define scope. Supply each collection with a set identifier in the form "set:id" or "type:id" or "subsetof:id"
   - canRead[]
   - canUpdateReadPermission[]
   - canRemoveFromReadPermission[]
   - canAddToSet[]
   - canUpdateAddToSetPermission[]
   - canRemoveFromAddToSetPermission[]
   - canRemoveFromSet[]
   - canUpdateRemoveFromSetPermission[]
   - canRemoveFromRemoveFromSetPermission[]
   - canUpdateItems[]
   - canUpdateUpdateItemsPermission[]
   - canRemoveFromUpdateItemsPermission[]
   - canDeleteItems[]
   - canUpdateDeleteItemsPermission[]
   - canRemoveFromDeleteItemsPermission[]
   - canDeleteSet[]
   - canUpdateDeleteSetPermission[]
   - canRemoveFromDeleteSetPermission[]

returns
 - The proper ui to log in
 - This ui will call /ui/login?with username and password to authenticate the code
 - If the user properly logs in redirect to /ui/postauth:
   - REDIRECT_URI?code=AUTH_CODE&user_id=user_id
   - REDIRECT_URL?code=token......

### POST /v1/token
parameters
 - grant_type:
   - client_credentials
     - code
     - client_id
     - client_secret
   - authorization_code
     - client_id
     - client_secret
   - refresh_token
     - refresh_token
     - client_id
     - client_secret

returns
```
JWT: {
  users: [USER_IDS]
  refresh_token: UUID

  jwtid
  expiration
}
```

### /ui/auth
Provides the UI Auth Page

### /ui/manage
Provides the ui manage page

### /ui/signin
Confirms Username and password and sends back a setCookie header with a token as well as an indicator of a successful login

### /ui/updatePermissions
Creates it's own special token and sends a request to update the proper sets on the database.

### NOTE: UI FLOW
 - Bring up the ui
 - User confirms all checkmark required items
 - Enters username and password
 - Call /ui/login
 - call update permissions with the given permissions
 - Redirect to REDIRECT_URL


### Jackson, build things in this order:
 - POST /user
 - GET /auth
