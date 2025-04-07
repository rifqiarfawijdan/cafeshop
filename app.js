document.addEventListener('alpine:init', () => {
  Alpine.data('products', () => ({
    items: [
      { id: 1, name: 'Robusta Brazil', img: 'jpg1.jpg', price: 20000 },
      { id: 2, name: 'Arabica Blend', img: 'jpg2.jpeg', price: 25000 },
      { id: 3, name: 'Primo Passo', img: 'jpg3.jpeg', price: 30000 },
      { id: 4, name: 'Aceh Gayo', img: 'jpg4.jpeg', price: 35000 },
      { id: 5, name: 'Sumatra Mandheling', img: 'jpg5.jpeg', price: 40000 },
    ],
  }));

  Alpine.store('cart', {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {

  // Cek Apakah Ada Barang Yang Sama di Cart
  const cartItem = this.items.find((item) => item.id === newItem.id);
  
  // Jika Belum Ada / Cart Masih Kosong
  if(!cartItem) {
    this.items.push({...newItem, quantity: 1, total: newItem.price });
    this.quantity++;
    this.total += newItem.price;
  } else {
    // Jika Barang Sudah Ada, Cek Apakah Barang Beda Atau Sama Dengan Yang Ada di Cart
    this.items = this.items.map((item) => {
      // Jika Barang Berbeda
      if (item.id !== newItem.id) {
        return item;
      } else {
        // Jika Barang Sudah Ada, Tambah Quantity Dan Totalnya
        item.quantity++;
        item.total = item.price * item.quantity;
        this.quantity++;
        this.total += item.price; 
        return item;
      }
    }); 
  }
    },
    remove(id) {
      // Ambil Item Remove Berdasarkan ID nya
      const cartItem = this.items.find((item) => item.id === id);
      
      // Jika Item Lebih Dari Satu
      if(cartItem.quantity > 1) {
        // Telusuri Satu Satu
        this.items = this.items.map((item) => {
          // Jika Bukan Barang Yang Di Klik
          if(item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        // Jika Barangnya Tinggal Satu
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  }); 
});

// Konversi ke Rupiah
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
};