'use client';
import Link from 'next/link';
import { Check } from 'lucide-react';

interface Step { label: string; href?: string; done: boolean; active: boolean; }

export default function ProgressStepper({ steps }: { steps: Step[] }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 0,
      padding: '12px 24px', background: 'white',
      borderBottom: '1px solid #EAE1DA', overflowX: 'auto',
    }}>
      {steps.map((step, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, whiteSpace: 'nowrap' }}>
            {/* Circle */}
            <div style={{
              width: 24, height: 24, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: step.done ? '#455B3C' : step.active ? '#923c22' : '#EAE1DA',
              color: (step.done || step.active) ? 'white' : '#A0A0A0',
              fontSize: 11, fontWeight: 700, flexShrink: 0,
              transition: 'background 0.2s',
            }}>
              {step.done ? <Check size={13} /> : i + 1}
            </div>

            {/* Label */}
            {step.href && !step.active ? (
              <Link href={step.href} style={{
                fontSize: 13,
                color: step.done ? '#455B3C' : '#6A564A',
                textDecoration: 'none',
                fontWeight: step.active ? 700 : 500,
              }}>
                {step.label}
              </Link>
            ) : (
              <span style={{
                fontSize: 13,
                color: step.active ? '#923c22' : step.done ? '#455B3C' : '#A0A0A0',
                fontWeight: step.active ? 700 : 500,
              }}>
                {step.label}
              </span>
            )}
          </div>

          {/* Connector line */}
          {i < steps.length - 1 && (
            <div style={{
              width: 32, height: 2,
              background: steps[i + 1].done || steps[i + 1].active ? '#923c22' : '#EAE1DA',
              margin: '0 8px', flexShrink: 0,
              transition: 'background 0.2s',
            }} />
          )}
        </div>
      ))}
    </div>
  );
}
