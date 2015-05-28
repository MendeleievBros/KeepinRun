var TECLA = { ARRIBA:false, ABAJO:false, IZQUIERDA:false, DERECHA:false, F:false, A:false, W:false, D:false, G:false, J:false, I:false, ESC:false };
var delta;


function teclaPulsada(e)
{
		
		switch (e.keyCode)
	{
					
		case 71: // G
			TECLA.G=true;
			break;
		case 27:
			TECLA.ESC=true;
			break;
		case 74: // J
			TECLA.J=true;
			break;
		case 73: // I
			TECLA.I=true;
			break;
					
		case 37: // Izquierda
			TECLA.IZQUIERDA=true;
			break;
		case 39: // Derecha
			TECLA.DERECHA=true;
			break;
		case 38: // Arriba
			TECLA.ARRIBA=true;
			break;
		case 40: // Abajo
			TECLA.ABAJO=true;
			break;
		case 65: // izquierda
			TECLA.A=true;
			break;
		case 87: // Abajo
			TECLA.W=true;
			break;
		case 68: // Abajo
			TECLA.D=true;
			break;
	}

}
			
function teclaSoltada(e)
{
	

		
		switch (e.keyCode)
	{
					
		case 71: // G
			TECLA.G=false;
			break;
		case 27:
			TECLA.ESC=false;
			break;
		case 74: // J
			TECLA.J=false;
			break;
		case 73: // I
			TECLA.I=false;
			break;
		    
		case 37: // Izquierda
			TECLA.IZQUIERDA=false;
			break;
		case 39: // Derecha
			TECLA.DERECHA=false;
			break;
		case 38: // Arriba
			TECLA.ARRIBA=false;
			break;
		case 40: // Abajo
			TECLA.ABAJO=false;
			break;
		case 70: // F
			TECLA.F=false;
			break;
		case 65: // izquierda
			TECLA.A=false;
			break;
		case 87: // Abajo
			TECLA.W=false;
			break;
		case 68: // Abajo
			TECLA.D=false;
			break;
	}
}


function controles(escena_actual){
	delta=(Date.now()-ultimoTiempo)/1000;
	if (delta>0)
    {

		
	if(escena_actual == "menu"){
		if (TECLA.J ) {
			escena_actual = "jugar";
			crear_cuadros(Math.floor(Math.random() * 2)); // creamos el primer cuadro
			movimiento();
			cambiarEscena(escena_actual);

		}
		if (TECLA.I ) {

			escena_actual = "instrucciones";
			cambiarEscena(escena_actual);

		}
		if (TECLA.G ) {
			window.location="http://mendeleievbros.github.io/KeepinRun/";

						
		}
					
					
					
				}
				
		if(TECLA.ESC){
			if(escena_actual == "jugar"){	
				escena.remove(Pderecha); 
	escena.remove(Pizquierda); 
	escena.remove(Parriba);
	escena.remove(Pabajo);
}
			escena_actual = "menu";
			cambiarEscena(escena_actual);
			
			
		}
		if(escena_actual == "jugar"){
		
    	if (TECLA.ARRIBA) {
	Pderecha.position.y-= 0.3;
	Pizquierda.position.y-= 0.3;
	Parriba.position.y-= 0.3;
	Pabajo.position.y-= 0.3;
		}

    	if (TECLA.ABAJO) {
	Pderecha.position.y+= 0.3;
	Pizquierda.position.y+= 0.3;
	Parriba.position.y+= 0.3;
	Pabajo.position.y+= 0.3;
		}

		if (TECLA.DERECHA){
	Pderecha.position.x-= 0.3;
	Pizquierda.position.x-= 0.3;
	Parriba.position.x-= 0.3;
	Pabajo.position.x-= 0.3;
		}

		if (TECLA.IZQUIERDA) {
							Pderecha.position.x+= 0.3;
	Pizquierda.position.x+= 0.3;
	Parriba.position.x+= 0.3;
	Pabajo.position.x+= 0.3;
		}
}
    				
			
	}
}
