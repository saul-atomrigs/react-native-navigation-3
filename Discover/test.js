const BasicInfoScreen = (props) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#f7f7f7",
      height: hp("100%"),
    },
  });
  return (
    <SafeAreaView style={styles.container}>
      <NameInput navigation={props.navigation} info={props.route.params} />
    </SafeAreaView>
  );
};

const NameInput = ({ navigation, info }) => {
  console.log(info)
}

