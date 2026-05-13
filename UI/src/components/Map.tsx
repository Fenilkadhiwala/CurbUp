import Mapbox from "@rnmapbox/maps";
import { useEffect, useRef, useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import * as Location from "expo-location";

import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import Constants from "expo-constants";

Mapbox.setAccessToken(Constants.expoConfig?.extra?.MAPBOX_ACCESSTOKEN);

export const Map = () => {
  const JERSEY_COORDS: [number, number] = [-74.05366, 40.73586];

  const [userLocation, setUserLocation] =
    useState<[number, number]>(JERSEY_COORDS);
  const [zoomLevel, setZoomLevel] = useState(14);
  const cameraRef = useRef<Mapbox.Camera>(null);
  useEffect(() => {
    const getLocation = async () => {
      const { status } = await Location.getForegroundPermissionsAsync();
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        const coords: [number, number] = [
          location.coords.longitude,
          location.coords.latitude,
        ];
        setUserLocation(coords);
        cameraRef.current?.setCamera({
          centerCoordinate: coords,
          zoomLevel: 15,
          animationDuration: 1000,
        });
        setZoomLevel(15);
      }
    };
    getLocation();
  }, []);

  const handleZoomIn = () => {
    const newZoom = Math.min(zoomLevel + 1, 20);
    setZoomLevel(newZoom);
    cameraRef.current?.setCamera({
      zoomLevel: newZoom,
      animationDuration: 300,
    });
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(zoomLevel - 1, 1);
    setZoomLevel(newZoom);
    cameraRef.current?.setCamera({
      zoomLevel: newZoom,
      animationDuration: 300,
    });
  };

  const handleRecenter = () => {
    cameraRef.current?.setCamera({
      centerCoordinate: userLocation,
      zoomLevel: 15,
      animationDuration: 500,
    });
    setZoomLevel(15);
  };
  return (
    <View style={styles.container}>
      <Mapbox.MapView
        style={styles.map}
        styleURL="mapbox://styles/mapbox/streets-v12"
        logoEnabled={false}
        attributionEnabled={false}
        compassEnabled={true}
      >
        <Mapbox.Camera
          ref={cameraRef}
          centerCoordinate={JERSEY_COORDS}
          zoomLevel={zoomLevel}
          animationMode="flyTo"
          animationDuration={1000}
        />
        <Mapbox.PointAnnotation
          id="userLocation"
          coordinate={userLocation}
          anchor={{ x: 0.5, y: 1 }}
        >
          <Entypo name="location-pin" size={44} color="#246BFD" />
        </Mapbox.PointAnnotation>
      </Mapbox.MapView>

      <View style={styles.zoomControls}>
        <TouchableOpacity style={styles.zoomBtn} onPress={handleZoomIn}>
          <Text style={styles.zoomText}>+</Text>
        </TouchableOpacity>
        <View style={styles.zoomDivider} />
        <TouchableOpacity style={styles.zoomBtn} onPress={handleZoomOut}>
          <Text style={styles.zoomText}>−</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.recenterBtn} onPress={handleRecenter}>
        <Entypo name="location" size={20} color="#246BFD" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },

  zoomControls: {
    position: "absolute",
    right: 12,
    bottom: 12,
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 10,
  },
  zoomBtn: {
    width: 38,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
  },
  zoomText: {
    fontSize: 20,
    color: "#246BFD",
    fontWeight: "400",
    lineHeight: 24,
  },
  zoomDivider: {
    height: 0.5,
    backgroundColor: "#e5e7eb",
    marginHorizontal: 8,
  },

  recenterBtn: {
    position: "absolute",
    left: 12,
    bottom: 12,
    backgroundColor: "white",
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 10,
  },
});
