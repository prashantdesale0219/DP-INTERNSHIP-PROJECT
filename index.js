
let cartcount=document.getElementById("cart-count");

// add to cart json server

let productData =[]
function fetchData(){
    fetch("https://website-int.onrender.com/cartpage")
    .then(res=>res.json()).then(data=>{
        productData = data;
        SingleCard(productData)
    })
    .catch(err=>console.log(err))
}
fetchData()

function SingleCard(data){
    cartcount.innerHTML=data.length
    let StoreData = data.map((el)=>{
        return Card(el.id,el.title,el.image,el.imagehover,el.price)})
   document.querySelector(".offcanvas-body").innerHTML = StoreData.join("")

}

let arr=[]
function totalam(productData){
    arr=productData
    let total=0
    productData.forEach((el)=>{
        total+= +el.price
    })
    document.getElementById("tatal-am").innerHTML=`$${total}`
}

function Card(id,title,image,imagehover,price){
    return `
    <a href="" data-id="${id}">
    <div class="cart">
    <div class="cart-images">
    <img src="${image}" alt="" class="cart-image">
    <img src="${imagehover}" alt="" class="cart-imageHover">
    </div>
    <h2 id="product-title">${title}</h2><br>
    <p id="product-price">${price}</p>
    <input type="number" id="product-value" value="1" class="quantity-input"><br>
    <button class="btn btn-danger "  data-id="${id}"><i class="bi bi-trash3-fill"></i></button>
    </div>
    </a>`
}

document.addEventListener("click",(e)=>{
  if(e.target.classList.contains("btn-danger")){
      DeleteBtn(e.target.dataset.id)
  }
})

function DeleteBtn(id){
  fetch(`https://website-int.onrender.com/cartpage/${id}`,{
      method: "DELETE",
  }).then((res)=>console.log(res))
  .then((data)=>{
      console.log(data)
      fetchData()
  })
  .catch(err=>console.log(err))
}





















