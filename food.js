const btnCart=document.querySelector('#cart-icon');
const cart=document.querySelector('.cart');
const btnClose=document.querySelector("#cart-close");

btnCart.addEventListener('click',()=>{
    
    cart.classList.add('cart-active');


});
btnClose.addEventListener('click',()=>{
    
    cart.classList.remove('cart-active');


});
document.addEventListener('DOMContentLoaded',loadFood);

function loadFood(){
    loadContent();
}
function loadContent()
{
    let btnRemove=document.querySelectorAll(".cart-remove");
    btnRemove.forEach((btn)=>{
        btn.addEventListener("click",removeItem);
    });

    let qtyElements=document.querySelectorAll(".cart-quantity");
    qtyElements.forEach((input)=>{
        input.addEventListener("change",changeQty);
    });


    let cartBtns=document.querySelectorAll(".ads_cart");
    cartBtns.forEach((btn)=>
    {
        btn.addEventListener("click",addCart);
    });
    updateTotal();
}

function removeItem()
{
    let title=this.parentElement.querySelector('.cart-food-title').innerHTML;
    itemList=itemList.filter(el=>{
        el.title!=title;
    });
    this.parentElement.remove();
    loadContent();
}

function changeQty()
{
    if(isNaN(this.value)||this.value<1)
    {
        this.value=1;
    }
    loadContent();
}

let itemList=[];
function addCart()
{
    console.log("cs");
    let food=this.parentElement;
    let title=food.querySelector(".food-title").innerHTML;
    let price=food.querySelector(".food-price").innerHTML;
    let imgsrc=food.querySelector(".food-img").src;

    let newProduct={title,price,imgsrc};
    if(itemList.find((el)=>el.title==newProduct.title))
    {
        alert("Product already added in cart");
        return;//to avoid duplicate
    }
    else{
        itemList.push(newProduct);
    }


    let newProductElement=createCartProduct(title,price,imgsrc);
   // console.log(newProductElement);
    let element=document.createElement('div');
    element.innerHTML=newProductElement; 
    let cartBasket=document.querySelector('.cart-content');
    cartBasket.append(element);
    //console.log(newProductElement);
    loadContent();
}

function createCartProduct(title,price,imgSrc)
{
    console.log("sin");
    return `
    <div class="cart-box">
                <img class="cart-img" src="${imgSrc}">
                <div class="detail-box">
                    <div class="cart-food-title">${title}</div>
                    <div class="price-box">
                        <div class="cart-price">
                            ${price}
                        </div>
                        <div class="cart-amt">${price}</div>
                    </div>
                    <input type="number" value="1" class="cart-quantity">
                </div>
            <ion-icon name="trash" class="cart-remove"></ion-icon>
            </div>
            `;
}

function updateTotal()
{
    const cartItems=document.querySelectorAll('.cart-box');
    const totalValue=document.querySelector(".total-price");
    let total=0;

    cartItems.forEach(product=>{
        let priceElement=product.querySelector('.cart-price');
        let price=parseFloat(priceElement.innerHTML.replace("Rs.",""));
        console.log(price);
        let qty=product.querySelector('.cart-quantity').value;
        total+=(price*qty);
        product.querySelector(".cart-amt").innerText="Rs."+price*qty;
    });
    totalValue.innerHTML="Rs."+total;

    const cartCount=document.querySelector("#cart_count");
    let count=itemList.length;
    cartCount.innerHTML=count;

    if(count==0)
    {
        cartCount.style.display="none";
    }
    else{
        cartCount.style.display='block';
    }
}