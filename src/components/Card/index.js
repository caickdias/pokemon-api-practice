import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, Animated, Image, ActivityIndicator, Dimensions } from 'react-native';

import styles from './styles';
import DrawPokeball from '../DrawPokeball';
import colors from '../../global/theme/colors';

const BASE_URL = "https://pokeapi.co/api/v2";
const WINDOW_WIDTH = Dimensions.get('window').width;

//props: title for card's name, position is for calculation according to card position in hand
//direction is for initial animation where cards come from off screen, default is from right off screen
//side is used for some calculations, i'm deeply regret of not writing it down what's used for before
//face is for card facing up and down initial render and animation
//totalCards is for calculation of each card position

const Card = ( {title, position=1, direction='right', side='down', face='up', totalCards} ) => {
    
    const [pokeInfo, setPokeInfo] = useState([]); //state for storing api call of individual poke
    const [loading, setLoading] = useState(true);
    const [measures, setMeasures] = useState({}); //measurements of card and card's position

    const drawDirection = {'left': -1, 'right': 1, 'up': -1, 'down': 1} //object for mapping and multiplying by -1 if needed    
    const faces = ['down', 'up']; //used for animation calculation, if already up then it won't be face down
    
    const half = totalCards % 2 === 0 ? totalCards/2 + 0.5 : Math.ceil(totalCards/2); //calc for each card translation and rotation    

    const xAdjust = useRef(0); //this is for measures and animation when playing card so it goes to center of the field
    //
    const TRANS_X_0 = position * drawDirection[direction] * 100; //used for moving cards offscreen    
    const TRANS_X_1 = (half-position)*-25 * drawDirection[side]; //this is for placing cards on top of others
    //
    const TRANS_Y_1 = (Math.abs(half-position) ** 3 + (Math.abs(half-position) * 4)) * drawDirection[side]; //calc by trial and error so the cards make an arc
    const TRANS_Y_2 = drawDirection[side] * -150; //moving card up or down depeding on side when we play it
    //
    const ROTATE_Z_0 = ((half-position) * 10) * drawDirection[side]; //rotation, part of the arc
        
    const transformationValue = useRef(new Animated.Value(0)); //animation logic           
    const faceValue = useRef(new Animated.Value(faces.indexOf(face))); //if card is already face up it'll skip first part of animation     
    const [isHidden, setIsHidden] = useState(face === 'up' ? false : true); //isHidden is used for switching between card facing up and down      
        

    useEffect(() => {                        
        fetchPokemonInfo(); //let's get poke info in first render        
        drawCardsHandle(); //do the animation for cards coming offscreen
    }, []);    

    const fetchPokemonInfo = async () => {
        fetch(`${BASE_URL}/pokemon/${title}`)
        .then(data => data.json())
        .then(info =>setPokeInfo(info)) //setPoke info
        .catch(err => console.log(err))
        .finally(()=>setLoading(false)); //then finish loading
    }
        
    //-------------animations--------------
    const drawCards = Animated.timing(transformationValue.current, {
        toValue: 1,    
        duration: 1000,
        useNativeDriver: false,
    });

    const playCard = Animated.timing(transformationValue.current, {
        toValue: 2,    
        duration: 500,
        useNativeDriver: false,
    });

    const flipCard = Animated.timing(faceValue.current, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
    });
    //--------------------------------------

    //---------------handlers---------------
    const drawCardsHandle = () => {            
        drawCards.start();
    }

    const playCardHandler = () => {            
        setIsHidden(false); //when card is played render it with face up          
        xAdjust.current = (WINDOW_WIDTH)/2 - (measures.width/2) - measures.x;                                                                                                          
        playCard.start();
        flipCard.start();     
    }
    //--------------------------------------
    const animatedStyles = {
        drawCards: [
            {
                translateX: transformationValue.current.interpolate({
                    inputRange: [0, 1, 2],
                    outputRange: [TRANS_X_0, TRANS_X_1, xAdjust.current],
                }),                      
            },
            {
                translateY: transformationValue.current.interpolate({
                    inputRange: [0, 1, 2],
                    outputRange: [0, TRANS_Y_1 , TRANS_Y_2],
                })
            },
            {
                rotateY: faceValue.current.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['-180deg', '0deg'],
                })
            },
            {
                rotateZ: transformationValue.current.interpolate({
                    inputRange: [0, 1, 2],
                    outputRange: [`${ROTATE_Z_0}deg`, `${ROTATE_Z_0}deg`, '0deg'],
                })
            }
        ],
        cardFace: {
            backgroundColor: faceValue.current.interpolate({
                inputRange: [0, 1],
                outputRange: [colors.card.faceDown, colors.card.faceUp],
            })
        }
    }    

    const FaceUpCard = () => {
        
        if(loading) return (<ActivityIndicator size="small" />)        

        return(
            <View style={{backgroundColor: colors.types[pokeInfo.types[0].type.name]}}>
                
                <View style={styles.faceUpName}>
                    <Text adjustsFontSizeToFit={true} numberOfLines={1}>                                                      
                        {
                            pokeInfo.name[0].toUpperCase().concat(pokeInfo.name.slice(1))
                        }
                    </Text>
                </View>

                <Image style={styles.faceUpPokeImage} source={{uri:`https://img.pokemondb.net/artwork/large/${title}.jpg`}} />

                <View style={styles.faceUpAtkContainer}>

                    <Text style={{fontWeight: 'bold'}}>Atk:</Text>
                    <Text>
                        {pokeInfo.stats[1].base_stat}
                    </Text>

                </View>
            </View>
        );
    }
    
    const FaceDownCard = () => {
        return(
           <View style={{ alignItems: 'center', justifyContent: 'center',}}>
               
               <Text style={{position: 'absolute'}}>
                    {
                        title
                    }
                </Text> 
                
                <DrawPokeball size={35} />

            </View>
        );
    }

    return (
        <TouchableWithoutFeedback onPress={playCardHandler}>            

                <Animated.View 
                    onLayout={({ nativeEvent }) => setMeasures(nativeEvent.layout)} 
                    style={[ styles.container, animatedStyles.cardFace, {transform: animatedStyles.drawCards} ]}
                >
                    {
                        isHidden 
                        ? <FaceDownCard />
                        : <FaceUpCard />                         
                    }                     
                </Animated.View>

        </TouchableWithoutFeedback>
    );
}

export default Card;