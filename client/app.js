
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
    <tr class="trPro">
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
    <td class="tdPro"> <button>X</button> <button>Edit</button></td>
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
        console.log("no")
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
            
  

