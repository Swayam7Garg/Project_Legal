'use client';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { useCallback, useState, useEffect } from 'react';
import { MapPin, Navigation, Phone, Building2, Star, X } from 'lucide-react';

const containerStyle = { width: '100%', height: '100%' };

// ── Hardcoded nearby free legal aid offices (Delhi/NCR) ──────────────────────
const NEARBY_LAWYERS = [
  {
    id: 'nlf-1',
    name: 'Delhi Legal Services Authority (DLSA)',
    org: 'State Legal Services Authority',
    address: 'Patiala House Courts Complex, New Delhi – 110001',
    phone: '+91-11-23384903',
    specialty: 'All Civil & Criminal Matters',
    lat: 28.6202,
    lng: 77.2408,
    rating: 5,
  },
  {
    id: 'nlf-2',
    name: 'Supreme Court Legal Services Committee',
    org: 'NALSA Affiliated',
    address: 'Supreme Court of India, Tilak Marg, New Delhi – 110001',
    phone: '+91-11-23388922',
    specialty: 'Constitutional & High Court Matters',
    lat: 28.6243,
    lng: 77.2395,
    rating: 5,
  },
  {
    id: 'nlf-3',
    name: 'High Court Legal Services Committee',
    org: 'Delhi High Court',
    address: 'Delhi High Court, Shershah Road, New Delhi – 110003',
    phone: '+91-11-23379109',
    specialty: 'Labour, Property, Domestic Violence',
    lat: 28.6280,
    lng: 77.2410,
    rating: 5,
  },
  {
    id: 'nlf-4',
    name: 'District Legal Services Authority – Saket',
    org: 'DLSA (South)',
    address: 'Saket District Court, M.B. Road, New Delhi – 110030',
    phone: '+91-11-26858600',
    specialty: 'Consumer, Landlord, RTI Matters',
    lat: 28.5244,
    lng: 77.2099,
    rating: 4,
  },
  {
    id: 'nlf-5',
    name: 'District Legal Services Authority – Dwarka',
    org: 'DLSA (South-West)',
    address: 'Dwarka Court Complex, Sector 10, Dwarka, New Delhi – 110075',
    phone: '+91-11-25081313',
    specialty: 'Property, FIR, Domestic Violence',
    lat: 28.5672,
    lng: 77.0413,
    rating: 4,
  },
  {
    id: 'nlf-6',
    name: 'Delhi State Legal Services Authority – Rohini',
    org: 'DLSA (North-West)',
    address: 'Rohini District Courts, Sector 11, Rohini, Delhi – 110085',
    phone: '+91-11-27049100',
    specialty: 'Criminal, Labour, Consumer Matters',
    lat: 28.7195,
    lng: 77.1137,
    rating: 4,
  },
  {
    id: 'nlf-7',
    name: 'Tis Hazari Legal Aid Clinic',
    org: 'DLSA (North)',
    address: 'Tis Hazari Court Complex, Delhi – 110054',
    phone: '+91-11-23968989',
    specialty: 'FIR Filing, Bail Matters, Domestic Violence',
    lat: 28.6672,
    lng: 77.2167,
    rating: 5,
  },
  {
    id: 'nlf-8',
    name: 'Karkardooma Legal Services Clinic',
    org: 'DLSA (East)',
    address: 'Karkardooma District Court, Delhi – 110032',
    phone: '+91-11-22375480',
    specialty: 'General Legal Aid, RTI, Consumer',
    lat: 28.6604,
    lng: 77.2914,
    rating: 4,
  },

  // ── Indore, MP ───────────────────────────────────────────────────────────
  {
    id: 'ind-1',
    name: 'District Legal Services Authority – Indore',
    org: 'MP State Legal Services Authority',
    address: 'District Court Complex, Mahatma Gandhi Marg, Indore – 452001',
    phone: '+91-731-2707012',
    specialty: 'All Civil, Criminal & Family Matters',
    lat: 22.7196,
    lng: 75.8577,
    rating: 5,
  },
  {
    id: 'ind-2',
    name: 'Indore High Court Legal Aid Committee',
    org: 'High Court of Madhya Pradesh (Indore Bench)',
    address: 'High Court Bench, 15 Residency Area, Indore – 452001',
    phone: '+91-731-2543111',
    specialty: 'High Court Appeals, Constitutional Matters',
    lat: 22.7254,
    lng: 75.8839,
    rating: 5,
  },
  {
    id: 'ind-3',
    name: 'Rau Tehsil Legal Aid Cell',
    org: 'DLSA Indore',
    address: 'Tehsil Office, Rau, Indore – 453331',
    phone: '+91-731-4076800',
    specialty: 'Property, Landlord, Labor Rights',
    lat: 22.6780,
    lng: 75.8073,
    rating: 4,
  },
  {
    id: 'ind-4',
    name: 'Devi Ahilya Bai Nagar DLSA Aid Clinic',
    org: 'DLSA Indore (North)',
    address: 'Collectorate Campus, Indore – 452001',
    phone: '+91-731-2535555',
    specialty: 'Domestic Violence, FIR Filing, RTI',
    lat: 22.7242,
    lng: 75.8619,
    rating: 4,
  },
  {
    id: 'ind-5',
    name: 'Lok Adalat & Mediation Centre – Indore',
    org: 'MPSLSA – Lok Adalat',
    address: 'Family Court Complex, Bhanwarkuan, Indore – 452015',
    phone: '+91-731-2498300',
    specialty: 'Lok Adalat Settlements, Family & Consumer',
    lat: 22.7012,
    lng: 75.8833,
    rating: 4,
  },
];

