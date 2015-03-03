var escena;
var camara;
var ultimoTiempo; // para controlar las teclas
var render;
var terrain;

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

var marcador; // para debug en pantalla
var puntos = 0;

var altura_media; // para saber el centro de la puerta
var ancho_medio; // para saber el centro de la puerta

var velocidad = 0; // variable que aumenta la velocidad por cada puerta fallada
var contador; // contador para crear objetos
var puertas_velocidad = 0; // contador de puertas cruzadas para bajar la velocidad

var text, theText, text3D, textMaterial, centerOffset; // para mostrar texto en pantalla


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
};   // parametros para generar las montañas, colores, altura, tamaño...
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

function crear_cuadros(){

	var Material = new THREE.MeshBasicMaterial({color:"#00FF00"}); // definimos material
    var Material1 = new THREE.MeshBasicMaterial({color:"#FF0000"}); // definimos material rojo
	var CuadroGeometria = new THREE.BoxGeometry(0.3, 4.5, 0.3); // definimos paredes verticales
	
	azarx = aleatorio(-10,10);
	azary = aleatorio(0,5); 
	azars = aleatorio(-3,3);
			
	derechaX = camaraX+3+azarx+azars;
	izquierdaX = camaraX-3+azarx;
                   
	Pderecha = new THREE.Mesh(CuadroGeometria, Material);      
	Pderecha.position.set(derechaX, camaraY+azary, -40);
	escena.add(Pderecha);
				
	/////////
                
	Pizquierda = new THREE.Mesh(CuadroGeometria, Material);

	Pizquierda.position.set(izquierdaX, camaraY+azary, -40);

	escena.add(Pizquierda);

	/////////
				
	var largo = Math.abs(derechaX - izquierdaX)+0.3;
	var posx = (derechaX+izquierdaX)/2;
	var larguero = new THREE.BoxGeometry(largo, 0.3, 0.3);
	altura_u =3+camaraY
	Parriba = new THREE.Mesh(larguero, Material);
             
	Parriba.position.set(posx, altura_u+azary,-40);
				
	escena.add(Parriba);
				
	/////////
	altura_d =-3+camaraY
	Pabajo = new THREE.Mesh(larguero, Material);
             
	Pabajo.position.set(posx, altura_d+azary, -40);
				
	escena.add(Pabajo);
	
	ancho_medio = ( derechaX+izquierdaX)/2;			
	altura_media = (altura_u+altura_d)/2;
    
    
    var MedioGeometria = new THREE.BoxGeometry(0.7, 0.7, 0.7); // definimos paredes verticales
	
}

function depurar(){
	escena.remove(Pderecha); 
	escena.remove(Pizquierda); 
	escena.remove(Parriba);
	escena.remove(Pabajo);
	crear_cuadros(Math.floor(Math.random() * 2));
}

function movimiento(){
	// rotamos las paredes verticales
	Pderecha.rotation.x += 0.1;
	Pizquierda.rotation.x += 0.1;
	
    // acercamos la puerta
	Pderecha.position.z+= 0.2;
	Pizquierda.position.z+= 0.2;
	Parriba.position.z+= 0.2;
	Pabajo.position.z+= 0.2;

	camara.position.set( camaraX,camaraY,camaraZ);
}

function iniciarEscena(){
	// definimos camara, escena, render...
	var canvasWidth = 650;
	var canvasHeight = 500; 
		
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
		
	crear_cuadros(Math.floor(Math.random() * 2)); // creamos el primer cuadro

}

function webGLStart() {
		
	iniciarEscena(); // creamos escena

 	ultimoTiempo=Date.now();
				
	document.onkeydown=teclaPulsada;
	document.onkeyup=teclaSoltada;
	
	animarEscena();
	

}		
			
function animarEscena(){
	requestAnimFrame(animarEscena);

	terrain.rotation.y+= 0.002;
	movimiento()
	controles()
	if(Pderecha.position.z >= camaraZ){// si el jugador ha cruzado una puerta...
		depurar()
	}
	camara.position.set(camaraX,camaraY,camaraZ);
    render.render(escena, camara);
}	

