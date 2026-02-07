# Repository-template

# ESLint
```bash
# to install
npm init -y --init-type=module

# to run
npx eslint yourfile.js 
```

# Prettier
```bash
# to install
npm install --save-dev --save-exact prettier

# create an empty config file to let editors and other tools know you are using Prettier:
node --eval "fs.writeFileSync('.prettierrc','{}\n')"

# create a .prettierignore file to let the Prettier CLI and editors know which files to not format. Here’s an example:
node --eval "fs.writeFileSync('.prettierignore','# Ignore artifacts:\nbuild\ncoverage\n')"

# to format all files
npx prettier . --write
```














# Steps to setup Webpack

#### 1. Creates a package.json file in it for npm to record information about packages we use

```bash
npm init -y --init-type=module
```

#### 2. install Webpack

```bash
npm install --save-dev webpack webpack-cli
```

#### 3. Make src directory and setup files

```bash
mkdir src && touch src/index.js
```

#### 4. In project Root create a webpack.config.js

```bash
// webpack.config.js
import path from "node:path";

export default {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(import.meta.dirname, "dist"),
    clean: true,
  },
};
```

#### 5. Run Webpack to create bundle

```bash
npx webpack
```

---

# Steps to setup handling HTML


#### 1. install HtmlWebpackPlugin

```bash
npm install --save-dev html-webpack-plugin
```

#### 2. create a template.html inside src (can name whatever)

```bash
# Fill the file with HTML boilerplate
# do not need to put a script tag in the file
```

#### 3. add to webpack.config.js 

```bash
// webpack.config.js
import path from "node:path";

// making sure our Webpack configuration has access to HtmlWebpackPlugin
import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(import.meta.dirname, "dist"),
    clean: true,
  },
  // then adding it as a plugin to the configuration object
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),
  ],
};

```

#### 4. Run npx webpack to create an index.html in dist

```bash
npx webpack
```

---

# Steps to setup Loading CSS


#### 1. install style-loader and css-loader

```bash
# css-loader will read any CSS files we import in a JavaScript file and store the result in a string

# style-loader then takes that string and actually adds the JavaScript code that will apply those styles to the page

npm install --save-dev style-loader css-loader
```

#### 2. add loaders to webpack.config.js so Webpack knows what to do

```bash
// webpack.config.js
import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(import.meta.dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),
  ],
  // Since these aren’t plugins, they go in a separate section
  // All this does is tell Webpack that if it encounters an imported file ending with .css,
  // it should use the listed loaders to process that CSS file.
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
```

#### 3. add some CSS by creating a src/styles.css, so that we can import into one of our JavaScript files
```bash
// src/index.js
import "./styles.css";
import { greeting } from "./greeting.js";

console.log(greeting);
```

#### 4.  bundle with Webpack using npx webpack

```bash
npx webpack
```


---

# Steps to setup Loading image files


#### For image files used in html 

```bash
# install html-loader 

npm install --save-dev html-loader

# tell Webpack to use something called html-loader
# add the following object to the module.rules array within webpack.config.js

// webpack.config.js
{
  test: /\.html$/i,
  use: ["html-loader"],
}
```

#### For image files used in JavaScript 

```bash
# need to import the images into our JavaScript module
# Since images aren’t JavaScript, we need to tell Webpack that these files will be assets by adding an asset/resource rule

# add the following object to the module.rules array within webpack.config.js

// webpack.config.js
{
  test: /\.(png|svg|jpg|jpeg|gif)$/i,
  type: "asset/resource",
}

# Then, in whatever JavaScript module we want to use that image in, we just have to default import it.

// src/index.js
import odinImage from "./odin.png";

const image = document.createElement("img");
image.src = odinImage;

document.body.appendChild(image);
```

---

# webpack.config.js after

```bash
// webpack.config.js
import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(import.meta.dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        use: ["html-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};
```


---

# Steps to setup Webpack dev server


#### 1. install webpack-dev-server

```bash
npm install --save-dev webpack-dev-server
```

#### 2. configure webpack.config.js

```bash
// webpack.config.js
import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(import.meta.dirname, "dist"),
    clean: true,
  },
  devtool: "eval-source-map",
  devServer: {
    watchFiles: ["./src/template.html"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        use: ["html-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};
```

#### 3. start up the dev server using the following command, site is on http://localhost:8080/

```bash
npx webpack serve
```
