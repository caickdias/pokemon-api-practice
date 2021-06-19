import React from 'react';
import { View } from 'react-native';

import style from './styles';

export const DrawPokeball = ({ size=200, visible=true }) => {
    
    const styles = style(size);    

    if(!visible) return null;

    return (
                
        <View style={styles.outerBigCircle}>
            
            <View style={styles.innerBigCircle}>
                <View style={styles.centerLine}></View>    
            </View>

            <View style={styles.outerSmallCircle}>
                <View style={styles.innerSmallCircle} />
            </View>
            
        </View>        
    );
}

export default DrawPokeball;
