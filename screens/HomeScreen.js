import React, { Component } from 'react';
import {StyleSheet, Text, View, ScrollView, Image,
       FlatList, Dimensions, Keyboard, Alert, StatusBar, Animated, TouchableOpacity} from 'react-native';

import SelectMultiple from 'react-native-select-multiple';
import { SearchBar, Icon, Rating} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { RkButton, RkCard, RkTheme, RkTextInput, RkText } from 'react-native-ui-kitten';

import Navbar from '../components/Navbar';
import Theme from '../constants/Theme';
import Count from '../components/Count';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const bottom_initial = 0;

const dairy = ['Milk', 'Eggs', 'Butter', 'Parmesan', 'Cheddar', 'Cream cheese', 'Yogurt', 'Goat cheese', 'Brie', 'Gouda', 'Creme fraiche', 'Mascarpone', 'Emmental', 'Neufchatel']
const vegetables = ['Potato', 'Tomato', 'Onion', 'Garlic', 'Basil', 'Broccoli', 'Carrot', 'Mushroom', 'Green beans', 'Ginger', 'Chili pepper', 'Celeryn', 'Rosemary', 'Red onions', 'Sweet potato', 'Avocado', 'Olives','Asparagus', 'Pumpkin', 'Squash', 'Mint', 'Radish', 'Artic' ]
const meats = ['Bacon', 'Fish', 'Whole chicken', 'Chicken breast','Beef steak','Ham', 'Hot dog','Pork chops', 'Chicken thighs', 'Ground turkey', 'Pork', 'Pepperoni', 'Ground pork' ,'Chorizo', 'Salami', 'Spam', 'Venison', 'Bologna', 'Lamb', 'Corned beef', 'Duck', 'Ground veal', 'Goose', 'Oxtail', 'Foie gras', 'Snail', 'Alligator']
const fruits = ['Lemon', 'Apple', 'Banana', 'Lime', 'Orange', 'Blueberry', 'Raisin', 'Grape', 'Peach', 'Date', 'Apricot' ,'Tangerine', 'Watermelon']
const grains = [ 'Rice', 'Pasta', 'Flour', 'Bread', 'Baking soda', 'Quinoa', 'Bread crumbs', 'Noodle' ,'Brown rice' ,'Chips', 'Biscuits' ,'Bagel', 'Pie' ,'Ramen']
const desserts = ['Chocolate', 'Strawberry jam', 'Marshmallow', 'Syrup', 'Potato chips', 'Nutella', 'Caramel', 'Candy', 'Corn chips', 'Cookies', 'Peach preserves', 'Black pudding', 'Fudge', 'Lemon jelly']

export default class HomeScreen extends Component {
    static navigationOptions = {
    header: null,
  };

  constructor(props) {
  super(props);
  this.state = {
    selectedIngredients: [],
    data: [],
    query: '',
    dairy: true,
    vegetables: false,
    meats: false,
    fruits: false,
    grains: false,
    desserts: false,
    contentInsetBottom: bottom_initial,
    loading: true,
  }
}

  dairy() {
    this.setState({ dairy: true, fruits: true, grains: false, desserts: false, meats: false, vegetables: false});
  }

  vegetables() {
    this.setState({ vegetables: true, fruits: true, grains: false, desserts: false, dairy: false, meats: false });
  
  }  
  meats() {
    this.setState({ meats: true, fruits: true, grains: false, desserts: false, dairy: false, vegetables: false });
  }

  fruits() {
    this.setState({ fruits: true, grains: false, desserts: false, dairy: false, meats: false, vegetables: false});
  }

  grains() {
    this.setState({ grains: true, fruits: false, desserts: false, dairy: false, meats: false, vegetables: false});
  }

  desserts() {
    this.setState({ desserts: true, grains: false, fruits: false, dairy: false, meats: false, vegetables: false  });
  }

  onSelectionsChange = (selectedIngredients) => {
    this.setState({ selectedIngredients })
  }
  switcher() {
    const { navigate } = this.props.navigation;
    navigate('ResultsScreen', {passedData:this.state.selectedIngredients });
  }

