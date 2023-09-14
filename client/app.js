
const contenedor = document.getElementById("contenedor")
const form = document.querySelector("form")

fetch("http://localhost:3000/libros")
.then(res => res.json())
.then(date => 
    date.forEach(data => {
        crearCartas(data)
    })
    )
.catch(err =>console.log(err))

function crearCartas(dato) {
    contenedor.innerHTML +=
    `
    <tr class="trPro" id="${dato.id}">
    <td class="tdPro"><img class="imagenLibro" src=${dato.imagen} alt="Portada del libro"></td>
    <td class="tdPro">${dato.titulo}</td>
    <td class="tdPro">${dato.autor}</td>
    <td class="tdPro">${dato.lugar_de_impresion}</td>
    <td class="tdPro">${dato.fecha_de_impresion}</td>
    <td class="tdPro">${dato.editorial}</td>
    <td class="tdPro">${dato.coleccion}</td>
    <td class="tdPro">${dato.precio}</td>
    <td class="tdPro">${dato.ventas}</td>
    <td class="tdPro">${dato.id}</td>
    <td class="tdPro"> <button onclick="borrar(${dato.id})">X</button>
     <button onclick="edit(${dato.id})">Edit</button></td>
    </tr>
    `;
}


form.addEventListener("submit",e =>{
    e.preventDefault();
    let newTitulo = document.getElementById("titulo").value
    let newAutor =  document.getElementById("autor").value
    let newLugarI =  document.getElementById("lugar_de_impresion").value
    let newFechaI = document.getElementById("fecha_de_impresion").value
    let newEditorial =  document.getElementById("editorial").value
    let newColeccion=  document.getElementById("coleccion").value
    let newPrecio = document.getElementById("precio").value
    let newVentas =  document.getElementById("ventas").value
    let newImagen =  document.getElementById("imagen").value
  

   let newLibro = {
      titulo: newTitulo,
      autor: newAutor,
      lugar_de_impresion: newLugarI,
      fecha_de_impresion: newFechaI,
      editorial: newEditorial,
      coleccion: newColeccion,
      precio:parseInt( newPrecio),
      ventas: parseInt(newVentas),
      imagen: newImagen,
   };
   
    if(newLibro.autor =="" || newLibro.titulo ==""|| newLibro.lugar_de_impresion =="" 
    || newLibro.fecha_de_impresion =="" || newLibro.editorial=="" || newLibro.coleccion==""  ){
        console.log("No se creo el elemento ")
    }else{
        fetch("http://localhost:3000/libros/",{
                method:"POST",
                headers: {"content-Type" : "application/json"},
                body: JSON.stringify(newLibro)
              })
            .then(res => res.json())
            .catch(err =>console.log(err))
            location.reload();
    }
    });
            

    function borrar (id){
        fetch(`http://localhost:3000/libros/${id}`,{
            method:"DELETE",
            })
            .then(res => res.json())
            .then(data =>setTimeout(()=>{location.reload();},1000))
            .catch(err =>console.log(err))
            
    }    
  

// Agrega esta función para editar una fila específica
function edit(id) {
    const row = document.getElementById(`${id}`);
    const cells = row.querySelectorAll(".tdPro");
  
    // Almacena los valores actuales en variables
    const currentValues = Array.from(cells).map(cell => cell.textContent);
    const img= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDzELXzAiglM-6f_agUjPvv8DTbYduMa9W4YBPySEYDyyPrjYtTm5pzTYIxiEvgfNpl1I&usqp=CAU"
    // Reemplaza el contenido de las celdas por campos de entrada
    cells[0].innerHTML = `<input type="text" value="${img}" id="editedImage">`;
    cells[1].innerHTML = `<input type="text" value="${currentValues[1]}" id="editedTitulo">`;
    cells[2].innerHTML = `<input type="text" value="${currentValues[2]}" id="editedAutor">`;
    cells[3].innerHTML = `<input type="text" value="${currentValues[3]}" id="editedLugarI">`;
    cells[4].innerHTML = `<input type="text" value="${currentValues[4]}" id="editedFechaI">`;
    cells[5].innerHTML = `<input type="text" value="${currentValues[5]}" id="editedEditorial">`;
    cells[6].innerHTML = `<input type="text" value="${currentValues[6]}" id="editedColeccion">`;
    cells[7].innerHTML = `<input type="number" value="${currentValues[7]}" id="editedPrecio">`;
    cells[8].innerHTML = `<input type="number" value="${currentValues[8]}" id="editedVentas" readonly>`;

    // Agrega un botón "Guardar" para confirmar la edición
    cells[9].innerHTML = `<button onclick="saveEdit(${id})">Guardar</button>`;
}

// Agrega esta función para guardar los cambios después de editar
function saveEdit(id) {
    const editedImage = document.getElementById("editedImage").value;
    const editedTitulo = document.getElementById("editedTitulo").value;
    const editedAutor = document.getElementById("editedAutor").value;
    const editedLugarI = document.getElementById("editedLugarI").value;
    const editedFechaI = document.getElementById("editedFechaI").value;
    const editedEditorial = document.getElementById("editedEditorial").value;
    const editedColeccion = document.getElementById("editedColeccion").value;
    const editedPrecio = document.getElementById("editedPrecio").value;
    const editedVentas = document.getElementById("editedVentas").value;

    const editedLibro = {
        titulo: editedTitulo,
        autor: editedAutor,
        lugar_de_impresion: editedLugarI,
        fecha_de_impresion: editedFechaI,
        editorial: editedEditorial,
        coleccion: editedColeccion,
        precio: parseInt(editedPrecio),
        ventas: parseInt(editedVentas),
        imagen:editedImage
    };
   
    fetch(`http://localhost:3000/libros/${id}`, {
        method: "PUT", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedLibro),
    })
    .then(res => res.json())
    .catch(err => console.log(err));
    location.reload()
}