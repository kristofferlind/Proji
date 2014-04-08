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
comments
	iid
		cid
			text
roles
	pid
		rid
			name
			description
			users = [uid]
