import Mapbox from "@rnmapbox/maps";
import { useEffect, useRef, useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import * as Location from "expo-location";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import useOnboardingStore from "@/store/useOnBoardingStore";
import Ionicons from "@expo/vector-icons/Ionicons";

Mapbox.setAccessToken(Constants.expoConfig?.extra?.MAPBOX_ACCESSTOKEN);

const NJ_CENTER: [number, number] = [-74.1724, 40.0583];

export const Map = () => {
  const { isLocationSharingAllowed } = useOnboardingStore();
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null,
  );
  const [zoomLevel, setZoomLevel] = useState(18);
  const cameraRef = useRef<Mapbox.Camera>(null);
  const currentCenter = useRef<[number, number]>(NJ_CENTER);

  useEffect(() => {
    const getLocation = async () => {
      if (isLocationSharingAllowed) {
        try {
          const location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
          });
          const coords: [number, number] = [
            location.coords.longitude,
            location.coords.latitude,
          ];
          currentCenter.current = coords;
          setUserLocation(coords);
          cameraRef.current?.setCamera({
            centerCoordinate: coords,
            zoomLevel: 18,
            animationDuration: 1000,
          });
          setZoomLevel(18);
        } catch (err) {
          console.log("location error", err);
          cameraRef.current?.setCamera({
            centerCoordinate: NJ_CENTER,
            zoomLevel: 10,
            animationDuration: 1000,
          });
        }
      } else {
        cameraRef.current?.setCamera({
          centerCoordinate: NJ_CENTER,
          zoomLevel: 10,
          animationDuration: 1000,
        });
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
    const target = userLocation ?? NJ_CENTER;
    const zoom = 18;
    currentCenter.current = target;
    cameraRef.current?.setCamera({
      centerCoordinate: target,
      zoomLevel: zoom,
      animationDuration: 500,
    });
    setZoomLevel(zoom);
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
          defaultSettings={{
            centerCoordinate: NJ_CENTER,
            zoomLevel: 18,
          }}
        />
        {userLocation && (
          <Mapbox.PointAnnotation
            id="userLocation"
            coordinate={userLocation}
            anchor={{ x: 0.5, y: 0.5 }}
          >
            <View style={styles.carMarker}>
              <Ionicons name="car-sport" size={24} color="#ffffff" />
            </View>
          </Mapbox.PointAnnotation>
        )}
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
  carMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#246BFD",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});
