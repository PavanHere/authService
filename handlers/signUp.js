const { CognitoIdentityProviderClient, SignUpCommand } = require('@aws-sdk/client-cognito-identity-provider');

const client = new CognitoIdentityProviderClient({ region: 'us-east-1' });
const CLIENT_ID = process.env.CLIENT_ID;

module.exports.signUp = async (event) => {
  try {
    const { email, password, fullName } = JSON.parse(event.body);

    const params = {
      ClientId: CLIENT_ID,
      Username: email,
      Password: password,
      UserAttributes: [
        { Name: 'email', Value: email },
        { Name: 'name', Value: fullName }
      ]
    };

    const command = new SignUpCommand(params);
    await client.send(command);

    return {
      statusCode: 200,
      body: JSON.stringify({ msg: "User successfully signed up" })
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Sign-up failed', details: error.message })
    };
  }
};
