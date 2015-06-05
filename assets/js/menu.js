function mostrarMenu(){
	
	  /* CREACION TEXTO */
// Texto a escribir
theText = "Keep in run";
// Creamos geometria texto pasandole parametros
text3d = new THREE.TextGeometry( theText, {
    size: 2,
    height: 0.5,
    curveSegments: 3,
    font: "helvetiker"
});
// Posicionaremos el texto en el centro a partir de su caja de construccion (caja que lo envuelve)
text3d.computeBoundingBox();
centerOffset = -500+(-0.5 * ( text3d.boundingBox.max.x - text3d.boundingBox.min.x ));
                
// Creamos material con color aleatorio
textMaterial = new THREE.MeshBasicMaterial( { color: "#610B0B", overdraw: true } );

// Creamos el mesh uniendo geometria y material
titulo = new THREE.Mesh( text3d, textMaterial );

titulo.position.x = centerOffset;
titulo.position.y = 305;
titulo.position.z = -20;
// Posicionamos texto
titulo.rotation.x = +0.1
// Renderizamos
	
	
  /* CREACION TEXTO */
// Texto a escribir
theText = "Castellano (C)";
// Creamos geometria texto pasandole parametros
text3d = new THREE.TextGeometry( theText, {
    size: 1,
    height: 0.5,
    curveSegments: 3,
    font: "helvetiker"
});
// Posicionaremos el texto en el centro a partir de su caja de construccion (caja que lo envuelve)
text3d.computeBoundingBox();
centerOffset = -500+(-0.5 * ( text3d.boundingBox.max.x - text3d.boundingBox.min.x ));
                
// Creamos material con color aleatorio
textMaterial = new THREE.MeshBasicMaterial( { color: "#610B0B", overdraw: true } );

// Creamos el mesh uniendo geometria y material
var jugar = new THREE.Mesh( text3d, textMaterial );

jugar.position.x = centerOffset;
jugar.position.y = 300;
jugar.position.z = -20;
// Posicionamos texto
jugar.rotation.x = -0.01
// Renderizamos
	
	
		
  /* CREACION TEXTO */
// Texto a escribir
theText = "English (E)";
// Creamos geometria texto pasandole parametros
text3d = new THREE.TextGeometry( theText, {
    size: 1,
    height: 0.3,
    curveSegments: 3,
    font: "helvetiker"
});
// Posicionaremos el texto en el centro a partir de su caja de construccion (caja que lo envuelve)
text3d.computeBoundingBox();
centerOffset = -500+(-0.5 * ( text3d.boundingBox.max.x - text3d.boundingBox.min.x ));
                
// Creamos material con color aleatorio
textMaterial = new THREE.MeshBasicMaterial( { color: "#610B0B", overdraw: true } );

// Creamos el mesh uniendo geometria y material
inst = new THREE.Mesh( text3d, textMaterial );

inst.position.x = centerOffset;
inst.position.y = 298;
inst.position.z = -20;
// Posicionamos texto

		
 
objetos = new Array(titulo, jugar , inst);
    CrearParedes = false;
    
crearEscena();
}
	
