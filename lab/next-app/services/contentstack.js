import contentstack from "contentstack";

const Stack =
  process.env.API_KEY && process.env.DELIVERY_TOKEN && process.env.ENVIRONMENT
    ? contentstack.Stack({
        api_key: process.env.API_KEY,
        delivery_token: process.env.DELIVERY_TOKEN,
        environment: process.env.ENVIRONMENT,
        region: process.env.REGION,
      })
    : "";

if (process.env.CUSTOM_HOST) {
  Stack.setHost(process.env.CUSTOM_HOST);
}

/**
 *
 * Fetches all the entries from specific content-type and optional params to restrict response
 * @param {string} ctUid
 * @param {string} locale required
 * @param {object} params
 * @param {string} params.url optional url for specific entry
 * @param {array} params.refs optional reference to include in response
 *
 */
const getEntry = (ctUid, locale = "en-us", params = {}) => {
  return new Promise((resolve, reject) => {
    let stackQuery = Stack.ContentType(ctUid).Query().language(locale);
    stackQuery = params.url ? stackQuery.where("url", params.url) : stackQuery;
    stackQuery = params.refs
      ? stackQuery.includeReference(params.refs)
      : stackQuery;
    stackQuery
      .toJSON()
      .find()
      .then(
        (result) => {
          resolve(result[0]);
        },
        (error) => {
          reject(error);
        }
      );
  });
};

export default {
  getEntry,
};
