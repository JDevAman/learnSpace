# 📦 Monorepo Quick Guide: Nx + pnpm + Docker

## 🤔 Why Monorepos?

**Problems they solve:**
- Dependency hell across multiple repos
- Code duplication and inconsistent tooling
- Complex cross-service coordination
- Difficult integration testing

**Benefits:**
- Single source of truth with atomic commits
- Shared dependencies and consistent tooling
- Easy refactoring across entire codebase
- Simplified CI/CD with smart builds

---

## 🧱 Structure

```
my-monorepo/
├── apps/           # Deployable applications
│   ├── devAman/    # Node 18 portfolio
│   └── kinzokupe/  # Python 3.11 app
├── libs/           # Shared libraries
│   ├── ui/         # React components
│   ├── shared/     # Common utilities
│   └── auth/       # Authentication
├── tools/          # Custom tooling
├── .nvmrc          # Node version
├── docker-compose.yml
└── nx.json
```

---

## ⚙️ Tech Stack Benefits

### 🎯 Nx (Monorepo Tool)
- **Smart builds**: Only rebuilds changed code
- **Dependency graph**: Understands project relationships
- **Parallel execution**: Runs tasks simultaneously
- **Code generation**: Consistent project scaffolding

```bash
nx affected:build --base=main  # Only build what changed
nx graph                       # Visualize dependencies
```

### 🚀 pnpm (Package Manager)
- **70% less disk space**: Symlinks to global store
- **Faster installs**: Parallel downloads with caching
- **Strict dependencies**: Prevents phantom imports
- **Native workspaces**: Built for monorepos

### 🐳 Docker (Runtime Management)
- **Per-app isolation**: Each app gets optimal runtime
- **Consistent environments**: Dev matches production
- **Easy orchestration**: Start all services together

---

## 🔧 Version Strategy

| Environment | Node | Python | Control |
|-------------|------|--------|---------|
| Local Dev | `.nvmrc` | `pyenv` | Dev tools |
| Docker | `Dockerfile` | `Dockerfile` | Containers |
| CI/CD | `Dockerfile` | `Dockerfile` | Automation |

---

## 🛠️ Daily Workflow

```bash
# Setup
nvm use                    # Correct Node version
pnpm install              # Install dependencies

# Development
pnpm nx serve devAman     # Start one app
docker-compose up         # Start all services

# Smart operations
pnpm nx affected:build --base=main  # Build only changed
pnpm nx affected:test --base=main   # Test only changed
pnpm nx run-many --target=lint --all  # Lint everything
```

---

## 📦 Key Files

**`pnpm-workspace.yaml`**
```yaml
packages:
  - 'apps/*'
  - 'libs/*'
  - 'tools/*'
```

**`docker-compose.yml`**
```yaml
version: '3.8'
services:
  devaman:
    build: ./apps/devAman
    ports: ["3000:3000"]
  kinzokupe:
    build: ./apps/kinzokupe  
    ports: ["8000:8000"]
```

**`.nvmrc`**
```
18
```

---

## ✅ Best Practices

**Do:**
- Use `nx affected:*` commands for efficiency
- Extract shared code into libs
- Use Docker for consistent environments
- Version control tool versions

**Don't:**
- Put everything in one giant library
- Let libs import from apps
- Ignore the dependency graph
- Commit build artifacts

---

## 🚀 Quick Commands

```bash
# Generate new projects
pnpm nx g @nx/react:app my-app
pnpm nx g @nx/react:lib my-lib

# View relationships
pnpm nx graph

# Performance insights
pnpm nx report

# Build everything
pnpm nx run-many --target=build --all
```

---

**Bottom line**: Monorepos with Nx + pnpm + Docker give you enterprise-grade tooling with the flexibility to use different technologies per project. You get microservices benefits (tech diversity) with monolith developer experience (unified tooling).