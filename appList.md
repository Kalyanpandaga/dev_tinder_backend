# dev tinder apis

## authRouter

- POST /signup
- POST / login
- POST / logout

## profileRouter

- GET profile/view
- PATCH profile/edit
- PATCH profile/password

## connectionRequestRouter

- POST request/send/intrested/:userId
- POST request/send/ignored/:userId
- POST request/review/accept/:requestId
- POST request/review/rejected/:requestId

## userRouter

- GET user/connections
- GET user/requests
- GET user/feed
