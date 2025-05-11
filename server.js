// This is a CommonJS file for json-server
// ESLint disabled for this file in .eslintrc.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Stubbed login endpoint
server.post('/auth/login', (req, res) => {
  res.jsonp({
    token: 'fake-jwt-token',
    user: { id: 1, name: 'Test User', email: req.body.email },
  });
});

// Enhanced campaigns endpoint with category filtering
server.get('/api/campaigns', (req, res) => {
  const db = router.db.getState();
  let campaigns = db.campaigns || [];

  // Add a default category to each campaign for testing if it doesn't have one
  campaigns = campaigns.map(campaign => {
    if (!campaign.category) {
      // Use tax_eligibility as category if available, otherwise use status
      const category = campaign.tax_eligibility || campaign.status || 'general';
      return { ...campaign, category };
    }
    return campaign;
  });

  // Handle category filter if provided
  const category = req.query.category;
  if (category) {
    campaigns = campaigns.filter(
      campaign =>
        campaign.category === category ||
        (campaign.categories && campaign.categories.includes(category))
    );
  }

  // Handle pagination
  const page = parseInt(req.query._page) || 1;
  const limit = parseInt(req.query._limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedCampaigns = campaigns.slice(startIndex, endIndex);

  // Set total count header for pagination
  res.header('X-Total-Count', campaigns.length.toString());
  res.jsonp(paginatedCampaigns);
});

// Follow/unfollow campaign endpoint
server.post('/api/campaigns/:id/follow', (req, res) => {
  const campaignId = parseInt(req.params.id);
  const userId = req.body.userId || 1; // Default to user 1 for demo

  // In a real implementation, you would update a database
  // For now, just return success response
  res.jsonp({
    success: true,
    message: `User ${userId} is now following campaign ${campaignId}`,
    followed: true,
    campaignId,
    userId,
  });
});

server.post('/api/campaigns/:id/unfollow', (req, res) => {
  const campaignId = parseInt(req.params.id);
  const userId = req.body.userId || 1; // Default to user 1 for demo

  // In a real implementation, you would update a database
  // For now, just return success response
  res.jsonp({
    success: true,
    message: `User ${userId} has unfollowed campaign ${campaignId}`,
    followed: false,
    campaignId,
    userId,
  });
});

// You can add more custom endpoints here if needed

server.use(router);
server.listen(3000, '0.0.0.0', () => {
  console.log('JSON Server is running on http://0.0.0.0:3000');
  console.log('Available endpoints:');
  console.log('- Authentication: /auth/login');
  console.log('- Campaigns: /api/campaigns (supports pagination and category filtering)');
  console.log('- Follow campaign: /api/campaigns/:id/follow');
  console.log('- Unfollow campaign: /api/campaigns/:id/unfollow');
  console.log('- Default json-server routes: /campaigns, etc.');
});
