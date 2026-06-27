output "ec2_public_ip" {
  description = "Public IP of the CloudShop EC2 instance"
  value       = aws_instance.cloudshop_ec2.public_ip
}