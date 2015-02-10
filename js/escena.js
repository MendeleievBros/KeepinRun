var escena;
var camara;
var ultimoTiempo; // para controlar las teclas
var render;

var derechaX; //coordenadas de las puertas
var izquierdaX;//coordenadas de las puertas
var altura_u; //coordenadas de las puertas
var altura_d;//coordenadas de las puertas


var actual = 0; // para saber si se ha cruzado una puerta
var zpos; // coordenada x de la puerta siguiente

var camaraX = 0; // coordenadas de la camara
var camaraY = 0;// coordenadas de la camara
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

var text, theText, text3D, textMaterial, centerOffset;

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

function cruzarCuadros(){

	if(derechaX >= camaraX && izquierdaX <= camaraX && altura_u >= camaraY && altura_d <= camaraY){
		puntos +=1;
		
		if(velocidad > 0){
			mostrar();
			puertas_velocidad +=1;
			if(puertas_velocidad == 10){
				ocultar();
				puertas_velocidad = 0;
				velocidad -=0.01;
			}
		animateprogress("#progreso",puertas_velocidad*10);
		}
	}else{
		if(derechaX+2 >= camaraX && izquierdaX-2 <= camaraX && altura_u+2 >= camaraY && altura_d-2 <= camaraY){
			puntos +=0.5;
			
		}else{
			velocidad += 0.01;
			puertas_velocidad = 0
			animateprogress("#progreso",puertas_velocidad*10);
			ocultar();
		}
	}
	document.getElementById("marcador").innerHTML =puntos;
			
}



function movimiento(){
	// rotamos las paredes verticales
	Pderecha.rotation.x += 0.1;
	Pizquierda.rotation.x += 0.1;
	camaraZ -= 0.2+velocidad; // movemos camara

	if(actual == Math.floor(camaraZ)){// si el jugador ha cruzado una puerta...
		cruzarCuadros();
		crear_cuadros();
	}

	camara.position.set(camaraX, camaraY, camaraZ);

}

function crear_cuadros(){
	

	if(typeof(Pderecha) != "undefined"){ // eliminamos la puerta anterior si existe
		escena.remove(Pderecha); 
		escena.remove(Pizquierda); 
		escena.remove(Parriba);
		escena.remove(Pabajo);
			zpos = actual -20; // definimos posición de la puerta
	}else{
			
		zpos = actual -40; // definimos posición de la puerta
		
	}



	var Material = new THREE.MeshBasicMaterial({color:"#00FF00"}); // definimos material
    var Material1 = new THREE.MeshBasicMaterial({color:"#FF0000"}); // definimos material rojo
	var CuadroGeometria = new THREE.BoxGeometry(0.3, 4.5, 0.3); // definimos paredes verticales
	
	azarx = aleatorio(-10,10);
	azary = aleatorio(-5,5); 
	azars = aleatorio(-3,3);
			
	derechaX = camaraX+3+azarx+azars;
	izquierdaX = camaraX-3+azarx;
                   
	Pderecha = new THREE.Mesh(CuadroGeometria, Material);      
	Pderecha.position.set(derechaX, camaraY+azary, zpos);
	escena.add(Pderecha);
				
	/////////
                
	Pizquierda = new THREE.Mesh(CuadroGeometria, Material);

	Pizquierda.position.set(izquierdaX, camaraY+azary, zpos);

	escena.add(Pizquierda);

	actual =zpos;
	/////////
				
	var largo = Math.abs(derechaX - izquierdaX)+0.3;
	var posx = (derechaX+izquierdaX)/2;
	var larguero = new THREE.BoxGeometry(largo, 0.3, 0.3);
	altura_u =3+camaraY
	Parriba = new THREE.Mesh(larguero, Material);
             
	Parriba.position.set(posx, altura_u+azary, zpos);
				
	escena.add(Parriba);
				
	/////////
	altura_d =-3+camaraY
	Pabajo = new THREE.Mesh(larguero, Material);
             
	Pabajo.position.set(posx, altura_d+azary, zpos);
				
	escena.add(Pabajo);
	
	
	ancho_medio = ( derechaX+izquierdaX)/2;			
	altura_media = (altura_u+altura_d)/2;
    
    
    var MedioGeometria = new THREE.BoxGeometry(0.7, 0.7, 0.7); // definimos paredes verticales
	
                   
	//Pmedio = new THREE.Mesh(MedioGeometria, Material1);      
	//Pmedio.position.set(ancho_medio, altura_media+azary, zpos);
	//escena.add(Pmedio);



	var delta=(Date.now()-contador)/1000;
	
		if(delta > 5){
			contador = Date.now();
			
			
	
		}
	
				

}

			function iniciarEscena(){
				//Render
				render = new THREE.WebGLRenderer();

				render.setClearColor(0x000000, 1);

				var canvasWidth = 650;
				var canvasHeight = 500;
				render.setSize(canvasWidth, canvasHeight);

				document.getElementById("canvas").appendChild(render.domElement);

				//Escena
				escena = new THREE.Scene();

				//Camara
				camara = new THREE.PerspectiveCamera(45, canvasWidth / canvasHeight, 0.1, 100);
				camara.position.set(camaraX, camaraY, camaraZ);
				camara.lookAt(escena.position);
				escena.add(camara);
				
				//luz

                crear_cuadros(Math.floor(Math.random() * 2));
                
                
                /* CREACION TEXTO */
// Texto a escribir
theText = "Keep in Run";
// Creamos geometria texto pasandole parametros
text3d = new THREE.TextGeometry( theText, {
    size: 1,
    height: 1,
    curveSegments: 2,
    font: "helvetiker"
});
// Posicionaremos el texto en el centro a partir de su caja de construccion (caja que lo envuelve)
text3d.computeBoundingBox();
centerOffset = -0.5 * ( text3d.boundingBox.max.x - text3d.boundingBox.min.x );
                
// Creamos material con color aleatorio
textMaterial = new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff, overdraw: true } );

// Creamos el mesh uniendo geometria y material
text = new THREE.Mesh( text3d, textMaterial );

// Posicionamos texto
text.position.x = centerOffset;
text.position.z = actual;

// Renderizamos
escena.add(text);
                
        
 

			}
			function renderEscena(){
				render.render(escena, camara);
			}

			function animarEscena(){
               
				movimiento();
		controles();
    			ultimoTiempo=Date.now();
    			
    			requestAnimFrame(animarEscena);
				
			}

			function webGLStart() {
				marcador = document.getElementById("marcador");

				iniciarEscena();
				ultimoTiempo=Date.now();
				contador = Date.now();
				
				document.onkeydown=teclaPulsada;
				document.onkeyup=teclaSoltada;

				animarEscena();
			
			}		
