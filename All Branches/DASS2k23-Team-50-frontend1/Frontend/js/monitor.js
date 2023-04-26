const rangeInput = document.querySelectorAll(".range-input input");
const progress = document.querySelector(".slider .progress");

rangeInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    var minval = parseInt(rangeInput[0].value);
    var maxval = parseInt(rangeInput[1].value);

    minpercent = (minval / rangeInput[0].max)*100
    maxpercent = (maxval / rangeInput[1].max)*100
    progress.style.left = (minpercent - 21) + "%";
    progress.style.width = (maxpercent - minpercent+20) + "%";


    const minsize = document.querySelector('#Size_Value_Min');
    const maxsize = document.querySelector('#Size_Value_Max');
    minsize.innerHTML = `${minval}`;
    maxsize.innerHTML = `${maxval}`;
  });
});


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

  // console.log(products[0].querySelector('h5').innerHTML)
  // now sort these with their prices

  // sort the divs on the basis of alphabetical order of their h5 tag value and then the inner html of classes product and addd this list 

  sorted_products = productsArray.sort((a, b) => a.querySelector('h5').innerHTML > b.querySelector('h5').innerHTML ? 1 : -1)
  console.log(sorted_products[0].querySelector('h5').innerHTML)

  // again convert to node list
  sorted_products = sorted_products.map((product) => product.outerHTML)

  // now update the html of all_monitors
  document.getElementById('all_monitors').innerHTML = sorted_products.join('')

}




const changedslider = (name) => {
  console.log(name);
  const nameRange = document.querySelector(`#${name}_Slider`);
  const nameValue = document.querySelector(`#${name}_Value`);

  nameRange.addEventListener('input', function () {
    nameValue.innerHTML = `${nameRange.value}`;
  });
  submit_data()

}

const search = async () => {
  submit_data()
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
window.onload = submit_data()
async function submit_data() {


  // getting contrast ratio
  const pixel_pitch = document.getElementById("pixel_pitch_Slider").value;
  // console.log("pixel_pitch: " + pixel_pitch);

  // getting brightness
  const brightness = document.getElementById("brightness_Slider").value;
  // console.log(brightness);


  //getting year 
  const model_year = document.getElementById("model_year_Slider").value;
  // console.log(model_year);



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
    all_companies = ["Acer", "Asus", "Benq", "Dell", "HP", "Lenovo", "LG", "msi", "Samsung", "Viewsonic", 'Gigabyte', 'aoc']
    output_data["companies"] = all_companies;
  }

  const searchword = document.querySelector('.allsearch').value;

  output_data["searchword"] = searchword;
  output_data["companies"] = all_companies;
  output_data['sizes'] = { min: 15, max: parseInt(size_class) }
  output_data['years'] = { min: 2013, max: parseInt(model_year) }
  output_data['brightness'] = { min: 200, max: parseInt(brightness) }
  output_data['pixel_pitch'] = { min: 0.2, max: parseFloat(pixel_pitch) }

  // console.log(formData);
  try {
    const response = await fetch('http://localhost:3010/api/monitor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:
        JSON.stringify({ output_data })
    });
    const resp = await response.json();
    const data = resp.completedata
    console.log(data[0]);

    const all_monitors = document.querySelector("#all_monitors");
    all_monitors.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
      console.log(data[i].url);
      k = data[i].url;
      all_monitors.innerHTML += `
          <div class="d-flex w-100 product">
            <div class="col-md-10 mt-1 pb-2 border border-3 ">
              
              <h5>${data[i].name}</h5>
              <button class = "btn btn-secondary ${data[i].name}" onclick ="display_data(event)">Details</button>
              
              <div class="showdetails mt-3 " id = "${data[i].name}" style="display:none;">
                <ul class="col mt-1 mb-1 spec-1 px-5 overflow-auto">
                  <li class="ml-5"><span> Resolution :-${data[i].resolution}</span></li>
                  <li class="ml-5"><span> Brightness ${data[i].brightness}</span></li>
                  <li class="ml-5"><span>Pixel Pitch ${data[i].pixel_pitch}</span></li>
                  </ul>
                  
                  </div>
                  
                  </div>
                  
                  <div class="align-items-center align-content-center col-md-2 border-left mt-1 productaid">
                    <div class="d-flex flex-row align-items-center">
                      <h4 class="mr-1">$13.99</h4>
                      </div>
                      
                      <a href="https://${data[i].url}" class="btn btn-primary">Buy Now</a>
                      <div class="d-flex flex-column mt-4"> </button>
                        </div>
                        </div>
                        </div>
                        </div>
                        
                       
                        </div>
                        `;
    }

  } catch (error) {
    console.error(error);
  }
}


