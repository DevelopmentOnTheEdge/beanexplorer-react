#!/usr/bin/env bash
npm run coverage
npm run lib
npm run example
git add .
git commit -m "build"