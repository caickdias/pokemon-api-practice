import { StyleSheet } from 'react-native';

import colors from '../../global/theme/colors';

export const styles = StyleSheet.create({
    container: {                
        borderColor: colors.card.border,
        height: 100,
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
        borderRadius: 10,
        borderWidth: 5,                
        elevation: 3,        
    },    
    faceUpName: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    faceUpPokeImage: {
        flex: 2, 
        width: 50, 
        height: 40, 
        borderWidth: 0, 
        borderRadius: 50
    },
    faceUpAtkContainer: {
        flex: 2, 
        alignItems: 'center', 
        justifyContent: 'center',
    }    
});

export default styles;