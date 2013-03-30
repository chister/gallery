exports.settings = function(environment) {
	switch(environment) {

		default:
			return {
				port: 8080,
				isDbReplSet: false,
				db: {
					mongoDbHostName: 'localhost',
					mongoDbPort: 27017
				},
				mongoDatabaseName: 'videos'
			};
	}
}