interface ExternalLawyer {
  id: string;
  name: string;
  lat?: number;
  lng?: number;
  city: string;
}

interface SelectedOffice {
  id: string;
  name: string;
  org: string;
  address: string;
  phone: string;
  specialty: string;
  lat: number;
  lng: number;
  rating: number;
}

export default function GoogleMapComponent({ lawyers }: { lawyers: ExternalLawyer[] }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyD23rXC2anlzTfjxnCD-ruPzqEVyvnNm28",
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState('');
  const [selected, setSelected] = useState<SelectedOffice | null>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 28.6139, lng: 77.2090 });

  // ── Request user geolocation on mount ─────────────────────────────────────
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation not supported by your browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserLocation(loc);
        setMapCenter(loc);          // re-center map on user
      },
      () => {
        setLocationError('Location permission denied. Showing Delhi as default.');
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }, []);

  const onLoad = useCallback((m: google.maps.Map) => {
    setMap(m);
  }, []);

  const onUnmount = useCallback(() => { setMap(null); }, []);

  // ── Center map on user location button ────────────────────────────────────
  const recenter = () => {
    if (map && userLocation) {
      map.panTo(userLocation);
      map.setZoom(13);
    }
  };

  // ── Icon helpers (rendered once map is loaded) ─────────────────────────────
  const lawyerIcon = isLoaded ? {
    path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z',
    fillColor: '#923c22',
    fillOpacity: 1,
    strokeColor: '#ffffff',
    strokeWeight: 2,
    scale: 1.8,
    anchor: { x: 12, y: 24 } as google.maps.Point,
  } : undefined;

  const userIcon = isLoaded ? {
    path: google.maps.SymbolPath.CIRCLE,
    fillColor: '#f59e0b',
    fillOpacity: 1,
    strokeColor: '#ffffff',
    strokeWeight: 3,
    scale: 10,
  } : undefined;

  if (!isLoaded) {
    return (
      <div style={{ width: '100%', height: '100%', background: '#FCF5EF', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
        <div style={{ width: 48, height: 48, border: '4px solid #EAE1DA', borderTopColor: '#923c22', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <p style={{ color: '#6A564A', fontFamily: 'Inter, sans-serif' }}>Loading Map…</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>

      {/* Location error banner */}
      {locationError && (
        <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', background: '#923c22', color: 'white', padding: '8px 16px', borderRadius: 20, fontSize: 12, fontWeight: 600, zIndex: 20, maxWidth: '80%', textAlign: 'center' }}>
          📍 {locationError}
        </div>
      )}

      {/* City quick-switch */}
      <div style={{
        position: 'absolute', top: 12, left: 12, zIndex: 20,
        display: 'flex', gap: 8,
      }}>
        {[
          { label: '🏛 Delhi', lat: 28.6139, lng: 77.2090, zoom: 12 },
          { label: '🏙 Indore', lat: 22.7196, lng: 75.8577, zoom: 13 },
        ].map(city => (
          <button
            key={city.label}
            onClick={() => {
              setMapCenter({ lat: city.lat, lng: city.lng });
              if (map) { map.panTo({ lat: city.lat, lng: city.lng }); map.setZoom(city.zoom); }
            }}
            style={{
              background: 'white', border: '1.5px solid #EAE1DA',
              borderRadius: 20, padding: '6px 14px',
              fontSize: 13, fontWeight: 700, color: '#923c22',
              cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            {city.label}
          </button>
        ))}
      </div>

      {/* Recenter button */}
      {userLocation && (
        <button
          onClick={recenter}
          title="Center on my location"
          style={{
            position: 'absolute', bottom: 24, right: 16, zIndex: 20,
            background: 'white', border: 'none', borderRadius: '50%',
            width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)', cursor: 'pointer',
          }}
        >
          <Navigation size={20} color="#923c22" />
        </button>
      )}

      {/* InfoWindow panel for selected office */}
      {selected && (
        <div style={{
          position: 'absolute', bottom: 80, left: '50%', transform: 'translateX(-50%)', zIndex: 30,
          background: 'white', borderRadius: 16, padding: 20,
          boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
          minWidth: 320, maxWidth: 420,
          borderLeft: '4px solid #923c22',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#923c22', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>{selected.org}</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#1A1A1A' }}>{selected.name}</div>
            </div>
            <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6A564A', marginLeft: 8 }}>
              <X size={18} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 12 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 13, color: '#4A4A4A' }}>
              <MapPin size={14} color="#923c22" style={{ flexShrink: 0, marginTop: 2 }} />
              {selected.address}
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, color: '#4A4A4A' }}>
              <Phone size={14} color="#923c22" />
              <a href={`tel:${selected.phone}`} style={{ color: '#923c22', fontWeight: 600, textDecoration: 'none' }}>{selected.phone}</a>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, color: '#4A4A4A' }}>
              <Building2 size={14} color="#923c22" />
              {selected.specialty}
            </div>
            <div style={{ display: 'flex', gap: 4, alignItems: 'center', marginTop: 4 }}>
              {'★'.repeat(selected.rating).split('').map((_, i) => (
                <span key={i} style={{ color: '#f59e0b', fontSize: 14 }}>★</span>
              ))}
              {'☆'.repeat(5 - selected.rating).split('').map((_, i) => (
                <span key={i} style={{ color: '#D9CBBF', fontSize: 14 }}>★</span>
              ))}
            </div>
          </div>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${selected.lat},${selected.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block', marginTop: 14, textAlign: 'center',
              background: '#923c22', color: 'white', padding: '10px',
              borderRadius: 24, fontSize: 13, fontWeight: 700, textDecoration: 'none',
            }}
          >
            Get Directions →
          </a>
        </div>
      )}

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={() => setSelected(null)}
        options={{
          disableDefaultUI: false,
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: true,
          styles: [
            { featureType: 'administrative', elementType: 'labels.text.fill', stylers: [{ color: '#444444' }] },
            { featureType: 'landscape', elementType: 'all', stylers: [{ color: '#f5ede4' }] },
            { featureType: 'poi', elementType: 'all', stylers: [{ visibility: 'off' }] },
            { featureType: 'road', elementType: 'all', stylers: [{ saturation: -100 }, { lightness: 45 }] },
            { featureType: 'road.highway', elementType: 'all', stylers: [{ visibility: 'simplified' }] },
            { featureType: 'road.arterial', elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
            { featureType: 'transit', elementType: 'all', stylers: [{ visibility: 'off' }] },
            { featureType: 'water', elementType: 'all', stylers: [{ color: '#b2d2e8' }, { visibility: 'on' }] },
          ],
        }}
      >
        {/* User's current location marker (blue dot) */}
        {userLocation && (
          <Marker
            position={userLocation}
            title="You are here"
            icon={userIcon}
            zIndex={10}
          />
        )}

        {/* Hardcoded nearby lawyer office markers */}
        {NEARBY_LAWYERS.map(office => (
          <Marker
            key={office.id}
            position={{ lat: office.lat, lng: office.lng }}
            title={office.name}
            icon={lawyerIcon}
            onClick={() => setSelected(office)}
            zIndex={5}
          />
        ))}
      </GoogleMap>
    </div>
  );
}
