/* Amplify Params - DO NOT EDIT
	API_DAILYKPOP_GRAPHQLAPIENDPOINTOUTPUT
	API_DAILYKPOP_GRAPHQLAPIIDOUTPUT
	API_DAILYKPOP_GRAPHQLAPIKEYOUTPUT
	AUTH_DAILYKPOP63B1FF97_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */// This is sample code. Please update this to suite your schema

// exports.handler = async (event) => {
//   console.log(`event >`, JSON.stringify(event, null, 2));
//   const {
//     authorizationToken,
//     requestContext: { apiId, accountId },
//   } = event;
//   const response = {
//     isAuthorized: authorizationToken === 'custom-authorized',
//     resolverContext: {
//       userid: 'user-id',
//       info: 'contextual information A',
//       more_info: 'contextual information B',
//     },
//     deniedFields: [
//       `arn:aws:appsync:${process.env.AWS_REGION}:${accountId}:apis/${apiId}/types/Event/fields/comments`,
//       `Mutation.createEvent`,
//     ],
//     ttlOverride: 300,
//   };
//   console.log(`response >`, JSON.stringify(response, null, 2));
//   return response;
// };

// FIREBASE + LAMBDA 
exports.handler = async (event) => {
  try {
    const jwt = event.requestContext.authorizer.jwt.claims;
    const email = jwt.claims.email;
    return {
      statusCode: 200,
      body: JSON.stringify({ jwt: jwt, email: email }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Please check logs" }),
    };
  }
};