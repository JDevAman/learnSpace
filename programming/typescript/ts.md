# Typescript

## Introduction

- Typsecript is strongly typed language, syntactical superset of javascript developed by microsoft.
- TS is backwards compatible.

### How TS code run?

- TS code never runs at all. TS is transpiled to JS file.
- Transpilation - compile type checks to catch errors.
- Errors are catched during Transpilation. JS code is run after transpilation.

### compiler

- tsc (official), eslint, swc

## Getting started

- Starter template

  ```[] js

    pnpm init
    pnpm add typescript
    <!-- generate tsconfig -->
    pnpm exec tsc --init
    <!-- compile -->
    pnpm exec tsc
    <!-- Build in tsconfig -->
  ```
