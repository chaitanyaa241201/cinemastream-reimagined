<img width="3472" height="1623" alt="image" src="https://github.com/user-attachments/assets/e4b05a10-9830-4ffc-ac15-e536e41e1488" />
<div align="center">

# 🎬 CinemaStream Reimagined

### A Production-Grade Hotstar-Style OTT Platform Clone

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Jenkins](https://img.shields.io/badge/Jenkins-CI%2FCD-D24939?style=for-the-badge&logo=jenkins&logoColor=white)](https://www.jenkins.io/)
[![AWS EC2](https://img.shields.io/badge/AWS-EC2-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white)](https://aws.amazon.com/ec2/)
[![Nginx](https://img.shields.io/badge/Nginx-Production-009639?style=for-the-badge&logo=nginx&logoColor=white)](https://nginx.org/)

<br/>

> **A fully automated, cloud-deployed OTT streaming platform clone demonstrating end-to-end DevOps engineering — from source code to a production-serving Nginx instance on AWS EC2 — driven by a Jenkins CI/CD pipeline with zero manual intervention.**

<br/>

![CinemaStream Banner](https://img.shields.io/badge/Status-Live%20on%20AWS-brightgreen?style=flat-square) ![Pipeline](https://img.shields.io/badge/Pipeline-Automated-blue?style=flat-square) ![Deployment](https://img.shields.io/badge/Deployment-Nginx%20%2F%20EC2-orange?style=flat-square)

</div>

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Tech Stack](#-tech-stack)
- [Infrastructure Architecture](#-infrastructure-architecture)
- [CI/CD Pipeline Deep Dive](#-cicd-pipeline-deep-dive)
  - [Stage 1 — Source Checkout](#stage-1--source-checkout)
  - [Stage 2 — GPG Key Management](#stage-2--gpg-key-management)
  - [Stage 3 — Dependency Installation & Build](#stage-3--dependency-installation--build)
  - [Stage 4 — System Library Resolution](#stage-4--system-library-resolution)
  - [Stage 5 — Automated Deployment](#stage-5--automated-deployment)
- [Technical Challenges & Solutions](#-technical-challenges--solutions)
- [Jenkins Configuration](#-jenkins-configuration)
- [Nginx Configuration](#-nginx-configuration)
- [Local Development Setup](#-local-development-setup)
- [Project Structure](#-project-structure)
- [Lessons Learned](#-lessons-learned)

---

## 🎯 Project Overview

**CinemaStream Reimagined** is more than a frontend clone — it is a **proof of concept for production-grade DevOps automation**. The application itself is a high-performance, Hotstar-inspired OTT streaming interface built with a modern React/TypeScript/Vite stack. But the core engineering showcase is the **fully automated Jenkins CI/CD pipeline** that builds, validates, and deploys the application to an **AWS EC2 Ubuntu 24.04** instance with **zero human touchpoints** after a `git push`.

### What This Project Demonstrates

| Domain | Skills Proven |
|--------|--------------|
| **Cloud Engineering** | AWS EC2 provisioning, security group configuration, IAM-aware deployment |
| **CI/CD Automation** | Jenkins declarative pipelines, plugin management, multi-stage orchestration |
| **Linux System Administration** | Ubuntu 24.04 GPG trust chains, `apt` package management, `sudoers` configuration |
| **Web Server Operations** | Nginx static hosting, SPA routing, production hardening |
| **Build Engineering** | Vite production builds, Node.js toolchain management, native library resolution |
| **Security Practices** | NOPASSWD-scoped sudoers, least-privilege service accounts, repository signing verification |

---

## 🛠 Tech Stack

### Application Layer

| Technology | Version | Role |
|------------|---------|------|
| **React** | 18.x | UI Component Framework |
| **TypeScript** | 5.x | Type-safe JavaScript |
| **Vite** | 5.x | Build Tool & Dev Server |
| **Tailwind CSS** | 3.x | Utility-first Styling |

### Infrastructure & DevOps Layer

| Technology | Role |
|------------|------|
| **AWS EC2** | Cloud compute host (Ubuntu 24.04 Noble) |
| **Jenkins** | CI/CD orchestration server |
| **Nginx** | Production web server & reverse proxy |
| **NodeJS Jenkins Plugin** | Managed Node.js toolchain inside pipeline |
| **GitHub** | Source control & pipeline webhook trigger |

---

## 🏗 Infrastructure Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Developer Workstation                    │
│                                                                 │
│    git push ──────────────────────────────────────────────►     │
│                                                                 │
└─────────────────────────────┬───────────────────────────────────┘
                              │  GitHub Webhook
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      AWS EC2 Instance                           │
│                    (Ubuntu 24.04 Noble)                         │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                  Jenkins Server (:8080)                  │   │
│  │                                                         │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌───────┐  │   │
│  │  │ Checkout │─►│  Build   │─►│   Test   │─►│Deploy │  │   │
│  │  │  Stage   │  │  Stage   │  │  Stage   │  │ Stage │  │   │
│  │  └──────────┘  └──────────┘  └──────────┘  └───┬───┘  │   │
│  │                                                 │      │   │
│  └─────────────────────────────────────────────────┼──────┘   │
│                                                    │          │
│                              sudo cp -r /dist/*    │          │
│                                                    ▼          │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │               Nginx Web Server (:80 / :443)              │   │
│  │                                                         │   │
│  │    Document Root: /var/www/html/                        │   │
│  │    SPA Routing: try_files $uri /index.html              │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │  HTTP/HTTPS
                              ▼
                    ┌─────────────────┐
                    │   End Users     │
                    │  (Browsers)     │
                    └─────────────────┘
```

---

## ⚙️ CI/CD Pipeline Deep Dive

The Jenkins pipeline is fully declarative and consists of five engineered stages. Each stage solved a real-world infrastructure problem.

### The Jenkinsfile

```groovy
pipeline {
    agent any

    tools {
        nodejs 'NodeJS-20'
    }

    environment {
        DEPLOY_DIR = '/var/www/html'
        BUILD_OUTPUT = 'dist'
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/chaitanyaa241201/cinemastream-reimagined.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy to Nginx') {
            steps {
                sh '''
                    sudo rm -rf /var/www/html/*
                    sudo cp -r dist/* /var/www/html/
                    sudo chown -R www-data:www-data /var/www/html/
                    sudo chmod -R 755 /var/www/html/
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Deployment successful — CinemaStream is live!'
        }
        failure {
            echo '❌ Pipeline failed. Check logs above.'
        }
    }
}
```

---

### Stage 1 — Source Checkout

**What it does:** Pulls the latest commit from the `main` branch of the GitHub repository directly into the Jenkins workspace (`/var/lib/jenkins/workspace/<job-name>/`).

**Key design decision:** The repository was initially **private** during development. When transitioning to a public repository for CI integration, the Jenkins credential binding was removed and the pipeline was updated to use a plain HTTPS URL. This required clearing any cached credential tokens in Jenkins's credential store to avoid stale authentication failures.

> 💡 **Lesson:** Always audit Jenkins credentials when changing repository visibility. A stale stored credential for a now-public repo can cause confusing 403 errors that look like pipeline misconfiguration.

---

### Stage 2 — GPG Key Management

**Problem:** On **Ubuntu 24.04 Noble**, the `apt` package manager enforces stricter GPG key validation than previous Ubuntu LTS releases. When Jenkins attempted to update system packages or install toolchain dependencies, the following class of error surfaced:

```
W: http://pkg.jenkins.io/debian-stable/: The key B91316F8F7B4CE1F is not signed
   by a trusted key in your keyring.
E: Repository 'http://pkg.jenkins.io/debian-stable binary/' is not signed.
N: Updating from such a repository can't be done securely.
```

**Root Cause:** The legacy `apt-key add` method — which dumps keys into `/etc/apt/trusted.gpg` — is **deprecated** in Ubuntu 22.04+ and fails under stricter keyring enforcement in 24.04 Noble. Keys must now reside in `/etc/apt/trusted.gpg.d/` as standalone `.gpg` or `.asc` files, each scoped to their respective repository.

**Solution — Modern GPG Key Handling:**

```bash
# Step 1: Download the Jenkins signing key
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key \
  | sudo gpg --dearmor -o /usr/share/keyrings/jenkins-keyring.gpg

# Step 2: Reference the keyring in the sources list entry
echo "deb [signed-by=/usr/share/keyrings/jenkins-keyring.gpg] \
  https://pkg.jenkins.io/debian-stable binary/" \
  | sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null

# Step 3: Update and install
sudo apt-get update
sudo apt-get install jenkins -y
```

**Why `--dearmor`?** The downloaded `.key` file is ASCII-armored PEM format. `gpg --dearmor` converts it to binary DER format, which is what `apt` expects in `/usr/share/keyrings/`. Skipping this step causes a silent key import that appears successful but fails during `apt-get update`.

---

### Stage 3 — Dependency Installation & Build

**Tool:** Jenkins **NodeJS Plugin** — manages multiple Node.js versions without polluting the system-level `node` installation.

**Configuration in Jenkins UI:**

```
Manage Jenkins → Global Tool Configuration → NodeJS
  ┌─────────────────────────────────┐
  │  Name:    NodeJS-20             │
  │  Version: NodeJS 20.x LTS       │
  │  Auto-install: ✅               │
  └─────────────────────────────────┘
```

The `tools { nodejs 'NodeJS-20' }` block in the Jenkinsfile injects the correct `node` and `npm` binaries into `PATH` for the duration of the pipeline, without requiring global installation.

**Build Steps:**

```bash
# Stage: Install
npm install
# Installs all dependencies from package-lock.json
# Creates node_modules/ in the Jenkins workspace

# Stage: Build
npm run build
# Invokes Vite's production bundler
# Output: dist/ directory containing optimised static assets
```

**Vite Build Output Structure:**

```
dist/
├── index.html           # Entry point (served by Nginx)
├── assets/
│   ├── index-[hash].js  # Chunked & tree-shaken JS bundle
│   ├── index-[hash].css # Purged & minified Tailwind CSS
│   └── [media files]    # Images, fonts, etc.
```

---

### Stage 4 — System Library Resolution

**Problem:** During initial pipeline runs, Vite's build process terminated with the following native module error:

```
/var/lib/jenkins/tools/jenkins.plugins.nodejs.tools.NodeJSInstallation/
NodeJS-20/bin/node: error while loading shared libraries: 
libatomic.so.1: cannot open shared object file: No such file or directory
```

**Root Cause Analysis:** Node.js binaries distributed by the NodeJS Plugin are pre-compiled and link against `libatomic.so.1` — a GCC runtime atomic operations library. On **Ubuntu 24.04 Noble**, this library ships as part of the `libatomic1` package, which is **not installed by default** on minimal EC2 AMI configurations.

This error is particularly deceptive because it appears to be a Node.js version mismatch but is in fact a missing system-level shared object.

**Diagnosis:**

```bash
# Confirm the missing library
ldd $(which node) | grep atomic
# Output: libatomic.so.1 => not found

# Verify the package exists in apt
apt-cache search libatomic
# Output: libatomic1 - support library providing __atomic built-in functions
```

**Fix — Install the Missing Shared Library:**

```bash
sudo apt-get install -y libatomic1
```

**Verification:**

```bash
ldd $(which node) | grep atomic
# Output: libatomic.so.1 => /lib/x86_64-linux-gnu/libatomic.so.1 (0x...)
```

> 💡 **Key Insight:** Always baseline your EC2 instance with a dependency audit before configuring CI agents. Minimal cloud images deliberately omit development libraries for security and size reasons. The NodeJS Plugin downloads binaries built on full-featured systems — the runtime environment must match.

---

### Stage 5 — Automated Deployment

**Goal:** Copy the Vite `dist/` build output to `/var/www/html/` (Nginx's document root) without any password prompt interrupting the pipeline.

**Challenge:** The Jenkins process runs as the `jenkins` system user, which does not own `/var/www/html/`. Deploying to that directory requires `sudo`. By default, `sudo` prompts for a password — which kills any non-interactive pipeline run.

**Solution — Scoped `sudoers` NOPASSWD Rule:**

The principle of **least privilege** was strictly observed. Rather than granting the `jenkins` user blanket root access, only the specific `cp`, `rm`, `chown`, and `chmod` commands needed for deployment were whitelisted.

```bash
# Edit sudoers safely using visudo
sudo visudo -f /etc/sudoers.d/jenkins-deploy
```

```sudoers
# /etc/sudoers.d/jenkins-deploy
# Grant the jenkins user passwordless sudo ONLY for deployment commands

jenkins ALL=(ALL) NOPASSWD: /bin/rm -rf /var/www/html/*
jenkins ALL=(ALL) NOPASSWD: /bin/cp -r * /var/www/html/
jenkins ALL=(ALL) NOPASSWD: /bin/chown -R www-data\:www-data /var/www/html/
jenkins ALL=(ALL) NOPASSWD: /bin/chmod -R 755 /var/www/html/
```

**Deployment Shell Commands (inside Jenkinsfile):**

```bash
sudo rm -rf /var/www/html/*          # Clear previous deployment
sudo cp -r dist/* /var/www/html/     # Deploy new build artifacts
sudo chown -R www-data:www-data /var/www/html/  # Set Nginx ownership
sudo chmod -R 755 /var/www/html/     # Set read permissions
```

> ⚠️ **Security Note:** The `/etc/sudoers.d/jenkins-deploy` file is owned by `root:root` with permissions `0440`. The commands are pinned to exact binary paths (e.g., `/bin/cp` not just `cp`) to prevent PATH hijacking attacks.

---

## 🔥 Technical Challenges & Solutions

### Challenge 1: Transitioning from Private to Public Repository

**Context:** The repository began as a **private GitHub repo** during active development. When the CI/CD pipeline was introduced, the repository was made **public** to simplify Jenkins integration (avoiding SSH key or PAT management on the server).

**Problems Encountered:**

1. **Stale Jenkins Credentials:** Jenkins had cached a GitHub credential binding (username + token) from when the repo was private. After making the repo public and removing the credential from the Jenkinsfile, Jenkins continued attempting to use the cached token — and GitHub rejected it since the token had been revoked.

   **Fix:** Navigate to `Manage Jenkins → Credentials → (global)` and delete or disable the stale GitHub credential entry.

2. **Workspace Pollution:** The old workspace directory (`/var/lib/jenkins/workspace/<job>/`) contained build artifacts and `node_modules/` from previous private-repo builds. When the checkout stage ran after the repo switch, git detected conflicts between the old working tree and the new remote state.

   **Fix:**
   ```bash
   # Option 1: Wipe workspace from Jenkins UI
   # Dashboard → Job → Workspace → Wipe Out Current Workspace

   # Option 2: Manual cleanup on the server
   sudo rm -rf /var/lib/jenkins/workspace/<job-name>/
   ```

3. **Git `safe.directory` Error:** On Ubuntu 24.04 with newer git versions, Jenkins encountered:
   ```
   fatal: detected dubious ownership in repository at '/var/lib/jenkins/workspace/...'
   ```
   **Fix:** Add the workspace to git's safe directory list for the `jenkins` user:
   ```bash
   sudo -u jenkins git config --global --add safe.directory \
     /var/lib/jenkins/workspace/<job-name>
   ```

---

### Challenge 2: Debugging the Jenkins Workspace

**Symptom:** The pipeline's Deploy stage copied files successfully (exit code 0), but the application returned a blank page when accessed via the EC2 public IP.

**Debugging Process:**

```bash
# Step 1: Verify what actually landed in Nginx's document root
ls -la /var/www/html/
# Found: only index.html — assets/ directory was missing

# Step 2: Inspect the workspace build output
ls -la /var/lib/jenkins/workspace/<job>/dist/
# Found: dist/ existed and was complete (index.html + assets/)

# Step 3: Traced the cp command
# Bug: sudo cp -r dist /var/www/html/  ← copies dist as a subdirectory
# Fix: sudo cp -r dist/* /var/www/html/ ← copies dist CONTENTS
```

**Root Cause:** A single missing `*` wildcard. `cp -r dist /var/www/html/` creates `/var/www/html/dist/index.html` rather than `/var/www/html/index.html`. Nginx's root directive pointed to `/var/www/html/`, so it served a 404 for all assets.

**Second Symptom:** After fixing the copy command, client-side routing (React Router) returned 404 on page refresh for any route other than `/`.

**Fix — Nginx SPA Configuration:** (See Nginx Configuration section below.)

---

## 🔧 Jenkins Configuration

### Prerequisites on the EC2 Instance

```bash
# 1. Java (Jenkins dependency)
sudo apt-get install -y openjdk-17-jdk

# 2. Jenkins (using modern GPG method — see Stage 2 above)
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key \
  | sudo gpg --dearmor -o /usr/share/keyrings/jenkins-keyring.gpg

echo "deb [signed-by=/usr/share/keyrings/jenkins-keyring.gpg] \
  https://pkg.jenkins.io/debian-stable binary/" \
  | sudo tee /etc/apt/sources.list.d/jenkins.list

sudo apt-get update && sudo apt-get install -y jenkins

# 3. Missing system library
sudo apt-get install -y libatomic1

# 4. Start Jenkins
sudo systemctl enable jenkins
sudo systemctl start jenkins

# 5. Get initial admin password
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

### Required Jenkins Plugins

| Plugin | Purpose |
|--------|---------|
| `NodeJS Plugin` | Managed Node.js toolchain injection |
| `Git Plugin` | Source checkout from GitHub |
| `Pipeline` | Declarative pipeline support |
| `Credentials Binding Plugin` | Secure credential management |

### NodeJS Plugin Configuration

```
Manage Jenkins → Global Tool Configuration → NodeJS Installations
  Name:           NodeJS-20
  Install from:   nodejs.org
  Version:        NodeJS 20.x.x LTS
  Auto-install:   ✅ Enabled
```

---

## 🌐 Nginx Configuration

```nginx
# /etc/nginx/sites-available/cinemastream

server {
    listen 80;
    server_name _;  # Replace with your domain or EC2 public IP

    root /var/www/html;
    index index.html;

    # SPA routing — redirect all 404s to index.html
    # This allows React Router to handle client-side navigation
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets aggressively
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Gzip compression for text assets
    gzip on;
    gzip_types text/html text/css application/javascript application/json;
    gzip_min_length 1024;
}
```

```bash
# Enable the site and reload Nginx
sudo ln -s /etc/nginx/sites-available/cinemastream /etc/nginx/sites-enabled/
sudo nginx -t          # Validate configuration
sudo systemctl reload nginx
```

> **Critical Detail — `try_files $uri /index.html`:** Without this directive, React Router's client-side routes (e.g., `/movies`, `/series/123`) return HTTP 404 because Nginx looks for matching static files on disk. The `try_files` directive falls back to serving `index.html` for any path that doesn't correspond to a real file, allowing the JavaScript bundle to handle routing.

---

## 💻 Local Development Setup

```bash
# 1. Clone the repository
git clone https://github.com/chaitanyaa241201/cinemastream-reimagined.git
cd cinemastream-reimagined

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
# → Local: http://localhost:5173

# 4. Production build (local preview)
npm run build
npm run preview
# → Preview: http://localhost:4173
```

### Prerequisites

- **Node.js** ≥ 18.x (LTS recommended)
- **npm** ≥ 9.x

---

## 📁 Project Structure

```
cinemastream-reimagined/
├── public/                    # Static assets (favicons, manifests)
├── src/
│   ├── components/            # Reusable React components
│   │   ├── HeroSection/
│   │   ├── ContentCarousel/
│   │   ├── Navbar/
│   │   └── ...
│   ├── pages/                 # Route-level page components
│   ├── hooks/                 # Custom React hooks
│   ├── types/                 # TypeScript type definitions
│   ├── utils/                 # Utility functions
│   ├── App.tsx                # Root component & router setup
│   └── main.tsx               # Application entry point
├── dist/                      # Vite build output (gitignored)
├── Jenkinsfile                # CI/CD pipeline definition
├── vite.config.ts             # Vite configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript compiler options
└── package.json               # Dependencies & npm scripts
```

---

## 📚 Lessons Learned

| Area | Insight |
|------|---------|
| **Ubuntu 24.04 GPG** | `apt-key add` is deprecated. Always use `gpg --dearmor` + `signed-by=` for modern Ubuntu. |
| **EC2 Minimal Images** | Never assume shared libraries exist. Audit with `ldd` before running native binaries in CI. |
| **sudoers Security** | NOPASSWD rules must be command-specific, not user-wide. Scope to exact binary paths. |
| **Nginx SPA Routing** | `try_files $uri /index.html` is non-optional for any React Router application. |
| **Jenkins Workspaces** | Always wipe workspaces when switching repos or branches to avoid state contamination. |
| **`cp` Semantics** | `cp -r src/ dst/` vs `cp -r src/* dst/` produce fundamentally different directory structures. |

---

## 🙏 Author

**Chaitanya** — Cloud & DevOps Engineer

[![GitHub](https://img.shields.io/badge/GitHub-chaitanyaa241201-181717?style=flat-square&logo=github)](https://github.com/chaitanyaa241201)

---

<div align="center">

*Built with ☁️ AWS · 🔁 Jenkins · 🌐 Nginx · ⚛️ React · ⚡ Vite*

</div>
