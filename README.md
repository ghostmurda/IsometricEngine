<h1>Electron React Three.js Isometric Engine</h1>

Current features:

<ul>
<li>movement on click</li>
<li>3d models with animations</li>
<li>custom light system</li>
<li>2d tiles generating system</li>
<li>optimized chunk system</li>
</ul>

<br>

TODO:

<ul>
<li>terrain landscape</li>
<li>map saving and loading</li>
<li>movement with A* </li>
<li>placing blocks</li>
<li>static npc</li>
<li>hostile npc, battle system</li>
</ul>

<br>

## Install

Clone the repo and install dependencies:

```bash
git clone --depth 1 --branch master https://github.com/ghostmurda/IsometricEngine.git

npm install
```

## Starting Development

Start the app in the `dev` environment:

```bash
npm start
```

## Packaging for Production

To package apps for the local platform:

```bash
npm run package
```

<br>
<br>

## Patch notes

```bash
01.05.2024 - chunk system, dynamic chunk loading / cleanup
30.04.2024 - static lightmap, tree sprites, shadow color calculating
22.04.2024 - rendering optimization, light system prototype
```

<br>
<br>

<img src=".erb/img/erb-banner.svg" width="100%" />

<br>

<p>
  Electron React Boilerplate uses <a href="https://electron.atom.io/">Electron</a>, <a href="https://facebook.github.io/react/">React</a>, <a href="https://github.com/reactjs/react-router">React Router</a>, <a href="https://webpack.js.org/">Webpack</a> and <a href="https://www.npmjs.com/package/react-refresh">React Fast Refresh</a>.
</p>

## License

MIT © [Electron React Boilerplate](https://github.com/electron-react-boilerplate)
