import './App.css';
import { useState, useEffect, useRef } from 'react';
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Panel } from 'primereact/panel'
import { PrimeIcons } from 'primereact/api'
import { Menubar } from 'primereact/menubar'
import { PersonaService } from './service/PersonaService'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { confirmDialog } from 'primereact/confirmdialog'

function App() {

  const [personas, setPersonas] = useState([]);
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const toast = useRef(null);

  const items = [
    {
      label:'Nuevo',
      icon: PrimeIcons.PLUS,
      command: () => {showSaveModal()}
    },
    {
      label:'Editar',
      icon: PrimeIcons.PENCIL,
      command: () => {edit()}
    },
    {
      label:'Eliminar',
      icon: PrimeIcons.TRASH,
      command: () => {showConfirmDelete()}
    }
  ]

  useEffect(() => {
    let personaService = new PersonaService();
    personaService.getAll().then(res => setPersonas(res));
  });

  const renderFooter = () => {
    return (
        <div>
            <Button label="Cancelar" icon="pi pi-times" onClick={() => setShowModal(false)} className="p-button-text" />
            <Button label="Guardar" icon="pi pi-check" onClick={() => save()} autoFocus />
        </div>
    );
  }

  const showSaveModal = () => {
    setId('');
    setNombre('');
    setApellido('');
    setDireccion('');
    setTelefono('');
    setShowModal(true);
  }

  const save = () => {
    let persona = {};
    if(id !== '') {
      persona.id = id;
    }
    persona.nombre = nombre;
    persona.apellido = apellido;
    persona.direccion = direccion;
    persona.telefono = telefono;

    let personaService = new PersonaService();
    personaService.save(persona).then(res => {
      setId('');
      setNombre('');
      setApellido('');
      setDireccion('');
      setTelefono('');
      setShowModal(false);
      toast.current.show({severity:'success', summary:'Hecho!', detail:'Se ha guardado correctamente', life: 3000});
    })
  };

  const edit = () => {
    setId(selectedPersona.id);
    setNombre(selectedPersona.nombre);
    setApellido(selectedPersona.apellido);
    setDireccion(selectedPersona.direccion);
    setTelefono(selectedPersona.telefono);
    setShowModal(true);
  }

  const showConfirmDelete = () => {
    confirmDialog({
      message: '¿Estas seguro de eliminarlo?',
      header: 'Atencion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => deletePersona()
  });
  }

  const deletePersona = () => {
    let personaService = new PersonaService();
    personaService.delete(selectedPersona.id).then(res => {
      toast.current.show({severity:'info', summary:'Hecho!', detail:'Se elimino correctamente', life: 3000});
    
    })
  }

  return (
    <div style={{width:'80%', margin:'0 auto', marginTop:'20px'}}>
      <Toast ref={toast} />
      <Panel header="CRUD App">
        <Menubar model={items} style={{marginBottom: '20px'}}/>
        <DataTable value={personas} selectionMode="single" selection={selectedPersona} onSelectionChange={e => setSelectedPersona(e.value)} dataKey="id" className="p-datatable-gridlines">
          <Column field="id" header="ID"></Column>
          <Column field="nombre" header="Nombre"></Column>
          <Column field="apellido" header="Apellido"></Column>
          <Column field="direccion" header="Direccion"></Column>
          <Column field="telefono" header="Telefono"></Column>
        </DataTable>
      </Panel>
      <Dialog header="Persona" visible={showModal} style={{ width: '50vw' }} footer={renderFooter()} onHide={() => setShowModal(false)}>
       
        <div className="p-fluid">
          <form id="persona-form">
          <div className="p-field">
          <label htmlFor="nombre">Nombre</label>
            <InputText name="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </div>
          <div className="p-field">
          <label htmlFor="apellido">Apellido</label>
            <InputText name="apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />
            </div>
          <div className="p-field">
          <label htmlFor="direccion">Direccion</label>
            <InputText name="direccion" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
            </div>
          <div className="p-field">
          <label htmlFor="telefono">Telefono</label>
            <InputText name="telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
            </div>
          </form>
        </div>
      </Dialog>
    </div>
  );
}

export default App;
