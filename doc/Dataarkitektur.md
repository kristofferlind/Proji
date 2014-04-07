projects
	pid
		name
		description
		users = [uid] 		//uid lagras nu under ett eget unikt id, borde vara enbart en array av användare?
		//sprints = [sid]
		//tasks = [tid]
		//documents = [did]
		//ideas = [iid]
users
	uid
		username
		email
		projectId	(active project)
		md5Hash
sprints
	pid
		sid
			name
			goal
			start
			end
tasks
	pid
		tid
			name
			description
documents
	pid
		did
			name
			description
			body?
ideas
	pid
		iid
			name
			description
			votes?

//osäker på roles.. ska man kunna sätta roller eller ska det finnas ett antal bestämda?
//sätta roller kräver betydligt mer arbete, men det borde räcka med ett antal bestämda roller..
roles
	pid
		rid
			name
			description
			users = [uid]



/*
uid är nu ex. simplelogin:11
byta till email? borde förenkla och förbättra hantering
username är nog enklast, men med email agerar username bara screenname och det kan då finnas dubletter av username..
*/