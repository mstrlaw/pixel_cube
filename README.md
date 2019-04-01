# Pixel Cube

> An IoT time tracking cube.

###### (Note: this is a WIP project and it's maintenance/evolution is done in accordance to the dev's available time).

![Pixel Cube](https://github.com/mstrlaw/pixel_cube/blob/master/static/cube_optimized.gif?raw=true)

The [https://pixelcube.xyz/](Pixel Cube) is the result of [Pixels Camp 2019](https://pixels.camp/) 48h hackathon.

Much to the likes TimeFlip or Timeular, the concept is that you have a physical device (the cube) which you can flip and it'll track the time of the face upward. We wanted to create a project that anyone could build the cube at home and use it.

**Stack**

The Cube's hardware:
- Arduino Nano - Atmega 328p
- 2x 3.7 400mah Li-Po Batteries
- Bluetooth Low Energy - HC-06
- 2x RBG Led - 5mm OR 6 5mm LED with different colours
- MPU 6050 - Gyroscope & Accelerometer
- Casing (prototype using transparent plastic paper folder)

Software:
- Electron & VueJs, using [electron-vue](https://github.com/SimulatedGREG/electron-vue)


ToDo:

- [ ] Finish proper 3D casing models for printing
- [ ] Walk-through on cube assembly
- [ ] Better Readme
- [ ] Create project documentation (using [VuePress](https://vuepress.vuejs.org/))
- [ ] Add tests to code
- [ ] Fix known bugs
