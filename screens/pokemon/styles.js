import { StyleSheet } from 'react-native';

import colors from '../../components/pokemon/colors';

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        flex: 1,        
    },     
    activityIndicator: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    pokeball: {        
        flex: 2,        
        alignItems: 'center',
        justifyContent: 'center',
    },
    opponentsCards: {        
        flex: 1,        
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        zIndex: 1,
        elevation: 1,
    },
    opponentsChoice: {        
        flex: 1,        
    },
    yourChoice: {        
        flex: 1,        
    },
    myCards: {         
        flex: 1,        
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',        
    },

});

export default styles;