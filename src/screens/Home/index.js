import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, ActivityIndicator } from 'react-native';

import styles from './styles';
import DrawPokeball from '../../components/DrawPokeball'; //custom comp for displaying pokeballs
import Card from '../../components/Card'; //custom card component

const BASE_URL = "https://pokeapi.co/api/v2";
const INITIAL_CARDS = 7;
const NUM_OF_POKES = 150;

export const Home = () => {
    
    const [pokemons, setPokemons] = useState([]); //store poke names from api call    
    const [loading, setLoading] = useState(true); 
    const [myHand, setMyHand] = useState([]); //state for player's cards
    const [oppHand, setOppHand] = useState([]); //state for opponent's cards
    
    useEffect(() => {
        let isMounted = true; //for clean up
        
        fetchPokemons() //it will call async function calling the api then set pokemons from response            
        .then((res) => {            
            if(isMounted){                                  
                setPokemons(res.results);                                                
            }
        }) 
        
        return function cleanup() { isMounted = false; } //for dismount, not sure if this is working        

    }, []);

    //this useEffect will trigger after pokemons state changes so we can work with its data
    //after setting poke state, we'll now set initial hands using pokemons array
    //then it'll set loading false so it'll render game screen
    useEffect(() => {
        let isMounted = true;        
        
        if(isMounted){
            setHands();
            setLoading(false);            
        }

        return function cleanup() { isMounted = false ;}
        
    }, [pokemons]);
    
    //it's simply copying pokemons array and sorting it randomly then we'll have a full sorted deck
    //then just give us X first cards and set hands state    
    const setHands = () => {        
                
        const myDeck = [...pokemons].sort(()=> Math.random() - 0.5);
        const oppDeck = [...pokemons].sort(()=> Math.random() - 0.5);
        
        setOppHand(oppDeck.splice(0, INITIAL_CARDS)); 
        setMyHand(myDeck.splice(0, INITIAL_CARDS));               
        
    }
    
    //fetch for consulting poke public api
    const fetchPokemons = async () => {
        let req = await fetch(`${BASE_URL}/pokemon?limit=${NUM_OF_POKES}`);        
        return await req.json();
    } 
    
    //maybe i'm being redudant here?
    if(loading || myHand.length < 1 || oppHand.length < 1) {
        return(
            <View style={styles.activityIndicator}>
                <ActivityIndicator/>
            </View>
        );
    }

    //screen is divided into three parts: opponent's cards area, middle area (here it goes pokeball drawing)
    //middle area is 1 part now, but first i tried two parts: opponent field and player field but i changed
    //and finally player cards area
    //
    //see Card props explanation in components/pokemon/card/index
    return (
        <SafeAreaView style={styles.container}>                        
            <View style={styles.opponentsCards}>                
                {
                    oppHand.map((item, index) => {
                        
                        return(
                            <Card 
                                title={item.name}
                                totalCards={oppHand.length} 
                                position={index+1} 
                                side='up' 
                                direction='left' 
                                face='down'                             
                                key={item.name} 
                            />
                        )
                    })
                }
            </View>

            <View style={styles.pokeball}>
                <DrawPokeball />
            </View>

            <View style={styles.myCards}>                                
                {
                    myHand.map((item, index) => {
                        return(
                            <Card 
                                title={item.name}
                                totalCards={myHand.length} 
                                position={myHand.length-index} 
                                side='down' 
                                face='up'                            
                                key={item.name} 
                            />
                        )
                    })
                }
            </View>
        </SafeAreaView>
    );    

}



