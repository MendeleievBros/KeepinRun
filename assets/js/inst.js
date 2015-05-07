function mostrarinst(){

	// creamos texto....
	texto_inst = "Instrucciones";
	texto_l1 = "Tienes que cruzar los marcadores que aparecen en pantalla.";
	texto_l2 = "Para ello, mueves la camara con las flechas del teclado.";

	textMaterial = new THREE.MeshBasicMaterial( { color: "#610B0B", overdraw: true } ); // color del texto.

	// crear texto de titulo
	text3d_inst = new THREE.TextGeometry( texto_inst, {
		size: 1.4,
		height: 0.5,
		curveSegments: 3,
		font: "helvetiker"
	});

	text3d_inst.computeBoundingBox();
	centerOffset_inst = -500+(-0.5 * ( text3d_inst.boundingBox.max.x - text3d_inst.boundingBox.min.x ));
                
	// crear texto de linea 1                
	text3d_l1 = new THREE.TextGeometry( texto_l1, {
		size: 0.6,
		height: 0,
		font: "helvetiker"
	});

	text3d_l1.computeBoundingBox();
	centerOffset_l1 = -500+(-0.5 * ( text3d_l1.boundingBox.max.x - text3d_l1.boundingBox.min.x ));

	// crear texto de linea 2
	text3d_l2 = new THREE.TextGeometry( texto_l2, {
		size: 0.6,
		height: 0,
		font: "helvetiker"
	});	

	text3d_l2.computeBoundingBox();
	centerOffset_l2 = -500+(-0.5 * ( text3d_l2.boundingBox.max.x - text3d_l2.boundingBox.min.x ));


	// posicionamos las lineas
	titulo = new THREE.Mesh( text3d_inst, textMaterial );
	titulo.position.x = centerOffset_inst;
	titulo.position.y = 305;
	titulo.position.z = -20;
     
	var l1 = new THREE.Mesh( text3d_l1, textMaterial );
	l1.position.x = centerOffset_l1;
	l1.position.y = 302;
	l1.position.z = -25;

	var l2 = new THREE.Mesh( text3d_l2, textMaterial );
	l2.position.x = centerOffset_l2;
	l2.position.y = 301;
	l2.position.z = -25;

	// definimos los objetos
	objetos = new Array(titulo, l1, l2 );
		
    
	crearEscena();
}
	
