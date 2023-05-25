import { Construct } from "constructs";
import * as cdk from "aws-cdk-lib";

export class FrontendApp extends Construct {
  public readonly frontendAppBucket: cdk.aws_s3.Bucket;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.frontendAppBucket = new cdk.aws_s3.Bucket(this, "Bucket");

    const bundle = cdk.aws_s3_deployment.Source.asset("../frontend", {
      bundling: {
        image: cdk.DockerImage.fromBuild("../frontend/", {
          targetStage: "builder",
          platform: "linux/amd64",
        }),
        command: ["bash", "-c", "cp -r /frontend/build/* /asset-output/"],
      },
    });

    new cdk.aws_s3_deployment.BucketDeployment(this, "DeployWebsite", {
      sources: [bundle],
      destinationBucket: this.frontendAppBucket,
    });
  }
}
