function mostrarintro(){

var cubeGeometry = new THREE.BoxGeometry(110,10,1);
var cubeGeometry1 = new THREE.BoxGeometry(50,25,1);
var cubeGeometry2 = new THREE.BoxGeometry(110,50,1);
var cubeGeometry4 = new THREE.BoxGeometry(10.5,0.4,4.5);
var cubeGeometry3 = new THREE.BoxGeometry(0.7,8,0.5);
// Material
var cubeTexture = THREE.ImageUtils.loadTexture('assets/img/pared.gif');
var cubeTexture1 = THREE.ImageUtils.loadTexture('assets/img/mesa.png');
var cubeTexture2 = THREE.ImageUtils.loadTexture('assets/img/suelo.png');
var cubeMaterial = new THREE.MeshLambertMaterial({ map: cubeTexture });
var cubeMaterial1 = new THREE.MeshLambertMaterial({ map: cubeTexture1 });
var cubeMaterial2 = new THREE.MeshLambertMaterial({ map: cubeTexture2 });
var Material = new THREE.MeshBasicMaterial({color:"#CCCCCC"}); // definimos material
var Material1 = new THREE.MeshBasicMaterial({color:"#000000"}); // definimos material
                
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial); //h

var cube1 = new THREE.Mesh(cubeGeometry, cubeMaterial); //h

var cube2 = new THREE.Mesh(cubeGeometry1, cubeMaterial); //v

var cube3 = new THREE.Mesh(cubeGeometry1, cubeMaterial); //v


var cube4 = new THREE.Mesh(cubeGeometry2, cubeMaterial2); 


var pata = new THREE.Mesh(cubeGeometry3, Material); 

var pata1 = new THREE.Mesh(cubeGeometry3, Material); 

var pata2 = new THREE.Mesh(cubeGeometry3, Material); 

var pata3 = new THREE.Mesh(cubeGeometry3, Material); 


var mesa = new THREE.Mesh(cubeGeometry4, cubeMaterial1); 



cube4.position.y = -23;
cube4.position.z = -10-20;
cube4.rotation.x -= 1.2;

pata.position.y = -15;
pata.position.x = -5;
pata.position.z = -24-20;

mesa.position.y = -10.7;
mesa.position.z = -25-15;
mesa.rotation.x = 0.2;


pata1.position.y = -15;
pata1.position.x = 5;
pata1.position.z = -24-20;

pata3.position.y = -15;
pata3.position.x = -5;
pata3.position.z = -20-20;

pata2.position.y = -15;
pata2.position.x = 5;
pata2.position.z = -20-20;

cube.position.z = -25-20;
cube.position.y = 15;
cube1.position.z = -25-20;
cube1.position.y = -11;
cube2.position.z = -25-20;
cube2.position.x = -30;
cube3.position.z = -25-20;
cube3.position.x = +30;
cube2.position.y = 6;
cube3.position.y = 6;


 objetos = new Array(cube,cube1,cube2,cube3,cube4,pata,pata1,pata2,pata3,mesa);


   crearEscena();
}

