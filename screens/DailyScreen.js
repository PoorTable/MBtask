import React from 'react';

import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

const DailyScreen = props => {
    return(
        <SafeAreaView style={styles.container}>
            <Text>
                Hello, it's Daily Screen!
            </Text>
        </SafeAreaView>
    )
}


    const styles = StyleSheet.create({
        container: {
            flex: 1, 
            justifyContent: 'center', 
            alignItems: 'center'
        },
    });

export default DailyScreen;