  render() {
  const { navigate } = this.props.navigation;
    return (
      <View style={s.container}>
      <StatusBar animated translucent backgroundColor="rgba(0, 0, 0, 0.20)" />

      <Navbar title="Dashboard" function="Submit" type="white" handle={() => this.switcher()} />

          <View>
            <Count results={this.state.selectedIngredients}/>
          </View>

        <View style={s.divider} />
        <Animatable.View easing='ease-out-circ' duration={500} animation="fadeIn" style={s.btnblock}>
        
        <RkButton onPress={this.dairy.bind(this)} rkType={'category'}>Dairy</RkButton>
        <RkButton onPress={this.meats.bind(this)} rkType={'category'}>Meats</RkButton>
        <RkButton onPress={this.vegetables.bind(this)} rkType={'category'}>Vegetables</RkButton>

        </Animatable.View>
        <View style={s.divider} />

        <Animatable.View easing='ease-out-circ' duration={500} animation="fadeIn" style={s.btnblock}>
        
        <RkButton onPress={this.fruits.bind(this)} rkType={'category'}>Fruits</RkButton>
        <RkButton onPress={this.grains.bind(this)} rkType={'category'}>Grains</RkButton>
        <RkButton onPress={this.desserts.bind(this)} rkType={'category'}>Desserts</RkButton>

        </Animatable.View>

        <View style={s.divider} />

          <View style={{flex:1}}>

          {this.state.dairy ? <View>
          <ScrollView automaticallyAdjustContentInsets={false}
          showsVerticalScrollIndicator={false} style={s.list} 
          contentInset={{top:0, bottom: this.state.contentInsetBottom }} > 
          <Animatable.Text style={s.category} easing='ease-out-circ' duration={600} animation="fadeInUpBig">Dairy</Animatable.Text>
          <SelectMultiple items={dairy} selectedLabelStyle={{fontFamily: 'bold' }} 
          selectedItems={this.state.selectedIngredients} onSelectionsChange={this.onSelectionsChange} />        
          </ScrollView></View> : null }

          {this.state.meats ? <View>
          <ScrollView automaticallyAdjustContentInsets={false}
          style={s.list} showsVerticalScrollIndicator={false}
          contentInset={{top:0, bottom: this.state.contentInsetBottom }} > 
          <Animatable.Text style={s.category} easing='ease-out-circ' duration={600} animation="fadeInUpBig">Meats</Animatable.Text>
          <SelectMultiple items={meats} selectedLabelStyle={{fontFamily: 'bold' }}
          selectedItems={this.state.selectedIngredients} rowStyle={{borderBottomColor: '#fff', marginVertical: -5}}
          onSelectionsChange={this.onSelectionsChange} />   
          </ScrollView></View> : null }

          {this.state.vegetables ? <View>
          <ScrollView automaticallyAdjustContentInsets={false}
          style={s.list} showsVerticalScrollIndicator={false}
          contentInset={{top:0, bottom: this.state.contentInsetBottom }} > 
          <Animatable.Text style={s.category} easing='ease-out-circ' duration={600} animation="fadeInUpBig">Vegetables</Animatable.Text>
          <SelectMultiple items={vegetables} selectedLabelStyle={{fontFamily: 'bold' }}
          selectedItems={this.state.selectedIngredients} rowStyle={{borderBottomColor: '#fff', marginVertical: -5}}
          onSelectionsChange={this.onSelectionsChange} />  
          </ScrollView></View> : null }

          {this.state.fruits ? <View>
          <ScrollView automaticallyAdjustContentInsets={false}
          showsVerticalScrollIndicator={false} style={s.list} 
          contentInset={{top:0, bottom: this.state.contentInsetBottom }} > 
          <Animatable.Text style={s.category} easing='ease-out-circ' duration={600} animation="fadeInUpBig">Fruits</Animatable.Text>
          <SelectMultiple items={fruits} selectedLabelStyle={{fontFamily: 'bold' }}
          selectedItems={this.state.selectedIngredients} rowStyle={{borderBottomColor: '#fff', marginVertical: -5}}
          onSelectionsChange={this.onSelectionsChange} />        
          </ScrollView></View> : null }

          {this.state.grains ? <View>
          <ScrollView automaticallyAdjustContentInsets={false}
          style={s.list} showsVerticalScrollIndicator={false}
          contentInset={{top:0, bottom: this.state.contentInsetBottom }} > 
          <Animatable.Text style={s.category} easing='ease-out-circ' duration={600} animation="fadeInUpBig">Grains and Bakery</Animatable.Text>
          <SelectMultiple items={grains} selectedLabelStyle={{fontFamily: 'bold' }}
          selectedItems={this.state.selectedIngredients} rowStyle={{borderBottomColor: '#fff', marginVertical: -5}}
          onSelectionsChange={this.onSelectionsChange} />   
          </ScrollView></View> : null }

          {this.state.desserts ? <View>
          <ScrollView automaticallyAdjustContentInsets={false}
          style={s.list} showsVerticalScrollIndicator={false}
          contentInset={{top:0, bottom: this.state.contentInsetBottom }} > 
          <Animatable.Text style={s.category} easing='ease-out-circ' duration={600} animation="fadeInUpBig">Desserts</Animatable.Text>
          <SelectMultiple items={desserts} selectedLabelStyle={{fontFamily: 'bold' }}
          selectedItems={this.state.selectedIngredients} rowStyle={{borderBottomColor: '#fff', marginVertical: -5}}
          onSelectionsChange={this.onSelectionsChange} />  
          </ScrollView></View> : null }

          </View>

      </View>
    );
  }
}
const s = StyleSheet.create({
  container: {
    backgroundColor: '#f7f7f7',
    flex:1
  },
  list: {
    marginHorizontal: 0,
    marginBottom: 0,
  },
  btnblock: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'transparent',
 },
  mainheader: {
    fontWeight: 'bold',
    color: '#fff'
  },
  category: {
    fontSize: 21,
    fontWeight: 'bold',
    paddingVertical: 10,
    textAlign:  'center', 
    color: '#000',
    backgroundColor: '#fff',
  },
    spinner: {
    flex: 1,
    alignItems: 'center',
    justifyContent:  'center',
  },
  divider: {
    marginVertical: 8
  }

});