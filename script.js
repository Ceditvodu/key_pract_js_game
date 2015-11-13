//definig of canfas
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

// other variebles
// coordinates
var gy = 0;
var gxflag = false;
var gxdown = false;
var gxup = false;
var gx = 2;

// result massive variebles
var keymap = [];
var keychar =[];
var keyflag = false;

var collisionmap = [];



//main charecter ckass
function hero(x, y) {
  this.x = c.height - 2 - x;
  this.y = y;

  // render of cherecter
  // width 2 pixels 
  // red color
  // before render it is cleaning a canvas
  this.render = function(x, y) {
    ctx.fillStyle = "#FFf";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(this.y, this.x, 2, 2);
  }

  // seting an a charecter position
  this.setxy = function(x, y) {
    this.x = x;
    this.y = y;
  }

  // geting a charecter position
  this.getx = function() {
    return this.x;
  }
  this.gety = function() {
    return this.y;
  }
}

// button inc/decrimination of 
// position 
function plus(char) {
  if (char == 65) {
    gy--;
  } else if (char == 68) {
    gy++;
  } else if (char == 87) {
    gxflag = true;
    if(gx == 2){
      gxup = true;      
    }
  }
  return 
}

// Keyboard observers class
function keywatcher(){

  // method for adding a pushed
  // button if it dose not 
  // present in array 
  function keyadd(key) {
    if (keymap.length == 0) {
      keymap.push(key);
    } else {
      for (i = 0; i <= keymap.length; i++) {
        if (keymap[i] == key) {
          this.keyflag = true;
        }
      }
      if (this.keyflag == false) {
        keymap.push(key);
      }
      this.keyflag = false;
    }
  }

  // method for removing an realesed 
  // button from array
  function keyremove(key) {
    for (i = 0; i <= keymap.length; i++) {
      if (keymap[i] == key) {
        keymap.splice(i, 1);
      }
    }
  }

  // method that runs when 
  // button pushed 
  this.myKeyDown = function(e)  {
    var keynum;
    if (window.event) { // IE         
      keynum = e.keyCode;
    } else
    if (e.which) { // Netscape/Firefox/Opera          
      keynum = e.which;
    }
    keyadd(keynum);
  }

  // method that runs when button 
  // relesed
  this.myKeyUp = function(e) {
    var keynum;
    if (window.event) { // IE         
      keynum = e.keyCode;
    } else
    if (e.which) { // Netscape/Firefox/Opera          
      keynum = e.which;
    }
    keyremove(keynum);
  }
}

// main game loop
function loop() {

  // fall 
   
  // reading all button codes 
  // from array and macking an 
  // inc/decrimantation of charactor 
  // location
  if(keymap.length){
      for (i = 0; i <= keymap.length; i++) {
        plus(keymap[i]);
      }    
  }

  // displayng of actiwe buttons
  for( i =0; i <= keymap.length; i++){
    keychar[i] = String.fromCharCode(keymap[i]);
  }
  document.getElementById('con').innerHTML = keychar.join(' ');

  // jump logic
  if (gxflag == true){
    if((gxup == true)&&(gx<40)){
      gx = gx + 1;
      if(gx >= 40){
        gxdown = true;
        gxup= false;
      }
    }else if(gxdown == true){
      gx= gx - 1;
      if(gx <= 2){
        gxup = false;
        gxdown = false;
      }
    }else{
      gxflag = false;
      gxdown = false;
    }
  }

  // hero  setting acception
  // and render
  s.setxy(c.height - gx, gy);
  s.render();

  setTimeout(loop, 10);
}

// defining of character and keywhatcher objects
var s = new hero(0, 0);
var k = new keywatcher();

// initialithing of event listeners 
window.onkeydown = k.myKeyDown;
window.onkeyup = k.myKeyUp;
window.onload = loop;


