import moment from "moment";
import React from "react";
import {
    FlatList, SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    Text,
    View
} from "react-native";
import { useSelector } from "react-redux";
import CityLine from "../../components/CityLine";
import ModalActivityIndcator from "../../components/ModalActivityIndicator";
import NoData from '../../components/NoData';
import Swiper from 'react-native-swiper'



const HourlyView = (props) => {
    const{
        ps,
        isLoading,
        pTRHandler,
        Cities,
        getPerm,
    }=props
  return (
    <SafeAreaView style={styles.fl}>
      {isLoading ? (
        <ModalActivityIndcator show={true} />
      ) : ps ? (
        <Swiper style={styles.wrapper} index={1}>
        <View style={styles.sr}>
          <View>
            <Text style={styles.Name}>Yesterday</Text>
          </View>
           <FlatList
             data={Cities}
             renderItem={(itemData) => (
               <CityLine
                 name={moment(new Date(itemData.item.time)).format("LT")}
                 temp={itemData.item.temperature}
                 wicon={itemData.item.wcondition}
                 DH={true}
               />
             )}
             refreshing={isLoading}
             onRefresh={() => {
               pTRHandler();
             }}
           />
        </View>
        <View style={styles.slide2}>
          <Text style={styles.text}>Beautiful</Text>
        </View>
      </Swiper>
     
      ) : (
        <NoData onPress={getPerm} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centred:{
    width:'40%',
  },
  fl: {
    flex: 1,
    marginBottom: 15
  },
  Name: {
    paddingVertical: 5,
    fontWeight: "bold",
    fontSize: 20,
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
  access: {
    backgroundColor: "#694fad",
    marginVertical: 15,
    height: 40,
    width: 120,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  descr: {
    paddingVertical: 5,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sr: {
    marginVertical: 10,
    width: "100%",
    marginStart: "5%",
  },
  header: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});



export default HourlyView;
