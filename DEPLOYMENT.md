# VPS Deployment Guide

## Quick Start (5 minutes)

### Prerequisites
- VPS with Docker & Docker Compose installed
- SSH access to your VPS

### Deployment Steps

1. **SSH into your VPS**
   ```bash
   ssh root@your-vps-ip
   ```

2. **Clone the repository**
   ```bash
   git clone https://github.com/parmindersarao/Khushaalf-Po.git
   cd Khushaalf-Po
   ```

3. **Deploy with Docker Compose**
   ```bash
   docker-compose up -d
   ```

4. **Access your application**
   ```
   http://your-vps-ip:3000
   ```

### View Logs
```bash
docker-compose logs -f
```

### Stop Application
```bash
docker-compose down
```

### Update Application
```bash
git pull origin main
docker-compose up -d --build
```

---

## Troubleshooting

**Port already in use?**
```bash
docker-compose down
docker-compose up -d
```

**Need to rebuild?**
```bash
docker-compose up -d --build
```

**Check container status:**
```bash
docker ps
docker logs khushaalf-po
```
