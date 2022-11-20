<a name="readme-top"></a>

# Chat application

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
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## About the project

Chat apllication where you can

`[ADD SCREEN HERE]`

- as user:
  - chat with others in chat rooms,
  - create your own chat rooms with your own permissions for users / roles
- addidionaly as administrator:
  - create/delete ranges,
  - edit other users profiles,
  - add ranges to other users,
  - ban and unban users from chat

### Built with

- React 18.2.0,
- Node.js 16.17.0
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting started

### Prerequisites

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Darosss/ChatApplication.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. This is in development so need to create `.env` file in `app` folder with variables as below
   ```
   BACKEND_PORT=<port for localhost backend>
   FRONTEND_URL=http://localhost:3000
   DATABASE_URL=<Mongodb database URL or URI>
   COOKIE_SECRET=<cookie secret>
   JWT_SECRET_KEY=<jwt secret>
   ```
4. This is in development so need to create `.env` file in `frontend` folder with variable
   ```
   REACT_APP_API_URI=<example http://localhost:5000/api/v1 >
   ```
   **It must contain `/api/v1` after port, it's only route designed**

<!-- USAGE EXAMPLES -->

## Usage

`Add some screens and common usage`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Roadmap

- [x] Add chat rooms
- [x] Add login / register system
- [x] Add ban / unban system
- [x] Add ranges system
- [] Improve for mobiles
- [] Add shop with privileges

  See the [open issues](https://github.com/Darosss/ChatApplication/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## License

Distributed under the MIT License. See `LICENSE.md` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact

Darosss - daroinf12@gmail.com

Project Link: [https://github.com/Darosss/ChatApplication](https://github.com/Darosss/ChatApplication)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[chat-application-screenshot]: images/chat-application.png
