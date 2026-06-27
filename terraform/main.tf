provider "aws" {
  region = "ap-south-1"
}

resource "aws_security_group" "cloudshop_sg" {
  name        = "cloudshop-sg"
  description = "Allow web and API traffic"

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "cloudshop_ec2" {
  ami           = "ami-0bc7aabcf58d1e02a"
  instance_type = "t3.micro"
  key_name      = "cloudshop-key"
  security_groups = [aws_security_group.cloudshop_sg.name]

  user_data = <<-EOF
              #!/bin/bash
              sudo yum update -y
              sudo amazon-linux-extras install docker -y
              sudo service docker start
              EOF
}

output "cloudshop_ip" {
  value = aws_instance.cloudshop_ec2.public_ip
}
