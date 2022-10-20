Refactor to react from ejs

    app:
        backend:
            [] users/ ranges etc. should be admin / ranges route all :)(admin routes) (later maybe moderator routes?)
            [] add method for user to find all users without password and _v and only id/name
            [] same for find one user without password and _v

    [x] show links depends if logged/logout
    [x] redirect depends if logged/logout

    [] refactor: chats(index) backend
    [] refactor: chats(index) frontend
        [] chat socket io(later)


    [x] refactor: login route
    [x] refactor: login frontend
         [] add validation
        [x] login styles

    [] refactor: register route
    [] refactor: register frontend
        [x] register styles
        [] validation
    [] refactor: chat rooms route
    [] refactor: chat rooms frontend
        [x] show users rooms
        [] edit users rooms
            [x] add edit user rooms
            [x] change name room
            [x] change available ranges for room
            [] allow / ban users for room
    [] refactor: index(chats) route
    [] refactor: index(chats) frontend

    [] refactor: profil route
    [] refactor: profil frontend
        [x] profil details
        [] profil edit
    [] refactor: ranges route
    [] refactor: ranges frontend
        [] all ranges list
        [] add ranges
        [] remove ranges
        [] edit ranges
    [] refactor: users route
    [] refactor: users frontend
        [] list of users
        [] ban users
        [] add ranges for users
        [] edit users
        [] edit rooms of user

repeated:

    [] all users in chatroom (banned / not banned) [in create and edit]
    [] all ranges in chatroom repeated [in created and edit]
