import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from "app/components/Text"

interface ChallengeHeaderProps {
  challenge: any;
}

const ChallengeHeader = (props: ChallengeHeaderProps) => {
  const { challenge } = props;

  return (
    <View style={styles.headerContainer}>
      {/* eslint-disable-next-line react-native/no-color-literals,react-native/no-inline-styles */}
      <Text preset="heading" style={{color: "#2F4858"}} text={challenge.name}/>
      <Text
        size="md"
        style={styles.metadataText}
      >
        {`${challenge.formattedDates.startDate} - ${challenge.formattedDates.finishDate}`}
        {`, Location: ${challenge.locationId}`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingLeft: 20,
  },
  metadataText: {
    marginTop: 8,
  },
});

export default ChallengeHeader;