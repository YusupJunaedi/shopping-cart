import React, {useEffect, useState} from 'react'
import { View, Text, FlatList, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import dataJson from '../data/data.json'
import {Card, CardItem} from 'native-base';
import numeral from 'numeral'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductCreator } from "../redux/actions/product";
import { addToCartCreator } from "../redux/actions/cart";

function Home({navigation}) {

    const product = useSelector(state => state.product.data)
    const listCart = useSelector(state => state.cart.data)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllProductCreator(dataJson.items))
    }, [])

    const getLimitString = (str) => {
        if(str.length > 35){
          return `${str.substr(0, 35)}...`
        }else{
          return str
        }
      }

    const addToCart = (id_store, name_store, id_product, name_product, price, image, stock) => {
      const indexStore = listCart.findIndex((item) => {
        return item.id_product === id_product;
      });
      
  
      if (indexStore >= 0 ) {
        navigation.navigate('Orders')
      } else {
        const newCart = {
          id_store: id_store,
          name_store: name_store,
          id_product: id_product,
          name_product: name_product,
          price: price,
          image_url: image,
          stock: stock,
          qty: 1,
          total: price
        }
        dispatch(addToCartCreator(newCart));
        navigation.navigate('Orders')
      }
    }  

    

    const renderItem = ({item}) => {
        return (
          <View style={{flex: 1, alignItems: 'center', marginTop: 10}}>
            <TouchableOpacity onPress={() => {
              addToCart(
                item.store.id,
                item.store.name,
                item.id,
                item.name,
                item.price,
                item.stuff.image_url,
                item.stuff.stock
              )
            } }>
              <Card style={{width: 180}}>
                <CardItem cardBody>
                  <Image
                    source={{
                      uri: item.stuff.image_url,
                    }}
                    style={{height: 100, width: null, flex: 1}}
                  />
                </CardItem>
                <CardItem style={{justifyContent: 'center'}}>
                  <Text style={{fontWeight: 'bold'}}>{getLimitString(item.name)}</Text>
                </CardItem>
                <CardItem style={{justifyContent: 'center', marginTop: -15}}>
                  <Text style={{fontWeight: 'bold'}}>Rp. {numeral(item.price).format('0,0')}</Text>
                </CardItem>
              </Card>
            </TouchableOpacity>
          </View>
        );
      };

    return (
        <View style={{flex: 1}}>
            <View style={{
          flexDirection: 'row',
          paddingVertical: 5,
          backgroundColor: '#e31f51',
          alignContent: 'center',
          justifyContent: 'center'
        }}>
                <Image
                    source={require('../assets/images/logo-sakoo.png')}
                    style={{height: 50, width: 100}}
                />
            </View>
            <SafeAreaView style={{flex: 1, marginBottom: 5}}>
                <FlatList
                    numColumns={2}
                    data={product}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            </SafeAreaView>
        </View>
    )
}

export default Home
