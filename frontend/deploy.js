const ghpages = require('gh-pages');

ghpages.publish('build', {
  dotfiles: true,
  message: 'Deploying to GitHub Pages',
  cache: false,
  user: {
    name: 'Rahul Patel',
    email: 'patelrahul3105@gmail.com'  // ✅ Use your GitHub email here
  }
}, function (err) {
  if (err) {
    console.error('❌ Deployment failed:', err);
  } else {
    console.log('✅ Deployment successful!');
  }
});
