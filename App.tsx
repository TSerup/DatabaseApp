import React, { useState, useEffect } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as SQLite from 'expo-sqlite';
import styles from './styles';

// Create database
const db = SQLite.openDatabase("test.db");

// Function for showing all items in list 
function Items({ onPressItem }: any) {
  const [items, setItems] = useState(null);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM items;`,[],
        (_, { rows: { _array } }) => setItems(_array)
      );
    });
  }, []);

  // Check if anything is in the list
  if (items === null || items.length === 0) {
    return (
      <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeading}>My database is empty</Text>
      </View>
    );
  }

  // If there are elements in the list
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeading}>My database:</Text>
      {items.map(({ id, value }:any) => (
      <View 
        key={id}
        style={styles.showList}>
        <Text style={styles.listText}>{value}</Text>
        <TouchableOpacity
          onPress={() => onPressItem && onPressItem(id)}
          style={styles.deleteBox}>
            <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
      ))}
    </View>
  );
}

export default function App() {
  const [text, setText] = useState(null)
  const [forceUpdate, forceUpdateId] = useForceUpdate()

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql("CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY NOT NULL, value TEXT);");
    });
  }, );

  // Function for adding elements to: items -> value
  const add = (text:any) => {
    // is text empty?
    if (text === null || text === "") {
      return false;
    }
    // Else insert into items
    db.transaction(
      tx => {
        tx.executeSql("INSERT INTO items (value) VALUES (?)", [text]);
        tx.executeSql("SELECT * FROM items", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      null,
      forceUpdate
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>SQLite database</Text>
      <View style={styles.flexRow}>
        <TextInput
          onChangeText={text => setText(text)}
          onSubmitEditing={() => {
            add(text);
            setText(null);
          }}
          placeholder="Add things to the list..."
          style={styles.input}
          value={text}
        />
      </View>
      <ScrollView style={styles.listArea}>
        <Items
          key={`${forceUpdateId}`}
          onPressItem={id =>
            db.transaction(
              tx => {
                tx.executeSql(`DELETE FROM items WHERE id = ?;`, [id]);
              },
              null,
              forceUpdate
            )
          }
        />
        <TouchableOpacity 
          style={styles.button}
          onPress={ () =>
            db.transaction(
              tx => {
                tx.executeSql(`DROP TABLE items`, []);
              },
              null,
              forceUpdate
          )
        }>
          <Text style={styles.deleteText}>Delete all elements in list</Text>
        </TouchableOpacity>       
      </ScrollView>
    </View>
  );
}

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
}
