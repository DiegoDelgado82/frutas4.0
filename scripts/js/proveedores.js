

async function getProveedores() {
  let url ="https://raw.githubusercontent.com/DiegoDelgado82/proveedores/main/proveedores.json";


  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}



async function datosProveedor() {
  const nombreProveedor = document.getElementById("selectProveedores").value
  const cuerpo= document.getElementById("cuerpo")
  let prov= await getProveedores();
  let i=0;
  cuerpo.innerHTML=""
 
  prov.forEach((proveedor) => {
  i++;
	
	if (proveedor.PROVEEDOR.toUpperCaskjkkj===nombreProveedor.toUpperCase())
	{
	 cuerpo.innerHTML=cuerpo.innerHTML+  "<div id='cortes"+i+ "' class=' row fondoBg  border border-white borderCard text-white pt-1'><h5 class='h5' id='ean"+i+"'>"+proveedor.EAN+ "</h5><h5 class='h5' id='desc"+i+"'>"+proveedor.DESCRIPCION+ "</h5><div class='col-6 card bg-transparent border-0 m-0 text-white'><h6>UM: <span id='um"+i+

	        "'>"+proveedor.UM+" </span></h6></div><div class='col-6 m-0'><div class='input-group mb-2'><button class='btn btn-outline-secondary btn-quantity fVerde' type='button' onclick='decrementValue(this)'><i class='fas fa-minus'></i></button> <input id='cant"+i+
	        "' type='number' class='form-control quantity-input text-center' min='0' step='1' value='0'><button class='btn btn-outline-secondary btn-quantity fVerde' type='button' onclick='incrementValue(this)'><i class='fas fa-plus'></i></button></div></div>"
	
	}
	
	  
 
    
  });

cuerpo.innerHTML=cuerpo.innerHTML+"<br><br><br>	"


}r


function incrementValue(button) {
      var input = button.parentNode.querySelector('input');
      var value = parseFloat(input.value);
      
        input.value = value + 1;
     
    }

    function decrementValue(button) {
      var input = button.parentNode.querySelector('input');
      var value =parseFloat(input.value);
      if (value > 0) {
        input.value = value - 1;
      }
    }


async function getContactos() {
  let url ="https://raw.githubusercontent.com/DiegoDelgado82/proveedores/main/contactos.json";


  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}


async function datosContactos() {
  const contactoProveedor = document.getElementById("selectProveedores")
  let contact= await getContactos();

  
 
  contact.forEach((contacto) => {


	if (contacto.PROVEEDOR!="")
	{
		
contactoProveedor.innerHTML=contactoProveedor.innerHTML+"<option value='"
+contacto.PROVEEDOR+"'>"+contacto.PROVEEDOR+"</option>"
	
	}
	
  });


}


const proveedores =() =>{
	console.log(document.getElementById("selectProveedores").value)
	}




function enviarPedido()
{

    let enlace= document.getElementById("enviarPedidoBtn");
    let mensaje="https://wa.me/543515196190?text=Hola, te solicito el siguiente "+
    document.getElementById("pedidoTotalOculto").textContent 
    enlace.href=mensaje;
    return mensaje




}

function cargarPrecio() {
let precio=0;

	for(let i=0;i<999;i++)
	{
		if(document.getElementById("cant"+i))
		{
		 
		 if (document.getElementById("cant"+i).value!=0)
		  {
		   precio=precio+(parseFloat(document.getElementById("cant"+i).value) * parseFloat(document.getElementById("precio"+i).innerText ))


		  }
		}
		
	}
		   
toastr.success('Producto agregado al pedido', { timeOut: 1000 });
		

    }  





function incrementValueUn(button) {
      var input = button.parentNode.querySelector('input');
      var value = parseFloat(input.value);
      if (value < 60) {
        input.value = value + 1;
      }
    }

    function decrementValueUn(button) {
      var input = button.parentNode.querySelector('input');
      var value =parseFloat(input.value);
      if (value > 0) {
        input.value = value - 1;
      }
    }


 




