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

exports.getInstance = createInstance();

exports.translate = (text, targetLanguage) =>
  exports
    .getInstance()
    .translate(text, targetLanguage)
    .then(([translation]) => translation);

exports.getLanguagesList = () =>
  exports
    .getInstance()
    .getLanguages()
    .then(([languages]) => languages);
