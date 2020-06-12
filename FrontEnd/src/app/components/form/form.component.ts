import { Component, OnInit } from '@angular/core';
import { producto } from '../../models/producto';
/* importar el modelo para que tenga acceso a el */
import { productoService } from '../../service/producto.service'
/* importar el servicio para que el formulario tenga acceso a ellos */

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  public Producto: producto;
  public productosEncontrados: any = []; /* los datos encontrados los va a guardar en un array */

  /* guardamos el modelo en una variable publica, para poder entrar a sus caracteristicas */

  /* se hace una variable privada para que no todos tengan acceso a la informacion */
  constructor(private service: productoService) {
    /* crear el modelo del producto para que se limpie cada dato */
    this.Producto = new producto(); /* cada que se crea un producto, se crean nuevos modelos paa que no se sobreescribam los datos */

  }

  ngOnInit(): void {
    /* Se invocara o cargara todos los metodos que queremos que se cargen a la vista sin necesidad de requerir eventos */
    this.mostrarProducto()
  }

  /* Se subscribe al sercicio de crear producto de la api , y esta responde con cualquier tipo de dato 
  se cran instancias para validar el estado del proceso*/
  formularioUp() {
    this.service.createData(this.Producto).subscribe((res: any) => {
      if (res.statusCode !== 200) {
        alert('Error creando data')
      } else {
        alert('Data creada...')
      }
    });
  }

  /* Crear el metodo */
  mostrarProducto() {
    /* Nos suscribimos al servicio que creamos y se le indica que nos devuelva una respuesta cualquiera según el caso */
    this.service.showData().subscribe((response: any) => {
      this.productosEncontrados = response.producto;
      /* el contador for nos muestra como respuesta cada producto */
    },
      (error) => {
        var errormensaje = <any>error;
        /* el error se guarda en una variable para luego comparla y mostrarla */
        if (errormensaje != null) {
          console.log(error);
          /* si el error es diferente a null, que muestre el error en la consola del navegador */
        }
      }
    )
  }
  /* funcion del formulario para editar */
  editar(producto) {
    this.service.upgradeData(producto._id, producto).subscribe(
      (response: any) => {
        if (response.producto) {
          alert('Data actualizada.')
          this.mostrarProducto(); /* Mostrar el producto cuando se halla actualizado */
        } else {
          alert('Error.')
        }
      }, (error) => {
        if (error != null) {
          console.log(error);
        }
      }
    );
  }

  eliminarProductos(productoid){
    this.service.eliminarProducto(productoid).subscribe((response:any)=>{
      if(response.producto){
        alert("producto eliminado correctame chimba")
       this.mostrarProducto()
      }else{
        alert("el producto no se elimino paila")
      }},error=>{
        if(error != null){
          console.log(error )
        }
      })}

      eliminarProductos1(dataEncontrada){
        this.service.dropAll(dataEncontrada).subscribe((response:any)=>{
          if(response.producto){
            alert("producto eliminado correctame chimba")
           this.mostrarProducto()
          }else{
            alert("el producto no se elimino paila")
          }},error=>{
            if(error != null){
              console.log(error )
            }
          })}
  

}
