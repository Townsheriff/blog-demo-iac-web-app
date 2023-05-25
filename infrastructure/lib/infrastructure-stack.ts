import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { BackendApp } from "./backend-app";
import { FrontendApp } from "./frontend-app";
import { AppCdn } from "./app-cdn";

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const cloudfrontDomainName = this.node.getContext("zoneName");
    const hostedZoneId = this.node.getContext("zoneId");
    const backendDomainName = `api.${cloudfrontDomainName}`;

    const hostedZone = cdk.aws_route53.HostedZone.fromHostedZoneAttributes(
      this,
      "HostedZone",
      {
        hostedZoneId: hostedZoneId,
        zoneName: cloudfrontDomainName,
      }
    );

    const backend = new BackendApp(this, "BackendApp", {
      cloudfrontDomainName: cloudfrontDomainName,
      apiDomainName: backendDomainName,
      hostedZone: hostedZone,
    });

    const frontend = new FrontendApp(this, "FrontendApp");

    new AppCdn(this, "AppCdn", {
      cloudfrontDomainName: cloudfrontDomainName,
      hostedZone: hostedZone,
      backendApp: backend,
      frontendApp: frontend,
    });
  }
}
