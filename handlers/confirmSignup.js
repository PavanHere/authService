const { CognitoIdentityProviderClient, SignUpCommand, ConfirmDeviceCommand, ConfirmSignUpCommand } = require('@aws-sdk/client-cognito-identity-provider');

const client = new CognitoIdentityProviderClient({ region: 'us-east-1' });
const CLIENT_ID = "6s8fd3t0asd6tsdl8n269hrm3a";
exports.confirmSignup = async(event)=>{



    
    const{email,confirmationCode}=JSON.parse(event.body);

    const params={
        ClientId: process.env.CLIENT_ID,
      Username: email,
      ConfirmationCode: confirmationCode,
    
      
    };

    try {
        const command=new ConfirmSignUpCommand(params);
        await client.send(command);

        return {
            statusCode: 200,
            body: JSON.stringify({ msg: "User successfully  confirmed" })
          };
    } catch (error) {
        
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'User Confirmation failed', details: error.message })
          };
    }

    
}