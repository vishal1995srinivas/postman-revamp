# MyPOSTMAN 🚀
// TODO : Add logo here once completed

## Scope

Postman right now focuses on the following functionalities.
- Returns an response to an API made by you or others.
- Provision to add expected result of an API.
- Validates API response with expected case and provides you the result.
- API is saved in history for future use.
- One or more API requests can be added into a collection for easy categorisation.
- Play collection to verify the API's are working as expected.
- In future, 
    - timely alert for testing of API's.
    - Sharing the response to peer developer.
    - UI advancements
    are possible.

## User journey flow 🚗

<img src="./images/workflow.png" alt="WorkFlow">
created in https://app.diagrams.net/

## Technical Stack 🧰 

### FrontEnd 

- React 16
- Ant Design 4.66
- State management library used : None
MyPOSTMAN functionality scope is limited right now and we might use Redux in future.
- CSS - Styles file specified in the respective folder for better readability.

### Backend

- NodeJS
- ExpressJS
- MongoDB

### Authorization

- Login screen is displayed at prior of application screen.
- User is autorised at the login.
- For every subsequent request, user credentials in the form of JWT is sent along with requests.

### Component Design 

- Overall Components 
    <img src = "./images/compoDesign.png">

- Sidebar Component Design
     <img src = "./images/sidebar.png">

- Body Component Design 
    <img src = "./images/body.png">

- Response and other Components Design
    <img src = "./images/others.png">

### Backend API's
- Adding Request to Collection
    - PUT request
    - params - request, token
    - url  - https://infinity-dark-mode-api.herokuapp.com/api/v1/collections 

- Create collection
    - POST request
    - params - userId, token, collectionName
    - url - https://infinity-dark-mode-api.herokuapp.com/api/v1/collections

- Create Request
    - POST request
    - params - token, bodyData
    - url - https://infinity-dark-mode-api.herokuapp.com/api/v1/requests

- Delete Collection By Id
    - DELETE request
    - params - token, collectionId
    - url - https://infinity-dark-mode-api.herokuapp.com/api/v1/collections/${collectionId}

- Get collections By Id
    - GET request
    - params - userId, token
    - url - https://infinity-dark-mode-api.herokuapp.com/api/v1/collections?userId=${userId}

- Get History 
    - GET request
    - params - userId, token
    - url - https://infinity-dark-mode-api.herokuapp.com/api/v1/requests?userId=${userId} 

### Contribute

To be able to contribute, you should be at ease with React and javascript.

- git clone
- npm install
