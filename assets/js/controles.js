var TECLA = { C:false, E:false};
var delta;


function teclaPulsada(e)
{
		
		switch (e.keyCode)
	{
					
		case 67: // G
			TECLA.C=true;
			break;
		case 69:
			TECLA.E=true;
			break;

	}

}
			
function teclaSoltada(e)
{
	

		
		switch (e.keyCode)
	{
					
		case 67: // G
			TECLA.C=false;
			break;
		case 69: // J
			TECLA.E=false;
			break;

	}
}


function controles(escena_actual){
	delta=(Date.now()-ultimoTiempo)/1000;
	if (delta>0)
    {

		
	
		if (TECLA.C ) {
			window.location="es/";

		}
		if (TECLA.E ) {

	window.location="en/";

		}	
					
							
	
			
	}
}
