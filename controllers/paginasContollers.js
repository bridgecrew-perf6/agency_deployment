import { Viaje } from '../models/Viajes.js';
import { testimonial } from '../models/Testimoniales.js';

const paginaInicio = async (req, res)=>{ //req- lo que enviamos : res - la respuesta de express

//  hacer multiples consultas a la base de datos con promise.all

  const promiseDB = [];

//  consultar 3 viajes del modelo viaje
  promiseDB.push( Viaje.findAll({ limit: 3 }) )
  //  consultar 3 testimoniales del modelo testimonial
  promiseDB.push( testimonial.findAll({ limit: 3 }) )
  try {
    
    const resultado = await Promise.all(promiseDB)

    res.render('inicio', {
      pagina: 'Inicio',
      clase: 'home',
      viajes: resultado[0],
      testimoniales: resultado[1]
});
  } catch (error) {
    console.log(error)
  }

  
}

const paginaNosotros = (req, res)=>{ 
  res.render('nosotros', {
          pagina: 'Nosotros'
  });
}

const paginaViajes = async (req, res)=>{ 
// Consultar  la base de datos
    const viajes = await Viaje.findAll()
    
  res.render('viajes', {
          pagina: 'Proximos Viajes',
          viajes,
  });
}



const paginaTestimoniales = async (req, res)=>{ 

  try {
    const testimoniales = await testimonial.findAll();
    res.render('testimoniales', {
      pagina: 'Testimoniales',
      testimoniales
});


//  con este codigo borramos los testimoniales basado en el nombre

//   await testimonial.destroy({
//     where: { id: "8"},
// }) 



  } catch (error) {
    console.log(error)
  }
  
}

const paginaDetalleViaje = async (req, res)=>{ 
      
  const {slug} = req.params;
  try {
    const viaje = await Viaje.findOne({where : {slug}})

    res.render('viaje', {
      pagina: 'Informacion Viaje',
      viaje
    })
  } catch (error) {
      console.log(error)
  }
}



export {
  paginaInicio,
  paginaNosotros,
  paginaViajes, 
  paginaTestimoniales,
  paginaDetalleViaje,
  
}