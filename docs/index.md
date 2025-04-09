---
title: 'Introduction'
id: introduction
description: 'Katapult Take Home test Solution'
---

This documentation site serves as my submission for the Katapult take-home test.
I chose to present my analysis and tutorial in a documentation format to
demonstrate my ability to create clear, accessible technical content.

### Technology Stack

The site is built using:

- Docusaurus: A modern static website generator optimized for documentation
- TypeScript: For type-safe configuration and development
- GitHub Pages: For hosting and deployment
- Mermaid: For creating diagrams and visualizations

### GitHub Workflow

The site follows a continuous deployment workflow:

1. Changes are pushed to the main branch
2. GitHub Actions automatically builds and deploys the site
3. The site is hosted on GitHub Pages at [hactivist123.github.io/katapult-test](https://hactivist123.github.io/katapult-test/)
4. There is also a QA workflow that runs to build Docusaurus whenever a PR is submitted

### Navigation

To view my take-home test submission:

1. Select "Take Home Test" from the navigation bar
2. Use the sidebar for navigation
3. The content is organized into two main sections:
   - Katapult Documentation Gaps Analysis
   - Katapult Object Storage Tutorial

### Tutorial Code Repository

The complete code for the Object Storage tutorial can be found in the
`katapult-s3-demo` folder in
[this repository](https://github.com/hacktivist123/katapult-test). This includes:

- The Go application demonstrating S3 compatibility
- Environment configuration files
- Sample file used in the tutorial
