'use client';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Scale, Check, Sparkles, Target, ArrowRight } from 'lucide-react';
import type { Situation } from '../../types';

export default function DualDisplayPanel({ situation }: { situation: Situation }) {
  const { i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'hi';
  const isHi = lang === 'hi';
  const hFont = isHi ? 'Noto Sans Devanagari, sans-serif' : 'Inter, sans-serif';

  const [aiData, setAiData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('/api/explain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: situation.id, lang }),
    })
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(data => { if (!data || data.error) throw new Error(); setAiData(data); setLoading(false); })
      .catch(() => {
        setAiData({
          summary: situation.description[lang],
          rights: situation.rights.map((r: any) => r.title[lang] + ': ' + r.description[lang]),
          what_you_can_do: situation.steps.map((s: any) => s.title[lang]),
          disclaimer: isHi
            ? 'यह कानूनी जानकारी है, कानूनी सलाह नहीं (स्थिर बैकअप)।'
            : 'This is legal information, not legal advice (Static Backup).',
        });
        setLoading(false);
      });
  }, [situation, lang, isHi]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', background: 'white', borderTop: '1px solid #EAE1DA', margin: '0 -20px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>

        {/* ── Left: Original Legal Text ──────────────────────────── */}
        <div style={{ flex: 1, minWidth: 320, background: '#FAF4EE', padding: '40px 32px', borderRight: '1px solid #EAE1DA' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'white', border: '1px solid #EAE1DA', borderRadius: 20, padding: '6px 14px', fontSize: 12, fontWeight: 600, color: '#6A564A', marginBottom: 28 }}>
            <Scale size={14} color="#923c22" /> {isHi ? 'मूल कानूनी पाठ' : 'Original Legal Text'}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {situation.laws.map((law, i) => (
              <div key={i}>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#923c22', marginBottom: 4, fontFamily: 'Georgia, serif' }}>
                  {law.section}, {law.act}
                </h3>
                <p style={{ fontSize: 12, color: '#6A564A', marginBottom: 16 }}>{law.summary[lang]}</p>
                <div style={{ fontSize: 13, color: '#3A3A3A', lineHeight: 1.8, fontFamily: 'Georgia, serif', whiteSpace: 'pre-wrap' }}>
                  {law.fullText}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: AI Plain Translation ────────────────────────── */}
        <div style={{ flex: 1, minWidth: 320, background: 'white', padding: '40px 32px', position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#E0ECD6', border: '1px solid #C6D9BA', borderRadius: 20, padding: '6px 14px', fontSize: 12, fontWeight: 600, color: '#455B3C', marginBottom: 28 }}>
            <Sparkles size={14} color="#455B3C" />
            {isHi ? 'AI द्वारा सरल अनुवाद' : 'AI Plain Translation'}
          </div>

          <h2 style={{ fontSize: 24, fontWeight: 800, color: '#1A1A1A', marginBottom: 8, fontFamily: hFont }}>
            {isHi ? 'आपके लिए इसका क्या अर्थ है' : 'What this means for you'}
          </h2>

          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 40 }}>
              <div className="skeleton" style={{ width: '100%', height: 20 }} />
              <div className="skeleton" style={{ width: '85%', height: 20 }} />
              <div className="skeleton" style={{ width: '90%', height: 20 }} />
              <p style={{ fontSize: 13, color: '#A0A0A0', fontStyle: 'italic', marginTop: 10, fontFamily: hFont }}>
                {isHi ? 'NyayaMitra AI आपके अधिकारों को समझा रहा है...' : 'NyayaMitra AI is generating your rights...'}
              </p>
            </div>
          ) : aiData ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32, marginTop: 16 }}>

              {/* Summary */}
              <div style={{ background: '#FAF4EE', padding: 16, borderRadius: 10, borderLeft: '4px solid #923c22' }}>
                <p style={{ fontSize: 15, color: '#1A1A1A', lineHeight: 1.6, fontFamily: hFont, fontWeight: 600 }}>{aiData.summary}</p>
              </div>

              {/* Rights */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {aiData.rights.map((right: string, i: number) => (
                  <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#E0ECD6', color: '#455B3C', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Check size={14} />
                    </div>
                    <p style={{ fontSize: 15, color: '#3A3A3A', lineHeight: 1.6, fontFamily: hFont, marginTop: 2 }}>{right}</p>
                  </div>
                ))}
              </div>

              {/* Key Protection */}
              {aiData.key_protection && (
                <div style={{ background: '#FFF9EC', padding: 16, borderRadius: 10, border: '1px solid #F5E0A0' }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: '#b45309', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Target size={14} /> {isHi ? 'मुख्य कानूनी सुरक्षा' : 'Key Protection'}
                  </p>
                  <p style={{ fontSize: 14, color: '#78350f', fontFamily: hFont, lineHeight: 1.5 }}>
                    {aiData.key_protection}
                  </p>
                </div>
              )}

              {/* What you can do */}
              {aiData.what_you_can_do && aiData.what_you_can_do.length > 0 && (
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A', marginBottom: 12, fontFamily: hFont }}>
                    {isHi ? 'आप क्या कर सकते हैं' : 'What you can do next'}
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {aiData.what_you_can_do.map((action: string, idx: number) => (
                      <div key={idx} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 14, color: '#4A4A4A', fontFamily: hFont }}>
                        <ArrowRight size={16} color="#923c22" style={{ flexShrink: 0, marginTop: 2 }} />
                        {action}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Disclaimer */}
              <p style={{ fontSize: 11, color: '#A0A0A0', fontStyle: 'italic', marginTop: 12, fontFamily: hFont, borderTop: '1px solid #EAE1DA', paddingTop: 16 }}>
                {aiData.disclaimer}
              </p>
            </div>
          ) : (
            <p style={{ fontSize: 14, color: '#dc2626' }}>
              {isHi ? 'एआई को लोड करने में विफल। कृपया पृष्ठ को रीफ्रेश करें।' : 'Failed to load AI explanation. Please check your connection or try again.'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
