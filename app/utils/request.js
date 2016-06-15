/**
 * Helper functions to be used when making requests to the backend.
 */
// import JsCookie from 'js-cookie';

/**
 * Check the response status and raise an error if it's no good.
 * @param {object} response - the http response object as provided by fetch
 * @returns {object} - the http rsponse object or throws an error
 */
export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Return an object given an http json response
 * @param {object} response - json encoded response object as provided by fetch
 * @returns {object} - The parsed json
 */
export function parseJSON(response) {
  console.log(response);
  return response.json();
}

/**
 * Return the headers needed for put, post and delete requests
 * @returns {{Accept: string, Content-Type: string, X-CSRFToken: *}}
 */
// export function requestHeaders(form = false) {
//   let contentType = 'application/json';
//   if (form) contentType = 'application/x-www-form-urlencoded; charset=utf-8';
//   return {
//     Accept: 'application/json, application/xml, text/plain, text/html, *.*',
//     'Content-Type': contentType,
//     'X-CSRFToken': JsCookie.get('csrftoken')
//   };
// }
