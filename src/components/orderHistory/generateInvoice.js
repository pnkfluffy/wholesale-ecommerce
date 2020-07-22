import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#b6f8ba'
    },
    section: {
        flexDirection: 'row',
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
});

const Invoice = props => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text>Invoice {props.data}</Text>
            </View>
            <View style={styles.section}>
                <Text>Subtotal: </Text>
            </View>
        </Page>
    </Document>
);

export default {Invoice};