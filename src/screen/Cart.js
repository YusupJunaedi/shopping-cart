import React, {useState, useEffect} from 'react'
import {View, Text,SafeAreaView, ScrollView, Image, TouchableOpacity, ToastAndroid} from 'react-native'
import { Button, Card, CardItem, Body } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5'
import dataChart from '../data/cart.json'
import numeral from 'numeral'
import _ from 'underscore'
import { useSelector, useDispatch } from 'react-redux';
import { plusQtyCreator, minusQtyCreator, deleteCartCreator } from '../redux/actions/cart';

const Toast = ({ visible, message }) => {
    if (visible) {
      ToastAndroid.showWithGravityAndOffset(
        message,
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        25,
        50
      );
      return null;
    }
    return null;
  };

function Cart() {

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart.data)
    const groupCart = _.groupBy(cart, 'id_store')
    const listCart = Object.values(groupCart)

    const [visibleToast, setvisibleToast] = useState(false);
    const [message, setMessage] = useState('')

    useEffect(() => setvisibleToast(false), [visibleToast]);

    const getLimitString = (str) => {
        if(str.length > 70){
          return `${str.substr(0, 70)}...`
        }else{
          return str
        }
      }

    const handlePlus = (id, stok, qty) => {
        const index = cart.findIndex((item) => {
          return item.id_product === id;
        });

        if(stok === qty){
            setMessage('Stok barang tidak mencukupi')
            setvisibleToast(true);
        }else{
            dispatch(plusQtyCreator(index));
        }
    
      };
    
      const handleMinus = (id, stock, qty) => {
        const index = cart.findIndex((item) => {
          return item.id_product === id;
        });
        dispatch(minusQtyCreator(index));
      };

    const deleteCart = (id) => {
    dispatch(deleteCartCreator(id));
    };
     

    return (
        <View style={{flex: 1}}>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignContent: 'center', paddingVertical: 15,
          backgroundColor: '#e31f51'}}>
                <Text style={{color: 'white', fontSize: 15}}>Keranjang Belanja</Text>
            </View>
            <Toast visible={visibleToast} message={message}/>

            <View style={{flex: 1, backgroundColor: '#F5F5F5'}}>
                
                    {
                        cart?.length ? 
                        <ScrollView>
                            {listCart.map(item => {
                                return <Card key={item[0].id_store}>
                                            <CardItem bordered>
                                                <Icon name='store' size={25} color='#e31f51' />
                                                <Text style={{paddingHorizontal: 10}}>{item[0].name_store}</Text>
                                            </CardItem>
                                                {
                                                    item.map(e => {
                                                        return <CardItem footer bordered key={e.id_product}>
                                                                    <Body style={{flex: 1}}>
                                                                        <View style={{flexDirection: "row", justifyContent: 'space-between'}}>
                                                                            <View style={{flex: 1}}>
                                                                                <Text style={{paddingHorizontal: 10}}>
                                                                                    {getLimitString(e.name_product)}
                                                                                </Text>
                                                                                <Text style={{paddingVertical:10,paddingHorizontal: 10}}>Rp. {numeral(e.price).format(0,0)}</Text>
                                                                            </View>
                                                                            <Image source={{uri: e.image_url}} style={{width: 70, height: 70}} />
                                                                        </View>
                                                                        <View style={{flexDirection: "row", justifyContent: 'space-between', paddingVertical: 10}}>
                                                                            <View style={{flex: 1, flexDirection: "row", alignItems: 'center'}}>
                                                                                <View style={{backgroundColor: '#F5F5F5', marginHorizontal: 10}}>
                                                                                    <TouchableOpacity onPress={() => handleMinus(e.id_product, e.stock, e.qty)}>
                                                                                    <Text style={{fontWeight: 'bold', fontSize: 20, paddingHorizontal: 10}}>-</Text>
                                                                                    </TouchableOpacity>
                                                                                </View>
                                                                                <Text style={{backgroundColor: '#F0F0F0', fontWeight: 'bold', fontSize: 20, width: 70, textAlign: 'center'}}>{e.qty}</Text>
                                                                                <View style={{backgroundColor: '#F5F5F5', marginHorizontal: 5}}>
                                                                                    <TouchableOpacity onPress={() => handlePlus(e.id_product, e.stock, e.qty)}>
                                                                                        <Text style={{fontWeight: 'bold', fontSize: 20, paddingHorizontal: 10}}>+</Text>
                                                                                    </TouchableOpacity>
                                                                                </View>
                                                                            </View>
                                                                                <TouchableOpacity onPress={() => deleteCart(e.id_product)}>
                                                                                    <Icon name='trash' size={25} color='lightgrey' style={{paddingHorizontal: 10}} />
                                                                                </TouchableOpacity>
                                                                        </View>
                                                                    </Body>
                                                                </CardItem>
                                                    })
                                                }
                                        </Card>
                            })} 
                            </ScrollView> : 
                                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={{fontSize: 20, color: 'grey', justifyContent: 'center', alignItems: 'center'}}>Tidak ada barang di keranjang</Text>
                                </View>
                    }
                
            </View>

            {
                cart?.length ? <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 15, borderTopWidth: 1, borderColor: 'lightgray',}}>
                                        <View style={{flex: 1}}>
                                            <Text>TOTAL</Text>
                                            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Rp. {numeral(cart.reduce((total, item) => {
                                            return total + item.price * item.qty;
                                        }, 0)).format('0,0')}</Text>
                                        </View>
                                        <Button style={{backgroundColor: '#e31f51'}}>
                                            <Text style={{color: 'white', fontSize: 15, paddingVertical: 10, paddingHorizontal: 15}}>Bayar</Text>
                                        </Button>
                                    </View> : null
            }
        </View>
    )
}

export default Cart
