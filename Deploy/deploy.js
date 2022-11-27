const ghPages = require('gh-pages');

ghPages.publish('dist', {
	dotfiles: true,
	history: false,
	message: '//'
}, (err) => {
	console.error(err);
});