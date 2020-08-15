# Retrofit Checker

Only for Organizations that use Github. Doesn't work for individual Github account yet.

Simple lighweight Desktop application to check the retrofit status of any two branches of a repository within an Organization. Application is based on [Svelte](https://svelte.dev/), [Bootstrap](https://getbootstrap.com/) and [Electron](https://www.electronjs.org/)

# How to run the application

### To run the application locally
```sh
$ git clone https://github.com/sivamadithati/retrofit-checker.git
$ cd retrofit-checker
$ npm install
$ npm start
```
### To package the application for Mac and Windows
```sh
$ git clone https://github.com/sivamadithati/retrofit-checker.git
$ cd retrofit-checker
$ npm install
$ npm run dist
```
# Personal Access Token (PAT)

### To create PAT:
- https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token

### While creating PAT:
- Select Scope as `repo` as shown below.
- Make sure that you enable the SSO for the PAT.

### Enabling SSO for PAT:
 - https://docs.github.com/en/github/authenticating-to-github/authorizing-a-personal-access-token-for-use-with-saml-single-sign-on

# Legend
Details about how we can get the various required parameters to use in the application.
Following is the sampel Github URL in general https://github.com/FooBar/foo/tree/foo-branch-2020XXXX
- Organization Name: `FooBar`
- Repository Name: `foo`
- Repository Branch Name: `foo-branch-2020XXXX`
- Repository Branch Prefix: `foo-branch-` 
