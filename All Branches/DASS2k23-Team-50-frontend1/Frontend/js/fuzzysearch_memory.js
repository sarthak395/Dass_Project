// const Fuse = require('fuse.js')

const companies = [{name:'Adata'},{name:'Crucial'},{name:'Corcair'},{name:'G.Skill'},{name:'Antec'},{name:'Gigabyte'}]

const options = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
        "name"
    ]
}

const fuse = new Fuse(companies, options)
        
const searchbox = document.querySelector('#searchbox')
searchbox.addEventListener('keyup', (e) => {
    const result = fuse.search(e.target.value)
    if(result.length === 0){
        companies.forEach((company) => {result.push({item:company})})
    }
    const companydropmenu = document.getElementsByClassName('compcheckboxes')[0]
    companydropmenu.innerHTML = ''
    result.forEach((company) => {
        // console.log(company.item.name)
        companydropmenu.innerHTML += `<div class="form-inline border rounded p-md-2 p-sm-1">
        <input type="checkbox" onchange={submit_data()} name="Company" id="Asus" value="Asus">
        <label for="Asus" class="pl-1 pt-sm-0 pt-1">${company.item.name}</label>
      </div>`
    })
})

