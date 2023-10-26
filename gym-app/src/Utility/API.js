//export const api_url = "http://localhost:8080"
export const api_url = process.env.NODE_ENV !== "development" ? "https://ec2-13-48-98-104.eu-north-1.compute.amazonaws.com:8080" : "https://localhost:8080"

console.log(process.env.NODE_ENV);
//service httpd status || start
//sudo su
//sudo systemctl is-enabled httpd
//sudo systemctl start httpd && sudo systemctl enable httpd
//sudo systemctl start httpd && sudo systemctl enable httpd
//sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/pki/tls/private/apache-selfsigned.key -out /etc/pki/tls/certs/apache-selfsigned.crt
//https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/SSL-on-amazon-linux-2023.html#ssl_enable