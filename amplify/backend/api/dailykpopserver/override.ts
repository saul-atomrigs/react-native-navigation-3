import { AmplifyApiGraphQlResourceStackTemplate } from '@aws-amplify/cli-extensibility-helper';

export function override(resources: AmplifyApiGraphQlResourceStackTemplate) {
  for (const model in resources.models) {
    const modelDDBTable = resources.models[model].modelDDBTable;
    resources.models[model].modelIamRole.policies = [
      {
        policyName: "AmplifyDenyTest",
        policyDocument: {
          Version: "2012-10-17",
          Statement: [
            {
              Effect: "Deny",
              Action: ["dynamodb:Scan"],
              // TIL: Scan can be performed on indexes
              Resource: [modelDDBTable.attrArn, `${modelDDBTable.attrArn}/*`]
            }
          ]
        }
      }
    ];
  }
}