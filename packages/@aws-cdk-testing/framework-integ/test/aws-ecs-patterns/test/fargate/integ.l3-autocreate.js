"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ecs = require("aws-cdk-lib/aws-ecs");
const cdk = require("aws-cdk-lib");
const integ = require("@aws-cdk/integ-tests-alpha");
const ecsPatterns = require("aws-cdk-lib/aws-ecs-patterns");
const app = new cdk.App();
const stack = new cdk.Stack(app, 'aws-ecs-integ-l3-autocreate');
// No VPC or Cluster specified
// Create ALB service
new ecsPatterns.ApplicationLoadBalancedFargateService(stack, 'ALBFargateService', {
    memoryLimitMiB: 1024,
    cpu: 512,
    taskImageOptions: {
        image: ecs.ContainerImage.fromRegistry('amazon/amazon-ecs-sample'),
    },
});
// Create NLB service
new ecsPatterns.NetworkLoadBalancedFargateService(stack, 'NLBFargateService', {
    memoryLimitMiB: 1024,
    cpu: 512,
    taskImageOptions: {
        image: ecs.ContainerImage.fromRegistry('amazon/amazon-ecs-sample'),
    },
});
new integ.IntegTest(app, 'autoCreateNlbFargateTest', {
    testCases: [stack],
});
app.synth();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZWcubDMtYXV0b2NyZWF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImludGVnLmwzLWF1dG9jcmVhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQ0FBMkM7QUFDM0MsbUNBQW1DO0FBQ25DLG9EQUFvRDtBQUNwRCw0REFBNEQ7QUFFNUQsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDMUIsTUFBTSxLQUFLLEdBQUcsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSw2QkFBNkIsQ0FBQyxDQUFDO0FBRWhFLDhCQUE4QjtBQUU5QixxQkFBcUI7QUFDckIsSUFBSSxXQUFXLENBQUMscUNBQXFDLENBQUMsS0FBSyxFQUFFLG1CQUFtQixFQUFFO0lBQ2hGLGNBQWMsRUFBRSxJQUFJO0lBQ3BCLEdBQUcsRUFBRSxHQUFHO0lBQ1IsZ0JBQWdCLEVBQUU7UUFDaEIsS0FBSyxFQUFFLEdBQUcsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLDBCQUEwQixDQUFDO0tBQ25FO0NBQ0YsQ0FBQyxDQUFDO0FBRUgscUJBQXFCO0FBQ3JCLElBQUksV0FBVyxDQUFDLGlDQUFpQyxDQUFDLEtBQUssRUFBRSxtQkFBbUIsRUFBRTtJQUM1RSxjQUFjLEVBQUUsSUFBSTtJQUNwQixHQUFHLEVBQUUsR0FBRztJQUNSLGdCQUFnQixFQUFFO1FBQ2hCLEtBQUssRUFBRSxHQUFHLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQywwQkFBMEIsQ0FBQztLQUNuRTtDQUNGLENBQUMsQ0FBQztBQUVILElBQUksS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsMEJBQTBCLEVBQUU7SUFDbkQsU0FBUyxFQUFFLENBQUMsS0FBSyxDQUFDO0NBQ25CLENBQUMsQ0FBQztBQUVILEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGVjcyBmcm9tICdhd3MtY2RrLWxpYi9hd3MtZWNzJztcbmltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgKiBhcyBpbnRlZyBmcm9tICdAYXdzLWNkay9pbnRlZy10ZXN0cy1hbHBoYSc7XG5pbXBvcnQgKiBhcyBlY3NQYXR0ZXJucyBmcm9tICdhd3MtY2RrLWxpYi9hd3MtZWNzLXBhdHRlcm5zJztcblxuY29uc3QgYXBwID0gbmV3IGNkay5BcHAoKTtcbmNvbnN0IHN0YWNrID0gbmV3IGNkay5TdGFjayhhcHAsICdhd3MtZWNzLWludGVnLWwzLWF1dG9jcmVhdGUnKTtcblxuLy8gTm8gVlBDIG9yIENsdXN0ZXIgc3BlY2lmaWVkXG5cbi8vIENyZWF0ZSBBTEIgc2VydmljZVxubmV3IGVjc1BhdHRlcm5zLkFwcGxpY2F0aW9uTG9hZEJhbGFuY2VkRmFyZ2F0ZVNlcnZpY2Uoc3RhY2ssICdBTEJGYXJnYXRlU2VydmljZScsIHtcbiAgbWVtb3J5TGltaXRNaUI6IDEwMjQsXG4gIGNwdTogNTEyLFxuICB0YXNrSW1hZ2VPcHRpb25zOiB7XG4gICAgaW1hZ2U6IGVjcy5Db250YWluZXJJbWFnZS5mcm9tUmVnaXN0cnkoJ2FtYXpvbi9hbWF6b24tZWNzLXNhbXBsZScpLFxuICB9LFxufSk7XG5cbi8vIENyZWF0ZSBOTEIgc2VydmljZVxubmV3IGVjc1BhdHRlcm5zLk5ldHdvcmtMb2FkQmFsYW5jZWRGYXJnYXRlU2VydmljZShzdGFjaywgJ05MQkZhcmdhdGVTZXJ2aWNlJywge1xuICBtZW1vcnlMaW1pdE1pQjogMTAyNCxcbiAgY3B1OiA1MTIsXG4gIHRhc2tJbWFnZU9wdGlvbnM6IHtcbiAgICBpbWFnZTogZWNzLkNvbnRhaW5lckltYWdlLmZyb21SZWdpc3RyeSgnYW1hem9uL2FtYXpvbi1lY3Mtc2FtcGxlJyksXG4gIH0sXG59KTtcblxubmV3IGludGVnLkludGVnVGVzdChhcHAsICdhdXRvQ3JlYXRlTmxiRmFyZ2F0ZVRlc3QnLCB7XG4gIHRlc3RDYXNlczogW3N0YWNrXSxcbn0pO1xuXG5hcHAuc3ludGgoKTtcbiJdfQ==