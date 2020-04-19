// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/data', function (req, res) {
    // res.json({
    //     status: 'API Its Working',
    //     message: 'Welcome to RESTHub crafted with love!'
    // });
    res.send({
    	"data with router"
    })
});
// Export API routes
module.exports = router;