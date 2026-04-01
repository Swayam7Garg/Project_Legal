'use client';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Info, SlidersHorizontal } from 'lucide-react';
import LawyerCard from '../../components/lawyers/LawyerCard';
import LawyerFilters from '../../components/lawyers/LawyerFilters';
import FreeLegalAidModal from '../../components/lawyers/FreeLegalAidModal';
import GoogleMapComponent from '../../components/lawyers/GoogleMapComponent';
import lawyersData from '../../data/lawyers.json';
import type { Lawyer } from '../../types';

export default function LawyersPage() {
  const { i18n } = useTranslation();
  const isHi = i18n.language === 'hi';
  const hFont = isHi ? 'Noto Sans Devanagari, sans-serif' : 'Inter, sans-serif';

  const [lawyers, setLawyers] = useState<Lawyer[]>(lawyersData as Lawyer[]);
  const [filters, setFilters] = useState({ city: '', area: '', lang: '', query: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch((process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000') + '/api/lawyers')
      .then(r => r.json())
      .then(d => { if (Array.isArray(d) && d.length) setLawyers(d); })
      .catch(() => {});
  }, []);

  const cities = [...new Set(lawyers.map(l => l.city))].sort();
  const areas  = [...new Set(lawyers.flatMap(l => l.specializations))].sort();
  const langs  = [...new Set(lawyers.flatMap(l => l.languages))].sort();

  const filtered = lawyers.filter(l => {
    if (filters.city && l.city !== filters.city) return false;
    if (filters.area && !l.specializations.includes(filters.area)) return false;
    return true;
  });

  const onChange = (key: string, val: string) => setFilters(f => ({ ...f, [key]: val }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 61px)', overflow: 'hidden' }}>
      <LawyerFilters
        cities={cities} areas={areas} langs={langs}
        city={filters.city} area={filters.area} lang={filters.lang}
        query={filters.query} total={filtered.length}
        onChange={onChange}
      />

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* ── Map ─────────────────────────────────────────────────────── */}
        <div style={{ flex: 1, position: 'relative', background: '#F5EBE1', overflow: 'hidden' }}>
          <GoogleMapComponent lawyers={filtered} />
        </div>

        {/* ── Sidebar list ────────────────────────────────────────────── */}
        <div style={{ width: 430, background: '#FFFDFB', display: 'flex', flexDirection: 'column', borderLeft: '1px solid #EAE1DA' }}>

          {/* NALSA info banner */}
          <div style={{
            padding: '14px 20px',
            background: 'linear-gradient(135deg, #FAF4EE, #EAE1DA)',
            borderBottom: '1px solid #EAE1DA',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
          }}>
            <div>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#923c22', margin: 0, display: 'flex', alignItems: 'center', gap: 6, fontFamily: hFont }}>
                <Info size={15} />
                {isHi ? 'नि:शुल्क कानूनी सहायता के लिए पात्र?' : 'Eligible for Free Legal Aid?'}
              </h3>
              <p style={{ fontSize: 11, color: '#6A564A', margin: '3px 0 0 0', fontFamily: hFont }}>
                {isHi ? 'NALSA सेवाओं के बारे में जानें (धारा 12)' : 'Learn about NALSA free services under Sec 12.'}
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              style={{
                background: '#923c22', color: 'white', border: 'none',
                padding: '8px 16px', borderRadius: 20, fontSize: 12,
                fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap',
                fontFamily: hFont,
              }}
            >
              {isHi ? 'और जानें' : 'Know More'}
            </button>
          </div>

          {/* Sort bar */}
          <div style={{
            padding: '12px 20px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            borderBottom: '1px solid #EAE1DA', background: '#FFFDFB',
          }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A', fontFamily: hFont }}>
              {isHi ? `${filters.city || 'सभी शहरों'} में वकील` : `Lawyers near ${filters.city || 'Your Location'}`}
            </span>
            <button style={{
              background: 'none', border: 'none', fontSize: 12, color: '#923c22',
              display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer',
              fontWeight: 600, fontFamily: hFont,
            }}>
              <SlidersHorizontal size={14} />
              {isHi ? 'दूरी के अनुसार' : 'Sort by Distance'}
            </button>
          </div>

          {/* Cards list */}
          <div style={{ padding: '16px 16px', overflowY: 'auto', flex: 1, background: '#FAF4EE' }}>
            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: '#6A564A', fontFamily: hFont }}>
                <p style={{ fontSize: 14 }}>{isHi ? 'कोई वकील नहीं मिला।' : 'No lawyers found.'}</p>
              </div>
            ) : (
              filtered.map((l, i) => <LawyerCard key={l.id} lawyer={l} selected={i === 0} />)
            )}
          </div>
        </div>
      </div>

      <FreeLegalAidModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
