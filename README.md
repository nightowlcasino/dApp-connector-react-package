<div id="top"></div>

[![MIT License][license-shield]][license-url]


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/nightowlcasino">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Ergo dApp Connector React Package</h3>

</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>

</details>

## About The Project

There are many Open-Source dApps on top of Ergo that have already developed their dApp connector, every dApp has done it similarly but not exactly the same way, new developers coming to Ergo will be willing to avoid spending days developing and testing something that has already be done, specially Junior Developers with not wide experience will experience some problems trying to create their dApp Connector, this led us to provide a component that embeds the Ergo dApp Connector in it and potentially help every new developer coming to Ergo by having the dApp Connector in a few clicks.

This idea came out of a user from the Ergo Community suggesting creating more documentation regarding Ergo dApp Connection, apparently he was in trouble because he couldnt understand how to do it simply by taking a look at some Open-Source code. 

His suggestion made us believe that creating an Ergo dApp Connector during the ErgoHack would be potentially the most helpful tool created for future devs coming to ergo and wanting to develop whatever crazy innovative ideas they have in mind.

When we first started developing the dApp connector for our own casino project, we were able to use ErgoDex and ErgoPad's code as guidance.

Now we are creating a package that has the whole dApp connector in it. We're hoping our open-source code helps other projects too!

Open-source is the way!

##### 1. What is this package/library?
Ergo dApp Connector library for React came out of necessity of various users while developing websites for their dApps.

The package contains a component that is an Ergo dApp Connector, which means, that by downloading it and calling it in your code you will have handled the whole dApp Connection!

Examples of how to do this will be showed later on.

##### 2. Who it benefits

New developers coming to the Ergo developing scene and wanting to avoid having to deal with the dApp Connection or not having the knowledge for it.

Even if the developer didnt want to use the package itself, he could access this package's repository which is public and of course Open Source and understand how it is done line by line and therefore LEARNING, education is important.

Or the could simply want to change the visual look of the dApp connector, he could simply copy paste the files and keep the functionality in the .js files but changing the .css files as the developer wants in order to produce a different styling for his dApp Connector button.

The package will be uploaded to npmjs.org which is the largest free npm registry, this way, the developer willing to use it will simply have to download it, import it in his project, and call it. Check the package listed [here](https://www.npmjs.com/package/ergo-dapp-connector)

### Built With

As mentioned it is a React Package, therefore React will be the JS library used for this package. Created using React version ^18.1.0.

* [React.js](https://reactjs.org/)
* [Storybook.js](https://storybook.js.org/)
* [Rollup.js](https://rollupjs.org/guide/en/)

<p align="right">(<a href="#top">Back to top</a>)</p>

## Getting Started

Here we will explain how to properly use the package.

### Prerequisites
Although these are very obvious requisites, and surely installed by any web developer, they are:
* Node.js
  ```sh
  https://nodejs.org/
  ```
* npm (Although this is likely installed by installing Node)
  ```sh
  npm install npm@latest -g
  ```


### Installation

How to install, import and use the Ergo dApp Connector!

* Install the package.
  ```sh
  npm install ergo-dapp-connector
  ```

<p align="right">(<a href="#top">Back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

* Import the dApp Connector in the .js file where you will be using it
  ```sh
  import {ErgoDappConnector} from "ergo-dapp-connector";
  ```
* Call the component ErgoDappConnector that you just imported anywhere in your code where you want to display it.
  ```sh
  <ErgoDappConnector color="orange"/>
  ```

With the attribute "color" you can specify the color you want your "Connect Wallet" button to be!
The current supported colors are:

    orange
    white
    black
    green
    purple
    blue
    red
    yellow
    brown
    pink
    teal
    cyan
    coral
    emerald
    inkwell
    darkred
    darkgreen
    darkblue
    darkpurple
    darkorange
<br/>
<img src="images/usage_example.png" alt="Usage example">
<span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
<img src="images/visual_example.png" alt="Visual example" >



<p align="right">(<a href="#top">Back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue!

1. Fork the Project
2. Commit your Changes (`git commit -m 'Add some Amazing Feature'`)
3. Push to the Branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

<p align="right">(<a href="#top">Back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` file for more information.

<p align="right">(<a href="#top">Back to top</a>)</p>


## Contact
Night Owl - [@NightOwlCasino](https://twitter.com/NightOwlCasino)

Author Project Link: [Night Owl Casino Github](https://github.com/nightowlcasino/)

<p align="right">(<a href="#top">Back to top</a>)</p>

[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/nightowlcasino/dApp-connector-react-package/graphs/contributors
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/nightowlcasino/dApp-connector-react-package/blob/main/LICENSE