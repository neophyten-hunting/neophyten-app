import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Marker, UrlTile } from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import CreateMapOverlay from './CreateMapOverlay';
import MapInfoPanel from './MapInfoPanel';
import DetailMapOverlay from './DetailMapOverlay';
import LocationButton from './LocationButton.js';
import MapLayerButton from './MapLayersButton.js';
import OsmContributerOverlay from './OsmContributerOverlay.js';

const Map = ({ initCoords, mapRef, items, itemsLoading, isCreateMode, setIsCreateMode }) => {
  const [region, setRegion] = useState(initCoords);
  const [newItemCoords, setNewItemCoords] = useState(initCoords);
  const [selectedItem, setSelectedItem] = useState(null);
  const [mode, setMode] = useState('');
  const [isTileOverlayActive, setIsTileOverlayActive] = useState(true);

  const animateToRegion = ({ latitude, longitude }) => {
    mapRef.current.animateToRegion({
      latitude,
      longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    });
  };

  useEffect(() => {
    if (isCreateMode) {
      setNewItemCoords({ latitude: region.latitude, longitude: region.longitude });
    }
  }, [isCreateMode]);

  useEffect(() => {
    const firstload = items.length === 0 && itemsLoading;
    const top = firstload ? 'load' : isCreateMode ? 'create' : 'loc';
    setMode(top);
  }, [itemsLoading, isCreateMode])

  const renderMarkers = (createMode, items, latlon, setLatLng) => {
    if (createMode) {
      return (
        <Marker draggable
          coordinate={latlon}
          onDragEnd={(e) => setLatLng(e.nativeEvent.coordinate)}
        />
      );
    }
    else {
      return items.map((item) => {
        return (
          <Marker
            pinColor="green"
            key={item.id.toString()}
            coordinate={{ latitude: item.latitude, longitude: item.longitude }}
          />
        );
      }
      );
    }
  };

  const renderOverlay = (mode) => {
    if (mode === 'create') {
      return <CreateMapOverlay
        isTopView={true}
        setIsCreateMode={setIsCreateMode}
        newItemCoords={newItemCoords} />
    }
    else if (selectedItem != null) {
      return <DetailMapOverlay item={selectedItem} />
    } else {
      return null;
    }
  }

  const renderInfoPanel = (mode) => {
    if (mode === 'load') {
      return (
        <MapInfoPanel
          isTopView={true}
          text="Laden..."
          showLoading={true}
        />
      );
    }
  }

  const onMapPress = event => {
    if (event.action !== null && event.action !== 'marker-press') {
      setSelectedItem(null);
    }
  }

  const tileOverlay = isTileOverlayActive ? <UrlTile
    urlTemplate='http://c.tile.openstreetmap.org/{z}/{x}/{y}.png'
    maximumZ={19}
    flipY={false}
  /> : null;

  return (
    <View style={styles.containerStyle}>
      <MapView
        ref={mapRef}
        style={styles.mapStyle}
        initialRegion={initCoords}
        showsUserLocation
        followsUserLocation={false}
        onRegionChangeComplete={setRegion}
        spiralEnabled={false}
        onPress={(e) => onMapPress(e.nativeEvent)}
        showsMyLocationButton={false}
        mapType={Platform.OS == "android" ? "standard" : "mutedStandard"}
        maxZoomLevel={19}
        maxZoom={17}
        moveOnMarkerPress={false}
        showsCompass={false}
      >
        {renderMarkers(isCreateMode, items, newItemCoords, setNewItemCoords)}
        {tileOverlay}
      </MapView>
      <OsmContributerOverlay show={isTileOverlayActive} />
      {renderInfoPanel(mode)}
      {renderOverlay(mode)}
      <LocationButton isTopView={mode === 'loc'} animateToRegion={animateToRegion} />
      <MapLayerButton setLayerActive={setIsTileOverlayActive} layerIsActive={isTileOverlayActive} />
    </View >
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  mapStyle: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 50,
  },
});

export default Map;