exports.handler = function (event, context, callback) {
  let body;
  const secretContent = `
    <h3>Welcome to the secreat area</h3>
    <p><strong>Necrot</strong> is the best!!!!</p>
  `;

  if (event.body) {
    body = JSON.parse(event.body);
  } else {
    body = {};
  }

  if (body.password === 'javascript') {
    callback(null, {
      statusCode: 200,
      body: secretContent,
    });
  } else {
    callback(null, {
      statusCode: 401,
    });
  }
};
