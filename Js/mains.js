export const mainCap = 
`   
<br></br>
<div class="d-grid gap-2 ">
<section class="text-center" >
<div class="mb-3">
<label for="formFile" class="form-label">
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-arrow-down-fill" viewBox="0 0 16 16">
    <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm2.354 6.854-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5a.5.5 0 0 1 1 0v3.793l1.146-1.147a.5.5 0 0 1 .708.708z"/>
</svg>
Carga tu cancion 
</label>
<input type="file" id="archivoInput" class="form-control" onchange="return validarExt()" accept="audio/*" />
</div>
<br><br>
<button id = "btn-RC" type="submitRC" class="btn btn-dark">Subir cancion</button>
<br><br>
<div id="visorArchivo">
<!--Aqui se desplegará el fichero-->
</div>
</section>            
</div>
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">

</di>
<div id="map" class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
</div>
`


export const mainInicio = 
`
    <h2>Bienvenido</h2>
`
export const mainMap = 
`
<br></br>
<br></br>
<br></br>
<h5 class="card-title">Musica compartida</h5>
<br></br>
<br></br>
<br></br>

</di>
<div id="map2" class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
</div>
<form id="form-table">
  <h5 class="card-title">Selecciona la cancion que quieras añadir a tu biblioteca</h5>
  <ul  id = "table" class="list-group">
  </ul>
</form>
`
export const mainPerfil = 
`
    <h2>Canciones Almacenadas en la nube</h2>
    <div class="container-audio">
        <audio controls  autoplay id ="audioSource" ><source src="" id="audio" type="audio/*">Your browser dose not Support the audio Tag</audio>
    </div>
    <div class="container-audio">
        <div class="colum1">
            <div class="row">  
            </div>
        </div>
        <div class="colum1">
            <div class="row"></div>
        </div>
        <div class="colum1">
            <div class="row"></div>
        </div>
        <div class="colum1">
            <div class="row"></div>
        </div>
        <div class="colum1">
            <div class="row"></div>
        </div>
        <div class="colum1">
            <div class="row"></div>
        </div>
        <div class="colum1">
            <div class="row"></div>
        </div>
        <div class="colum1">
            <div class="row"></div>
        </div>
        <div class="colum1">
            <div class="row"></div>
        </div>
        <div class="colum1">
            <div class="row"></div>
        </div>
        <div class="colum1">
            <div class="row"></div>
        </div>
       </div>
    <div class="container-audio">
        <h2>Lista de canciones</h2>
        <ul  id = "table-songs" class="list-group">
        </ul>
    </div>    
`