const { default: axios } = require('axios');
const express = require('express');

const cors = require('cors');

const apiKey = '135f5672-f251-4f79-9514-391bd520c97a';

const app = express();
app.use(cors());

app.get('/:platform/:gamertag', async (req, res) => {
	try {
		const { platform, gamertag } = req.params;

		const response = await axios.get(
			`https://public-api.tracker.gg/v2/apex/standard/profile/${platform}/${gamertag}`,
			{
				headers: {
					'TRN-Api-Key': apiKey,
				},
			}
		);

		const data = response.data;

		if (data.errors && data.errors.length > 0) {
			return res.status(404).json({
				message: 'Profile Not Found',
			});
		}

		res.json(data);
	} catch (err) {
		console.error(err);
		res.status(500).json({
			message: 'Server Error',
		});
	}
});

const port = 8000;

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
