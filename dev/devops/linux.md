# Linux

Essential commands to check system status and work efficiently.

## Basic Commands

- pwd
- ls
- mkdir <folder_name>
- touch <file_name>
- mv <src> <dest>
- cat <file_name>

## Must Know Commands

### System & Resource Monitoring

- free -h : memory usage
- top / htop: realtime CPU Process
- df -h: disk usage
- uptime: system load

### Process & Service Management

- ps aux: list processes
- kill <pid>
- systemctl status <service>
- systemctl restart <service>
- journalctl -u <service>

### Networking

- ifconfig / ip a: network interface
- ping <host>
- curl <url>
- netstat -tulpn: listening ports

### File & Directory

- cp <src> <dest>
- rm <file> / rm -r <dir>: remove
- nano <file> / vim <file> : edit files
- chmod / chown: permission & ownership

### Package Management

- sudo apt update
- sudo apt updgrade -y
- sudo apt install <package>
