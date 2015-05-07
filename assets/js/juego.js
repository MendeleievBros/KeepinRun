function mostrarJuego(){
	
	  /* CREACION TEXTO */
// Texto a escribir
theText = "Marcador:";
// Creamos geometria texto pasandole parametros
text3d = new THREE.TextGeometry( theText, {
    size: 0.8,
    height: 0.1,
    curveSegments: 1,
    font: "helvetiker"
});
// Posicionaremos el texto en el centro a partir de su caja de construccion (caja que lo envuelve)
text3d.computeBoundingBox();
centerOffset = -500+(-0.5 * ( text3d.boundingBox.max.x - text3d.boundingBox.min.x ));
                
// Creamos material con color aleatorio
textMaterial = new THREE.MeshBasicMaterial( { color: "#610B0B", overdraw: true } );

// Creamos el mesh uniendo geometria y material
marcador = new THREE.Mesh( text3d, textMaterial );

marcador.position.x = centerOffset-8;
marcador.position.y = 307;
marcador.position.z = -20;

// Renderizamos
	

	
	
     objetos = new Array(marcador );
     CrearParedes = true;
    
    crearEscena();
}
	
