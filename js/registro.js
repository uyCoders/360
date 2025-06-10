$(document).ready(function() {

$("#btRegistra").click(function(event) {
  /* Act on the event */

  $("#errorMsg").hide();

  var nombre = $.trim($("#nombre").val());
  if (nombre.length == 0 ) {
    $("#errorMsg").show();
    $("#errorMsg").html('Debe proporcionar su nombre.');
    $("#nombre").focus();
    return false;
  }
  var especialidad = $.trim($("#especialidad").val());
  if (especialidad.length == 0 ) {
    $("#errorMsg").show();
    $("#errorMsg").html('Debe proporcionar su especialidad.');
    $("#especialidad").focus();
    return false;
  }
  var telefono = $.trim($("#telefono").val());
  if (telefono.length == 0 ) {
    $("#errorMsg").show();
    $("#errorMsg").html('Debe proporcionar su teléfono.');
    $("#telefono").focus();
    return false;
  }

  var email = $.trim($("#email").val());
  if (email.length == 0 ){
    $("#errorMsg").show();
    $("#errorMsg").html('Debe proporcionar su email.');
    $("#email").focus();
    return false;
  }else{
    if (valEmail(email)){
    }else{
      $("#errorMsg").show();
      $("#errorMsg").html('El formato del email'+' '+email+' '+'no es correcto');
      $("#email").focus();
      return false;
    }
  }

  var data = $("#formregistro").serialize();
  var pathPost="gdr_user.php";

  var xhr_posts = $.post(pathPost, data, function(data) {
    var json= $.parseJSON(data);
    if(json.success==1){
      // insertado
      $("#folio").html(json.folio)
      $("#miRegistro").hide();
      $("#miGracias").show();
    }else{
      $("#errorMsg").show();
      $("#errorMsg").html(json.error_msg);
    }
  });
  xhr_posts.fail(function(data){

    $("#errorMsg").show();
    $("#errorMsg").html(json.error_msg);
  });

  return false;
});




});  //termina ready


//
//
//  F U N C I O N E S
//
//

//VALIDA CORREO

function valEmail(valor){

	re=/^[_a-zA-Z0-9-]+(.[_a-zA-Z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,3})$/;
	if(!re.exec(valor))
	{
		//alert("El correo no es correcto");
		return false;
	}else{
		return true;
	}
}


function permite(elEvento, permitidos) {

  var numeros = "0123456789";
  var caracteres = " abcdefghijklmnÃ±opqrstuvwxyzABCDEFGHIJKLMNÃ‘OPQRSTUVWXYZ";
  var numeros_caracteres = numeros + caracteres;
  var teclas_especiales = [8, 37, 39, 46, 9];

  // 8 = BackSpace, 46 = Supr, 37 = flecha izquierda, 39 = flecha derecha, 9 = tabulador
  // Seleccionar los caracteres a partir del parÃ¡metro de la funciÃ³n
  switch(permitidos) {

    case 'num':
      permitidos = numeros;
      break;
    case 'car':
      permitidos = caracteres;
      break;
    case 'num_car':
      permitidos = numeros_caracteres;
      break;
  }

  // Obtener la tecla pulsada
  var evento = elEvento || window.event;
  var codigoCaracter = evento.charCode || evento.keyCode;
  var caracter = String.fromCharCode(codigoCaracter);
  var tecla_especial = false;

  for(var i in teclas_especiales) {

    if(codigoCaracter == teclas_especiales[i]) {
      tecla_especial = true;
      break;
    }
  }

  return permitidos.indexOf(caracter) != -1 || tecla_especial;

}


/*
^L\s[A-Z][A-Z]\s[0-9][0-9]\s[0-9]\s[0-9][0-9]:[0-9][0-9]
cadena estructura tang

*/
