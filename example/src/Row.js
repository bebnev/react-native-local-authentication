import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'space-between',
        marginBottom: 8
    },
    flex: {
        flex: 1,
    },
    label: {
        color: '#696969'
    },
    value: {
        fontWeight: 'bold'
    },
});

const Row = ({labelText, valueText}) => {
    return (
        <View style={styles.row}>
            <Text style={[styles.label, styles.flex]}>{labelText}</Text>
            <Text style={styles.value}>{valueText}</Text>
        </View>
    );
};

export default Row;