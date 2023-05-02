import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
// import { MaterialIcons } from ';

const BuyPage = ({route}) => {
  const user_Name = route.params.user_Name;
  const Show_Img = route.params.ImgUrl;
  const element_Name = route.params.elementName;
  const discription_Text = route.params.discription;
  const payType = route.params.payType;
  const type = route.params.type;
  // console.log('Element_name', Element_name);
  console.log('buypage ImgUrl ', Show_Img);
  console.log('buypage elementName ', element_Name);
  console.log('buypage payType ', discription_Text);
  console.log('buypage discription ', discription_Text);

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
    <ScrollView
      style={
        {
          // width: '90%',
          // backgroundColor: 'red',
        }
      }>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{uri: Show_Img}} style={styles.image} />
          <View style={styles.userName_container}>
            {type ? <Text style={styles.type}>{type}</Text> : null}
            {user_Name ? (
              <Text style={styles.userName}>{user_Name}</Text>
            ) : null}
          </View>
        </View>

        <View style={styles.productDetailsContainer}>
          <Text style={styles.productTitle}>{element_Name}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={styles.priceContainer}>
              <Text style={styles.priceLabel}>RS:</Text>
              <Text style={styles.price}>
                {payType ? <>{payType}</> : 'free'}
              </Text>
            </View>

            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={handleDecreaseQuantity}>
                <Text style={styles.quantityText}>-</Text>

                {/* <MaterialIcons name="remove" size={24} color="#555" /> */}
              </TouchableOpacity>
              <Text style={styles.quantity}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={handleIncreaseQuantity}>
                <Text style={styles.quantityText}>+</Text>
                {/* <MaterialIcons name="add" size={24} color="#555" /> */}
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.discriptionContainer}>
            <Text style={styles.discriptionLabel}>About</Text>

            <Text style={styles.discriptionText}>{discription_Text}</Text>
          </View>

          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={handleCheckout}>
            <Text style={styles.checkoutButtonText}>Buy now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAEAEA',
    padding: 20,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1 / 1.5,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    position: 'relative',
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
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantityButton: {
    backgroundColor: '#E9D7EE',
    borderRadius: 5,
    paddingHorizontal: 10,

    paddingVertical: 0,
    marginHorizontal: 5,
  },
  quantityText: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'black',
  },
  quantity: {
    fontSize: 18,
    color: 'black',

    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  priceLabel: {
    fontSize: 30,
    marginRight: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  price: {
    fontSize: 30,
    color: '#EB9371',
    textTransform: 'uppercase',

    fontWeight: '700',
  },
  discriptionContainer: {
    // flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#BAD7F1',
    borderRadius: 10,
  },
  discriptionLabel: {
    backgroundColor: '#99CCFA',
    width: '100%',
    fontSize: 16,
    // marginRight: 5,
    color: 'black',
    letterSpacing: 3,
    textTransform: 'uppercase',
    textAlign: 'center',
    borderRadius: 10,
  },
  discriptionText: {
    width: '85%',
    fontSize: 16,
    marginRight: 5,
    color: 'black',
    textTransform: 'capitalize',
    paddingVertical: 10,
  },

  checkoutButton: {
    backgroundColor: '#EAA387',
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  userName_container: {
    // backgroundColor:"orange",
    // ,width:'30%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginLeft: 5,
    marginBottom: 5,
    position: 'absolute',
    bottom: 0,
    // padding:20,
  },
  userName: {
    color: '#095707',
    fontSize: 11,
    paddingHorizontal: 18,
    paddingVertical: 3,
    borderRadius: 50,
    backgroundColor: '#60FFA7EC',
    letterSpacing: 1,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  type: {
    color: '#0B490A',
    fontSize: 15,
    fontWeight: '800',
    paddingHorizontal: 20,
    paddingVertical: 3,
    borderRadius: 50,
    backgroundColor: '#C2FF60E5',
    letterSpacing: 1,
    marginLeft: 10,
  },
});
export default BuyPage;
