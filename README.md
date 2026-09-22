# Project No3 — Mini Projet JS

Final JavaScript project for my first year of dev studies — a stagiaire (intern) request-management app, using vanilla JS modules and consuming a REST API.

## About

A small full-frontend app where a stagiaire can log in, submit requests (e.g. leave requests), and track them, while an admin manages users and processes requests.

## Features

- **Auth** — login and account creation
- **User dashboard** — profile, submit requests, view my requests
- **Admin panel** — manage users (add/update/view/list), manage all requests
- **Theme customization** — change color page
- **API consumption**:
  - A mock REST API ([mockapi.io](https://mockapi.io)) for stagiaire/user data
  - [REST Countries API](https://restcountries.com) for country/currency data
- Built with vanilla JS split into modules (one file per page/feature)

## Structure

```
index.html              # Login page
createAccount/          # Sign up
pages/
  dashboard.html
  myRequests.html
  addRequest.html
  profile.html
  changeColor.html
  admin/
    users.html
    user.html
    addUser.html
    updateUser.html
    manageRequests.html
assets/
  css/                   # Stylesheets
  js/                    # One module per page (login.js, signup.js, main.js, users.js, ...)
```

## Stack

- HTML / CSS
- Vanilla JavaScript (modules, `fetch`, `async/await`)
- jQuery
- Bootstrap

## Notes

Learning project for my first year — expect some rough edges. ⚠️ Note: `assets/js/currencies.js` currently has a hardcoded API token — should be moved out before this repo is shared widely.
