import { testimonial } from "../models/Testimoniales.js"; 

const guardarTestimonial = async (req, res)=>{

  // validar formulario

  const {nombre, correo, mensaje } = req.body;
  const errores = [];

  if(nombre.trim() === ''){
    errores.push({mensaje: 'El nombre esta vacio'})
  }
  if(correo.trim() === ''){
    errores.push({mensaje: 'El correo esta vacio'})
  }
  if(mensaje.trim() === ''){
    errores.push({mensaje: 'El mensaje esta vacio'})
  }
  

  if(errores.length > 0){

    const testimoniales = await testimonial.findAll();
    res.render('testimoniales', {
      pagina: 'Testimoniales',
      errores,
      nombre: nombre,
      correo,
      mensaje,
      testimoniales
    })
  }else{
    // almacenar en la base de datos

    const nombreMayuscula = capitalizeNombre(nombre);
    
    try {
      await testimonial.create({
        nombre: nombreMayuscula,
        correo,
        mensaje
      })
      
      res.redirect('/testimoniales')
    } catch (error) {
      console.log(error)
    }
  }

 
}


function capitalizeNombre(nombre){{
  return nombre && nombre[0].toUpperCase() + nombre.slice(1);
}}
export {guardarTestimonial}