import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Categories = () => {
  return (
    <div className=' d-flex flex-row  aling-items-center container-fluid ms-4'>
    <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic" className='fw-bold' style={{fontSize: '1.5rem'}}>
        FILTRAR POR CATEGORÍA
      </Dropdown.Toggle>

      <Dropdown.Menu  className='text-center' style={{ backgroundColor: 'lightgray' }}>
        <Dropdown.Item><Link as={Link} to="/MARROQUINERÍA" className='text-decoration-none fw-bold text-primary'>MARROQUINERIA</Link></Dropdown.Item>
        <Dropdown.Item><Link as={Link} to="/PAPELERÍA" className='text-decoration-none fw-bold text-primary'>PAPELERIA</Link></Dropdown.Item>
        <Dropdown.Item><Link as={Link} to="/ARTÍSTICA Y MANUALIDADES" className='text-decoration-none fw-bold text-primary'>ARTÍSTICA Y MANUALIDADES</Link></Dropdown.Item>
        <Dropdown.Item><Link as={Link} to="/ESCRITURA Y DIBUJO" className='text-decoration-none fw-bold text-primary'>ESCRITURA Y DIBUJO</Link></Dropdown.Item>
        <Dropdown.Item><Link as={Link} to="/ELEMENTOS DE OFICINA" className='text-decoration-none fw-bold text-primary'>ELEMENTOS DE OFICINA</Link></Dropdown.Item>
        <Dropdown.Item><Link as={Link} to="/ORGANIZACIÓN Y ARCHIVO" className='text-decoration-none fw-bold text-primary'>ORGANIZACIÓN Y ARCHIVO</Link></Dropdown.Item>
        <Dropdown.Item><Link as={Link} to="/ACCESORIOS ESCOLARES" className='text-decoration-none fw-bold text-primary'>ACCESORIOS ESCOLARES</Link></Dropdown.Item>
        <Dropdown.Item><Link as={Link} to="/TECNOLOGÍA Y ELECTRÓNICA" className='text-decoration-none fw-bold text-primary'>TECNOLOGÍA Y ELECTRÓNICA</Link></Dropdown.Item>
        <Dropdown.Item><Link as={Link} to="/JUGUETES Y RECREACIÓN" className='text-decoration-none fw-bold text-primary'>JUGUETES Y RECREACIÓN</Link></Dropdown.Item>
        <Dropdown.Item><Link as={Link} to="/VARIOS" className='text-decoration-none fw-bold text-primary'>VARIOS / HOGAR</Link></Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

    </div>
  )
}

export default Categories