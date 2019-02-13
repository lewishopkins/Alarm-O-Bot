// TEST INSPECT

exports.run = (client, message, args, blizzard, config) => {

		// Prepare data
        blizzard.wow.character(['profile'], { origin: 'eu', realm: 'ragnaros', name: 'panda', token: config.BLIZZARD_API_ACCESS_TOKEN})
        .then(response => {
          console.log(response.data);
        });
    }