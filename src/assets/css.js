import { StyleSheet, Dimensions } from "react-native";


const CSS = StyleSheet.create({
    row: {
        // flexDirection: 'row',
        flexDirection: 'column',
        // flexWrap: 'wrap',
        flex: 1,
    },

    justifyContentCenter: {
        // justifyContent : 'center',
        backgroundColor: 'red',
        // flex:2,
        flexDirection: "row",
        justifyContent: 'space-between',
        padding: 10


    },
    justifyContentBetween: {
        justifyContent: 'space-between',
    },
    alignItemsCenter: {
        alignItems: 'center',
    },

    round: {
        padding: 5,
        height: 80,
        width: 80,
        backgroundColor: 'wheat',
        borderRadius: 100,
        margin: 'auto',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },

    textCenter: {
        textAlign: 'center',
    },

    fontBold: {
        fontWeight: 'bold',

    },

    border: {
        borderWidth: 1,
        borderColor: "thistle",
    }

});

export default CSS;

