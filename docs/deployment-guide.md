# 部署指南

> 目标：将个人博客部署到阿里云服务器，使用 PM2 管理进程、Nginx 反向代理、Let's Encrypt 提供 HTTPS。

---

## 一、服务器初始化（首次）

### 1. 连接服务器

```bash
ssh root@你的服务器IP
```

### 2. 安装 Node.js（使用 nvm）

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20
node -v  # 应显示 v20.x.x
```

### 3. 安装 PM2

```bash
npm install -g pm2
```

### 4. 安装 Nginx

```bash
apt update
apt install -y nginx
```

### 5. 安装 Certbot（用于 HTTPS）

```bash
apt install -y certbot python3-certbot-nginx
```

---

## 二、首次部署

### 1. 克隆仓库

```bash
cd /var/www
git clone https://github.com/你的用户名/personal-blog.git
cd personal-blog
```

> **注意**：仓库是私有的，需要在 GitHub 生成 Personal Access Token 或配置 SSH Key。
> 推荐方式：在服务器上生成 SSH Key，然后添加到 GitHub Settings → SSH Keys。
>
> ```bash
> ssh-keygen -t ed25519 -C "server"
> cat ~/.ssh/id_ed25519.pub  # 复制这个内容，粘贴到 GitHub SSH Keys
> ```

### 2. 安装依赖并构建

```bash
npm install
npm run build
```

### 3. 用 PM2 启动

```bash
pm2 start npm --name "personal-blog" -- start
pm2 save          # 保存进程列表，服务器重启后自动恢复
pm2 startup       # 生成开机自启命令（按提示执行）
```

### 4. 配置 Nginx

创建配置文件：

```bash
nano /etc/nginx/sites-available/blog
```

写入以下内容（替换 `你的域名`）：

```nginx
server {
    listen 80;
    server_name 你的域名;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

启用配置：

```bash
ln -s /etc/nginx/sites-available/blog /etc/nginx/sites-enabled/
nginx -t          # 检查配置语法
systemctl reload nginx
```

### 5. 申请 HTTPS 证书

```bash
certbot --nginx -d 你的域名
```

> Certbot 会自动修改 Nginx 配置，添加 443 端口和证书路径。
> 证书有效期 90 天，Certbot 会自动续期。

---

## 三、更新文章（日常操作）

在本地写好文章后：

### 本地操作

```bash
# 在 src/content/posts/ 目录下新建 .md 文件
# 文件名即为文章 URL（如 my-article.md → /blog/my-article）
# 必须包含 frontmatter：
```

```md
---
title: 文章标题
date: 2025-01-15
category: ai-exploration   # 可选值：life-thoughts / ai-exploration / photography / language-culture
excerpt: 文章简介，显示在列表页。
---

正文内容...
```

```bash
git add src/content/posts/你的文章.md
git commit -m "post: 文章标题"
git push
```

### 服务器操作

```bash
ssh root@你的服务器IP
cd /var/www/personal-blog
git pull
npm run build
pm2 restart personal-blog
```

---

## 四、常用 PM2 命令

| 命令 | 说明 |
|------|------|
| `pm2 list` | 查看所有进程状态 |
| `pm2 logs personal-blog` | 查看日志 |
| `pm2 restart personal-blog` | 重启 |
| `pm2 stop personal-blog` | 停止 |
| `pm2 monit` | 实时监控（CPU/内存） |

---

## 五、故障排查

**网站无法访问？**
```bash
pm2 logs personal-blog   # 查看 Next.js 错误
systemctl status nginx   # 查看 Nginx 状态
```

**构建失败？**
```bash
npm run build  # 在服务器上重新运行，看错误信息
```

**证书过期？**
```bash
certbot renew            # 手动续期
certbot renew --dry-run  # 测试续期（不实际执行）
```

---

## 六、文章的分类值对照表

| 分类 | category 值 |
|------|------------|
| 生活思考 | `life-thoughts` |
| AI 探索 | `ai-exploration` |
| 摄影 | `photography` |
| 语言与文化 | `language-culture` |
