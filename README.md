# AQR Web Client

## Description

This is the Angular web client of the Air Quality Radar, which is responsible for serving data from the back-end to the user in a useful and intuitive way.

## Building

Firstly, make sure required packages are installed by running `npm install`.

To run a development server, run `npm start`.  To run unit tests, use `npm test`.  To build the production build, use `npm run build.prod`.

## Contribution Guidelines

To work on a new feature, checkout the master branch and run `git checkout -b CRSID/FEATURE_NAME`, for example if your CRSID was `ab123` and you tweaked the sidebar, you could do `git checkout -b ab123/sidebar-tweaks`.  

Once you've finished the changes you wanted to make, push your changes to the server (`git push origin ab123/sidebar-tweaks`) and [open a merge request](https://gitlab.com/air-quality-radar/AQR-Web-Client/merge_requests).