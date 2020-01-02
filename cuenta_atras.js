const tiempo_disponible = 86400;


$(document).ready(function() {
	
	
	if (localStorage.getItem("activado") == undefined) {
		$('#boton_question').show();
		$('#main_container').hide();
		$('#oculto').hide();
	} else {
		$('#boton_question').hide();
		$('#main_container').show();
		$('#oculto').hide();
		realizar_cuenta_atras();
	}

	$(window).on("unload", function(e){

	});

	// en el momento que se pulse el botón de inicio, se hace visible el container
	$('#question_img').click(function(){
		localStorage.setItem("activado", true);
		$('#boton_question').hide();
		$('#main_container').show();
		$('.candado').hide();
		$('.check').hide();
		establecer_hora();
		realizar_cuenta_atras();
    });

    $('#boton_comprobar').click(function(){
    	comprueba();
    });

	//$('#contenido').addClass('text-center');

	function establecer_hora(){
		// Se recoge la fecha y hora para comenzar la cuenta atras	
		const fecha_ini = new Date();
		const fecha_fin = new Date();
		fecha_fin.setSeconds(fecha_ini.getSeconds() + tiempo_disponible);
		localStorage.setItem("fecha_ini", fecha_ini);
		localStorage.setItem("fecha_fin", fecha_fin);
	}

	function realizar_cuenta_atras(){
		if (localStorage.getItem("correctos") == 4){
			$('#oculto').show();
			$('#main_container').hide();
			$('#boton_question').hide();
		} else {
			rellenar_valores_correctos();
		}
		
		const display = $('#tiempo');
		Timer(display);
	}

	function rellenar_valores_correctos(){
		if (localStorage.getItem('e1i1') && localStorage.getItem('e1i2')){
			$('#e1i1').val(localStorage.getItem('e1i1')).addClass("btn-outline-success");
			$('#e1i2').val(localStorage.getItem('e1i2')).addClass("btn-outline-success");
			$('#check_e1').show();
		}
		if (localStorage.getItem('e2i1') && localStorage.getItem('e2i2') && localStorage.getItem('e2i3') && localStorage.getItem('e2i4')){
			$('#e2i1').val(localStorage.getItem('e2i1')).addClass("btn-outline-success");
			$('#e2i2').val(localStorage.getItem('e2i2')).addClass("btn-outline-success");
			$('#e2i3').val(localStorage.getItem('e2i3')).addClass("btn-outline-success");
			$('#e2i4').val(localStorage.getItem('e2i4')).addClass("btn-outline-success");
			$('#check_e2').show();
		}
		if (localStorage.getItem('e3i1') && localStorage.getItem('e3i2') && localStorage.getItem('e3i3')){
			$('#e3i1').val(localStorage.getItem('e3i1')).addClass("btn-outline-success");
			$('#e3i2').val(localStorage.getItem('e3i2')).addClass("btn-outline-success");
			$('#e3i3').val(localStorage.getItem('e3i3')).addClass("btn-outline-success");
			$('#check_e3').show();
		}
		if (localStorage.getItem('e4i1')){
			$('#e4i1').val(localStorage.getItem('e4i1')).addClass("btn-outline-success");
			$('#check_e4').show();
		}
	}
	
	function Timer( display) 
	{
		const f_fin = Date.parse(localStorage.getItem("fecha_fin"));
		//var timer = duration, hours, minutes, seconds;
	    reloj = setInterval(function () {
	    	var ahora = new Date();
	    	var res = (f_fin - ahora)/1000;
	    	console.log(res);
	        hours = parseInt((res /3600)%24, 10)
	        minutes = parseInt((res / 60)%60, 10)
	        seconds = parseInt(res % 60, 10);

	        hours = hours < 10 ? "0" + hours : hours;
	        minutes = minutes < 10 ? "0" + minutes : minutes;
	        seconds = seconds < 10 ? "0" + seconds : seconds;

	        display.text(hours +" : "+minutes + " : " + seconds);
	        if (res <= 10){
	        	display.addClass('text-danger');
	        } else if (res == 0){
	        	detenerReloj();
	        }
	        	        
	    }, 1000);

	    function detenerReloj() { 
      		clearInterval(reloj); 
    	}
	}

	
	// cuando se cierre la ventana, se guarda en localStorage todo lo de inicio y los segundos
	// que quedan.
	 

	// cuando se pulsa el boton comprobar, comprueba todos los campos.
	// El que esté correcto muestra el check y oculta el lockfilled y si no es correcto lo 
	// contrario. Y ademas añade la clase para poner el borde de los inputs rojo o verdde
	function comprueba(){
		var correctos = 0;
		// Comprobamos el Enigma 1 - cuadrados cortados
		const e1i1 = $('#e1i1').val();
		const e1i2 = $('#e1i2').val();
		var res = e1i1 + e1i2;
		if (res == "42") {
			// muestro el icono adecuado y el color adecuado y oculto los otros
			// almaceno en localStorage los valores correctos
			$('#candado_e1').hide();
			$('#check_e1').show();
			$('#e1i1').removeClass("btn-outline-danger").addClass("btn-outline-success");
			$('#e1i2').removeClass("btn-outline-danger").addClass("btn-outline-success");
			localStorage.setItem("e1i1", e1i1);
			localStorage.setItem("e1i2", e1i2);
			correctos+=1;
		} else {
			$('#candado_e1').show();
			$('#check_e1').hide();
			$('#e1i1').removeClass("btn-outline-success").addClass("btn-outline-danger");
			$('#e1i2').removeClass("btn-outline-success").addClass("btn-outline-danger");
		}

		// Comprobamos el Enigma 2 - La cajonera
		const e2i1 = $('#e2i1').val();
		const e2i2 = $('#e2i2').val();
		const e2i3 = $('#e2i3').val();
		const e2i4 = $('#e2i4').val();
		var res = e2i1 + e2i2 + e2i3 + e2i4;
		if (res == "3649") {
			$('#candado_e2').hide();
			$('#check_e2').show();
			$('#e2i1').removeClass("btn-outline-danger").addClass("btn-outline-success");
			$('#e2i2').removeClass("btn-outline-danger").addClass("btn-outline-success");
			$('#e2i3').removeClass("btn-outline-danger").addClass("btn-outline-success");
			$('#e2i4').removeClass("btn-outline-danger").addClass("btn-outline-success");
			localStorage.setItem("e2i1", e2i1);
			localStorage.setItem("e2i2", e2i2);
			localStorage.setItem("e2i3", e2i3);
			localStorage.setItem("e2i4", e2i4);
			correctos+=1;
		} else {
			console.log("Enigma 2 mal");
			$('#candado_e2').show();
			$('#check_e2').hide();
			$('#e2i1').removeClass("btn-outline-success").addClass("btn-outline-danger");
			$('#e2i2').removeClass("btn-outline-success").addClass("btn-outline-danger");
			$('#e2i3').removeClass("btn-outline-success").addClass("btn-outline-danger");
			$('#e2i4').removeClass("btn-outline-success").addClass("btn-outline-danger");
		}

		// Comprobamos el Enimga 3 - El candado
		const e3i1 = $('#e3i1').val();
		const e3i2 = $('#e3i2').val();
		const e3i3 = $('#e3i3').val();
		var res = e3i1 + e3i2 + e3i3;
		if (res == "291"){
			$('#candado_e3').hide();
			$('#check_e3').show();
			$('#e3i1').removeClass("btn-outline-danger").addClass("btn-outline-success");
			$('#e3i2').removeClass("btn-outline-danger").addClass("btn-outline-success");
			$('#e3i3').removeClass("btn-outline-danger").addClass("btn-outline-success");
			localStorage.setItem("e3i1", e3i1);
			localStorage.setItem("e3i2", e3i2);
			localStorage.setItem("e3i3", e3i3);
			correctos+=1;
			
		} else {
			console.log("Enigma 3 mal");
			$('#candado_e3').show();
			$('#check_e3').hide();
			$('#e3i1').removeClass("btn-outline-success").addClass("btn-outline-danger");
			$('#e3i2').removeClass("btn-outline-success").addClass("btn-outline-danger");
			$('#e3i3').removeClass("btn-outline-success").addClass("btn-outline-danger");
		}

		// Comprobamos el Enigma 4 - La piramide
		const e4i1 = $('#e4i1').val();
		var res = e4i1;
		if (res == "b" || res== "B"){
			$('#candado_e4').hide();
			$('#check_e4').show();
			$('#e4i1').removeClass("btn-outline-danger").addClass("btn-outline-success");
			localStorage.setItem("e4i1", e4i1);
			correctos+=1;
		} else {
			console.log("Enigma 4 mal");
			$('#candado_e4').show();
			$('#check_e4').hide();
			$('#e4i1').removeClass("btn-outline-success").addClass("btn-outline-danger");
		}

		localStorage.setItem("correctos", correctos);
		// Si todos están correctos, se muestra un mensaje
		if (correctos == 4) {
			$('#oculto').show();
			$('#main_container').hide();
			$('#boton_question').hide();
		}
	} 

	
	
  
 
});

