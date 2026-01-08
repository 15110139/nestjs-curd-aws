# GitHub CI/CD Deployment Guide

This guide will help you deploy the CI workflow to GitHub.

## Prerequisites

1. A GitHub account
2. Git installed on your local machine
3. The repository initialized (or existing GitHub repository)

## Step 1: Initialize Git Repository (if not already done)

If this is a new repository, initialize it:

```bash
cd nestjs-curd-aws
git init
```

## Step 2: Add All Files to Git

Make sure all necessary files are staged:

```bash
# Add all files (including .github/workflows/ci.yml)
git add .

# Verify the workflow file is included
git status
```

You should see `.github/workflows/ci.yml` in the staged files.

## Step 3: Create Initial Commit

```bash
git commit -m "feat: add CI/CD pipeline with GitHub Actions"
```

## Step 4: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Fill in the repository details:
   - **Repository name**: `nestjs-curd-aws` (or your preferred name)
   - **Description**: (optional)
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click **"Create repository"**

## Step 5: Connect Local Repository to GitHub

GitHub will show you commands. Use the ones for "push an existing repository":

```bash
# Add the remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/nestjs-curd-aws.git

# Or if using SSH:
# git remote add origin git@github.com:YOUR_USERNAME/nestjs-curd-aws.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 6: Enable GitHub Container Registry (for Docker builds)

The CI workflow builds and pushes Docker images to GitHub Container Registry. You need to enable it:

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Scroll down to **"Packages"** section
4. Ensure **"GitHub Packages"** is enabled (usually enabled by default)

## Step 7: Verify Workflow is Running

1. Go to your repository on GitHub
2. Click the **"Actions"** tab (top menu)
3. You should see the **"CI"** workflow listed
4. If you just pushed, the workflow should start automatically
5. Click on the workflow run to see the progress

## Step 8: Install Dependencies (Important!)

Before the CI can run successfully, you need to install the new dependency:

```bash
# Install @nestjs/terminus for the health endpoint
npm install
```

Then commit and push:

```bash
git add package.json package-lock.json
git commit -m "chore: add @nestjs/terminus dependency for health endpoint"
git push
```

## Workflow Triggers

The CI workflow will automatically run on:

- **Push** to `main` or `develop` branches
- **Pull requests** targeting `main` or `develop` branches

## Viewing Workflow Results

1. Go to **Actions** tab in your GitHub repository
2. Click on a workflow run to see:
   - Job status (lint-and-test, build, security-scan, docker-build)
   - Logs for each step
   - Artifacts (build outputs)
   - Test coverage reports

## Docker Image Access

After a successful build, your Docker image will be available at:

```
ghcr.io/YOUR_USERNAME/nestjs-curd-aws:latest
ghcr.io/YOUR_USERNAME/nestjs-curd-aws:main
ghcr.io/YOUR_USERNAME/nestjs-curd-aws:main-<commit-sha>
```

To pull the image:

```bash
# Login to GitHub Container Registry
echo $GITHUB_TOKEN | docker login ghcr.io -u YOUR_USERNAME --password-stdin

# Pull the image
docker pull ghcr.io/YOUR_USERNAME/nestjs-curd-aws:latest
```

## Troubleshooting

### Workflow not appearing in Actions tab

- Ensure `.github/workflows/ci.yml` is committed and pushed
- Check that the file is in the correct location: `.github/workflows/ci.yml`
- Verify the YAML syntax is correct

### Docker build fails

- Ensure GitHub Container Registry is enabled in repository settings
- Check that `GITHUB_TOKEN` has proper permissions (usually automatic)
- Verify Dockerfile is present and correct

### Tests failing

- Run tests locally first: `npm test`
- Check that all dependencies are installed: `npm install`
- Review test logs in the Actions tab

### Linting errors

- Run linter locally: `npm run lint`
- Fix any issues and push again

## Next Steps

1. **Set up branch protection rules** (recommended):
   - Go to Settings → Branches
   - Add rule for `main` branch
   - Require status checks to pass before merging

2. **Add environment secrets** (if needed):
   - Go to Settings → Secrets and variables → Actions
   - Add any required secrets (database URLs, API keys, etc.)

3. **Configure notifications**:
   - Go to Settings → Notifications
   - Enable email notifications for workflow failures
