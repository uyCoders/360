$(document).ready(function() {
    $("#btInvita").click(function() {
        $("#miRegistroInvitacion").hide();
        $("#miRegistro").show();
    });
    let assetPath = "texturas/";
    var x = document.getElementById("music");

    function playAudio() {
        x.play();
    }

    var gjft, panorama, panorama1, panoramaMapa, panoramaMapa2, panorama2, panorama3, panorama3a, panoramaRegistro, panoramaKitosell, panoramaConferencia, panoramaAccua, viewer, container, infospot, infospot2, infospot3, infospot4, infospot5, controlButton, modeButton, videoButton, panel, annie, object, mixer, mixer2, clock;

    // custom global variables
    var video, videoImage, videoImageContext, videoTexture;

    var loader = new THREE.GLTFLoader();

    clock = new THREE.Clock();

    var controlIndex = PANOLENS.CONTROLS.ORBIT;
    var modeIndex = 0;
    var videoPlaying = false;

    container = document.querySelector('#container');
    panorama = new PANOLENS.ImagePanorama('texturas/KitosCellQ01.jpg');
    panorama1 = new PANOLENS.ImagePanorama('texturas/KitosCellQ02.jpg');
    panoramaMapa = new PANOLENS.ImagePanorama('texturas/KitosCellQ02.jpg');
    panoramaMapa2 = new PANOLENS.ImagePanorama('texturas/KitosCellQ02.jpg');
    panorama2 = new PANOLENS.ImagePanorama('texturas/KitosCellQ03.jpg');
    panorama3 = new PANOLENS.ImagePanorama('texturas/KitosCellQ04.jpg');
    panorama3a = new PANOLENS.ImagePanorama('texturas/KitosCellQ04.jpg');
    panoramaApoyo = new PANOLENS.ImagePanorama('texturas/KitosCellQ05.jpg');
    panoramaRegistro = new PANOLENS.ImagePanorama('texturas/KitosCellQ06.jpg');
    panoramaKitosell = new PANOLENS.ImagePanorama('texturas/KitosCellQ09.jpg');
    panoramaConferencia = new PANOLENS.ImagePanorama('texturas/KitosCellQ08.jpg');
    panoramaAccua = new PANOLENS.ImagePanorama('texturas/KitosCellQ08.jpg');

    //escena 1
    infospot = new PANOLENS.Infospot(100, "texturas/Entrar.png", false);
    infospot.position.set(2000, 550, -100);
    panorama.add(infospot);
    infospot.addEventListener('click', function() {
        viewer.setPanorama(panorama1);
        infospot2.focus();
    });


    //escena 02

    ///////////
    // VIDEO //
    ///////////
    video = document.getElementById('video');
    video.addEventListener('play', function() {
        this.currentTime = 0;
    }, false);
    video.currentTime = 0.1;

    texture = new THREE.VideoTexture(video);

    function playVideo() {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    }

    function stopVideo() {
        video.pause();
    }

    var cube = new THREE.Mesh(new THREE.BoxGeometry(0, 100, 100), new THREE.MeshLambertMaterial({ color: 0xffffff, emissive: 0x2a2a2a, emissiveIntensity: 0, side: THREE.DoubleSide, map: texture }));
    cube.position.set(-180, 0, -5);

    const ambient = new THREE.HemisphereLight(0xffffbb, 0x080820, 2);
    panorama1.add(ambient);
    panorama1.add(cube);
    panorama1.visible = false;

    infospot2 = new PANOLENS.Infospot(100, "texturas/pixel.png", false);
    infospot2.position.set(2000, -100, 50);
    panorama1.add(infospot2);
    //panorama1.visible = false;
    /*infospot2.addEventListener('click', function() {
        stopVideo();
        viewer.setPanorama(panorama3);
        art03.focus();
    });*/

    infospot3 = new PANOLENS.Infospot(100, "texturas/btReproducir.png", false);
    infospot3.position.set(2000, -700, -50);
    panorama1.add(infospot3);
    infospot3.addEventListener('click', function() {
        playVideo();
    });

    infospot3Entrar = new PANOLENS.Infospot(100, "texturas/Entrar01.png", false);
    infospot3Entrar.position.set(2000, -900, -20);
    panorama1.add(infospot3Entrar);
    infospot3Entrar.addEventListener('click', function() {
        viewer.setPanorama(panorama2);
        isp2_02.focus();
        stopVideo();
    });

    infospot3s = new PANOLENS.Infospot(500, "texturas/salir.png", false);
    infospot3s.position.set(-5000, -500, 100);
    panorama1.add(infospot3s);
    infospot3s.addEventListener('click', function() {
        stopVideo();
        viewer.setPanorama(panorama);
        infospot.focus();
    });

    //boton mapa
    infospmp = new PANOLENS.Infospot(120, "texturas/mapaButton.png", false);
    infospmp.position.set(2000, -800, -1300);
    panorama1.add(infospmp);
    infospmp.addEventListener('click', function() {
        stopVideo();
        viewer.setPanorama(panoramaMapa);
        ifsMp03.focus();
    });


    //escena mapa

    //boton entrar
    ifsMp01 = new PANOLENS.Infospot(100, "texturas/EntrarMapa.png", false);
    ifsMp01.position.set(2000, -200, -20);
    panoramaMapa.add(ifsMp01);
    ifsMp01.addEventListener('click', function() {
        viewer.setPanorama(panorama2);
        isp2_02.focus();
        stopVideo();
    });

    //boton Regresar
    ifsMp02 = new PANOLENS.Infospot(200, "texturas/salirMapa.png", false);
    ifsMp02.position.set(2500, -1150, -400);
    panoramaMapa.add(ifsMp02);
    ifsMp02.addEventListener('click', function() {
        viewer.setPanorama(panorama1);
        infospot2.focus();
    });

    //siguiente
    ifsMp04 = new PANOLENS.Infospot(150, "texturas/siguienteMapa.png", false);
    ifsMp04.position.set(1200, -1100, -2200);
    panoramaMapa.add(ifsMp04);
    ifsMp04.addEventListener('click', function() {
        viewer.setPanorama(panoramaMapa2);
        ifsMp203.focus();
    });

    //imagen de mapa
    ifsMp03 = new PANOLENS.Infospot(1200, "texturas/MAPA.jpg", false);
    ifsMp03.position.set(2000, -400, -1400);
    panoramaMapa.add(ifsMp03);


    //escena invitacion

    //boton entrar
    ifsMp201 = new PANOLENS.Infospot(100, "texturas/EntrarInvitacion.png", false);
    ifsMp201.position.set(2000, -200, -20);
    panoramaMapa2.add(ifsMp201);
    ifsMp201.addEventListener('click', function() {
        viewer.setPanorama(panorama2);
        isp2_02.focus();
        stopVideo();
    });

    //boton Regresar
    ifsMp202 = new PANOLENS.Infospot(200, "texturas/salirInvitacion.png", false);
    ifsMp202.position.set(2500, -1150, -400);
    panoramaMapa2.add(ifsMp202);
    ifsMp202.addEventListener('click', function() {
        viewer.setPanorama(panoramaMapa);
        ifsMp03.focus();
    });

    //imagen de invitacion
    ifsMp203 = new PANOLENS.Infospot(1200, "texturas/Inivtacion_Platica_Amcichac.png", false);
    ifsMp203.position.set(2000, -400, -1400);
    panoramaMapa2.add(ifsMp203);




    /*infospotReg = new PANOLENS.Infospot(100, PANOLENS.DataImage.Info, false);
    infospotReg.position.set(2000, -100, -500);
    panorama1.add(infospotReg);
    infospotReg.addEventListener('click', function() {
        $('#exampleModal').modal('show');
    });*/

    //escena 03 panorama2

    isp2_01 = new PANOLENS.Infospot(300, "texturas/salir01.png", false);
    isp2_01.position.set(-150, -150, -3000);
    panorama2.add(isp2_01);
    isp2_01.addEventListener('click', function() {
        viewer.setPanorama(panorama1);
        infospot2.focus();
    });

    //kitoscell q
    isp2_02 = new PANOLENS.Infospot(350, "texturas/Asset 50.png", true);
    isp2_02.position.set(1000, 0, -1150);
    panorama2.add(isp2_02);
    isp2_02.addEventListener('click', function() {
        viewer.setPanorama(panoramaKitosell);
        ipkitoV01.focus();
    });

    //conferencias
    isp2_03 = new PANOLENS.Infospot(350, "texturas/Asset 51.png", true);
    isp2_03.position.set(1000, 0, -450);
    panorama2.add(isp2_03);
    isp2_03.addEventListener('click', function() {
        viewer.setPanorama(panoramaConferencia);
        ipConerenV01.focus();
    });

    //articulos
    isp2_04 = new PANOLENS.Infospot(350, "texturas/Asset 52.png", true);
    isp2_04.position.set(1000, 0, 400);
    panorama2.add(isp2_04);
    isp2_04.addEventListener('click', function() {
        viewer.setPanorama(panorama3);
        art03.focus();
    });

    //material de apoyo
    isp2_05 = new PANOLENS.Infospot(350, "texturas/Asset 53.png", true);
    isp2_05.position.set(1000, 0, 1000);
    panorama2.add(isp2_05);
    isp2_05.addEventListener('click', function() {
        viewer.setPanorama(panoramaApoyo);
        artAp03.focus();
    });

    //registro rifa
    isp2_06 = new PANOLENS.Infospot(350, "texturas/Asset 54.png", true);
    isp2_06.position.set(-1000, 0, -530);
    panorama2.add(isp2_06);
    isp2_06.addEventListener('click', function() {
        viewer.setPanorama(panoramaRegistro);
        ipregistro02.focus();
        setTimeout(function() { $('#exampleModal').modal('show'); }, 2000);
        //$('#exampleModal').modal('show');
    });

    //accua
    isp2_07 = new PANOLENS.Infospot(350, "texturas/Asset 55.png", true);
    isp2_07.position.set(-1000, 0, 670);
    panorama2.add(isp2_07);
    isp2_07.addEventListener('click', function() {
        viewer.setPanorama(panoramaAccua);
        ipAccuaV02.focus();
    });

    //modelos 3D
    const ambient2 = new THREE.HemisphereLight(0xffffbb, 0x080820, 3);
    panorama2.add(ambient2);

    loader.load(`${assetPath}modelos/kitoscellq_logo.gltf`, function(gjft) {

        gjft.scene.traverse(child => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        })

        gjft.scene.scale.set(3, 3, 3);
        console.log(gjft);
        gjft.scene.position.set(-22, 0, 0);
        gjft.scene.rotation.y += Math.PI / 2;
        //gjft.scene.rotation.y += Math.PI / 2;
        //gjft.scene.visible = false;
        panorama2.add(gjft.scene);
        panorama2.visible = false;


        mixer = new THREE.AnimationMixer(gjft.scene);
        mixer.clipAction(gjft.animations[0]).play();
    });

    loader.load(`${assetPath}modelos/Accuaaseptic.gltf`, function(gjft2) {
        gjft2.scene.traverse(child => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        })

        gjft2.scene.scale.set(3, 3, 3);
        console.log(gjft2);
        gjft2.scene.position.set(22, 0, 0);
        gjft2.scene.rotation.y += Math.PI / 2;

        panorama2.add(gjft2.scene);
        panorama2.visible = false;


        mixer2 = new THREE.AnimationMixer(gjft2.scene);
        mixer2.clipAction(gjft2.animations[0]).play();
    });




    //Articulos
    /*infospot3a = new PANOLENS.Infospot(100, PANOLENS.DataImage.Info, false);
    infospot3a.position.set(2000, -100, -50);
    panorama3.add(infospot3a);
    infospot3a.addEventListener('click', function() {
      console.log("clic");
    });*/

    //articulos
    //salir
    infospot3b = new PANOLENS.Infospot(600, "texturas/salirArt.png", true);
    infospot3b.position.set(4000, -1070, 2000);

    panorama3.add(infospot3b);
    infospot3b.addEventListener('click', function() {
        viewer.setPanorama(panorama2);
        isp2_02.focus();
    });

    //siguiente
    infospot3c = new PANOLENS.Infospot(350, "texturas/flechaA.png", true);
    infospot3c.position.set(4000, -1000, -1500);

    panorama3.add(infospot3c);
    infospot3c.addEventListener('click', function() {
        viewer.setPanorama(panorama3a);
        //art08.focus();
    });

    art01 = new PANOLENS.Infospot(600, "texturas/articulos/miniaturas/Asset 34.png", true);
    art01.position.set(4000, 1400, 0);
    panorama3.add(art01);
    art01.addEventListener('click', function() {
        $("#titleModal").html("Administracion Topica de Pirfenidona");
        $("#cuerpoModal").html('<img src="texturas/articulos/previews/01.jpg" class="img-fluid" id="imagenAr" alt="">');
        $("#linkModal").attr("href", "texturas/articulos/articulosCompletos/01 Administracion Topica de Pirfenidona.pdf");
        $('#articulo01').modal('show');
    });

    art02 = new PANOLENS.Infospot(600, "texturas/articulos/miniaturas/Asset 35.png", true);
    art02.position.set(4000, 700, 0);
    panorama3.add(art02);
    art02.addEventListener('click', function() {
        $("#titleModal").html("Efficacy_and_Safety_of_Pirfenidone_in_Patients");
        $("#cuerpoModal").html('<img src="texturas/articulos/previews/02.jpg" class="img-fluid" id="imagenAr" alt="">');
        $("#linkModal").attr("href", "texturas/articulos/articulosCompletos/02 Efficacy_and_Safety_of_Pirfenidone_in_Patients.13.pdf");
        $('#articulo01').modal('show');
    });

    art03 = new PANOLENS.Infospot(600, "texturas/articulos/miniaturas/Asset 36.png", true);
    art03.position.set(4000, 0, 0);
    panorama3.add(art03);
    art03.addEventListener('click', function() {
        $("#titleModal").html("Poster_Quemaduras_Hosp-Mat-Ped-Xochimilco");
        $("#cuerpoModal").html('<img src="texturas/articulos/previews/03.jpg" class="img-fluid" id="imagenAr" alt="">');
        $("#linkModal").attr("href", "texturas/articulos/articulosCompletos/03 Poster_Quemaduras_Hosp-Mat-Ped-Xochimilco.pdf");
        $('#articulo01').modal('show');
    });

    art04 = new PANOLENS.Infospot(600, "texturas/articulos/miniaturas/Asset 37.png", true);
    art04.position.set(4000, -700, 0);
    panorama3.add(art04);
    art04.addEventListener('click', function() {
        $("#titleModal").html("Reepithelization with PFD mecott-rivera2018");
        $("#cuerpoModal").html('<img src="texturas/articulos/previews/04.jpg" class="img-fluid" id="imagenAr" alt="">');
        $("#linkModal").attr("href", "texturas/articulos/articulosCompletos/04 Reepithelization with PFD mecott-rivera2018.pdf");
        $('#articulo01').modal('show');
    });

    art05 = new PANOLENS.Infospot(600, "texturas/articulos/miniaturas/Asset 38.png", true);
    art05.position.set(4000, -1400, 0);
    panorama3.add(art05);
    art05.addEventListener('click', function() {
        $("#titleModal").html("Sufraxal Ingles");
        $("#cuerpoModal").html('<img src="texturas/articulos/previews/05.jpg" class="img-fluid" id="imagenAr" alt="">');
        $("#linkModal").attr("href", "texturas/articulos/articulosCompletos/05 Sufraxal Ingles.pdf");
        $('#articulo01').modal('show');
    });

    /**************** ARTICULOS**********************/


    //panorama 3A
    info3a = new PANOLENS.Infospot(600, "texturas/salirCol01.png", true);
    info3a.position.set(4000, -1070, 2000);

    panorama3a.add(info3a);
    info3a.addEventListener('click', function() {
        viewer.setPanorama(panorama3);
        art03.focus();
    });
    art06 = new PANOLENS.Infospot(600, "texturas/articulos/miniaturas/Asset 39.png", true);
    art06.position.set(4000, 1400, 0);
    panorama3a.add(art06);
    art06.addEventListener('click', function() {
        $("#titleModal").html("Ensayo Clínico Controlado con Pirfenidona en el Tratamiento");
        $("#cuerpoModal").html('<img src="texturas/articulos/previews/06.jpg" class="img-fluid" id="imagenAr" alt="">');
        $("#linkModal").attr("href", "texturas/articulos/articulosCompletos/06 1.1Ensayo Clínico Controlado con Pirfenidona en el Tratamiento.pdf");
        $('#articulo01').modal('show');
    });

    art07 = new PANOLENS.Infospot(600, "texturas/articulos/miniaturas/Asset 40.png", true);
    art07.position.set(4000, 700, 0);
    panorama3a.add(art07);
    art07.addEventListener('click', function() {
        $("#titleModal").html("Controlled Clinical Trial With Pirfenidone in the Treatment of");
        $("#cuerpoModal").html('<img src="texturas/articulos/previews/07.jpg" class="img-fluid" id="imagenAr" alt="">');
        $("#linkModal").attr("href", "texturas/articulos/articulosCompletos/07 1.1A Controlled Clinical Trial With Pirfenidone in the Treatment of.pdf");
        $('#articulo01').modal('show');
    });

    art08 = new PANOLENS.Infospot(600, "texturas/articulos/miniaturas/Asset 41.png", true);
    art08.position.set(4000, 0, 0);
    panorama3a.add(art08);
    art08.addEventListener('click', function() {
        $("#titleModal").html("Topical Administration of Pirfenidone Increases Healing of Chronic Diabetic Foot Ulcers- A Randomized Crossover Study");
        $("#cuerpoModal").html('<img src="texturas/articulos/previews/08.jpg" class="img-fluid" id="imagenAr" alt="">');
        $("#linkModal").attr("href", "texturas/articulos/articulosCompletos/08 Topical Administration of Pirfenidone Increases Healing of Chronic Diabetic Foot Ulcers- A Randomized Crossover Study");
        $('#articulo01').modal('show');
    });

    art09 = new PANOLENS.Infospot(600, "texturas/articulos/miniaturas/Asset 42.png", true);
    art09.position.set(4000, -700, 0);
    panorama3a.add(art09);
    art09.addEventListener('click', function() {
        $("#titleModal").html("Articulo mordida de perro");
        $("#cuerpoModal").html('<img src="texturas/articulos/previews/09.jpg" class="img-fluid" id="imagenAr" alt="">');
        $("#linkModal").attr("href", "texturas/articulos/articulosCompletos/09 articulo mordida de perro.pdf");
        $('#articulo01').modal('show');
    });


    /**************** ARTICULOS**********************/

    /**************** material apoyo**********************/
    ipapollo01 = new PANOLENS.Infospot(600, "texturas/salirApoyo.png", true);
    ipapollo01.position.set(4000, -1070, 2000);

    panoramaApoyo.add(ipapollo01);
    ipapollo01.addEventListener('click', function() {
        viewer.setPanorama(panorama2);
        isp2_02.focus();
    });

    artAp01 = new PANOLENS.Infospot(600, "texturas/materialApoyo/miniaturas/Asset 62.png", true);
    artAp01.position.set(4000, 1400, 0);
    panoramaApoyo.add(artAp01);
    artAp01.addEventListener('click', function() {
        $("#titleModal").html("Preview Úlceras PP, UV, UA, DD");
        $("#cuerpoModal").html('<img src="texturas/materialApoyo/previews/01 aa.jpg" class="img-fluid" id="imagenAr" alt="">');
        $("#linkModal").attr("href", "texturas/materialApoyo/articulosCompletos/01.pdf");
        $('#articulo01').modal('show');
    });

    artAp02 = new PANOLENS.Infospot(600, "texturas/materialApoyo/miniaturas/Asset 63.png", true);
    artAp02.position.set(4000, 700, 0);
    panoramaApoyo.add(artAp02);
    artAp02.addEventListener('click', function() {
        $("#titleModal").html("Preview Pie diabético");
        $("#cuerpoModal").html('<img src="texturas/materialApoyo/previews/02 aa.jpg" class="img-fluid" id="imagenAr" alt="">');
        $("#linkModal").attr("href", "texturas/materialApoyo/articulosCompletos/02.pdf");
        $('#articulo01').modal('show');
    });

    artAp03 = new PANOLENS.Infospot(600, "texturas/materialApoyo/miniaturas/Asset 64.png", true);
    artAp03.position.set(4000, 0, 0);
    panoramaApoyo.add(artAp03);
    artAp03.addEventListener('click', function() {
        $("#titleModal").html("Preview Quemadauras");
        $("#cuerpoModal").html('<img src="texturas/materialApoyo/previews/03 aa.jpg" class="img-fluid" id="imagenAr" alt="">');
        $("#linkModal").attr("href", "texturas/materialApoyo/articulosCompletos/03.pdf");
        $('#articulo01').modal('show');
    });

    artAp04 = new PANOLENS.Infospot(600, "texturas/materialApoyo/miniaturas/Asset 65.png", true);
    artAp04.position.set(4000, -700, 0);
    panoramaApoyo.add(artAp04);
    artAp04.addEventListener('click', function() {
        $("#titleModal").html("Preview Heridas");
        $("#cuerpoModal").html('<img src="texturas/materialApoyo/previews/04 aa.jpg" class="img-fluid" id="imagenAr" alt="">');
        $("#linkModal").attr("href", "texturas/materialApoyo/articulosCompletos/04.pdf");
        $('#articulo01').modal('show');
    });

    artAp05 = new PANOLENS.Infospot(600, "texturas/materialApoyo/miniaturas/Asset 66.png", true);
    artAp05.position.set(4000, -1400, 0);
    panoramaApoyo.add(artAp05);
    artAp05.addEventListener('click', function() {
        $("#titleModal").html("Preview TIMER");
        $("#cuerpoModal").html('<img src="texturas/materialApoyo/previews/05 aa.jpg" class="img-fluid" id="imagenAr" alt="">');
        $("#linkModal").attr("href", "texturas/materialApoyo/articulosCompletos/05.pdf");
        $('#articulo01').modal('show');
    });


    /**************** material apoyo**********************/


    //panorama registro
    ipregistro01 = new PANOLENS.Infospot(600, "texturas/salirRegistro.png", true);
    ipregistro01.position.set(4000, -1070, 2000);

    panoramaRegistro.add(ipregistro01);
    ipregistro01.addEventListener('click', function() {
        viewer.setPanorama(panorama2);
        isp2_02.focus();
    });

    ipregistro02 = new PANOLENS.Infospot(350, PANOLENS.DataImage.Info, false);
    ipregistro02.position.set(4000, 0, 0);
    panoramaRegistro.add(ipregistro02);
    ipregistro02.addEventListener('click', function() {
        $('#exampleModal').modal('show');
    });


    //panorama kitosell

    ipkito01 = new PANOLENS.Infospot(600, "texturas/salirKitos.png", true);
    ipkito01.position.set(4000, -1070, 2000);

    panoramaKitosell.add(ipkito01);
    ipkito01.addEventListener('click', function() {
        viewer.setPanorama(panorama2);
        isp2_02.focus();
    });

    //video 1
    ipkitoV01 = new PANOLENS.Infospot(700, "texturas/v1.jpg", true);
    ipkitoV01.position.set(4000, 800, 0);
    panoramaKitosell.add(ipkitoV01);
    ipkitoV01.addEventListener('click', function() {
        $("#refVideo").html('<iframe width="100%" height="560"  src="https://www.youtube.com/embed/rx_vC-wcwDM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
        $('#video01').modal('show');
    });
    //video 2
    ipkitoV02 = new PANOLENS.Infospot(700, "texturas/v2.jpg", true);
    ipkitoV02.position.set(4000, 1600, 0);
    panoramaKitosell.add(ipkitoV02);
    ipkitoV02.addEventListener('click', function() {
        $("#refVideo").html('<iframe width="100%" height="560"  src="https://www.youtube.com/embed/whDcKEdS8CA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
        $('#video01').modal('show');
    });
    //video 3
    ipkitoV03 = new PANOLENS.Infospot(700, "texturas/v3.jpg", true);
    ipkitoV03.position.set(4000, 0, 0);
    panoramaKitosell.add(ipkitoV03);
    ipkitoV03.addEventListener('click', function() {
        $("#refVideo").html('<iframe width="100%" height="560"  src="https://www.youtube.com/embed/urHTJKyjrfw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
        $('#video01').modal('show');
    });
    //video 4
    ipkitoV04 = new PANOLENS.Infospot(700, "texturas/v4.jpg", true);
    ipkitoV04.position.set(4000, -800, 0);
    panoramaKitosell.add(ipkitoV04);
    ipkitoV04.addEventListener('click', function() {
        $("#refVideo").html('<iframe width="100%" height="560"  src="https://www.youtube.com/embed/SF3grThUJk8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
        $('#video01').modal('show');
    });


    //conferenia
    ipConeren01 = new PANOLENS.Infospot(600, "texturas/salirConf.png", true);
    ipConeren01.position.set(4000, -1070, 2000);

    panoramaConferencia.add(ipConeren01);
    ipConeren01.addEventListener('click', function() {
        viewer.setPanorama(panorama2);
        isp2_02.focus();
    });


    //video 1
    ipConerenV01 = new PANOLENS.Infospot(1400, "texturas/Conferencia 1.png", true);
    ipConerenV01.position.set(4000, 800, 0);
    panoramaConferencia.add(ipConerenV01);
    ipConerenV01.addEventListener('click', function() {
        $("#refVideo").html('<iframe width="100%" height="560"  src="https://www.youtube.com/embed/sm_QGcL_bUU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br><br><a href="webinar.html" target="_blank" >Ver video completo</a>');
        $('#video01').modal('show');
    });
    //video 2
    ipConerenV02 = new PANOLENS.Infospot(1400, "texturas/Conferencia 2.png", true);
    ipConerenV02.position.set(4000, -400, 0);
    panoramaConferencia.add(ipConerenV02);
    ipConerenV02.addEventListener('click', function() {
        $("#refVideo").html('<iframe width="100%" height="560"  src="https://www.youtube.com/embed/c4NmsqAvii8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br><br><a href="fisiopatologia.html" target="_blank" >Ver video completo</a>');
        $('#video01').modal('show');
    });


    //Accua
    ipAccua01 = new PANOLENS.Infospot(600, "texturas/salirAccua.png", true);
    ipAccua01.position.set(4000, -1070, 2000);

    panoramaAccua.add(ipAccua01);
    ipAccua01.addEventListener('click', function() {
        viewer.setPanorama(panorama2);
        isp2_02.focus();
    });


    //video 1
    ipAccuaV01 = new PANOLENS.Infospot(1000, "texturas/aa01.jpg", true);
    ipAccuaV01.position.set(4000, 800, 0);
    panoramaAccua.add(ipAccuaV01);
    ipAccuaV01.addEventListener('click', function() {
        $("#refVideo").html('<iframe width="100%" height="560"  src="https://www.youtube.com/embed/Wj1WZxtkzPc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
        $('#video01').modal('show');
    });
    //video 2
    ipAccuaV02 = new PANOLENS.Infospot(1000, "texturas/aa02.jpg", true);
    ipAccuaV02.position.set(4000, -400, 0);
    panoramaAccua.add(ipAccuaV02);
    ipAccuaV02.addEventListener('click', function() {
        $("#refVideo").html('<iframe width="100%" height="560"  src="https://www.youtube.com/embed/fAiEF8lg-5A" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
        $('#video01').modal('show');
    });




    //genera escena
    viewer = new PANOLENS.Viewer({ container: container, renderer: new THREE.WebGLRenderer({ antialias: true }) });
    viewer.add(panorama, panorama1, panorama2, panorama3, panorama3a, panoramaApoyo, panoramaRegistro, panoramaKitosell, panoramaConferencia, panoramaAccua, panoramaMapa, panoramaMapa2);
    viewer.addUpdateCallback(function() {
        //gjft.scene.rotation.y += 0.01;
        //cube.rotation.x += 0.02;
        var delta = clock.getDelta();
        if (mixer != null) {
            mixer.update(delta);
        };
        if (mixer2 != null) {
            mixer2.update(delta);
        };
        //loader.rotation.y += 0.01;

    });

    infospot.focus();




    jQuery('iframe[src*="https://www.youtube.com/embed/"]').addClass("youtube-iframe");

    function pausaVideos() {
        /*$('.youtube-iframe').each(function(index) {
              $(this).attr('src', $(this).attr('src'));
              return false;
            });*/
        var videos = document.querySelectorAll('iframe, video');
        Array.prototype.forEach.call(videos, function(video) {
            if (video.tagName.toLowerCase() === 'video') {
                video.pause();
            } else {
                var src = video.src;
                video.src = src;
            }
        });

        console.log("pausaVideo");
    }

    $("#cerrarVideo").click(function(event) {
        /* Act on the event */
        $("#panel").hide('slow/400/fast', function() {});
        pausaVideos();
    });

    $("#btCerrarModal").click(function(event) {
        /* Act on the event */
        $('#exampleModal').modal('hide');
    });

    $("#video01").on("hidden.bs.modal", function() {
        pausaVideos();
    });

    var video = $('video').get(0);
    $("#video02").on("hidden.bs.modal", function() {
        if (video.paused !== true && video.ended !== true) {
            video.pause();
        }
    });

}); //termina ready