
function validarExt()
{
    var archivoInput = document.getElementById('archivoInput');
    var archivoRuta = archivoInput.value;
    if (archivoInput.files && archivoInput.files[0]) 
    {
        //const file = ;
        const file = archivoInput.files[0];
        var visor = new FileReader();
        window.localStorage.setItem('file-name',file.name);
        visor.onload = function(e) 
        {
            document.getElementById('visorArchivo').innerHTML = 
                `<label for="formFile" class="form-label">Musica Cargada</label>
                <br><br>
                <audio controls><source id = "myAudio" src="`+e.target.result+`"></audio>
                <br><br>`;
        };
        visor.readAsDataURL(file);
    }
}