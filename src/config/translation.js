const {
  v2: { Translate },
} = require('@google-cloud/translate');

const createInstance = () => {
  let client;
  return (invalidate = false) => {
    if (client === undefined || invalidate) {
      client = new Translate({
        key: 'AIzaSyBsN0HxU3fnDhchMOqZGJ6Sg57YyfSs6nA',
      });
    }
    return client;
  };
};

const getInstance = createInstance();

const translate = (text, targetLanguage) => getInstance()
  .translate(text, targetLanguage)
  .then(([translation]) => translation);

export default translate;
// exports.getLanguagesList = () => exports
//   .getInstance()
//   .getLanguages()
//   .then(([languages]) => languages);
