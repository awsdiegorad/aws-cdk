"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_autoscaling_1 = require("aws-cdk-lib/aws-autoscaling");
const aws_ec2_1 = require("aws-cdk-lib/aws-ec2");
const aws_ecs_1 = require("aws-cdk-lib/aws-ecs");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const integ = require("@aws-cdk/integ-tests-alpha");
const aws_ecs_patterns_1 = require("aws-cdk-lib/aws-ecs-patterns");
const app = new aws_cdk_lib_1.App();
const stack = new aws_cdk_lib_1.Stack(app, 'aws-ecs-integ-alb');
const vpc = new aws_ec2_1.Vpc(stack, 'Vpc', { maxAzs: 2 });
const cluster = new aws_ecs_1.Cluster(stack, 'Cluster', { vpc });
const provider1 = new aws_ecs_1.AsgCapacityProvider(stack, 'FirstCapacityProvier', {
    autoScalingGroup: new aws_autoscaling_1.AutoScalingGroup(stack, 'FirstAutoScalingGroup', {
        vpc,
        instanceType: new aws_ec2_1.InstanceType('t2.micro'),
        machineImage: aws_ecs_1.EcsOptimizedImage.amazonLinux2(),
    }),
    capacityProviderName: 'first-capacity-provider',
});
cluster.addAsgCapacityProvider(provider1);
const provider2 = new aws_ecs_1.AsgCapacityProvider(stack, 'SecondCapacityProvier', {
    autoScalingGroup: new aws_autoscaling_1.AutoScalingGroup(stack, 'SecondAutoScalingGroup', {
        vpc,
        instanceType: new aws_ec2_1.InstanceType('t3.micro'),
        machineImage: aws_ecs_1.EcsOptimizedImage.amazonLinux2(),
    }),
    capacityProviderName: 'second-capacity-provider',
});
cluster.addAsgCapacityProvider(provider2);
// one service with multi capacity provider strategies
new aws_ecs_patterns_1.ApplicationLoadBalancedEc2Service(stack, 'myService', {
    cluster,
    memoryLimitMiB: 256,
    taskImageOptions: {
        image: aws_ecs_1.ContainerImage.fromRegistry('amazon/amazon-ecs-sample'),
    },
    capacityProviderStrategies: [
        {
            capacityProvider: provider1.capacityProviderName,
            base: 1,
            weight: 1,
        },
        {
            capacityProvider: provider2.capacityProviderName,
            base: 0,
            weight: 2,
        },
    ],
});
new integ.IntegTest(app, 'applicationLoadBalancedEc2ServiceTest', {
    testCases: [stack],
});
app.synth();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZWcuYXBwbGljYXRpb24tbG9hZC1iYWxhbmNlZC1lY3Mtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImludGVnLmFwcGxpY2F0aW9uLWxvYWQtYmFsYW5jZWQtZWNzLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpRUFBK0Q7QUFDL0QsaURBQXdEO0FBQ3hELGlEQUFzRztBQUN0Ryw2Q0FBeUM7QUFDekMsb0RBQW9EO0FBQ3BELG1FQUFpRjtBQUVqRixNQUFNLEdBQUcsR0FBRyxJQUFJLGlCQUFHLEVBQUUsQ0FBQztBQUN0QixNQUFNLEtBQUssR0FBRyxJQUFJLG1CQUFLLENBQUMsR0FBRyxFQUFFLG1CQUFtQixDQUFDLENBQUM7QUFDbEQsTUFBTSxHQUFHLEdBQUcsSUFBSSxhQUFHLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ2pELE1BQU0sT0FBTyxHQUFHLElBQUksaUJBQU8sQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztBQUN2RCxNQUFNLFNBQVMsR0FBRyxJQUFJLDZCQUFtQixDQUFDLEtBQUssRUFBRSxzQkFBc0IsRUFBRTtJQUN2RSxnQkFBZ0IsRUFBRSxJQUFJLGtDQUFnQixDQUFDLEtBQUssRUFBRSx1QkFBdUIsRUFBRTtRQUNyRSxHQUFHO1FBQ0gsWUFBWSxFQUFFLElBQUksc0JBQVksQ0FBQyxVQUFVLENBQUM7UUFDMUMsWUFBWSxFQUFFLDJCQUFpQixDQUFDLFlBQVksRUFBRTtLQUMvQyxDQUFDO0lBQ0Ysb0JBQW9CLEVBQUUseUJBQXlCO0NBQ2hELENBQUMsQ0FBQztBQUNILE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUMxQyxNQUFNLFNBQVMsR0FBRyxJQUFJLDZCQUFtQixDQUFDLEtBQUssRUFBRSx1QkFBdUIsRUFBRTtJQUN4RSxnQkFBZ0IsRUFBRSxJQUFJLGtDQUFnQixDQUFDLEtBQUssRUFBRSx3QkFBd0IsRUFBRTtRQUN0RSxHQUFHO1FBQ0gsWUFBWSxFQUFFLElBQUksc0JBQVksQ0FBQyxVQUFVLENBQUM7UUFDMUMsWUFBWSxFQUFFLDJCQUFpQixDQUFDLFlBQVksRUFBRTtLQUMvQyxDQUFDO0lBQ0Ysb0JBQW9CLEVBQUUsMEJBQTBCO0NBQ2pELENBQUMsQ0FBQztBQUNILE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUUxQyxzREFBc0Q7QUFDdEQsSUFBSSxvREFBaUMsQ0FBQyxLQUFLLEVBQUUsV0FBVyxFQUFFO0lBQ3hELE9BQU87SUFDUCxjQUFjLEVBQUUsR0FBRztJQUNuQixnQkFBZ0IsRUFBRTtRQUNoQixLQUFLLEVBQUUsd0JBQWMsQ0FBQyxZQUFZLENBQUMsMEJBQTBCLENBQUM7S0FDL0Q7SUFDRCwwQkFBMEIsRUFBRTtRQUMxQjtZQUNFLGdCQUFnQixFQUFFLFNBQVMsQ0FBQyxvQkFBb0I7WUFDaEQsSUFBSSxFQUFFLENBQUM7WUFDUCxNQUFNLEVBQUUsQ0FBQztTQUNWO1FBQ0Q7WUFDRSxnQkFBZ0IsRUFBRSxTQUFTLENBQUMsb0JBQW9CO1lBQ2hELElBQUksRUFBRSxDQUFDO1lBQ1AsTUFBTSxFQUFFLENBQUM7U0FDVjtLQUNGO0NBQ0YsQ0FBQyxDQUFDO0FBRUgsSUFBSSxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSx1Q0FBdUMsRUFBRTtJQUNoRSxTQUFTLEVBQUUsQ0FBQyxLQUFLLENBQUM7Q0FDbkIsQ0FBQyxDQUFDO0FBRUgsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXV0b1NjYWxpbmdHcm91cCB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1hdXRvc2NhbGluZyc7XG5pbXBvcnQgeyBJbnN0YW5jZVR5cGUsIFZwYyB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1lYzInO1xuaW1wb3J0IHsgQ2x1c3RlciwgQ29udGFpbmVySW1hZ2UsIEFzZ0NhcGFjaXR5UHJvdmlkZXIsIEVjc09wdGltaXplZEltYWdlIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWVjcyc7XG5pbXBvcnQgeyBBcHAsIFN0YWNrIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0ICogYXMgaW50ZWcgZnJvbSAnQGF3cy1jZGsvaW50ZWctdGVzdHMtYWxwaGEnO1xuaW1wb3J0IHsgQXBwbGljYXRpb25Mb2FkQmFsYW5jZWRFYzJTZXJ2aWNlIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWVjcy1wYXR0ZXJucyc7XG5cbmNvbnN0IGFwcCA9IG5ldyBBcHAoKTtcbmNvbnN0IHN0YWNrID0gbmV3IFN0YWNrKGFwcCwgJ2F3cy1lY3MtaW50ZWctYWxiJyk7XG5jb25zdCB2cGMgPSBuZXcgVnBjKHN0YWNrLCAnVnBjJywgeyBtYXhBenM6IDIgfSk7XG5jb25zdCBjbHVzdGVyID0gbmV3IENsdXN0ZXIoc3RhY2ssICdDbHVzdGVyJywgeyB2cGMgfSk7XG5jb25zdCBwcm92aWRlcjEgPSBuZXcgQXNnQ2FwYWNpdHlQcm92aWRlcihzdGFjaywgJ0ZpcnN0Q2FwYWNpdHlQcm92aWVyJywge1xuICBhdXRvU2NhbGluZ0dyb3VwOiBuZXcgQXV0b1NjYWxpbmdHcm91cChzdGFjaywgJ0ZpcnN0QXV0b1NjYWxpbmdHcm91cCcsIHtcbiAgICB2cGMsXG4gICAgaW5zdGFuY2VUeXBlOiBuZXcgSW5zdGFuY2VUeXBlKCd0Mi5taWNybycpLFxuICAgIG1hY2hpbmVJbWFnZTogRWNzT3B0aW1pemVkSW1hZ2UuYW1hem9uTGludXgyKCksXG4gIH0pLFxuICBjYXBhY2l0eVByb3ZpZGVyTmFtZTogJ2ZpcnN0LWNhcGFjaXR5LXByb3ZpZGVyJyxcbn0pO1xuY2x1c3Rlci5hZGRBc2dDYXBhY2l0eVByb3ZpZGVyKHByb3ZpZGVyMSk7XG5jb25zdCBwcm92aWRlcjIgPSBuZXcgQXNnQ2FwYWNpdHlQcm92aWRlcihzdGFjaywgJ1NlY29uZENhcGFjaXR5UHJvdmllcicsIHtcbiAgYXV0b1NjYWxpbmdHcm91cDogbmV3IEF1dG9TY2FsaW5nR3JvdXAoc3RhY2ssICdTZWNvbmRBdXRvU2NhbGluZ0dyb3VwJywge1xuICAgIHZwYyxcbiAgICBpbnN0YW5jZVR5cGU6IG5ldyBJbnN0YW5jZVR5cGUoJ3QzLm1pY3JvJyksXG4gICAgbWFjaGluZUltYWdlOiBFY3NPcHRpbWl6ZWRJbWFnZS5hbWF6b25MaW51eDIoKSxcbiAgfSksXG4gIGNhcGFjaXR5UHJvdmlkZXJOYW1lOiAnc2Vjb25kLWNhcGFjaXR5LXByb3ZpZGVyJyxcbn0pO1xuY2x1c3Rlci5hZGRBc2dDYXBhY2l0eVByb3ZpZGVyKHByb3ZpZGVyMik7XG5cbi8vIG9uZSBzZXJ2aWNlIHdpdGggbXVsdGkgY2FwYWNpdHkgcHJvdmlkZXIgc3RyYXRlZ2llc1xubmV3IEFwcGxpY2F0aW9uTG9hZEJhbGFuY2VkRWMyU2VydmljZShzdGFjaywgJ215U2VydmljZScsIHtcbiAgY2x1c3RlcixcbiAgbWVtb3J5TGltaXRNaUI6IDI1NixcbiAgdGFza0ltYWdlT3B0aW9uczoge1xuICAgIGltYWdlOiBDb250YWluZXJJbWFnZS5mcm9tUmVnaXN0cnkoJ2FtYXpvbi9hbWF6b24tZWNzLXNhbXBsZScpLFxuICB9LFxuICBjYXBhY2l0eVByb3ZpZGVyU3RyYXRlZ2llczogW1xuICAgIHtcbiAgICAgIGNhcGFjaXR5UHJvdmlkZXI6IHByb3ZpZGVyMS5jYXBhY2l0eVByb3ZpZGVyTmFtZSxcbiAgICAgIGJhc2U6IDEsXG4gICAgICB3ZWlnaHQ6IDEsXG4gICAgfSxcbiAgICB7XG4gICAgICBjYXBhY2l0eVByb3ZpZGVyOiBwcm92aWRlcjIuY2FwYWNpdHlQcm92aWRlck5hbWUsXG4gICAgICBiYXNlOiAwLFxuICAgICAgd2VpZ2h0OiAyLFxuICAgIH0sXG4gIF0sXG59KTtcblxubmV3IGludGVnLkludGVnVGVzdChhcHAsICdhcHBsaWNhdGlvbkxvYWRCYWxhbmNlZEVjMlNlcnZpY2VUZXN0Jywge1xuICB0ZXN0Q2FzZXM6IFtzdGFja10sXG59KTtcblxuYXBwLnN5bnRoKCk7XG4iXX0=