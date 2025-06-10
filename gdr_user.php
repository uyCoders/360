<?php
require_once("js/clases.php");

ini_set('display_errors', 1);

header('Content-Type: text/html; charset=utf-8');
//zona horarios de mexico
date_default_timezone_set('America/Mexico_City');
$fechad=date("Y-m-d H:i:s");
$hoy=date("Y-m-d");
$origen = "web";

$data = array();

//array para el JSON
$response = array (
	"nombre" => "",
	"success" => 0,
	"idregistro" => 0,
	"error" => 0,
	"error_msg" => ""
);

//vigencia de promocion
$vigencia=true;

if (isset($_POST['nombre']) && isset($_POST['especialidad']) && isset($_POST['telefono']) && isset($_POST['email']) ) {
	//verifica vigencia
	if($vigencia){
		//pasa datos del post a nuestro array usamos una sola variable
		$data =array_map('trim',$_POST);
		//$data['origen']=$origen;
		$data['fecha']=$fechad;
		$data['folio']="";
		$data['hoy']=$hoy;
		$data['ip']=$_SERVER['REMOTE_ADDR'];
		//valida datos
		$valid = TRUE;

		//nombre
		if (!preg_match('/^([a-zA-Z ñáéíóú]{2,60})$/i', $data['nombre'])) {
			$response["error_msg"].="El campo nombre solo permite letras. ";
			$valid = false;
		}

    	if (!preg_match('/^([a-zA-Z ñáéíóú]{2,60})$/i', $data['especialidad'])) {
			$response["error_msg"].="El campo nombre solo permite letras. ";
			$valid = false;
		}

		//celular
		if (!preg_match('/^[0-9]{10,10}$/', $data['telefono'])) {
			$response["error_msg"].= 'Solo números para el celular 10 dígitos. ';
			$valid = false;
		}

		//correo
		if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
			$response["error_msg"].= 'Correo invalido. ';
			$valid = false;
		}

		//guarda registro
		if($valid){
			//si el codigo aun no esta registrado primero guardo registro
			$existe=Usuarios::buscaUsuario($data['email']);
			if($existe['encontrado']=="si"){
				//ya existe el usuario
				$response["error_msg"]="Usuario ya existente";
			}else{
				$response["error_msg"]="usuario nuevo";
				$regre = Usuarios::regUsuario($data);

				$existe=Usuarios::buscaUsuario($data['email']);
				//print_r($existe);
				if($existe['encontrado']=="si"){
					//actualiza folio
					//$folio = "548790".$existe['id'];
					$folio = str_pad($existe['id'],5,"0",STR_PAD_LEFT);
					Usuarios::regFolio($folio,$existe['id']);

					$response["error_msg"]="Registro correcto";
					$response["success"]=1;
					$response["folio"]=$folio;

					//manda correo
					$asunto ="Registro KitosCell Q";

					$cuerpo='
					<!doctype html>
					<html lang="es">
					<head>
						<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
						<title>CELLPHARMA</title>
					</head>
					<body>
						<div style="padding-top: 20px; padding-bottom: 20px; text-align: center; color: black; background-image: url(https://standcellpharma.com/img/registro/Recurso%204BOTONES.jpg); background-repeat: no-repeat; background-size: cover;">
							<p>
								<span style=" font-weight: bold; font-size: larger;">Estimado congresista del XIV</span><br>
								<span style=" font-weight: bold; font-size: larger;">Congreso Internacional AMCICHAC:</span><br><br><br>
								<span style="font-weight: bold; text-align: left;">Usted se registró en el stand Cell Pharma para participar por un certificado de regalo www.amazon.com.mx con valor de $500 MXN.</span><br><br><br>
								<img src="https://standcellpharma.com/img/registro/Recurso%202BOTONES.png" alt="regalo">
							</p>
							<p>
								<span style="font-weight: bold; color: #0067B5;">No. de participación</span><br>
								<span style="color: #0067B5; font-size: x-large; font-weight: bold;">'.$folio.'</span> <br><br><br>
							</p>
							<p>
								<span style="font-weight: bold;">Su participación está confirmada.</span><br>
								<span style="font-weight: bold;">El sábado 12 de septiembre del 2020, a las 17:00 hs, después de la rifa se anunciarán a los ganadores.</span><br><br><br>
								<span style=" font-weight: bold; font-size: larger;">¡Buena suerte!</span><br>
							</p>
						</div>
					</body>
					</html>';
					$headers = "MIME-Version: 1.0\r\n";
					$headers .= "Content-type: text/html; charset=iso-8859-1\r\n";
					$headers .= "From: contacto@standcellpharma.com\r\n";
					$headers .= "Reply-To: contacto@standcellpharma.com\r\n";
					$headers .= "Return-path: contacto@standcellpharma.com\r\n";

					mail($data['email'],$asunto,utf8_decode($cuerpo),$headers);
				}else{
					$response["error_msg"]="Error de registro";
				}
			}
		}
	}else{
		$response["error_msg"]="Fuera de vigencia.";
	}
}else{

	//$response["error_msg"]="El formato de la fecha de nacimiento es incorrecto (Ej: aaaa-mm-dd) y recuerde no dejar espacios.";
	$response["error_msg"]="Todos los datos son obligatorios";
	//header("Location: registro.php");
}

echo json_encode($response);

?>
