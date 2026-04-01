'use client';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { ChevronDown, ChevronUp, Lightbulb, ArrowRight } from 'lucide-react';
import type { Situation } from '../../types';

export default function ProcedureStepper({ situation }: { situation: Situation }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'hi';
  const isHi = lang === 'hi';
  const hFont = isHi ? 'Noto Sans Devanagari, sans-serif' : 'Inter, sans-serif';
  const [expanded, setExpanded] = useState<number>(0);

  return (
    <div>
      <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A', marginBottom: 24, fontFamily: hFont }}>
        {t('explain.tabs.procedure')}
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {situation.steps.map((step, i) => (
          <div key={i} style={{
            border: `1.5px solid ${expanded === i ? '#923c22' : '#EAE1DA'}`,
            borderRadius: 14, overflow: 'hidden',
            transition: 'border-color 0.2s, background 0.2s',
            background: expanded === i ? '#FDF7F4' : 'white',
          }}>
            <button onClick={() => setExpanded(expanded === i ? -1 : i)} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px',
              background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
            }}>
              {/* Step circle */}
              <div style={{
                width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                background: expanded === i ? '#923c22' : '#EAE1DA',
                color: expanded === i ? 'white' : '#6A564A',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800, fontSize: 14, transition: 'all 0.2s',
              }}>
                {step.stepNumber}
              </div>

              {/* Step title */}
              <span style={{
                flex: 1, fontSize: 15, fontWeight: 700,
                color: expanded === i ? '#923c22' : '#1A1A1A',
                fontFamily: hFont,
              }}>
                {step.title[lang]}
              </span>

              {/* Chevron */}
              {expanded === i
                ? <ChevronUp size={16} color="#923c22" />
                : <ChevronDown size={16} color="#A0A0A0" />}
            </button>

            {/* Expanded content */}
            {expanded === i && (
              <div style={{ padding: '0 18px 18px 64px' }}>
                <p style={{ fontSize: 14, color: '#3A3A3A', lineHeight: 1.7, fontFamily: hFont, marginBottom: 12 }}>
                  {step.description[lang]}
                </p>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, background: '#FFF9EC', border: '1px solid #F5E0A0', borderRadius: 10, padding: '10px 12px' }}>
                  <Lightbulb size={14} color="#92400e" style={{ flexShrink: 0, marginTop: 1 }} />
                  <p style={{ fontSize: 12, color: '#78350f', lineHeight: 1.5, fontFamily: hFont, margin: 0 }}>
                    {step.tip[lang]}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* CTA Banner */}
      <div style={{
        marginTop: 24, padding: 20,
        background: 'linear-gradient(135deg, #FAF4EE, #EAE1DA)',
        border: '1px solid #EAE1DA', borderRadius: 14,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 10, flexWrap: 'wrap',
      }}>
        <p style={{ fontSize: 14, color: '#923c22', fontWeight: 700, fontFamily: hFont, margin: 0 }}>
          {t('explain.get_help_title')}
        </p>
        <Link href="/lawyers" style={{
          background: '#923c22', color: 'white', textDecoration: 'none',
          fontSize: 13, padding: '9px 20px', borderRadius: 24,
          fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 6,
          fontFamily: hFont,
        }}>
          {t('explain.find_lawyer')} <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
