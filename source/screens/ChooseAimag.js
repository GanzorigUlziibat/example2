import React, { useState, useEffect } from "react";
import {
  VStack,
  HStack,
  Button,
  IconButton,
  Icon,
  Text,
  NativeBaseProvider,
  Center,
  Box,
  StatusBar,
  View,
  Heading,
  FormControl,
  Input,
  Link,
  Pressable,
  FlatList,
  Avatar,
  Spacer,
  Checkbox,
} from "native-base";
import {
  MaterialIcons,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { openDatabase } from "expo-sqlite";
var db = openDatabase({ name: "aimag.db" });

// http://oblador.github.io/react-native-vector-icons/   --Icons
// (hvz base, Native Base)

function App({ navigation }) {
  let [data, setFlatListItems] = useState([]);
  let [cBoxVal, setcBoxVal] = useState([]);
  let tempCBox = [];

  function HeaderAppBar({ navigation }) {
    return (
      <>
        <StatusBar bg="#3700B3" barStyle="light-content" />
        <Box safeAreaTop bg="#6200ee" />
        <HStack
          bg="#6200ee"
          px="1"
          py="3"
          justifyContent="space-between"
          alignItems="center"
          w="100%"
          maxW="100%"
        >
          <HStack alignItems="center">
            <IconButton
              onPress={() => navigation.navigate("HomeScreen")}
              icon={
                <Icon
                  size="sm"
                  as={MaterialIcons}
                  name="arrow-back"
                  color="white"
                />
              }
            />
            <Text color="white" fontSize="20" fontWeight="bold">
              Аймаг сонгох
            </Text>
          </HStack>
          <HStack>
            {/* <IconButton icon={<Icon as={Feather} name="map" size="sm" color="white" />} />
            <IconButton icon={<Icon as={MaterialIcons} name="search" size="sm" color="white" />} /> */}
            <IconButton
              icon={
                <Icon as={MaterialIcons} name="save" size="sm" color="white" />
              }
              onPress={() => updateAimag({ navigation })}
            />
          </HStack>
        </HStack>
      </>
    );
  }
  function Header({ navigation }) {
    return (
      <Center>
        <HeaderAppBar navigation={navigation} />
      </Center>
    );
  }
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT aid, name, acheck, alink, daraaalal FROM aimag ORDER BY daraaalal ASC",
        // "SELECT name FROM sum",
        [],
        (tx, results) => {
          var temp = [];
          var cBoxTemp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));

            cBoxTemp.push([
              results.rows.item(i)["aid"],
              results.rows.item(i)["acheck"],
            ]);
          }
          setcBoxVal([...cBoxTemp]);
          setFlatListItems([...temp]);
          // alert(cBoxTemp);
          // alert(cBoxVal);
          // alert(temp);
          // alert(data);
        }
      );
    });
  }, []);

  function AimagJagsaaltShow({ data }) {
    return (
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Box
            borderBottomWidth="1"
            _dark={{
              borderColor: "gray.600",
            }}
            borderColor="coolGray.200"
            pl="4"
            pr="5"
            py="2"
          >
            <HStack space={3} justifyContent="space-between">
              <VStack>
                <Text
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="coolGray.800"
                  bold
                >
                  {item.name}
                </Text>
              </VStack>
              <Spacer />
              <Text
                fontSize="xs"
                _dark={{
                  color: "warmGray.50",
                }}
                color="coolGray.800"
                alignSelf="flex-start"
              >
                {item.acheck}
              </Text>
              <Checkbox
                key={item.aid}
                value="test"
                defaultIsChecked={item.acheck == 1 ? true : false}
                accessibilityLabel="This is a dummy checkbox"
                onChange={(isChecked) => CheckBoxChanged(isChecked, item.aid)}
              />
            </HStack>
          </Box>
        )}
        keyExtractor={(item) => item.aid}
      />
    );
  }

  function CheckBoxChanged(isCheckd, ids) {
    tempCBox = [...cBoxVal];
    for (let i = 0; i < tempCBox.length; i++) {
      if (tempCBox[i][0] == ids) {
        tempCBox[i][1] = isCheckd == true ? 1 : 0;
        break;
      }
    }
    // alert(tempCBox);
    // setcBoxVal([...tempCBox]);
  }

  function updateAimag({ navigation }) {
    for (let i = 0; i < tempCBox.length; i++) {
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE aimag SET acheck=? WHERE aid=?",
          [tempCBox[i][1], tempCBox[i][0]],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              console.log(
                "Success",
                "User updated successfully",
                tempCBox[i][1],
                tempCBox[i][0]
              );
            } else console.log("Updation Failed");
          }
        );
      });
    }
    navigation.navigate("HomeScreen");
  }

  return (
    <NativeBaseProvider>
      <View flex={1} px="0">
        <Header navigation={navigation} />
        <AimagJagsaaltShow data={data} />
      </View>
    </NativeBaseProvider>
  );
}

export default App;
