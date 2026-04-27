# Hi, this is my personal website!

My name is Dikshant Thakur , I am robotics enthusiat doing my masters (about to graduate) from University of Genoa, Italy. 


This repo contains the source code to my personal website, which is inspired by Steven. 


Checkout my site at: 

```
https://dikshant-thakur.github.io/
```

## Development

To install dependencies: 
```bash
npm install
```

To run it locally: 
```bash
npm start
```

To build for production:
```bash
npm run build
```

## Deployment

This site is automatically deployed using GitHub Actions. When you push to the `production` branch, it will:

1. Build the Gatsby site
2. Deploy to GitHub Pages
3. Update your live site

### Deployment Fix
If your site is only showing the `README.md` instead of the portfolio, follow these steps:
1. **Add `.nojekyll`**: Create an empty file named `.nojekyll` in the root directory to disable Jekyll processing.
2. **Setup GitHub Actions**: Go to Repository Settings > Pages and change the source to **GitHub Actions**.
3. **Gatsby Workflow**: Configure the Gatsby deployment workflow. This will automate the `gatsby build` process.
4. **Target Branch**: Ensure your code is pushed to the branch monitored by the workflow (in this case, `production`).
5. **Verify**: Check the **Actions** tab in GitHub to ensure the build process completes with a green tick.

## Quality Assurance

### Pull Request Checks
Every Pull Request automatically triggers a build check to ensure:
- Dependencies install correctly
- Gatsby builds successfully
- No breaking changes are introduced

## Manual Deployment

Running this command in your local terminal will deploy your current branch to "main" branch and update gh pages. There is no checks, and forces update immediately

```bash
npm run deploy
```



