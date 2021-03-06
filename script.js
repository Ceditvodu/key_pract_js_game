//definig of canfas
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

// other variebles
// coordinates
var gy = 0; // ->
var gxflag = false;
var gxdown = false;
var gxup = false;
var floor = 4;
var gx = floor; // ^
var jumphigh = 40;
var altitude = floor;

// result massive variebles
var keymap = [];
var keychar =[];
var keyflag = false;
var keyfallflag = false;
var downflag = 0;
var jumpstart = 0;

var collisionmapGY = [];
var collisionmapGX = [];
var withoutcol = [];
var consol = [];

// Floor map
for(i = 0; i <= c.width; i++){
  collisionmapGY.push(i);
  collisionmapGX.push(floor);
  withoutcol.push(i+''+floor);
}

// Panel1 map
for(i = 20; i <= 50; i++){
  collisionmapGY.push(i);
  collisionmapGX.push(20);
  withoutcol.push(i+''+20);

}
// Panel2 map
for(i = 20; i <= 50; i++){
  collisionmapGY.push(i);
  collisionmapGX.push(50);
  withoutcol.push(i+''+50);

}

// Panel3 map
for(i = 40; i <= 70; i++){
  collisionmapGY.push(i);
  collisionmapGX.push(70);
  withoutcol.push(i+''+70);

}

for(j = 80; j <= 150; j++ ){
    collisionmapGX.push(j);
  collisionmapGY.push(50);
  withoutcol.push(50+''+j);
}


//main charecter ckass
function hero(x, y) {
  this.x = c.height - floor - x;
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
    // if(downflag == 1){
    //   jumpstart = 1;
    // }
    if((gx == altitude)&&(jumpstart == 0)){
      gxup = true;
    }
    
      // for(i=0; i <= collisionmapGY.length; i++){
      //   if((collisionmapGY[i] == gy)&&(collisionmapGX[i] == gx)){
      //     gxup = true;      
      //   }
      // }

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

  // jump logic
  // falling down logic
  for(i=0; i <= collisionmapGY.length; i++){
    if((withoutcol[i] == gy+''+gx)){
      downflag++;   
    }
  }
  if((downflag == 0)&&(gx == altitude)){
    gxdown = true;
    gxflag = true;
    gxup = false;
  }
  // exactli jumping
  if ((gxflag == true)||(keyfallflag == true)){
    if((gxup == true)&&(gx< altitude + jumphigh)){
      gx = gx + 1;
      if(gx >= (altitude +  jumphigh)){
        gxdown = true;
        gxup= false;
      }
    }else if(gxdown == true){
      gx= gx - 1;
      for(i=0; i <= collisionmapGY.length; i++){
        if((collisionmapGY[i] == gy)&&(collisionmapGX[i] == gx)){
          gxup = false;
          gxdown = false;  
          altitude  = gx;    
        }
      }
    }else{
      gxflag = false;
      gxdown = false;
    }
  }
  // falling flag clearer
  document.getElementById('con').innerHTML =downflag+ ' ' + altitude ;
  downflag = 0;
//document.getElementById('con').innerHTML = keychar.join(' ');


  // collision map detection 
  for(i=0; i <= collisionmapGY.length; i++){
    if((collisionmapGY[i] == gy)&&(collisionmapGX[i] == gx)){
      //document.getElementById('con').innerHTML =collisionmapGY[i]+ ' '+ collisionmapGX[i] + ' ' +gy+''+gx;   
    }
  }

  // hero  setting acception
  // and render
  s.setxy(c.height - gx, gy);
  s.render();

  //collision map drawing
  for(i=0; i <= collisionmapGY.length; i++){
      ctx.fillStyle = "#00ff00";
      ctx.fillRect(collisionmapGY[i], c.height + 2 - collisionmapGX[i], 2, 2);  
  } 

  setTimeout(loop, 10);
}

// defining of character and keywhatcher objects
var s = new hero(0, 0);
var k = new keywatcher();

// initialithing of event listeners 
window.onkeydown = k.myKeyDown;
window.onkeyup = k.myKeyUp;
window.onload = loop; 