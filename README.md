# Auth Account Koa

The mock project with examples of usage different instruments of development.

## Run the project

`bash ./scripts/run.sh`

## Git naming conventions

### 1. Branch naming

```
fix/auth-service/[short_desc]
feat/auth-service/[short_desc]
```

Each microservice will have its own prefix

```
fix/auth-service/[short_desc]
feat/auth-service/[short_desc]
```

Note: No numbers or other prefixes must be there!!!

### 2. Commits

The commit message should be structured as follows:

```
<type>[scope]: <description>

[optional body]

[optional footer]
```

Main types: fix, feat

Optional types: docs, refactor, test, ci

### 3. Scopes

#### Each type of work should be committed separately

```
fix(jwt): fix issue with token
```

```
test(jwt): cover new codebase
```

```
refactor(jwt): refactor auth.user.service class
```

##### Examples:

````
fix(jwt): fix issue with token
* Revert something
* Maintain something
 ````

## Goals

* Cover all auth-service by tests
* Add precommit and prepush to the project
* Reduce build time
* Use tool for monitoring vulnerabilities. Try snyk.
