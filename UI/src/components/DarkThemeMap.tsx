import Mapbox from "@rnmapbox/maps";
import { useEffect, useRef, useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import * as Location from "expo-location";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import Constants from "expo-constants";

Mapbox.setAccessToken(Constants.expoConfig?.extra?.MAPBOX_ACCESSTOKEN);

const DUMMY_SPOTS = [
  {
    id: "1",
    type: "FREE",
    coordinates: [-74.044, 40.7185] as [number, number],
    street: "Grove St",
  },
  {
    id: "2",
    type: "FREE",
    coordinates: [-74.042, 40.717] as [number, number],
    street: "3rd St",
  },
  {
    id: "3",
    type: "FULL",
    coordinates: [-74.045, 40.716] as [number, number],
    street: "Wayne St",
  },
];

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
        styleURL="mapbox://styles/mapbox/dark-v11"
        logoEnabled={false}
        attributionEnabled={false}
        compassEnabled={false}
      >
        <Mapbox.Camera
          ref={cameraRef}
          centerCoordinate={JERSEY_COORDS}
          zoomLevel={zoomLevel}
          animationMode="flyTo"
          animationDuration={1000}
        />

        {/* User location — glowing blue dot */}
        <Mapbox.PointAnnotation
          id="userLocation"
          coordinate={userLocation}
          anchor={{ x: 0.5, y: 0.5 }}
        >
          <View style={styles.userLocationOuter}>
            <View style={styles.userLocationInner} />
          </View>
        </Mapbox.PointAnnotation>

        {/* Spot markers */}
        {DUMMY_SPOTS.map((spot) => (
          <Mapbox.PointAnnotation
            key={spot.id}
            id={spot.id}
            coordinate={spot.coordinates}
            anchor={{ x: 0.5, y: 1 }}
          >
            <Entypo
              name="location-pin"
              size={36}
              color={spot.type === "FREE" ? "#246BFD" : "#EF4444"}
            />
          </Mapbox.PointAnnotation>
        ))}
      </Mapbox.MapView>

      {/* Zoom controls — bottom right */}
      <View style={styles.zoomControls}>
        <TouchableOpacity style={styles.zoomBtn} onPress={handleZoomIn}>
          <Entypo name="plus" size={18} color="#246BFD" />
        </TouchableOpacity>
        <View style={styles.zoomDivider} />
        <TouchableOpacity style={styles.zoomBtn} onPress={handleZoomOut}>
          <Entypo name="minus" size={18} color="#246BFD" />
        </TouchableOpacity>
      </View>

      {/* Recenter — bottom left */}
      <TouchableOpacity style={styles.recenterBtn} onPress={handleRecenter}>
        <Entypo name="location" size={18} color="#246BFD" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },

  userLocationOuter: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(36, 107, 253, 0.25)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "rgba(36, 107, 253, 0.5)",
  },
  userLocationInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#246BFD",
    borderWidth: 2,
    borderColor: "white",
  },

  zoomControls: {
    position: "absolute",
    right: 12,
    bottom: 12,
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
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
  zoomDivider: {
    height: 0.5,
    backgroundColor: "#e5e7eb",
    marginHorizontal: 8,
  },

  recenterBtn: {
    position: "absolute",
    left: 12,
    bottom: 12,
    backgroundColor: "rgba(255,255,255,0.95)",
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 10,
  },
});
