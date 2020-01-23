//Inicializador del elemento Slider
const APIURL = 'http://localhost:3000';
let metaDataObtained = false;
let customSearch = false;
$("#rangoPrecio").ionRangeSlider({
  type: "double",
  grid: false,
  min: 0,
  max: 100000,
  from: 1000,
  to: 20000,
  prefix: "$"
})

function setSearch() {
  let busqueda = $('#checkPersonalizada')
  busqueda.on('change', (e) => {
    if (customSearch === false) {
      customSearch = true
    } else {
      if(metaDataObtained === false) {
        fetch(`${APIURL}/getMetaData`)
          .then((res) => res.json())
          .then((data) => {
            const cities = document.getElementById('ciudad');
            data.cities.forEach((city) => {
              cities.innerHTML += `<option value="${city}">${city}</option>`
            });
            const types = document.getElementById('tipo');
            data.types.forEach((type) => {
              types.innerHTML += `<option value="${type}">${type}</option>`
            });
          }).then(() => {
            metaDataObtained = true;
            $('select').material_select();
          });
        }
      customSearch = false;
    }
    $('#personalizada').toggleClass('invisible')
  })
}

function showHouses(houses) {
  const lista = document.getElementsByClassName('lista')[0];
  lista.innerHTML = null;
  houses.forEach((house) => {
    const houseElement = `
      <div class="card horizontal">
            <div class="card-image">
              <img src="img/home.jpg">
            </div>
            <div class="card-stacked">
              <div class="card-content">
                <div>
                  <b>Direccion: ${house.Direccion}</b><p></p>
                </div>
                <div>
                  <b>Ciudad: ${house.Ciudad}</b><p></p>
                </div>
                <div>
                  <b>Telefono: ${house.Telefono}</b><p></p>
                </div>
                <div>
                  <b>Código postal: ${house.Codigo_Postal}</b><p></p>
                </div>
                <div>
                  <b>Precio: ${house.Precio}</b><p></p>
                </div>
                <div>
                  <b>Tipo: ${house.Tipo}</b><p></p>
                </div>
              </div>
              <div class="card-action right-align">
                <a href="#">Ver más</a>
              </div>
            </div>
          </div>
      `;
      lista.innerHTML += houseElement;
    });
}

function searchAll() {
  fetch(`${APIURL}/getAll`).then((res) => res.json()).then((data) => {
    showHouses(data);
  });
}

function makeCustomSearch(city, type, minPrice, maxPrice) {

}

function search() {
  if(customSearch) {
    const ciudad = document.getElementById('ciudad').value;
    const tipo = document.getElementById('tipo').value;
    
    return makeCustomSearch(ciudad, tipo);
  }
  return  searchAll();
}

const buscarButton = document.getElementById('buscar');
buscarButton.addEventListener('click', search);

setSearch()
