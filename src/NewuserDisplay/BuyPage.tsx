import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
// import { MaterialIcons } from ';

const BuyPage = ({route}) => {
  const Show_Img = route.params.ImgUrl;
  const elementName = route.params.elementName;
  const discription = route.params.discription;
  // console.log('Element_name', Element_name);
  console.log('buypage ImgUrl ', Show_Img);
  console.log('buypage elementName ', elementName);
  console.log('buypage discription ', discription);

  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleCheckout = () => {
    // Implement checkout logic here
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{uri: Show_Img}} style={styles.image} />
      </View>
      <View style={styles.productDetailsContainer}>
        <Text style={styles.productTitle}>{Element_name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Price:</Text>
          <Text style={styles.price}>$9.99</Text>
        </View>
        <View style={styles.discriptionContainer}>
          <Text style={styles.discriptionLabel}>{discription}</Text>
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={handleDecreaseQuantity}>
            {/* <MaterialIcons name="remove" size={24} color="#555" /> */}
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={handleIncreaseQuantity}>
            {/* <MaterialIcons name="add" size={24} color="#555" /> */}
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#084C61',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  productDetailsContainer: {
    paddingHorizontal: 20,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  priceLabel: {
    fontSize: 18,
    marginRight: 5,
    color: 'black',
  },
  discriptionContainer: {
    // flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  discriptionLabel: {
    fontSize: 16,
    marginRight: 5,
    color: 'black',
  },
  price: {
    fontSize: 18,
    color: 'black',

    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantityButton: {
    backgroundColor: '#eee',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
  },
  quantity: {
    fontSize: 18,
    color: 'black',

    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  checkoutButton: {
    backgroundColor: '#1a73e8',
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
export default BuyPage;
