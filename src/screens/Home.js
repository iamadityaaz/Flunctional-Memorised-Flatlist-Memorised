import React, {memo, useEffect, useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Set} from 'immutable';
import {ListItem, Avatar} from 'react-native-elements';
import users from '../../generated.json';
import Icon from 'react-native-vector-icons/Foundation';

const Item = ({item, selected, onClick}) => {
  console.log(`rendering item index=${item.index}, selected=${selected}`);
  return (
    <ListItem
      key={item._id}
      title={item.name}
      containerStyle={styles.item}
      onPress={() => onClick(item._id)}>
      <Avatar source={{uri: item.picture}} />
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.gender}</ListItem.Subtitle>
      </ListItem.Content>
      <Icon
        type="SimpleLineIcons"
        name={!selected ? 'like' : 'dislike'}
        size={30}
        onPress={() => {
          onClick(item._id);
        }}
      />
    </ListItem>
  );
};
function itemEq(prevItem, nextItem) {
  return (
    prevItem._id === nextItem._id && prevItem.selected === nextItem.selected
  );
}

const MemoizedItem2 = memo(Item, itemEq);

const Items = ({data, selectedItems, onClick, getData, loading}) => {
  console.log('rendering items');
  // Replace <Item /> with <MemoizedItem /> or <MemoizedItem2 /> to see effect
  const _renderItem = ({item}) => (
    <MemoizedItem2
      item={item}
      selected={selectedItems.has(item._id)}
      onClick={onClick}
    />
  );

  const renderFooter = () => {
    return (
      //Footer View with Load More button
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          //On Click of button load more data
          style={styles.loadMoreBtn}>
          <Text style={styles.btnText}>Loading...</Text>
          {loading ? (
            <ActivityIndicator color="white" style={{marginLeft: 8}} />
          ) : null}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={_renderItem}
      keyExtractor={item => item.email}
      extraData={selectedItems}
      ListFooterComponent={renderFooter}
      onEndReached={getData}
      onEndReachedThreshold={0.1}
    />
  );
};

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  const [selectedItems, setSelectedItems] = useState(Set());
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);

  useEffect(() => getData(), []);

  const getData = () => {
    // SET LOADING TRUE
    setLoading(true);

    // USING TIMEOUT TO MAKE DELAY
    setTimeout(() => {
      setDataSource([...dataSource, ...users.slice(start, end)]);
      // SET ENDING INDEX TO START
      setStart(end);
      // SET NEW ENDING INDEX AS +10
      setEnd(end + 10);
      // SET LOADING FALSE
      setLoading(false);
    }, 100);
  };

  const onClickUseCallBack = id => {
    setSelectedItems(selectedItems => {
      const newSelectedItems = selectedItems.has(id)
        ? selectedItems.delete(id)
        : selectedItems.add(id);

      return newSelectedItems;
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Items
        data={dataSource}
        selectedItems={selectedItems}
        onClick={onClickUseCallBack}
        getData={getData}
        loading={loading}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 16,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    elevation: 20,
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
