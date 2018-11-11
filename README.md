# mockserver-ui 

> A dashboard to view the expectations, requests, and logs in [MockServer](http://mock-server.com/)

[![Build status](https://badge.buildkite.com/84d4f1ca00ee6639c1825ea31f0dcd50bd73088571813a219b.svg?style=square&theme=slack)](https://buildkite.com/mockserver/mockserver-ui) [![Dependency Status](https://david-dm.org/jamesdbloom/mockserver-ui.png)](https://david-dm.org/jamesdbloom/mockserver-ui) [![devDependency Status](https://david-dm.org/jamesdbloom/mockserver-ui/dev-status.png)](https://david-dm.org/jamesdbloom/mockserver-ui#info=devDependencies) [![Code Climate](http://codeclimate.com/github/jamesdbloom/mockserver-ui.png)](https://codeclimate.com/github/jamesdbloom/mockserver-ui) 


For chat room: [![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/jamesdbloom/mockserver?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)


## Getting Started
This node module is built using [react-scripts](https://www.npmjs.com/package/react-scripts), it is not intended to use stand alone (except for development) and is bundled into [MockServer](http://mock-server.com/) on path `/mockserver/dashboard`, for example `https://localhost:1080/mockserver/dashboard`.

For development this node module can be run using `npm start` and can be pointed at a running version of [MockServer](http://mock-server.com/) using `host`, `port` and `context` query parameters as required, for example: `http://localhost:3000/?host=localhost&port=1080&context=`. 

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

---

[![Analytics](https://ga-beacon.appspot.com/UA-32687194-4/mockserver-ui/README.md)](https://github.com/igrigorik/ga-beacon)
