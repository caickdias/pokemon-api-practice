import { StyleSheet } from 'react-native';

export default styles = ( SIZE=100 ) => {
    return{    
        outerBigCircle: {
            backgroundColor: 'white',    
            height: SIZE,
            width: SIZE,
            borderRadius: SIZE/2,
            alignItems: 'center',
            justifyContent: 'center',        
        },
        innerBigCircle: {
            backgroundColor: colors.background,
            height: SIZE * 0.9,
            width: SIZE * 0.9,
            borderRadius: SIZE * 0.9 / 2,
            alignItems: 'center',
            justifyContent: 'center',
        },
        centerLine: {
            backgroundColor: 'white',
            height: SIZE * 0.05,
            width: '100%',
        },
        outerSmallCircle: {
            backgroundColor: 'white',
            position: 'absolute',
            height: SIZE * 0.35,
            width: SIZE * 0.35,
            borderRadius: SIZE * 0.35 / 2,       
            alignItems: 'center',
            justifyContent: 'center', 
        },
        innerSmallCircle: {        
            backgroundColor: colors.background,
            height: SIZE * 0.25,
            width: SIZE * 0.25,
            borderRadius: SIZE * 0.25 / 2,
        },
    };
};