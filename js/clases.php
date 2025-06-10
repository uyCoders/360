<?php
/***********************
conexion a base de datos
***********************/
class dbMySQL{

	//local
	/*private $host = "localhost";
	private $usuario = "root";
	private $clave = "";
	private $db = "pharma";
	private $conn;*/

	//produccion
	private $host = "localhost";
	private $usuario = "standcel_dev0120";
	private $clave = 'o+D}pk$ANdPI';
	private $db = "standcel_cong20";
	private $conn;



	//conexion a base de datos
	public function __construct(){
		$this->conn = mysqli_connect($this->host, $this->usuario, $this->clave, $this->db);
		if(mysqli_connect_error()){
			printf("Error en la conexion a la base de datos: %d",mysqli_connect_error());
			exit;
		}else{
			//printf("Conexion exitosa.<br>");
		}
	}

	//query
	public function query($q, $op=true){
		$data = array();
		if($q!=""){
			if($r=mysqli_query($this->conn, $q)){
				if($op)@$data = mysqli_fetch_row($r);
			}
		}
		return $data;
	}

	public function query2($q){
		$data = array();
		if($q!=""){
			if($r=mysqli_query($this->conn, $q)){
				while($row =  mysqli_fetch_row($r)){
					array_push($data, $row);
				}
			}
		}
		return $data;
	}

	//cerrar conexion a base de datos
	public function close(){
		mysqli_close($this->conn);
		//print "Cerrar la conexion de forma exitosa";
	}
}


/***********************
funcion para usuarios
***********************/
class Usuarios{
	private $id;
	private $correo;

	function __construct(){	}

	public static function regFolio($folio, $miId){
		$db = new dbMySQL();
		$data = $db->query("UPDATE `tbl_registro` SET `cFolio` = '".$folio."' WHERE `tbl_registro`.`nId` = '".$miId."';");
		$db->close();
		unset($db);

	}
	public static function buscaUsuario($correo){
		$respuest=array();
		$cuantos = 0;
		$nombre = "";

		$db = new dbMySQL();
		$data = $db->query("SELECT COUNT(*) cuantos FROM `tbl_registro` WHERE `cCorreo`='".$correo."'");
		$db->close();
		unset($db);

		$cuantos = $data[0];


		if($cuantos>=1){

			$db = new dbMySQL();
			$data = $db->query("SELECT `cNombre`, `cFolio`, `nId` FROM `tbl_registro` WHERE `cCorreo`='".$correo."'");
			$db->close();
			unset($db);
			$nombre = $data[0];
			$folio = $data[1];
			$id = $data[2];

			$respuest=array("encontrado"=>"si","nombre"=>$nombre,"correo"=>$correo,"folio"=>$folio,"id"=>$id);
		}else{
			$respuest=array("encontrado"=>"no","err"=>"Este usuario no existe.");
		}
		return $respuest;
	}

	public static function regUsuario($data){
		$db = new dbMySQL();
		$db->query("SET NAMES 'utf8'");

		if ($data['nombre']!='' && $data['especialidad']!='' && $data['telefono']!='' && $data['email']!=''){
			$dateReg = $db->query("INSERT INTO `tbl_registro` (`cNombre`, `cEspecialidad`, `cTelefono`, `cCorreo`, `cFolio`, `cFecha`) VALUES('".$data['nombre']."','".$data['especialidad']."','".$data['telefono']."', '".$data['email']."','".$data['folio']."','".$data['fecha']."')");
			$db->close();
			unset($db);


		}
	}
}



/***********************
    F U N C I O N E S
***********************/


/***********************
dentro de un rango de dias
***********************/
function check_in_range($start_date, $end_date, $evaluame) {
    $start_ts = strtotime($start_date);
    $end_ts = strtotime($end_date);
    $user_ts = strtotime($evaluame);
    return (($user_ts >= $start_ts) && ($user_ts <= $end_ts));
}


//calcula diferencia entre dos fecha->tiempo transcurrido
function timeBetween($desde,$hasta) {
    $ini = explode(" ",$desde);
    $fIni = $ini[0];
    $hIni = $ini[1];
    $fIni = explode("-",$fIni);
    $hIni = explode(":",$hIni);

    $fin = explode(" ",$hasta);
    $fFin = $fin[0];
    $hFin = $fin[1];
    $fFin = explode("-",$fFin);
    $hFin = explode(":",$hFin);

    $anos = $fFin[0] - $fIni[0];
    $meses = $fFin[1] - $fIni[1];
    $dias = $fFin[2] - $fIni[2];
    $horas = $hFin[0] - $hIni[0];
    $minutos = $hFin[1] - $hIni[1];
    $segundos = $hFin[2] - $hIni[2];

    if ($segundos < 0) {
        $minutos--;
        $segundos = 60 + $segundos;
    }
    if ($minutos < 0) {
        $horas--;
        $minutos = 60 + $minutos;
    }
    if ($horas < 0) {
        $dias--;
        $horas = 24 + $horas;
    }
    if ($dias < 0)
    {
        --$meses;
        switch ($fIni[1]) {
            case 1:     $dias_mes_anterior=31; break;
            case 2:     $dias_mes_anterior=31; break;
            case 3:
                if (checkdate(2,29,$fIni[0]))
                {
                    $dias_mes_anterior=29; break;
                } else {
                    $dias_mes_anterior=28; break;
                }
            case 4:     $dias_mes_anterior=31; break;
            case 5:     $dias_mes_anterior=30; break;
            case 6:     $dias_mes_anterior=31; break;
            case 7:     $dias_mes_anterior=30; break;
            case 8:     $dias_mes_anterior=31; break;
            case 9:     $dias_mes_anterior=31; break;
            case 10:     $dias_mes_anterior=30; break;
            case 11:     $dias_mes_anterior=31; break;
            case 12:     $dias_mes_anterior=30; break;
        }

        $dias=$dias + $dias_mes_anterior;
    }
    if ($meses < 0)
    {
        --$anos;
        $meses = $meses + 12;
    }
    return array("ayos" => $anos,
                "meses" => $meses,
                "dias" => $dias,
                "horas" => $horas,
                "minutos" => $minutos,
                "segundos" => $segundos);
}
//fin calcula diferencia


