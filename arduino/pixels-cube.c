#include<Wire.h>
const int MPU=0x68;
int16_t AcX,AcY,AcZ,Tmp,GyX,GyY,GyZ;

int last_face = 0;
int cur_face = 0;

// LED RGB 1
int redPin1 = 3;
int greenPin1 = 5;
int bluePin1 = 6;

int fsm_state = 0;
int fade_r = 0;
int fade_g = 85;
int fade_b = 170;

int green[3]= {0, 255, 0};
int red[3] = {255, 0, 0};
int blue[3] = {0, 0, 255};
int purple[3] = {255, 0, 255};
int cyan[3] = {0, 255, 255};
int yellow[3] = {255, 255, 0};

int x = 255;


//fsm fade in, fade out
int fsm_fade = 1;

// para anim nao utilizada
bool fade_r_decreasing = true;
bool fade_g_decreasing = true;
bool fade_b_decreasing = true;
int rgb_state = 1;
int rgb_steps = 40;


void setup(){
  Wire.begin();
  Wire.beginTransmission(MPU);
  Wire.write(0x6B);
  Wire.write(0);    
  Wire.endTransmission(true);
  Serial.begin(9600);

  // LED| RGB1 OUTPUT
  pinMode(redPin1, OUTPUT);
  pinMode(greenPin1, OUTPUT);
  pinMode(bluePin1, OUTPUT);
}
void loop(){
  Wire.beginTransmission(MPU);
  Wire.write(0x3B);  
  Wire.endTransmission(false);
  Wire.requestFrom(MPU,12,true);  
  GyX=Wire.read()<<8|Wire.read();    
  GyY=Wire.read()<<8|Wire.read();  
  GyZ=Wire.read()<<8|Wire.read();  
  AcX=Wire.read()<<8|Wire.read();  
  AcY=Wire.read()<<8|Wire.read();  
  AcZ=Wire.read()<<8|Wire.read();  

  char read = Serial.read();

   if(read == 's'){
    Serial.print(cur_face);
    } else if (read == 'k'){
    fsm_state=1;
    } else if (read == 'b'){
      fsm_state=2;
      } else if (read == 'r'){
        fsm_state = 0;
        }


switch(fsm_state){
  // Normal operation
  case 1:
      if(GyZ > 14000){
      cur_face = 6;
      setColor1(cyan[0], cyan[1], cyan[2]);
      }
      else if(GyY < -14000){
      cur_face = 2;
      setColor1(blue[0], blue[1], blue[2]);
      }else if(GyX > 14000){
      cur_face = 3;
      setColor1(yellow[0], yellow[1], yellow[2]);
      }else if(GyY > 14000){
      cur_face = 4;
      setColor1(purple[0], purple[1], purple[2]);
      }else if(GyZ < -14000){
      cur_face = 5;
      setColor1(red[0], red[1], red[2]);
      }else if(GyX < -14000){
      cur_face = 1;
      setColor1(green[0], green[1], green[2]);
      }
  
      if (cur_face != last_face){
        Serial.print(cur_face);
        }
     last_face = cur_face;
  break;

  case 2:
    red_blink();
   break;
   default:
      fade_waiting();
  }       
}

void setColor1(int redValue, int greenValue, int blueValue) {
  analogWrite(redPin1, redValue);
  analogWrite(greenPin1, greenValue);
  analogWrite(bluePin1, blueValue);
}

void fade_waiting(){
    switch(fsm_fade){
    case 1:
    if(x >= 255){
      fsm_fade = 2;
      } else {
        setColor1(x,x,x);
        x++;
        }
    break;
    case 2:
    if(x <= 0){
      fsm_fade = 1;
      } else {
        setColor1(x,x,x);
        x--;
        }
    }
    delay(6);
  }

 void red_blink(){
    switch(fsm_fade){
    case 1:
    if(x >= 255){
      fsm_fade = 2;
      } else {
        setColor1(x,0,0);
        x = x + 4;
        }
    break;
    case 2:
    if(x <= 0){
      fsm_fade = 1;
      } else {
        setColor1(x,0,0);
        x = x - 4;
        }
    }
    delay(6);
  }