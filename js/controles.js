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
    	if (TECLA.ARRIBA) camaraY += 0.3;
    	if (TECLA.ABAJO) camaraY -= 0.3;

		if (TECLA.DERECHA) camaraX += 0.3;
		if (TECLA.IZQUIERDA)  camaraX -= 0.3;
    				
			renderEscena();
	}
}
