function validarExt()
        {
            var archivoInput = document.getElementById('archivoInput');
            var archivoRuta = archivoInput.value;
            if (archivoInput.files && archivoInput.files[0]) 
            {
                const file = archivoInput.files[0];
                var visor = new FileReader();
                visor.onload = function(e) 
                {
                    document.getElementById('visorArchivo').innerHTML = 
                        '<audio controls><source src="'+e.target.result+'"></audio>';
                
                };
                visor.readAsDataURL(file);
            }
        }