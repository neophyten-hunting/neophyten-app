import React, { useState, useEffect } from 'react';
import { View, Button, ActivityIndicator, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import backend from '../api/backend';
import moment from 'moment';
import LocationError from './LocationError';

const CsvExport = ({ callback }) => {
  const [startExport, setStartExport] = useState(false);

  const downloadAndShareCsv = async () => {
    const fileUrl = FileSystem.documentDirectory + `neophytes_${moment().format()}.csv`;

    try {
      const response = await backend.get('/v1/neophytes.csv');
      await FileSystem.writeAsStringAsync(fileUrl, response.data, { encoding: FileSystem.EncodingType.UTF8 })
      await Sharing.shareAsync(fileUrl);
      if (callback) {
        callback();
      }
    } catch (error) {
      LocationError({ title: 'Export fehlgeschlagen', message: 'Der CSV-Export ist fehlgeschlagen.' });
    }
  }

  useEffect(() => {
    if (startExport) {
      downloadAndShareCsv();
      setStartExport(false);
    }
  }, [startExport])

  return (
    <View>
      <ActivityIndicator style={styles.loadingStyle} size="large" color="green" animating={startExport} />
      <Button disabled={startExport} onPress={() => setStartExport(true)} title="Daten als CSV exportieren" />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingStyle: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 200,
  },
});

export default CsvExport;