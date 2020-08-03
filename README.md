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
# Useful Resources

- To create the personal access token: https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token

# Legend
Details about how we can get the various required parameters to use in the application.
Following is the sampel Github URL in general https://github.com/FooBar/foo/tree/foo-branch
- Organization Name: FooBar
- Repository Name: foo
- Branch Name: foo-branch
