'use client';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';

interface Props {
  cities: string[];
  areas: string[];
  langs: string[];
  city: string; area: string; lang: string; query: string;
  total: number;
  onChange: (key: string, val: string) => void;
}

export default function LawyerFilters({ cities, areas, city, area, total, onChange }: Props) {
  const { i18n } = useTranslation();
  const isHi = i18n.language === 'hi';
  const hFont = isHi ? 'Noto Sans Devanagari, sans-serif' : 'Inter, sans-serif';

  const selStyle = {
    border: '1.5px solid #EAE1DA', borderRadius: 24, padding: '8px 14px',
    fontSize: 13, background: 'white', outline: 'none',
    color: '#3A3A3A', width: '100%', fontFamily: hFont,
    cursor: 'pointer',
    appearance: 'none' as const,
  };

  return (
    <div style={{
      display: 'flex', alignItems: 'flex-end', gap: 20,
      padding: '14px 24px', background: '#FCF5EF',
      borderBottom: '1px solid #EAE1DA',
      flexWrap: 'wrap',
    }}>
      {/* Title */}
      <div style={{ flex: 1, minWidth: 220 }}>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: '#923c22', margin: 0, fontFamily: hFont }}>
          {isHi ? 'कानूनी सहायता निर्देशिका' : 'Legal Aid Directory'}
        </h1>
        <p style={{ fontSize: 12, color: '#6A564A', margin: '3px 0 0 0', fontFamily: hFont }}>
          {isHi ? 'अपने नज़दीक मुफ्त वकील खोजें' : 'Find free lawyers near you'}
        </p>
      </div>

      {/* Filters row */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, flex: 2, flexWrap: 'wrap' }}>
        {/* City / District */}
        <div style={{ flex: 1, minWidth: 140 }}>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#6A564A', marginBottom: 5, fontFamily: hFont }}>
            {isHi ? 'शहर' : 'City / District'}
          </label>
          <select value={city} onChange={e => onChange('city', e.target.value)} style={selStyle}>
            <option value="">{isHi ? 'सभी शहर' : 'All Cities'}</option>
            {cities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Specialization */}
        <div style={{ flex: 1, minWidth: 160 }}>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#6A564A', marginBottom: 5, fontFamily: hFont }}>
            {isHi ? 'विशेषज्ञता' : 'Specialization'}
          </label>
          <select value={area} onChange={e => onChange('area', e.target.value)} style={selStyle}>
            <option value="">{isHi ? 'सभी क्षेत्र' : 'All Areas'}</option>
            {areas.map(a => <option key={a} value={a}>{a.replace(/-/g, ' ')}</option>)}
          </select>
        </div>
      </div>

      {/* Count badge */}
      <div style={{
        fontSize: 12, fontWeight: 700, color: '#455B3C',
        background: '#E0ECD6', borderRadius: 20, padding: '6px 14px',
        whiteSpace: 'nowrap', fontFamily: hFont,
      }}>
        {total} {isHi ? 'परिणाम' : 'results'}
      </div>
    </div>
  );
}
