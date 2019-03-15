class ShoppingCart {
  constructor() {
    this.cart = [];
  }

  tambahProduk(kodeProduk, kuantitas) {
    let newProduct = true;

    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].productName === kodeProduk) {
          this.cart[i].quantity += kuantitas;
          newProduct = false;
          break;
      }
    }

    if (newProduct) {
      this.cart.push({
        productName: kodeProduk,
        quantity: kuantitas
      })
    }
  }

  hapusProduk(kodeProduk) {
    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].productName === kodeProduk) {
        this.cart.splice(i , 1);
        break;
      }
    }
  }

  tampilkanCart() {
    this.cart.forEach((datum) => {
      console.log(`${datum.productName} (${datum.quantity})`)
    })
  }
}

module.exports = ShoppingCart;