//LIMPIA INYECCION
function limpiaInyeccion($eldato)
{

	$nopermitidos = array("INSERT ","insert ","VALUES ","values ","INTO ","into ","SELECT ","select ","FROM "," from ",
	" ORDER "," order "," GROUP "," group "," count "," COUNT ","TRUNCATE ","truncate ","UPDATE ","update ","DROP ","drop ",
	"PRINTER ","printer ",
	" TABLE "," table ","DELETE ","delete "," DEL "," del ","REPLACE ","replace ","DATABASE ","database "," PRIMARY "," primary ",
	"CREATE ","create "," ORDER "," order "," WHERE "," where "," VALIDATE "," validate "," CLOSE "," close "," BROWSE "," browse ",
	" ESCAPE "," escape ","MODIFY ","modify ","QUERY ","query "," SQL "," sql ","PATH ","path ","DATA ","data ","HOME ","home ",
	"HAVING ","having ","DISTINCT ","distinct "," BETWEEN "," between "," SUM "," sum "," USE "," use "," ALL "," all ","OPEN ","open ",
	" OR "," or "," LIKE "," like "," AND "," and "," NULL "," null "," SET "," set "," KEY "," key "," IN "," in "," BY "," by "," AS "," as ");

	$datomayus=strtoupper ($eldato);
	$regres_may=str_replace($nopermitidos, "", $datomayus);

	$datominus=strtolower($regres_may);
	$regreso_min=str_replace($nopermitidos, "", $datominus);

	$regreso=strtoupper($regreso_min);

	return $regreso;

}

function normaliza ($cadena){
    $originales = 'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞ
ßàáâãäåæçèéêëìíîïðñòóôõöøùúûýýþÿŔŕ';
    $modificadas = 'aaaaaaaceeeeiiiidnoooooouuuuy
bsaaaaaaaceeeeiiiidnoooooouuuyybyRr';
    $cadena = utf8_decode($cadena);
    $cadena = strtr($cadena, utf8_decode($originales), $modificadas);
    $cadena = strtoupper($cadena);
	$nopermitidos = array("'",'\\','<','>',"\"",";",":");
    $cadena = str_replace($nopermitidos, "", $cadena);
    return $cadena;

    //return utf8_encode($cadena);
}

function normalizaMin ($cadena){
    $originales = 'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞ
ßàáâãäåæçèéêëìíîïðñòóôõöøùúûýýþÿŔŕ';
    $modificadas = 'aaaaaaaceeeeiiiidnoooooouuuuy
bsaaaaaaaceeeeiiiidnoooooouuuyybyRr';
    $cadena = utf8_decode($cadena);
    $cadena = strtr($cadena, utf8_decode($originales), $modificadas);
    $cadena = strtolower($cadena);
	$nopermitidos = array("'",'\\','<','>',"\"",";",":");
    $cadena = str_replace($nopermitidos, "", $cadena);
    return $cadena;

    //return utf8_encode($cadena);
}

function comprobar_email($email){
   	$mail_correcto = 0;
   	//compruebo unas cosas primeras
   	if ((strlen($email) >= 6) && (substr_count($email,"@") == 1) && (substr($email,0,1) != "@") && (substr($email,strlen($email)-1,1) != "@")){
      	 if ((!strstr($email,"'")) && (!strstr($email,"\"")) && (!strstr($email,"\\")) && (!strstr($email,"\$")) && (!strstr($email," "))) {
         	 //miro si tiene caracter .
         	 if (substr_count($email,".")>= 1){
            	 //obtengo la terminacion del dominio
            	 $term_dom = substr(strrchr ($email, '.'),1);
            	 //compruebo que la terminación del dominio sea correcta
            	 if (strlen($term_dom)>1 && strlen($term_dom)<5 && (!strstr($term_dom,"@")) ){
               	 //compruebo que lo de antes del dominio sea correcto
               	 $antes_dom = substr($email,0,strlen($email) - strlen($term_dom) - 1);
               	 $caracter_ult = substr($antes_dom,strlen($antes_dom)-1,1);
               	 if ($caracter_ult != "@" && $caracter_ult != "."){
                  	 $mail_correcto = 1;
               	 }
            	 }
         	 }
      	 }
   	}

   	if ($mail_correcto) {
      	 return 1;
	}else{
      	 return 0;
	}
}

function todoEnAltas($variable) {
$variable = strtr(strtoupper($variable),"ñáéíóú","ÑÁÉÍÓÚ");
return $variable;
}



?>