function cargarPedido()
{
 let precio=0;
 let pedido="";
 let pedido2="";
 for(let i=0;i<9999;i++)
 {

	if(document.getElementById("cant"+i))
		{
		 if (document.getElementById("cant"+i).value!=0)
		  {
			
			
		   pedido=pedido +"<li class='my-0'>"+ document.getElementById("ean"+i).textContent+" - " +document.getElementById("desc"+i).textContent+" - CANT: "+document.getElementById("cant"+i).value+" "+document.getElementById("um"+i).textContent+"</li>"
		   pedido2=pedido2+"%E2%97%8F *"+document.getElementById("ean"+i).textContent+"* - " +document.getElementById("desc"+i).textContent+" - CANT: "+document.getElementById("cant"+i).value+" %0A"
		  }
		 

		}


		
		
 }
   document.getElementById("pedidoTotal").innerHTML="Pedido:<ul> "+pedido+"</ul><p id='precioTotal'></p>";
   document.getElementById("pedidoTotalOculto").innerHTML="pedido:%0A"+pedido2 +"%0A"

} 

function exportarPedidoExcel() {
  let pedidoTable = "<table><tr><th style='mso-number-format:\"0\";'>EAN</th><th>Descripción</th><th>Cantidad</th></tr>";
  for (let i = 0; i < 9999; i++) {
      if (document.getElementById("cant" + i) && document.getElementById("cant" + i).value != 0) {
          let ean = document.getElementById("ean" + i).textContent;
          let desc = document.getElementById("desc" + i).textContent;
          let cant = document.getElementById("cant" + i).value;
          pedidoTable += "<tr><td style='mso-number-format:\"0\";'>" + ean + "</td><td>" + desc + "</td><td>" + cant + "</td></tr>";
      }
  }
  pedidoTable += "</table>";

  let hoy = new Date();
  let dia = hoy.getDate();
  let mes = hoy.getMonth() + 1;
  let nombreProveedor = document.getElementById("selectProveedores").value; // Obtener el nombre del proveedor seleccionado
  let nombreArchivo = "pedido_" + nombreProveedor + "_" + dia + "_" + mes + ".xls";

  let excelContent = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
  excelContent += "<head><meta charset='UTF-8'><meta name=ProgId content=Excel.Sheet>";
  excelContent += "<style>table,th,td{border:1px solid black;border-collapse:collapse;}</style>";
  excelContent += "</head><body>" + pedidoTable + "</body></html>";

  let blob = new Blob([excelContent], { type: 'application/vnd.ms-excel' });
  if (window.navigator.msSaveBlob) {
      // Para IE
      window.navigator.msSaveBlob(blob, nombreArchivo);
  } else {
      // Para otros navegadores
      let link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = nombreArchivo;
      link.click();
  }
}


function exportarPedidoTxt() {
  let pedidoTxt = "EAN\tCantidad\tDescripción\n"; // Encabezado del archivo de texto
  for (let i = 0; i < 9999; i++) {
      if (document.getElementById("cant" + i) && document.getElementById("cant" + i).value != 0) {
          let ean = document.getElementById("ean" + i).textContent;
          let cant = document.getElementById("cant" + i).value;
          let desc = document.getElementById("desc" + i).textContent;
          pedidoTxt += ean + "\t" + cant + "\t" + desc + "\n"; // Cambio en el orden de los campos
      }
  }

  let hoy = new Date();
  let dia = hoy.getDate();
  let mes = hoy.getMonth() + 1;
  let nombreProveedor = document.getElementById("selectProveedores").value; // Obtener el nombre del proveedor seleccionado
  let nombreArchivo = "pedido_" + nombreProveedor + "_" + dia + "_" + mes + ".txt";

  let blob = new Blob([pedidoTxt], { type: 'text/plain' });
  if (window.navigator.msSaveBlob) {
      // Para IE
      window.navigator.msSaveBlob(blob, nombreArchivo);
  } else {
      // Para otros navegadores
      let link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = nombreArchivo;
      link.click();
  }
}



