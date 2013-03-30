// VideoController

var VideoController = function(app, db) {

	app.get('/videos', function(req, res) {
		db.getLatestVideos(function(err, videos) {			
			res.writeHead(200, {'Content-Type': 'application/json'});
			res.end(JSON.stringify(videos));
		});
	});

	app.get('/video/:videoId', function(req, res) {
		db.getVideoById(req.params.videoId, function(err, video) {
			res.writeHead(200, {'Content-Type': 'application/json'});
			res.end(JSON.stringify(video));
		});
	});
}

module.exports = VideoController;