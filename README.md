# Pixel Cube

> An IoT time tracking cube.

###### (Note: this is a WIP project and it's maintenance/evolution is done in accordance to the dev's available time).

![Pixel Cube](https://github.com/mstrlaw/pixel_cube/blob/master/assets/cube_optimized.gif?raw=true)

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/powered-by-electricity.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/60-percent-of-the-time-works-every-time.svg)](https://forthebadge.com)

The [PixelCube](https://pixelcube.xyz/) is the result of [Pixels Camp 2019](https://pixels.camp/) 48h hackathon.

Much to the likes TimeFlip or Timeular, the concept is that you have a physical device (the cube) which you can flip and it'll track the time of the face upward. We wanted to create a project that anyone could build the cube at home and use it.

## Stack

### Hardware
- Arduino Nano - Atmega 328p
- 2x 3.7 400mah Li-Po Batteries
- Bluetooth Low Energy - HC-06
- 2x RBG Led - 5mm OR 6 5mm LED with different colours
- MPU 6050 - Gyroscope & Accelerometer
- Casing (prototype using transparent plastic paper folder)

### Software
- Electron & VueJs, using [electron-vue](https://github.com/SimulatedGREG/electron-vue)


## Electron App

### Developing
Simply run `npm run dev` and the app will build and open up. Changes to the code should reflect directly.

**Note on Node versions**: you may get an error complaining that some module was compiled to a different Node version (see [here](https://github.com/onmyway133/blog/issues/69) ). If that's the case, the follwoing should fix it:
```
npm i -D electron-rebuild
npm i sharp
./node_modules/.bin/electron-rebuild
```

### Building
The build is done using [electron-builder](https://github.com/electron-userland/electron-builder). All builds can be found within the _build_ folder.

To build for a specific platform, run `npm run build:<platform>` where platform can be one of `darwin`, `mas`, `linux` or `win32`. For instance, building for darwin (macOS):

`npm run build:darwin`

More info [here](https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html)



#### ToDo:

- [ ] Create project documentation (using [VuePress](https://vuepress.vuejs.org/))
- [ ] Enhance Readme
- [ ] Finish proper 3D casing models for printing
- [ ] Walk-through on cube assembly
- [ ] Prep up project to be adopted by OS/DIY/IOT community 
- [ ] Fix known bugs
- [ ] Add tests to code
