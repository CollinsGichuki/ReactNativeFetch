import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';

//Url we are getting data from
const moviesUrl = 'https://reactnative.dev/movies.json';

const App = () => {
  //Managing state using useState
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);

  //Get's called once
  useEffect(() => {
    fetch(moviesUrl)
      .then(response => response.json()) //get response and convert to json
      .then(json => {
        setData(json.movies);
        setTitle(json.title);
        setDescription(json.description);
      })
      .catch(error => console.error(error)) //display errors
      .finally(() => setLoading(false)); //change loading state
  }, []);

  return (
    <SafeAreaView style={{flex: 1, padding: 24}}>
      {/* show the activity indicator while we are fetching the data, else show the data */}
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          {/*Title from url*/}
          <Text style={styles.title}>{title}</Text>
          <View style={{borderBottomWidth: 1, marginBottom: 12}}></View>
          {/*Display each movie*/}
          <FlatList
            data={data}
            keyExtractor={({id}, index) => id}
            renderItem={({item}) => (
              <View style={{paddingBottom: 10}}>
                <Text style={styles.movieText}>
                  {item.id}.{item.title}, {item.releaseYear}
                </Text>
              </View>
            )}
          />
          {/*Show the description*/}
          <Text style={styles.description}>{description}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  movieText: {
    fontSize: 18,
    fontWeight: '200',
  },
  description: {
    textAlign: 'center',
    fontWeight: '200',
    color: 'green',
  },
});

export default App;
