var escena;
var camara;
var render;
var terrain; // fóndo dinámico
var pause;
var puntuacion;

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

function dentro_pared(){
	
	
	if(camaraX > Pizquierda.position.x && camaraX < Pderecha.position.x && camaraY > Pabajo.position.y && camaraY < Parriba.position.y){
		sumarPunto();
	}

	

	
}


function sumarPunto(){
	mostrarProfesor();
	puntuacion += 1;
	eliminarEscena();
	mostrarJuego(puntuacion)


	
}

function crear_cuadros(){

	var Material = new THREE.MeshBasicMaterial({color:"#00FF00"}); // definimos material
    var Material1 = new THREE.MeshBasicMaterial({color:"#FF0000"}); // definimos material rojo
	var CuadroGeometria = new THREE.BoxGeometry(0.3, 4.5, 0.3); // definimos paredes verticales
	
	azarx = aleatorio(-10,10);
	azary = aleatorio(-10,10); 
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
	dentro_pared();
	escena.remove(Pderecha); 
	escena.remove(Pizquierda); 
	escena.remove(Parriba);
	escena.remove(Pabajo);
	crear_cuadros(Math.floor(Math.random() * 2));
}

function movimiento(){
	
	if(escena_actual == "jugar" && !pause){
	// rotamos las paredes verticales
	Pderecha.rotation.x += 0.1;
	Pizquierda.rotation.x += 0.1;
	
    // acercamos la puerta
	Pderecha.position.z+= 0.2;
	Pizquierda.position.z+= 0.2;
	Parriba.position.z+= 0.2;
	Pabajo.position.z+= 0.2;

	if(Pderecha.position.z >= camaraZ){// si el jugador ha cruzado una puerta...
		depurar()
	}
	camara.position.set( camaraX,camaraY,camaraZ);
}
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

}


function iniciarEscena(){
	// definimos camara, escena, render...
	var canvasWidth = screen.width;
	var canvasHeight = screen.height; 

	render = new THREE.WebGLRenderer( { alpha: true } );
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


           var viewFullScreen = document.getElementById("view-fullscreen");
    if (viewFullScreen) {
        viewFullScreen.addEventListener("click", function () {
            var docElm = document.getElementById("canvas-3d");
            if (docElm.requestFullscreen) {
                docElm.requestFullscreen();
            }
            else if (docElm.msRequestFullscreen) {
                docElm.msRequestFullscreen();
            }
            else if (docElm.mozRequestFullScreen) {
                docElm.mozRequestFullScreen();
            }
            else if (docElm.webkitRequestFullScreen) {
                docElm.webkitRequestFullScreen();
            }
        }, false);
    }
        
	


}


function webGLStart() {// funcion que inicia todo, llamada desde index.html
	pause = false;
	escena_actual = "menu";
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
	if(escena == "jugar"){
		puntuacion = 0;
		escena_actual="jugar";
		mostrarJuego(0);
		console.log("llama");
	}
	if(escena== "instrucciones"){
		escena_actual = "instrucciones";
		mostrarinst();
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

function mostrarProfesor(){
	
		/////// draw image on canvas /////////

	// create a canvas element
	var canvas2 = document.createElement('canvas');
	var context2 = canvas2.getContext('2d');
	// canvas contents will be used for a texture
	var texture2 = new THREE.Texture(canvas2);
	
	// load an image
	var imageObj = new Image();
	imageObj.src = "assets/img/profesor_malvado1.png";
	// after the image is loaded, this function executes
	imageObj.onload = function()
	{  
		context2.drawImage(imageObj, 0, 0);
		if ( texture2 ) // checks if texture exists
			texture2.needsUpdate = true;
	};  
      
    var material2 = new THREE.MeshBasicMaterial( {map: texture2, side:THREE.DoubleSide} );
    material2.transparent = true;

    var profesor = new THREE.Mesh(
        new THREE.PlaneGeometry(canvas2.width, canvas2.height),
        material2
      );
	profesor.position.set(camaraX+200,camaraY+25,-350);
	escena.add( profesor );
	
			/////// draw image on canvas /////////

	// create a canvas element
	var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d');
	// canvas contents will be used for a texture
	var texture = new THREE.Texture(canvas);
	
	// load an image
	var imageObj1 = new Image();
	imageObj1.src = "assets/img/bocadillo.png";
	// after the image is loaded, this function executes
	imageObj1.onload = function()
	{  
		context.drawImage(imageObj1, 0, 0);
		if ( texture ) // checks if texture exists
			texture.needsUpdate = true;
	};  
      
    var material = new THREE.MeshBasicMaterial( {map: texture, side:THREE.DoubleSide} );
    material.transparent = true;

    var mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(canvas.width, canvas.height),
        material
      );
	mesh.position.set(camaraX+70,camaraY+30,-350);
	escena.add( mesh );
	
	alerta = true;
	iniciarPausa();
	
	
	
}


function iniciarPausa(){
	pause = true;
	escena.remove(Pderecha); 
	escena.remove(Pizquierda); 
	escena.remove(Parriba);
	escena.remove(Pabajo);
	
	
	
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

function animacion(){
	requestAnimFrame(animacion);
	
	if(camaraZ < 250 && sentido == "+"){ // alejamos cámara
		camaraZ +=1;
	}

	if(camaraZ == 250){ // punto máximo que se aleja
		sentido = "-"; // invertimos sentido
		escena_actual = "instrucciones";
		cambiarEscena(escena_actual); // cambiamos escena
	}
	
	if(sentido == "-" && camaraZ > -1){ // acercamos cámara
		camaraZ -=1;
	}
}





function animarEscena(){
	requestAnimFrame(animarEscena); // que se llame en cada frame
	terrain.rotation.y+= 0.002; // rotamos el terreno
	movimiento();
	controles(escena_actual); // comprueba los controles
	camara.position.set(camaraX,camaraY,camaraZ); // movemos cámara
    render.render(escena, camara); // renderizamos
}	

