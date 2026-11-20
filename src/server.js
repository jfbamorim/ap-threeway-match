const { createApp } = require('./app');

const port = process.env.PORT || 3000;

createApp().listen(port, () => {
  console.log(`Activity Provider a ouvir na porta ${port}`);
});
