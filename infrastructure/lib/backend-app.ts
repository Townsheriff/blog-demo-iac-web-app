import { Construct } from "constructs";
import * as cdk from "aws-cdk-lib";

export type BackendAppProps = {
  apiDomainName: string;
  cloudfrontDomainName: string;
  hostedZone: cdk.aws_route53.IHostedZone;
};

export class BackendApp extends Construct {
  public readonly restApi: cdk.aws_apigateway.RestApi;

  constructor(scope: Construct, id: string, props: BackendAppProps) {
    super(scope, id);

    const code = cdk.aws_lambda.Code.fromDockerBuild("../backend/", {
      targetStage: "builder",
      imagePath: "/backend/build",
      platform: "linux/amd64",
    });

    const func = new cdk.aws_lambda.Function(this, "Handler", {
      runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
      handler: "bundle.handler",
      code: code,
      memorySize: 2048,
    });

    const certificate = new cdk.aws_certificatemanager.Certificate(
      this,
      "Certificate",
      {
        domainName: props.apiDomainName,
        validation: cdk.aws_certificatemanager.CertificateValidation.fromDns(
          props.hostedZone
        ),
        subjectAlternativeNames: [props.cloudfrontDomainName],
      }
    );

    this.restApi = new cdk.aws_apigateway.LambdaRestApi(this, "RestApi", {
      handler: func,
      proxy: true,
      domainName: {
        certificate: certificate,
        domainName: props.apiDomainName,
      },
      endpointTypes: [cdk.aws_apigateway.EndpointType.REGIONAL],
    });

    new cdk.aws_route53.ARecord(this, "ApiAliasARecord", {
      target: cdk.aws_route53.RecordTarget.fromAlias(
        new cdk.aws_route53_targets.ApiGateway(this.restApi)
      ),
      zone: props.hostedZone,
      recordName: props.apiDomainName,
    });

    new cdk.aws_route53.AaaaRecord(this, "ApiAliasAAAARecord", {
      target: cdk.aws_route53.RecordTarget.fromAlias(
        new cdk.aws_route53_targets.ApiGateway(this.restApi)
      ),
      zone: props.hostedZone,
      recordName: props.apiDomainName,
    });
  }
}
