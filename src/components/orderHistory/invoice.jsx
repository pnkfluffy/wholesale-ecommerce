import React from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        backgroundColor: "#ffffff",
        flexDirection: 'column',
    },
    top: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        color: '#52ff4d',
        fontSize: 45,
        margin: 10,
        padding: 10,
    },
    information: {
        flexDirection: 'row',
        color: '#0a3b09',
        fontSize: 12,
        margin: 10,
        padding: 10,
    },
    title: {
        color: '#062a05',
        fontSize: 15,
    },
    text: {
        flexDirection: 'column',
        color: '#0a3b09',
        fontSize: 12,
        marginRight: 10,
    },
    section: {
        margin: 10,
        padding: 10,
    },
    image: {
        height: 50,
        width: 150
    },
    displayItems: {
        flexDirection: 'column',
        color: '#0a3b09',
        fontSize: 12,
        margin: 20,
    },
    item: {
        flexDirection: 'row',
    },
    itemNumbers: {
        textAlign: 'center',
        width: 60,
        height: 15,
        borderColor: '#52ff4d',
        borderWidth: 1,
        borderStyle: 'solid',
    },
    itemNameTitle: {
        textAlign: 'center',
        width: 370,
        height: 15,
        flexDirection: 'row',
        borderColor: '#52ff4d',
        borderWidth: 1,
        borderStyle: 'solid',
    },
    itemName: {
        width: 370,
        height: 15,
        flexDirection: 'row',
        borderColor: '#52ff4d',
        borderWidth: 1,
        borderStyle: 'solid',
    },
    right: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    totalArea: {
        flexDirection: 'column',
        color: '#0a3b09',
        fontSize: 12,
        marginRight: 15,
        paddingRight: 10,
    },
    totalTitle: {
        width: 100,
        height: 15,
        textAlign: 'center',
        flexDirection: 'row',
        borderColor: '#52ff4d',
        borderWidth: 1,
        borderStyle: 'solid',
    },
    totalValue: {
        textAlign: 'center',
        width: 120,
        height: 15,
        flexDirection: 'row',
        borderColor: '#52ff4d',
        borderWidth: 1,
        borderStyle: 'solid',
    },
    thanks: {
        color: '#52ff4d',
        fontSize: 15,
        textAlign: 'center',
        marginTop: 20,
    }
});

export function Invoice(props) {
    console.log(props.data);
    const logo = "https://64.media.tumblr.com/ac45c2ec1c2c6512b1c8752f82b0b0c9/849d4b56695a1b67-f2/s1280x1920/24d50a5d50d2ca742f705ceb769ed30a305d3ba3.png"
    if (props.data.shipping)
    {
        return (
            <Document>
                <Page style={styles.page}>
                    <View style={styles.top}>
                        <Image style={styles.image} source={logo}></Image>
                        <Text>
                            Invoice
                        </Text>
                    </View>
                    <View style={styles.top}>
                        <View style={styles.text}>
                            <Text>[ Store Address ]</Text>
                            <Text>[ City, State, ZIP ]</Text>
                            <Text>Phone: 99998888</Text>
                            <Text>Website: www.cbddy-wholesale.com</Text>
                        </View>
                        <View style={styles.text}>
                            <Text>Charging date: {props.data.chargingDate}</Text>
                            <Text>Invoice emitted: {props.data.date}</Text>
                            <Text>Invoice #{props.data.invoice_nr}</Text>
                        </View>
                    </View>
                    <View style={styles.information}>
                        <View style={styles.text}>
                            <Text style={styles.title}>Payment Information</Text>
                            <Text>{props.data.shipping.name}</Text>
                            <Text>{props.data.shipping.address}</Text>
                            <Text>{props.data.shipping.postal_code}</Text>
                            <Text>{props.data.shipping.country}, {props.data.shipping.state}, {props.data.shipping.city}</Text>
                        </View>
                        <View style={styles.text}>
                            <Text style={styles.title}>Shipping Information</Text>
                            <Text>{props.data.shipping.name}</Text>
                            <Text>{props.data.shipping.address}</Text>
                            <Text>{props.data.shipping.postal_code}</Text>
                            <Text>{props.data.shipping.country}, {props.data.shipping.state}, {props.data.shipping.city}</Text>
                        </View>
                    </View>
                    <View style={styles.displayItems}>
                        <View style={styles.item}>
                            <Text style={styles.itemNumbers}>Quantity</Text>
                            <Text style={styles.itemNameTitle}>Product</Text>
                            <Text style={styles.itemNumbers}>Unit Price</Text>
                            <Text style={styles.itemNumbers}>Total</Text>
                        </View>
                        {props.data.items.map(item => {
                            return <View style={styles.item}>
                                <Text style={styles.itemNumbers}>{item.quantity}</Text>
                                <Text style={styles.itemName}>{item.item}</Text>
                                <Text style={styles.itemNumbers}>{item.price}</Text>
                                <Text style={styles.itemNumbers}>{item.amount}</Text>
                            </View>
                        })}
                    </View>
                    <View style={styles.right}>
                        <View style={styles.totalArea}>
                            <View style={styles.item}>
                                <Text style={styles.totalTitle}>Subtotal</Text>
                                <Text style={styles.totalValue}>{props.data.subtotal}</Text>
                            </View>
                            <View style={styles.item}>
                                <Text style={styles.totalTitle}>Taxes</Text>
                                <Text style={styles.totalValue}>10%</Text>
                            </View>
                            <View style={styles.item}>
                                <Text style={styles.totalTitle}>Total</Text>
                                <Text style={styles.totalValue}>{props.data.total}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.thanks}>
                        <Text>Thanks for buying with CBDDY!</Text>
                    </View>
                </Page>
            </Document>
        );
    }
}
