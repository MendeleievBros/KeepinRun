var TECLA = { ARRIBA:false, ABAJO:false, IZQUIERDA:false, DERECHA:false, F:false, A:false, W:false, D:false };
var delta;
var mas = true;

function teclaPulsada(e)
{
	switch (e.keyCode)
	{
					
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


function controles(){
	delta=(Date.now()-ultimoTiempo)/1000;
	if (delta>0)
    {
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
