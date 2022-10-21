Refactor to react from ejs

    app:
        backend:
            [] users/ ranges etc. should be admin / ranges route all :)(admin routes) (later maybe moderator routes?)
            [] add method for user to find all users without password and _v and only id/name
            [] same for find one user without password and _v
            [x] add validation if room is user or admin

    [] navigation for mobiles
    [x] show links depends if logged/logout
    [x] redirect depends if logged/logout

    [] refactor: chats(index) backend
    [] refactor: chats(index) frontend
        [] chat socket io(later)


    [x] refactor: login route
    [x] refactor: login frontend
         [] add validation
        [x] login styles

    [x] refactor: register route
    [x] refactor: register frontend
        [x] register styles
        [] validation
    [x] refactor: chat rooms route
    [x] refactor: chat rooms frontend
        [x] show users rooms
        [x] create users rooms
        [x] edit users rooms
            [x] add edit user rooms
            [x] change name room
            [x] change available ranges for room
            [x] allow / ban users for room

    [] refactor: profil route
        [] add validation if its same user or admin
    [] refactor: profil frontend
        [x] profil details
        [x] profil edit
        [] add list of countries for select? maybe in database?
        [] genders list
        [] color picker

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
