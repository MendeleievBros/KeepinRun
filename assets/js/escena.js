var escena;
var camara;
var render;
var terrain; // fóndo dinámico

var CrearParedes;

var objetos; // array con los objetos de la escena actual

var sentido; // para controlar la transición de escenas
var escena_actual;

var derechaX; //coordenadas de las puertas
var izquierdaX;//coordenadas de las puertas
var altura_u; //coordenadas de las puertas
var altura_d;//coordenadas de las puertas

var Pderecha; // pared de la puerta
var Pizquierda; // pared de la puerta
var Parriba; // pared de la puerta
var Pabajo; // pared de la puerta

var camaraX = -500; // coordenadas de la camara
var camaraY = 300;// coordenadas de la camara
var camaraZ = 0;// coordenadas de la camara

var azary; // numeros al azar que mueven la puerta en el eje y
var azarx;// numeros al azar que mueven la puerta en el eje x
var azars;// numeros al azar que separan las paredes de la puerta

var ultimoTiempo; // para controlar las teclas

 // parametros para generar las montañas, colores, altura, tamaño...

var GENERATORS =
{
	Random: {
		Default: 0,
		MersenneTwister: 1
	},
	Generator: {
		PerlinNoise: 0
	},
	PostGen: {
		None: 0,
		Mountains: 1,
		GameMountains: 2,

	},
	Filter: {
		None: 0,
		Blur: 1,
		GameTerrain: 2,
		Circle: 3,
	},
	Effect: {
		None: 0,
		Destructure: 1,
		DepthNoise: 2
	},
	ms_Randoms: [ RAND_DEFAULT, RAND_MT ],
	ms_Generators: [ PN_GENERATOR ],
	ms_Colors: [ null, MOUNTAINS_COLORS],
	ms_Filters: [ null, BLUR_FILTER, GAMETERRAIN_FILTER, CIRCLE_FILTER ],
	ms_Effects: [ null, DESTRUCTURE_EFFECT, DEPTHNOISE_EFFECT ],
};  


var parameters = 
{
		alea: RAND_MT,
		generator: PN_GENERATOR,
		width: 3000,
		height: 3000,
		widthSegments: 250,
		heightSegments: 250,
		depth: 300,
		param: 3,
		filterparam: 1,
		filter: [ BLUR_FILTER ],
		postgen: [ MOUNTAINS_COLORS ],
		effect: [ DEPTHNOISE_EFFECT ],
		canvas: document.getElementById('heightmap'),
	};  // parametros para generar las montañas, colores, altura, tamaño...


window.requestAnimFrame = (
	function(){
		return  window.requestAnimationFrame       ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame    ||
		function( callback ){
			window.setTimeout(callback, 1000 / 60);
		};
	}
)();


function iniciarEscena(){
	// definimos camara, escena, render...
	var canvasWidth = screen.width;
	var canvasHeight = screen.height; 
		
	render = new THREE.WebGLRenderer();
	render.setClearColor(0x99FFFF, 1); // color de fondo
		
	escena = new THREE.Scene();
		
	camara = new THREE.PerspectiveCamera(45, canvasWidth / canvasHeight, 0.1, 1000000);
	camara.position.set( -500,300,0);
    escena.add(camara);

	render.setSize(canvasWidth, canvasHeight);

	document.getElementById("canvas-3d").appendChild(render.domElement);

	//definimos luz
	var luz = new THREE.DirectionalLight( 0xffffff, 1 );
	luz.position.set( 0.5, 0.7, 0.75 );
	luz.castShadow = true;
	luz.shadowDarkness = 0.5;
	escena.add( luz );
  
	// creamos terreno
 
	var terrainGeo = TERRAINGEN.Get( parameters );
	var terrainMaterial = new THREE.MeshPhongMaterial( { vertexColors: THREE.VertexColors , shading: (   THREE.FlatShading ) } );
		
	terrain = new THREE.Mesh( terrainGeo, terrainMaterial );
	escena.add(terrain);

}


function webGLStart() {// funcion que inicia todo, llamada desde index.html
	escena_actual = "intro";
	iniciarEscena(); // creamos escena
	cambiarEscena(escena_actual);
 	ultimoTiempo=Date.now();
	document.onkeydown=teclaPulsada;
	document.onkeyup=teclaSoltada;
	animarEscena();
}		


function cambiarEscena(escena){
	eliminarEscena();

	if(escena == "menu"){
		escena_actual="menu";
		mostrarMenu();
	}
		if(escena== "intro"){
			camaraX = 0;
			camaraY = 1;
			camaraZ = 10;
			camara.rotation.x -= 0.1;
		escena_actual = "intro";
		mostrarintro();
	}
}


function eliminarEscena(){

	if(typeof(objetos) != "undefined"){
		objetos.forEach(function(objeto,posicion){ // bucle que recorre los objetos de escena
			escena.remove(objeto);
		});
	}
}


function crearEscena(){
	   	objetos.forEach(function(objeto,posicion){
			escena.add(objeto);
		});
	   
}


function animarEscena(){
	
if(escena_actual == "intro"){
	
	 if( camaraZ < -45){
		 			camaraX = -500;
			camaraY = 300;
			camaraZ = 0;
			camara.rotation.x = 0;
	 	escena_actual = "menu";
			cambiarEscena(escena_actual);
		
  
}else{
	 
	  camaraZ -=0.3;
	//  camaraY +=0.05;
	 
 }
}
	requestAnimFrame(animarEscena); // que se llame en cada frame
	terrain.rotation.y+= 0.002; // rotamos el terreno
	controles(escena_actual); // comprueba los controles
	camara.position.set(camaraX,camaraY,camaraZ); // movemos cámara
    render.render(escena, camara); // renderizamos

}	

