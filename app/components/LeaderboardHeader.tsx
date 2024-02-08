import React from 'react';
import { StyleSheet, View } from "react-native"
import { Text } from "app/components/Text"

const LeaderboardHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <Text preset={"subheading"} weight={"bold"} tx={"challengeScreen.leaderboard"}/>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 10,
    paddingLeft: 20,
  },
});

export default LeaderboardHeader;