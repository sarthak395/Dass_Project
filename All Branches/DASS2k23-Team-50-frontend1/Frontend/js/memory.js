window.onload = submit_data_memory()
const menubtn = document.querySelector('.menubtn');
menubtn.addEventListener('click', function () {
    const drpmenu = document.querySelector('.drpmenu');
    if (drpmenu.style.display === 'block')
        drpmenu.style.display = 'none';
    else
        drpmenu.style.display = 'block';
});

const display_data = (e) => {
    console.log(e.target.classList.value.slice(18))
    const idselect = e.target.classList.value.slice(18)
    const menu = document.getElementById(idselect)
    console.log(menu)
    if (menu.style.display === 'none')
        menu.style.display = 'block';
    else
        menu.style.display = 'none';
}
const Sort = () => {
    const products = document.querySelectorAll('.product')
    // get data inside h5 tag of all products
    const productsArray = Array.from(products);

    sorted_products = productsArray.sort((a, b) => a.querySelector('h5').innerHTML > b.querySelector('h5').innerHTML ? 1 : -1)
    console.log(sorted_products[0].querySelector('h5').innerHTML)

    // again convert to node list
    sorted_products = sorted_products.map((product) => product.outerHTML)

    // now update the html of all_monitors
    document.getElementById('all_memory').innerHTML = sorted_products.join('')

}
const changedslider = (name) => {
    console.log(name);
    const nameRange = document.querySelector(`#${name}_Slider`);
    const nameValue = document.querySelector(`#${name}_Value`);

    nameRange.addEventListener('input', function () {
        nameValue.innerHTML = `${nameRange.value}`;
    });
    if (name != 'price') {
        submit_data_memory()
    }
}

const search = async () => {
    submit_data_memory()
}
const filterbutton = document.querySelector('.filterbtn');
const sidebar = document.querySelector('.sidebar');
filterbutton.addEventListener('click', function () {


    if (sidebar.style.width === '0px') {
        sidebar.style.width = '200px';
        filterbutton.innerHTML = 'Hide Filters';
    }
    else {
        sidebar.style.width = '0px';
        filterbutton.innerHTML = 'Show Filters';
    }

});
async function submit_data_memory() {

    //getting freq 
    const freq = document.getElementById("freq_Slider").value
    console.log(freq)

    // getting size_class
    const size_class = document.getElementById("Size_Slider").value;
    // console.log(size_class);

    const all_checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    output_data = {}

    // getting all companies
    all_companies = []
    for (let i = 0; i < all_checkboxes.length; i++) {
        all_companies.push(all_checkboxes[i].value);
    }

    // if no company is selected select all companies

    if (all_companies.length == 0) {
        all_companies = ["Adata", "Crucial", "Corcair", "G.Skill", "Antec", "Gigabyte"]
        output_data["companies"] = all_companies;
    }

    const searchword = document.querySelector('.allsearch').value;

    output_data["searchword"] = searchword;
    output_data["companies"] = all_companies;
    output_data['sizes'] = { min: 2, max: parseInt(size_class) }
    output_data['freq'] = { min: 2000, max: parseInt(freq) }

    try {
        const response = await fetch('http://localhost:3010/api/memory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:
                JSON.stringify({ output_data })
        });
        const resp = await response.json();
        const data = resp.completedata
        // console.log(data[0]);

        const all_memory = document.querySelector("#all_memory");
        all_memory.innerHTML = "";
        for (let i = 0; i < data.length; i++) {
            // console.log(data[i].url);
            k = data[i].url;
            all_memory.innerHTML += `
              <div class="d-flex w-100 product">

    <div class="col-md-10 mt-1 pb-2 border border-3">

      <h5>${data[i].name}</h5>
        <button class = "btn btn-secondary ${data[i].name}"  onclick ="display_data(event)">Details</button>

        <div class="showdetails mt-3 " id = "${data[i].name}" style="display:none;">
      <ul class="col mt-1 mb-1 spec-1 px-5 overflow-auto">
        <li class="ml-5 list-item"><span> Size :-${data[i].size}</span></li>
        <li class="ml-5"><span> Frequency ${data[i].frequency}</span></li>
                  </ul>
                </div>

    

    </div>

    <div class="align-items-center align-content-center col-md-2 border-left mt-1">
      <div class="d-flex flex-row align-items-center">
        <h4 class="mr-1">$13.99</h4>
      </div>

    <a href="https://${data[i].link}" class="btn btn-primary">Buy Now</a>
      <div class="d-flex flex-column mt-4"> </button>
      </div>
    </div>
  </div>
</div>
</div>`;
            // all_monitors.appendChild(div);
        }

    } catch (error) {
        console.error(error);
    }
}


